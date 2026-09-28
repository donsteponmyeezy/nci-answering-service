import { NextResponse } from "next/server";
import { SITE, PLAN_NAMES } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lead intake for NCI Answering Service. Serves the contact form (formType
 * "contact") and the Find Your Coverage callback request (formType "callback").
 *
 * Flow: shape-check → spam checks (honeypot, timing, optional Cloudflare
 * Turnstile) → Resend delivery → JSON result.
 *
 * DELIVERY IS NOT OPTIONAL. If RESEND_API_KEY or LEAD_TO_EMAIL is missing the
 * route fails loudly with 503 { ok:false, reason:"delivery-unconfigured" } and
 * logs server-side, so an env drift can never read as a healthy conversion.
 * Spam rejections return { ok:true } on purpose so a bot cannot tell acceptance
 * from rejection. Patient information must never be sent through this form;
 * the UI says so and nothing here is stored beyond the email.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, company: 160, email: 200, phone: 40, message: 4000, notes: 2000 };

type SendResult = { ok: boolean; status: number; detail: string };

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<SendResult> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true, status: res.status, detail: "" };
    return { ok: false, status: res.status, detail: await res.text() };
  } catch (e) {
    return { ok: false, status: 0, detail: e instanceof Error ? e.message : "network-error" };
  }
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: honeypot + timing still apply
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const str = (k: string, max = 500) => (typeof data[k] === "string" ? (data[k] as string).trim().slice(0, max) : "");
  const formType = str("formType") === "callback" ? "callback" : "contact";
  const name = str("name", MAX.name);
  const company = str("company", MAX.company);
  const phone = str("phone", MAX.phone);
  const email = str("email", MAX.email);
  const interest = str("interest", 60);
  const plan = str("plan", 60);
  const message = str("message", MAX.message);
  const notes = str("notes", MAX.notes);
  const bestTime = str("bestTime", 40);
  const recommendation = str("recommendation", 160);
  const answers = typeof data.answers === "object" && data.answers !== null ? (data.answers as Record<string, unknown>) : null;
  const page = str("page", 200);
  const honeypot = str("website", 200);
  const elapsedMs = typeof data.elapsedMs === "number" ? data.elapsedMs : 0;
  const turnstileToken = str("turnstileToken", 2048);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

  // Spam: filled honeypot or implausibly fast submission → pretend success.
  if (honeypot !== "" || (elapsedMs > 0 && elapsedMs < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const phoneDigits = phone.replace(/\D/g, "").length;
  const valid = Boolean(name) && phoneDigits >= 10 && (formType === "callback" || Boolean(message));
  if (!valid) return NextResponse.json({ ok: false, reason: "validation" }, { status: 422 });
  if (email && !EMAIL_RE.test(email)) return NextResponse.json({ ok: false, reason: "validation" }, { status: 422 });

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ ok: false, reason: "challenge" }, { status: 403 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? `${SITE.name} <leads@nciansweringservice.com>`;
  if (!apiKey || !to) {
    console.error("[lead] DELIVERY UNCONFIGURED — lead NOT delivered. Set RESEND_API_KEY and LEAD_TO_EMAIL.", { formType, hasKey: Boolean(apiKey), hasTo: Boolean(to) });
    return NextResponse.json({ ok: false, reason: "delivery-unconfigured" }, { status: 503 });
  }

  const when = new Intl.DateTimeFormat("en-US", { timeZone: SITE.timezone, dateStyle: "medium", timeStyle: "short" }).format(new Date());
  const planName = plan ? PLAN_NAMES[plan] ?? plan : "";
  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Company", company || "—"],
    ...(formType === "contact" ? ([["Interest", interest || "—"], ["Plan asked about", planName || "—"], ["Message", message]] as [string, string][]) : []),
    ...(formType === "callback"
      ? ([["Best time to call", bestTime || "any"], ["Recommendation shown", recommendation || "—"], ["Notes", notes || "—"], ["Answers", answers ? JSON.stringify(answers) : "—"]] as [string, string][])
      : []),
    ["Page", page || "—"],
    ["Received", when],
  ];
  const subject = formType === "callback" ? `Callback request: ${name}${company ? ` (${company})` : ""}` : `Website inquiry: ${name}${company ? ` (${company})` : ""}`;
  const html = `<div style="font-family:Roboto,Arial,sans-serif;max-width:600px"><h2 style="color:#038855;margin:0 0 12px">${esc(subject)}</h2><table style="border-collapse:collapse;width:100%">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 10px;border:1px solid #E1E7E4;font-weight:600;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 10px;border:1px solid #E1E7E4;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table><p style="color:#5C6660;font-size:12px;margin-top:14px">Sent by the ${esc(SITE.name)} website. Reply to this email to answer the visitor directly.</p></div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const sent = await sendEmail(apiKey, { from, to, subject, html, text, ...(email ? { reply_to: email } : {}) });
  if (!sent.ok) {
    console.error("[lead] Resend delivery failed", { status: sent.status, detail: sent.detail.slice(0, 300) });
    return NextResponse.json({ ok: false, reason: "delivery-failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
