import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { PRICING_FAQ } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { PerCallCards, ProfessionalCards, SetupLine } from "@/components/PriceCards";
import { Schema, webPageNode, breadcrumbNode, faqNode, offerCatalogNode } from "@/components/Schema";

const TITLE = "Pricing | Per-Call Packages & Professional Plans";
const DESC = "Straightforward answering service pricing with no hidden fees and no contracts. After-hours packages from $165 per month, Medical Office plans from $90 per provider, daytime rollover at $1.35 per minute.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/pricing" });

export default function PricingPage() {
  return (
    <>
      <Schema nodes={[webPageNode("/pricing", TITLE, DESC), breadcrumbNode("/pricing", [{ name: "Pricing", path: "/pricing" }]), offerCatalogNode(), faqNode("/pricing", PRICING_FAQ)]} />
      <PageHero eyebrow="Pricing" image="/images/nci-banner-photo-2.webp" title={<>Best value call center in <span className="text-brand">New York &amp; the Tri-State</span></>} lede="No hidden fees. No long-term contracts. Almost always billed by the call, not the minute." />

      <section className="bg-canvas">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <h2 className="h-section">25 years of trustworthy call center services</h2>
            <p className="lede mt-5">Our pricing is straightforward, with no hidden fees or long-term contracts, because we stand by the value of our services. While most companies charge by the minute, we almost always charge by the call, which is more cost-effective for your business and significantly enhances the quality of service to your patients. This is how we have grown from a locally-trusted call center in New York to a call center serving clients throughout the country.</p>
          </div>
          <div className="lg:col-span-5"><ul className="rule-list"><li>No contracts</li><li>No hidden fees</li><li>24/7 support</li></ul></div>
        </div>
      </section>

      <section className="bg-surface" id="per-call">
        <div className="wrap py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center"><h2 className="h-section">NCI &ldquo;Per Call&rdquo; Packages</h2><SetupLine stacked /></div>
          <div className="mt-10"><PerCallCards withCta /></div>
        </div>
      </section>

      <section className="bg-canvas" id="professional">
        <div className="wrap py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center"><h2 className="h-section">NCI &ldquo;Professional&rdquo; Plans</h2><SetupLine stacked /></div>
          <div className="mt-10"><ProfessionalCards /></div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5"><p className="eyebrow">Common questions</p><h2 className="h-section mt-3">Straight answers about billing</h2><p className="lede mt-4">If your question isn&rsquo;t here, call us. A person will answer.</p></div>
            <div className="lg:col-span-7">
              {PRICING_FAQ.map((f, i) => (
                <details key={f.q} className={`group border-t border-border py-4 ${i === PRICING_FAQ.length - 1 ? "border-b" : ""}`} open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.1rem] font-bold text-slate"><span>{f.q}</span><span className="text-brand transition group-open:rotate-45">+</span></summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-ink">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="wrap py-16 text-center lg:py-20">
          <h2 className="h-section">Our commitment</h2>
          <p className="lede mx-auto mt-4 max-w-2xl">We believe in offering the best quality service at the most competitive prices. No hidden fees. No long-term contracts. Just reliable and efficient answering services.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"><Link href="/find-your-coverage" className="btn-brand">Which plan fits me?</Link><Link href="/contact" className="btn-outline">Contact us today</Link></div>
        </div>
      </section>
    </>
  );
}
