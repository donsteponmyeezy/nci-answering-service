"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRICING, SITE, money } from "@/lib/site";
import { trackLead, trackToolEngaged, trackToolResult } from "@/lib/analytics";

/**
 * Find Your Coverage: six questions → one recommendation → a callback request.
 * Ported from design-reference/v1/scripts/site.js. Prices are the published
 * packages in src/lib/site.ts; nothing here is a quote. No chatbot.
 */
type Answers = { org?: string; when?: string; volume?: string; providers?: string; duration?: string; extras: string[] };
type Option = { value: string; label: string; sub?: string };
type Step = { key: keyof Omit<Answers, "extras"> | "extras"; legend: string; options: Option[]; multi?: boolean; applies: (a: Answers) => boolean };

const isMedical = (a: Answers) => a.org === "practice" || a.org === "hospital";

const STEPS: Step[] = [
  { key: "org", legend: "What kind of organization are you?", applies: () => true, options: [
    { value: "practice", label: "Medical practice or specialty group", sub: "Physicians, dental, behavioral health, home health, and similar" },
    { value: "hospital", label: "Hospital or health system", sub: "Departments, service lines, or the whole facility" },
    { value: "business", label: "Business or professional services", sub: "Plumbing and heating, funeral homes, property management, legal, and more" },
    { value: "other", label: "Something else", sub: "We'll sort it out on the call" },
  ] },
  { key: "when", legend: "When do you need calls answered?", applies: () => true, options: [
    { value: "after-hours", label: "After hours only", sub: "Evenings, weekends, and holidays when the office is closed" },
    { value: "daytime", label: "During business hours", sub: "Overflow when lines are busy, lunch, or staff absences" },
    { value: "both", label: "Around the clock", sub: "After hours plus daytime rollover" },
    { value: "unsure", label: "Not sure yet" },
  ] },
  { key: "volume", legend: "Roughly how many after-hours calls a month?", applies: (a) => a.when !== "daytime", options: [
    { value: "100", label: "Up to 100" }, { value: "150", label: "100 to 150" }, { value: "250", label: "150 to 250" },
    { value: "more", label: "More than 250", sub: "We'll price this by the account" }, { value: "unsure", label: "I don't know" },
  ] },
  { key: "providers", legend: "How many providers take call?", applies: (a) => (!a.org || isMedical(a)) && a.when !== "daytime", options: [
    { value: "few", label: "1 to 4 providers" },
    { value: "many", label: "5 or more providers", sub: "Our Medical Office plan is priced per provider" },
    { value: "na", label: "Not a medical account" },
  ] },
  { key: "duration", legend: "How long do you need coverage?", applies: () => true, options: [
    { value: "ongoing", label: "Ongoing", sub: "Month to month, no contract" },
    { value: "temporary", label: "Temporary", sub: "A few weeks or months: vacations, staffing gaps, a system change" },
  ] },
  { key: "extras", legend: "Anything else you need?", multi: true, applies: () => true, options: [
    { value: "spanish", label: "Spanish / bilingual dispatchers" },
    { value: "scheduling", label: "Appointment scheduling & reminders" },
    { value: "secure-text", label: "Secure HIPAA-compliant texting" },
    { value: "reporting", label: "Yearly account reporting" },
  ] },
];

type Rec = { key: string; title: string; summary: string; points: string[]; priceLabel: string; price: string; note: string };

