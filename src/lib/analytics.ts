/**
 * The app's only analytics surface. Push semantic events to the dataLayer; GTM
 * maps them to GA4. The app never calls gtag() and never knows a Measurement ID.
 * NO PII in the dataLayer: a lead's details travel through /api/lead only.
 *
 * Closed event set:
 *   generate_lead      form success, confirmed { ok: true } only  { form_location, lead_type, service_interest? }
 *   tool_engaged       first answer in the coverage matcher / first calculator input  { tool }
 *   tool_result_ready  the matcher produced a recommendation  { tool, recommendation_key }
 *   phone_click        GTM-side click trigger on [data-cta="phone"] tel: links, no app code
 */
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type FormLocation = "contact" | "coverage-matcher";
export type LeadType = "contact_form" | "callback_request";
export type Tool = "coverage-matcher" | "rollover-calculator";

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}

export const trackLead = (p: { form_location: FormLocation; lead_type: LeadType; service_interest?: string }) =>
  trackEvent("generate_lead", p);

export const trackToolEngaged = (tool: Tool) => trackEvent("tool_engaged", { tool });

export const trackToolResult = (tool: Tool, recommendation_key: string) => trackEvent("tool_result_ready", { tool, recommendation_key });
