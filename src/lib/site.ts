/**
 * Site-wide single source of truth. Every contact detail, claim, and price in
 * rendered copy routes through this file. Never hard-code these in a component.
 *
 * Facts below were taken from the previous site (nciansweringservice.com, crawled
 * 2026-09-28). Anything NCI changes (rates, phone, address) changes here once.
 */
export const SITE = {
  name: "NCI Answering Service",
  legalName: "NCI Answering Service",
  domain: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nciansweringservice.com",
  tagline: "Safeguarding your reputation with 25 years of compassionate medical answering",
  description:
    "NCI Answering Service is a HIPAA-compliant answering service for hospitals, medical practices, and professional businesses. 25+ years, no contracts, answered by people 24/7.",
  phone: { display: "914-333-9348", href: "tel:+19143339348", e164: "+19143339348" },
  email: "info@nciansweringservice.net",
  address: { street: "1401 Route 52", city: "Fishkill", state: "NY", stateLong: "New York", zip: "12524", country: "US" },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=1401+Route+52+Fishkill+NY+12524",
  paymentPortalUrl: "https://thepaymentportal.com/index.php?compcode=8BC8-40DC-81A0-F98A",
  areaServed: ["New York", "New Jersey", "Connecticut", "United States"],
  timezone: "America/New_York",
  yearsInService: "25+",
  /** Footer credit. Set to null to hide. */
  credit: { label: "Website by DePinho Design", href: "https://depinhodesign.com" } as { label: string; href: string } | null,
} as const;

export const NAV = [
  { href: "/", label: "Home", key: "home" },
  { href: "/services", label: "Services", key: "services" },
  { href: "/who-we-serve", label: "Who We Serve", key: "who" },
  { href: "/pricing", label: "Pricing", key: "pricing" },
  { href: "/about", label: "About", key: "about" },
  { href: "/contact", label: "Contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV)[number]["key"] | "none";

/** Published pricing. Integer cents; render through money(). */
export const PRICING = {
  setupFeeCents: 5000,
  baseRateCents: 2500,
  perCall: [
    { slug: "per-call-100", name: "Per Call / 100", calls: 100, monthlyCents: 16500, overageCents: 180, featured: false },
    { slug: "per-call-150", name: "Per Call / 150", calls: 150, monthlyCents: 21000, overageCents: 155, featured: true },
    { slug: "per-call-250", name: "Per Call / 250", calls: 250, monthlyCents: 31250, overageCents: 140, featured: false },
  ],
  professional: [
    { slug: "medical-office", name: "Medical Office", sub: "for 5 providers or more", amountCents: 9000, unit: "Per provider / monthly", note: "After-hours service only (when office is closed)" },
    { slug: "daytime-rollover", name: "Day Time Rollover", sub: "during advertised hours", amountCents: 135, unit: "Per minute charge", note: "Per-minute pricing is only used during business hours, as call volumes are higher" },
  ],
  daytimePerMinuteCents: 135,
} as const;

export type PlanSlug = (typeof PRICING.perCall)[number]["slug"] | (typeof PRICING.professional)[number]["slug"];

export const PLAN_NAMES: Record<string, string> = Object.fromEntries(
  [...PRICING.perCall, ...PRICING.professional].map((p) => [p.slug, p.name]),
);

export function money(cents: number, opts: { cents?: boolean } = {}): string {
  const dollars = cents / 100;
  const showCents = opts.cents ?? cents % 100 !== 0;
  return "$" + dollars.toLocaleString("en-US", { minimumFractionDigits: showCents ? 2 : 0, maximumFractionDigits: 2 });
}

/** Split an amount into ["165", "00"] for the price-card display. */
export function moneyParts(cents: number): [string, string] {
  return [String(Math.floor(cents / 100)), String(cents % 100).padStart(2, "0")];
}

export const SERVICES = [
  { id: "after-hours", name: "After-Hours Medical Answering", short: "Administrative messages logged, urgent medical issues dispatched to the on-call provider the moment your office closes." },
  { id: "daytime", name: "Daytime Medical Office Support", short: "Rollover during advertised hours to absorb call surges, plus appointment scheduling and reminders, so your front desk stays with the patients in front of them." },
  { id: "business", name: "Business & Professional Services", short: "The same accuracy and courtesy for plumbing and heating companies, funeral homes, property managers, law offices, and other professionals." },
  { id: "temporary", name: "Temporary & On-Demand Coverage", short: "A few weeks of coverage for vacations, staffing gaps, or a system change. No contract to start, none to end." },
  { id: "translation", name: "Translation Services", short: "Live Spanish and English on staff, with additional languages available, after hours or during the day." },
] as const;

export const INCLUDED_SERVICES = [
  "Alpha paging, texting, and calling",
  "Daily log of messages received via fax or email",
  "Virtual office",
  "Two customized informational pre-ambles",
  "Unlimited voicemail options",
  "Archived storage of past messages",
  "Business continuity plan",
] as const;

export const ADD_ON_SERVICES = [
  { name: "Secure HIPAA-compliant texting", basis: "add-on" },
  { name: "Appointment scheduling", basis: "per-minute usage" },
  { name: "Appointment reminders", basis: "per-minute usage" },
  { name: "Rollover with real-time message receipt", basis: "per-minute usage" },
  { name: "Yearly account reporting", basis: "additional cost" },
] as const;

export const PRICING_FAQ = [
  { q: "Why bill per call instead of per minute?", a: "Per-minute billing punishes the calls that matter most: a frightened patient who needs a minute to explain. Billing per call lets our dispatchers listen, and it is more cost-effective for your practice." },
  { q: "What happens if I go over my allotted calls?", a: "Each package lists its overage rate: $1.80, $1.55, or $1.40 per additional call. If you are consistently over, we will suggest the next package so you pay less." },
  { q: "When is per-minute pricing used?", a: "Only for daytime rollover during your advertised business hours, at $1.35 per minute, because call volumes are higher. After-hours packages are billed per call." },
  { q: "Is there a contract?", a: "No. We don't lock clients into contracts because our services speak for themselves. The only one-time charge is the $50 account setup." },
  { q: "How do I pay my invoice?", a: "Use the Make a Payment button at the top of any page. Credit card and ACH options are available through our payment portal." },
] as const;
