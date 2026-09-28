import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Call-Click Attribution — server half. Receives the beacon fired when a visitor
 * taps a tel: link, stamps what only the server can see (IP, Vercel geo headers,
 * user agent, authoritative timestamp), and writes a ledger entry two ways:
 *   1. Resend email to CALL_LEDGER_TO (falls back to LEAD_TO_EMAIL) — a readable
 *      card plus a machine-readable LEDGER-JSON line in the text part;
 *   2. console.log JSON → runtime logs — backup trace, works keyless.
 * The entry is matched against NCI's phone log by timestamp to attach the
 * caller's real number. Always responds 204: a tracking endpoint must never
 * feed an error back into a visitor's tap-to-call.
 */
const MAX_BODY = 4096;
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_PER_WINDOW = 10;

function throttled(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 500) hits.forEach((v, k) => now - v.ts > WINDOW_MS && hits.delete(k));
  const h = hits.get(ip);
  if (!h || now - h.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  h.count += 1;
  return h.count > MAX_PER_WINDOW;
}

const header = (req: NextRequest, n: string) => req.headers.get(n) || "";

function deviceSummary(ua: string): string {
  const os = /iPhone|iPad/.test(ua) ? "iPhone/iPad" : /Android/.test(ua) ? "Android" : /Macintosh/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows PC" : "other";
  return `${os} (${/Mobi|iPhone|Android/.test(ua) ? "mobile" : "desktop"})`;
}

function sourceSummary(b: Record<string, string>): string {
  if (b.utm_source) return `Campaign — ${[b.utm_source, b.utm_medium, b.utm_campaign].filter(Boolean).join(" / ")}`;
  if (b.gclid) return "Google Ads (gclid present)";
  const ref = b.referrer || b.sessionReferrer;
  if (!ref) return "Direct (typed-in, bookmark, or app)";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (host.includes("google")) return "Google — organic search or Business Profile";
    if (host.includes("bing")) return "Bing — organic search";
    if (host.includes("facebook") || host.includes("instagram")) return `Social — ${host}`;
    return `Referral — ${host}`;
  } catch {
    return "Referral";
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = header(req, "x-forwarded-for").split(",")[0].trim() || header(req, "x-real-ip") || "unknown";
    if (throttled(ip)) return new NextResponse(null, { status: 204 });

    const raw = (await req.text()).slice(0, MAX_BODY);
    let b: Record<string, string> = {};
    try {
      const parsed = JSON.parse(raw);
      Object.entries(parsed).forEach(([k, v]) => { if (typeof v === "string") b[k] = v.slice(0, 500); });
    } catch {
      b = {};
    }

    const now = new Date();
    const record = {
      site: SITE.name,
      ts: now.toISOString(),
      local: new Intl.DateTimeFormat("en-US", { timeZone: SITE.timezone, dateStyle: "medium", timeStyle: "medium" }).format(now),
      ip,
      city: header(req, "x-vercel-ip-city"),
      region: header(req, "x-vercel-ip-country-region"),
      country: header(req, "x-vercel-ip-country"),
      device: deviceSummary(b.ua || header(req, "user-agent")),
      page: b.page || "",
      label: b.label || "",
      landing: b.landing || "",
      source: sourceSummary(b),
      referrer: b.referrer || b.sessionReferrer || "",
      utm: { source: b.utm_source || "", medium: b.utm_medium || "", campaign: b.utm_campaign || "" },
      gclid: b.gclid || "",
    };
    console.log("LEDGER-JSON " + JSON.stringify(record));

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CALL_LEDGER_TO || process.env.LEAD_TO_EMAIL;
    const from = process.env.LEAD_FROM_EMAIL ?? `${SITE.name} <leads@nciansweringservice.com>`;
    if (apiKey && to) {
      const rows = [
        ["When", record.local], ["Page", record.page], ["Button", record.label], ["Source", record.source],
        ["Location", [record.city, record.region, record.country].filter(Boolean).join(", ") || "unknown"], ["Device", record.device], ["IP", record.ip],
      ];
      const html = `<div style="font-family:Roboto,Arial,sans-serif;max-width:560px"><h2 style="color:#038855;margin:0 0 10px">Website call click</h2><table style="border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="padding:5px 10px;border:1px solid #E1E7E4;font-weight:600">${k}</td><td style="padding:5px 10px;border:1px solid #E1E7E4">${String(v).replace(/</g, "&lt;")}</td></tr>`)
        .join("")}</table><p style="color:#5C6660;font-size:12px">Match this timestamp against the phone log to attach the caller's number.</p></div>`;
      const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\nLEDGER-JSON " + JSON.stringify(record);
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject: `Call click — ${record.local} — ${record.source}`, html, text }),
      }).catch(() => {});
    }
  } catch {
    /* swallow: never surface to the visitor */
  }
  return new NextResponse(null, { status: 204 });
}