export function recommend(a: Answers): Rec {
  const medical = isMedical(a);
  const perCall = (slug: string) => PRICING.perCall.find((p) => p.slug === slug)!;
  const r: Rec = { key: "", title: "", summary: "", points: [], priceLabel: "Starts at", price: "", note: `per month + ${money(PRICING.baseRateCents)} base` };
  const daytimeRate = money(PRICING.daytimePerMinuteCents, { cents: true });

  if (a.when === "daytime") {
    r.key = "daytime-rollover"; r.title = "Daytime Rollover";
    r.summary = medical ? "Overflow coverage during your advertised hours, billed only for the minutes we handle." : "Business-hours overflow so a person answers when your line is busy.";
    r.price = daytimeRate; r.note = `per minute during business hours + ${money(PRICING.baseRateCents)} base`;
    r.points.push("Surges, lunch hours, and staff absences covered without a new hire", "Appointment scheduling and reminders available as per-minute add-ons");
  } else if (medical && a.providers === "many" && (a.volume === "more" || a.volume === "250" || a.volume === "unsure")) {
    r.key = "medical-office"; r.title = "Medical Office Professional Plan";
    r.summary = "For practices with five or more providers on call: a flat rate per provider, after hours only.";
    r.price = money(PRICING.professional[0].amountCents); r.note = `per provider / month + ${money(PRICING.baseRateCents)} base`;
    r.points.push("Predictable monthly cost regardless of call count", "Same dispatchers who learn your on-call rotation");
  } else if (a.volume === "more") {
    r.key = "custom"; r.title = "Custom After-Hours Account";
    r.summary = "More than 250 calls a month is priced by the account. We'll build it with you on the call.";
    r.priceLabel = "Priced by account"; r.price = "Call us"; r.note = `published packages start at ${money(PRICING.perCall[0].monthlyCents)}`;
    r.points.push("Per-call billing, not per-minute", "Triage, dispatch, and daily message logs included");
  } else {
    const slug = a.volume === "unsure" || !a.volume ? "per-call-150" : `per-call-${a.volume}`;
    const p = perCall(slug);
    r.key = slug; r.title = `After-Hours ${p.name}`;
    r.summary = medical ? "Live after-hours answering with urgent calls dispatched to your on-call provider and routine messages logged for the morning." : "Live after-hours answering with messages delivered the way your team wants them.";
    r.price = money(p.monthlyCents);
    r.points.push(`${p.calls} after-hours calls, then ${money(p.overageCents, { cents: true })} per call`, "Alpha paging, texting, and calling included");
    if (a.volume === "unsure") r.points.push("We suggested the middle package; we'll right-size it after your first month");
  }
  if (a.when === "both") {
    r.key += "+daytime"; r.title += " + Daytime Rollover";
    r.summary += ` Add daytime rollover at ${daytimeRate} per minute for around-the-clock coverage.`;
    r.points.push("Around-the-clock coverage: after hours per call, business hours per minute");
  }
  if (a.when === "unsure") r.points.push("Not sure about timing? We'll map your hours on the call and you can change any month");
  if (a.duration === "temporary") { r.title = "Temporary " + r.title; r.points.push("No contract: coverage starts and ends on the dates you give us"); }
  if (a.org === "hospital") r.points.push("Hospital accounts: we'll walk through department routing and escalation on the call");
  if (a.extras.includes("spanish")) r.points.push("Live Spanish / English dispatchers on staff, included");
  if (a.extras.includes("scheduling")) r.points.push("Appointment scheduling and reminders as per-minute add-ons");
  if (a.extras.includes("secure-text")) r.points.push("Secure HIPAA-compliant texting add-on");
  if (a.extras.includes("reporting")) r.points.push("Yearly account reporting at additional cost");
  return r;
}

