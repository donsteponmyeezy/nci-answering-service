import { SITE, PRICING, money } from "@/lib/site";

export const dynamic = "force-static";

/** LLM crawler manifest: the answer-worthy facts in one plain-text file. */
export function GET() {
  const body = `# ${SITE.name}

> HIPAA-compliant telephone answering service based in ${SITE.address.city}, ${SITE.address.stateLong}, serving hospitals, medical practices, and professional businesses across New York, the Tri-State area, and the United States for ${SITE.yearsInService} years. Every call is answered by a person; there is no bot.

## Key facts
- Phone: ${SITE.phone.display}
- Address: ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}
- Dispatchers average 8 to 15 years with NCI
- No contracts, no hidden fees; billed per call after hours, per minute during business hours
- Live Spanish/English translation on staff; additional languages available

## Services
- After-Hours Medical Answering: ${SITE.domain}/services#after-hours
- Daytime Medical Office Support (rollover, scheduling, reminders): ${SITE.domain}/services#daytime
- Business & Professional Services: ${SITE.domain}/services#business
- Temporary & On-Demand Coverage: ${SITE.domain}/services#temporary
- Translation Services: ${SITE.domain}/services#translation

## Pricing (${SITE.domain}/pricing)
- Setup fee: ${money(PRICING.setupFeeCents)} one time; base rate ${money(PRICING.baseRateCents)} per month on every plan
${PRICING.perCall.map((p) => `- ${p.name}: ${money(p.monthlyCents, { cents: true })} per month for ${p.calls} after-hours calls; ${money(p.overageCents, { cents: true })} per additional call`).join("\n")}
- Medical Office (5+ providers): ${money(PRICING.professional[0].amountCents)} per provider per month, after hours only
- Day Time Rollover: ${money(PRICING.daytimePerMinuteCents, { cents: true })} per minute during advertised hours

## Pages
- Home: ${SITE.domain}/
- Who We Serve: ${SITE.domain}/who-we-serve
- About: ${SITE.domain}/about
- Find Your Coverage (recommendation tool): ${SITE.domain}/find-your-coverage
- Contact: ${SITE.domain}/contact
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
