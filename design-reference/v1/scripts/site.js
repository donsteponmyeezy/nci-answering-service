/* NCI Answering Service — design-reference v1 behaviors.
   Vanilla JS only. Every "submit" here is a labeled preview; nothing is sent anywhere. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Mobile menu ---------- */
  const toggle = $("[data-menu-toggle]");
  const menu = $("#mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      $("[data-icon=open]", toggle).hidden = open;
      $("[data-icon=close]", toggle).hidden = !open;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) toggle.click();
    });
  }

  /* ---------- Current-page nav state ---------- */
  const nav = document.body.dataset.nav;
  if (nav) $$(`[data-nav="${nav}"]`).forEach((a) => a.setAttribute("aria-current", "page"));

  /* ---------- Sticky mobile call bar ---------- */
  const bar = $("[data-sticky-bar]");
  if (bar) {
    const update = () => {
      const show = window.scrollY > 120;
      if (bar.hidden === !show) return;
      bar.hidden = !show;
      document.body.style.paddingBottom = show && window.innerWidth < 1024 ? "4.5rem" : "";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Daytime rollover calculator (services page) ---------- */
  const calc = $("[data-calc]");
  if (calc) {
    const RATE_CENTS = 135; // $1.35 per minute, published daytime rollover rate
    const BASE_CENTS = 2500; // $25.00 monthly base rate
    const minutes = $("[data-calc-minutes]", calc);
    const days = $("[data-calc-days]", calc);
    const total = $("[data-calc-total]", calc);
    const breakdown = $("[data-calc-breakdown]", calc);
    const money = (c) => "$" + (c / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const run = () => {
      const m = Math.max(0, Math.min(600, Number(minutes.value) || 0));
      const d = Math.max(1, Math.min(31, Number(days.value) || 0));
      const mins = m * d;
      const cents = mins * RATE_CENTS + BASE_CENTS;
      total.textContent = money(cents);
      breakdown.textContent = `${mins.toLocaleString()} minutes × $1.35 + $25 base rate. One-time $50 setup not included.`;
    };
    ["input", "change"].forEach((ev) => { minutes.addEventListener(ev, run); days.addEventListener(ev, run); });
    run();
  }

  /* ---------- Contact form (preview) ---------- */
  const contact = $("[data-contact-form]");
  if (contact) {
    const params = new URLSearchParams(location.search);
    const PLAN_NAMES = {
      "per-call-100": "Per Call / 100", "per-call-150": "Per Call / 150", "per-call-250": "Per Call / 250",
      "medical-office": "Medical Office", "daytime-rollover": "Day Time Rollover",
    };
    const plan = params.get("plan");
    if (plan && PLAN_NAMES[plan]) {
      $("[data-plan-field]", contact).value = plan;
      $("[data-plan-name]", contact).textContent = PLAN_NAMES[plan];
      $("[data-plan-note]", contact).hidden = false;
    }
    const interest = params.get("interest");
    const sel = $("[data-interest]", contact);
    if (interest && sel && $$(`option[value="${interest}"]`, sel).length) sel.value = interest;

    contact.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(contact);
      const ok = String(f.get("name")).trim() && String(f.get("phone")).replace(/\D/g, "").length >= 10 && String(f.get("message")).trim();
      $("[data-contact-error]").hidden = Boolean(ok);
      if (!ok || String(f.get("website"))) return; // honeypot: silently ignore
      contact.hidden = true;
      $("[data-contact-done]").hidden = false;
    });
  }

  /* ---------- Find Your Coverage matcher ---------- */
  const matcher = $("[data-matcher]");
  if (matcher) {
    const form = $("[data-matcher-form]", matcher);
    const steps = $$("[data-step]", form);
    const next = $("[data-next]", form);
    const back = $("[data-back]", form);
    const err = $("[data-error]", form);
    const label = $("[data-step-label]", matcher);
    const progress = $("[data-progress]", matcher);
    const result = $("[data-result]", matcher);
    let i = 0;

    const isMedical = () => ["practice", "hospital"].includes(form.org?.value);
    const stepApplies = (idx) => {
      const step = Number(steps[idx].dataset.step);
      if (step === 3) return form.when.value !== "daytime"; // volume only matters for after-hours packages
      if (step === 4) return (!form.org.value || isMedical()) && form.when.value !== "daytime";
      return true;
    };
    const order = () => steps.map((_, idx) => idx).filter(stepApplies);

    const render = () => {
      const seq = order();
      const pos = seq.indexOf(i);
      steps.forEach((s, idx) => (s.hidden = idx !== i));
      label.textContent = `Question ${pos + 1} of ${seq.length}`;
      progress.style.width = `${Math.round(((pos + 1) / seq.length) * 100)}%`;
      back.hidden = pos === 0;
      next.textContent = pos === seq.length - 1 ? "See my recommendation" : "Next";
      err.hidden = true;
      steps[i].querySelector("input")?.focus({ preventScroll: true });
    };

    const answered = () => {
      const inputs = $$("input", steps[i]);
      if (inputs[0].type === "checkbox") return true;
      return inputs.some((x) => x.checked);
    };

    next.addEventListener("click", () => {
      if (!answered()) { err.hidden = false; return; }
      const seq = order();
      const pos = seq.indexOf(i);
      if (pos < seq.length - 1) { i = seq[pos + 1]; render(); }
      else showResult();
    });
    back.addEventListener("click", () => {
      const seq = order();
      const pos = seq.indexOf(i);
      if (pos > 0) { i = seq[pos - 1]; render(); }
    });
    $("[data-restart]", matcher).addEventListener("click", () => {
      form.reset(); i = 0; result.hidden = true; form.hidden = false; render();
      matcher.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    /* Recommendation rules. Prices are the published packages; nothing here is a quote. */
    function recommend() {
      const org = form.org.value, when = form.when.value, vol = form.volume.value;
      const providers = form.providers.value, duration = form.duration.value;
      const extras = $$("input[name=extras]:checked", form).map((x) => x.value);
      const medical = isMedical();
      const r = { points: [], priceLabel: "Starts at", price: "", note: "per month + $25 base" };

      const perCall = (n) => ({ "100": ["Per Call / 100", "$165", "100 after-hours calls, then $1.80 per call"], "150": ["Per Call / 150", "$210", "150 after-hours calls, then $1.55 per call"], "250": ["Per Call / 250", "$312.50", "250 after-hours calls, then $1.40 per call"] }[n]);

      if (when === "daytime") {
        r.title = "Daytime Rollover";
        r.summary = medical ? "Overflow coverage during your advertised hours, billed only for the minutes we handle." : "Business-hours overflow so a person answers when your line is busy.";
        r.price = "$1.35"; r.note = "per minute during business hours + $25 base";
        r.points.push("Surges, lunch hours, and staff absences covered without a new hire", "Appointment scheduling and reminders available as per-minute add-ons");
      } else if (medical && providers === "many" && (vol === "more" || vol === "250" || vol === "unsure")) {
        r.title = "Medical Office Professional Plan";
        r.summary = "For practices with five or more providers on call: a flat rate per provider, after hours only.";
        r.price = "$90"; r.note = "per provider / month + $25 base";
        r.points.push("Predictable monthly cost regardless of call count", "Same dispatchers who learn your on-call rotation");
      } else if (vol === "more") {
        r.title = "Custom After-Hours Account";
        r.summary = "More than 250 calls a month is priced by the account. We'll build it with you on the call.";
        r.priceLabel = "Priced by account"; r.price = "Call us"; r.note = "published packages start at $165";
        r.points.push("Per-call billing, not per-minute", "Triage, dispatch, and daily message logs included");
      } else {
        const pick = perCall(vol === "unsure" || !vol ? "150" : vol);
        r.title = `After-Hours ${pick[0]}`;
        r.summary = medical ? "Live after-hours answering with urgent calls dispatched to your on-call provider and routine messages logged for the morning." : "Live after-hours answering with messages delivered the way your team wants them.";
        r.price = pick[1];
        r.points.push(pick[2], "Alpha paging, texting, and calling included");
        if (vol === "unsure") r.points.push("We suggested the middle package; we'll right-size it after your first month");
      }
      if (when === "both") {
        r.title += " + Daytime Rollover";
        r.summary += " Add daytime rollover at $1.35 per minute for around-the-clock coverage.";
        r.points.push("Around-the-clock coverage: after hours per call, business hours per minute");
      }
      if (when === "unsure") r.points.push("Not sure about timing? We'll map your hours on the call and you can change any month");
      if (duration === "temporary") { r.title = "Temporary " + r.title; r.points.push("No contract: coverage starts and ends on the dates you give us"); }
      if (org === "hospital") r.points.push("Hospital accounts: we'll walk through department routing and escalation on the call");
      if (extras.includes("spanish")) r.points.push("Live Spanish / English dispatchers on staff, included");
      if (extras.includes("scheduling")) r.points.push("Appointment scheduling and reminders as per-minute add-ons");
      if (extras.includes("secure-text")) r.points.push("Secure HIPAA-compliant texting add-on");
      if (extras.includes("reporting")) r.points.push("Yearly account reporting at additional cost");
      return r;
    }

    function showResult() {
      const r = recommend();
      $("[data-result-title]", result).textContent = r.title;
      $("[data-result-summary]", result).textContent = r.summary;
      $("[data-result-price-label]", result).textContent = r.priceLabel;
      $("[data-result-price]", result).textContent = r.price;
      $("[data-result-price-note]", result).textContent = r.note;
      const ul = $("[data-result-points]", result);
      ul.innerHTML = "";
      r.points.forEach((p) => { const li = document.createElement("li"); li.textContent = p; ul.appendChild(li); });
      $("[data-callback-recommendation]", result).value = r.title;
      form.hidden = true; result.hidden = false;
      label.textContent = "Recommendation"; progress.style.width = "100%";
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const cb = $("[data-callback-form]", matcher);
    cb.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(cb);
      const ok = String(f.get("name")).trim() && String(f.get("phone")).replace(/\D/g, "").length >= 10;
      $("[data-callback-error]", matcher).hidden = Boolean(ok);
      if (!ok || String(f.get("website"))) return;
      cb.hidden = true; $("[data-callback-done]", matcher).hidden = false;
    });

    render();
  }
})();