export function CoverageMatcher() {
  const [answers, setAnswers] = useState<Answers>({ extras: [] });
  const [idx, setIdx] = useState(0);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<Rec | null>(null);
  const engaged = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const seq = useMemo(() => STEPS.map((s, i) => i).filter((i) => STEPS[i].applies(answers)), [answers]);
  const pos = seq.indexOf(idx);
  const step = STEPS[idx];

  const answered = step.multi || Boolean(answers[step.key as keyof Answers]);

  function next() {
    if (!answered) { setError(true); return; }
    setError(false);
    if (pos < seq.length - 1) setIdx(seq[pos + 1]);
    else {
      const r = recommend(answers);
      setResult(r);
      trackToolResult("coverage-matcher", r.key);
      requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }
  function back() { if (pos > 0) setIdx(seq[pos - 1]); setError(false); }
  function restart() { setAnswers({ extras: [] }); setIdx(0); setResult(null); setError(false); topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  function choose(value: string) {
    if (!engaged.current) { engaged.current = true; trackToolEngaged("coverage-matcher"); }
    setError(false);
    if (step.multi) setAnswers((a) => ({ ...a, extras: a.extras.includes(value) ? a.extras.filter((v) => v !== value) : [...a.extras, value] }));
    else setAnswers((a) => ({ ...a, [step.key]: value }));
  }

  return (
    <div className="mx-auto max-w-3xl" ref={topRef}>
      <div className="mb-8 flex items-center justify-between text-[13px] font-semibold uppercase tracking-wide text-muted-ink">
        <span aria-live="polite">{result ? "Recommendation" : `Question ${pos + 1} of ${seq.length}`}</span>
        <span>Takes about a minute</span>
      </div>
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-surface" aria-hidden="true">
        <div className="h-full bg-brand transition-all" style={{ width: `${result ? 100 : Math.round(((pos + 1) / seq.length) * 100)}%` }} />
      </div>

      {!result ? (
        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          <fieldset className="space-y-3" key={step.key}>
            <legend className="h-card mb-4 text-slate">{step.legend}{step.multi ? <span className="text-[14px] font-normal text-muted-ink"> (choose any)</span> : null}</legend>
            {step.options.map((o) => {
              const checked = step.multi ? answers.extras.includes(o.value) : answers[step.key as keyof Answers] === o.value;
              return (
                <label key={o.value} className="choice">
                  <input className="mt-1 accent-brand" type={step.multi ? "checkbox" : "radio"} name={step.key} value={o.value} checked={Boolean(checked)} onChange={() => choose(o.value)} />
                  <span><strong className="block text-slate">{o.label}</strong>{o.sub ? <span className="text-[14px] text-muted-ink">{o.sub}</span> : null}</span>
                </label>
              );
            })}
          </fieldset>
          <div className="mt-8 flex items-center justify-between gap-4">
            <button type="button" className="btn-ghost" onClick={back} hidden={pos === 0}>Back</button>
            {error ? <p className="text-[13px] text-error" role="alert">Choose an option to continue.</p> : null}
            <button type="submit" className="btn-brand ml-auto">{pos === seq.length - 1 ? "See my recommendation" : "Next"}</button>
          </div>
        </form>
      ) : (
        <div>
          <div className="card overflow-hidden">
            <div className="bg-brand px-7 py-6 text-white">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80">Our recommendation</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-bold leading-tight text-white">{result.title}</h2>
              <p className="mt-2 text-white/85">{result.summary}</p>
            </div>
            <div className="grid gap-6 px-7 py-7 md:grid-cols-[1fr_auto]">
              <ul className="check-list space-y-2.5 text-[15px] text-slate">{result.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="rounded-lg bg-surface p-5 text-center md:min-w-[200px]">
                <p className="text-[13px] font-semibold uppercase tracking-wide text-muted-ink">{result.priceLabel}</p>
                <p className="mt-1 font-slab text-[2.25rem] font-medium leading-none text-brand">{result.price}</p>
                <p className="mt-1 text-[13px] text-muted-ink">{result.note}</p>
              </div>
            </div>
            <div className="border-t border-border px-7 py-4 text-[13px] text-muted-ink">
              A recommendation, not a quote. Every account is built by a person, and pricing follows the published packages on our <Link className="font-semibold text-brand" href="/pricing">pricing page</Link>. One-time {money(PRICING.setupFeeCents)} account setup applies to all plans.
            </div>
          </div>
          <CallbackForm recommendation={result.title} answers={answers} />
          <div className="mt-6 text-center"><button type="button" className="btn-ghost" onClick={restart}>Start over</button></div>
        </div>
      )}
    </div>
  );
}

function CallbackForm({ recommendation, answers }: { recommendation: string; answers: Answers }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "failed">("idle");
  const [msg, setMsg] = useState("");
  const started = useRef(0);
  useEffect(() => { started.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 10) { setStatus("error"); setMsg("Please add your name and a phone number we can reach."); return; }
    setStatus("sending");
    const payload = {
      formType: "callback", name, phone,
      company: String(f.get("company") || ""), bestTime: String(f.get("bestTime") || ""), notes: String(f.get("notes") || ""),
      recommendation, answers, website: String(f.get("website") || ""), elapsedMs: Date.now() - started.current, page: window.location.pathname,
    };
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (res.ok && data.ok) { trackLead({ form_location: "coverage-matcher", lead_type: "callback_request", service_interest: recommendation }); setStatus("done"); return; }
      setStatus("failed"); setMsg(`We couldn't send that just now. Please call ${SITE.phone.display} and we'll take care of you.`);
    } catch {
      setStatus("failed"); setMsg(`We couldn't send that just now. Please call ${SITE.phone.display} and we'll take care of you.`);
    }
  }

  return (
    <div className="card mt-8 p-7">
      <h2 className="h-card text-slate">Talk to a human about it</h2>
      <p className="mt-2 text-[15px] text-muted-ink">Leave your number and a member of our core team will call you back. We&rsquo;ll bring your answers with us.</p>
      {status === "done" ? (
        <div className="mt-6 rounded-lg bg-brand-subtle p-5 text-[15px] text-slate" role="status">
          <strong className="block text-brand">Got it. We&rsquo;ll call you back.</strong>
          A member of our core team will reach out at the number you gave. If it&rsquo;s urgent, call <a className="font-semibold text-brand" href={SITE.phone.href} data-cta="phone">{SITE.phone.display}</a> now.
        </div>
      ) : (
        <form className="mt-6 grid gap-4 sm:grid-cols-2" noValidate onSubmit={onSubmit}>
          <label className="block"><span className="label">Your name</span><input className="field" name="name" autoComplete="name" required /></label>
          <label className="block"><span className="label">Phone</span><input className="field" name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
          <label className="block"><span className="label">Practice or company</span><input className="field" name="company" autoComplete="organization" /></label>
          <label className="block"><span className="label">Best time to call</span>
            <select className="field" name="bestTime" defaultValue="any">
              <option value="morning">Morning</option><option value="midday">Midday</option><option value="afternoon">Afternoon</option><option value="any">Any time</option>
            </select>
          </label>
          <label className="block sm:col-span-2"><span className="label">Anything we should know? <span className="font-normal normal-case text-muted-ink">(optional)</span></span><textarea className="field min-h-[96px]" name="notes" /></label>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <button type="submit" className="btn-brand" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request my callback"}</button>
            <a href={SITE.phone.href} data-cta="phone" className="btn-ghost">Or call {SITE.phone.display} now</a>
          </div>
          {status === "error" || status === "failed" ? <p className="text-[13px] text-error sm:col-span-2" role="alert">{msg}</p> : null}
        </form>
      )}
    </div>
  );
}
