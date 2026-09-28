"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PLAN_NAMES, SITE } from "@/lib/site";
import { trackLead } from "@/lib/analytics";

const INTERESTS = [
  { value: "hospitals", label: "Hospitals" },
  { value: "practices", label: "Medical practices" },
  { value: "professionals", label: "Business & professional services" },
  { value: "temporary", label: "Temporary coverage" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get("plan") || "";
  const planName = plan ? PLAN_NAMES[plan] : "";
  const initialInterest = INTERESTS.some((i) => i.value === params.get("interest")) ? (params.get("interest") as string) : "practices";
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "failed">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const started = useRef<number>(0);
  useEffect(() => { started.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    const message = String(f.get("message") || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 10 || !message) {
      setStatus("error"); setErrorMsg("Please add your name, a phone number, and a short message.");
      return;
    }
    setStatus("sending");
    const payload = {
      formType: "contact",
      name, phone, message,
      company: String(f.get("company") || ""),
      email: String(f.get("email") || ""),
      interest: String(f.get("interest") || ""),
      plan,
      website: String(f.get("website") || ""),
      elapsedMs: Date.now() - started.current,
      page: window.location.pathname + window.location.search,
    };
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string };
      if (res.ok && data.ok) {
        trackLead({ form_location: "contact", lead_type: "contact_form", service_interest: payload.interest });
        router.push("/thank-you");
        return;
      }
      setStatus("failed");
      setErrorMsg(data.reason === "validation" ? "Please check your name, phone number, and message." : `We couldn't send that just now. Please call ${SITE.phone.display} and we'll take care of you.`);
    } catch {
      setStatus("failed");
      setErrorMsg(`We couldn't send that just now. Please call ${SITE.phone.display} and we'll take care of you.`);
    }
  }

  return (
    <form className="mt-6 grid gap-4 sm:grid-cols-2" noValidate onSubmit={onSubmit}>
      <label className="block"><span className="label">Name</span><input className="field" name="name" autoComplete="name" required /></label>
      <label className="block"><span className="label">Company</span><input className="field" name="company" autoComplete="organization" /></label>
      <label className="block"><span className="label">Phone</span><input className="field" name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
      <label className="block"><span className="label">Email</span><input className="field" name="email" type="email" autoComplete="email" /></label>
      <label className="block sm:col-span-2"><span className="label">I&rsquo;m interested in</span>
        <select className="field" name="interest" defaultValue={initialInterest}>
          {INTERESTS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
        </select>
      </label>
      <label className="block sm:col-span-2"><span className="label">Message</span>
        <textarea className="field min-h-[140px]" name="message" required placeholder="Tell us about your office, your hours, and roughly how many calls you get." />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {planName ? <p className="text-[13px] text-muted-ink sm:col-span-2">You&rsquo;re asking about the <strong className="text-slate">{planName}</strong> plan. We&rsquo;ll bring that with us.</p> : null}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-brand" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
        <p className="text-[13px] text-muted-ink">Please don&rsquo;t include patient information in this form.</p>
      </div>
      {status === "error" || status === "failed" ? <p className="text-[13px] text-error sm:col-span-2" role="alert">{errorMsg}</p> : null}
    </form>
  );
}
