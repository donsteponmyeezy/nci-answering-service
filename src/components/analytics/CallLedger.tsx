"use client";

import { useEffect } from "react";

/**
 * Call-Click Attribution — client half. When a visitor taps any tel: link marked
 * data-cta="phone", fire a keepalive beacon to /api/call-click with what the
 * browser knows (page, referrer, first-touch source, UTM/gclid). The server stamps
 * IP/geo/time and writes the ledger. No PII is captured here; the caller's number
 * is matched later against NCI's phone log by timestamp.
 */
const KEY = "nci_first_touch";

function firstTouch(): Record<string, string> {
  try {
    const stored = sessionStorage.getItem(KEY);
    if (stored) return JSON.parse(stored);
    const u = new URL(window.location.href);
    const utm: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
      const v = u.searchParams.get(k);
      if (v) utm[k] = v;
    });
    const ft = { referrer: document.referrer || "", landing: u.pathname, ...utm };
    sessionStorage.setItem(KEY, JSON.stringify(ft));
    return ft;
  } catch {
    return {};
  }
}

export function CallLedger() {
  useEffect(() => {
    let last = 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"][data-cta="phone"]') as HTMLAnchorElement | null;
      if (!a) return;
      const now = Date.now();
      if (now - last < 2000) return; // throttle double-taps
      last = now;
      const body = JSON.stringify({
        page: window.location.pathname,
        label: a.textContent?.trim().slice(0, 60) || "",
        ...firstTouch(),
        sessionReferrer: document.referrer || "",
        ua: navigator.userAgent,
        ts: new Date().toISOString(),
      });
      try {
        if (navigator.sendBeacon) navigator.sendBeacon("/api/call-click", new Blob([body], { type: "application/json" }));
        else fetch("/api/call-click", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
      } catch {
        /* never interfere with the tap-to-call */
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
