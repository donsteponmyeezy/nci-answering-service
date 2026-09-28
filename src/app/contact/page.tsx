import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Schema, webPageNode, breadcrumbNode } from "@/components/Schema";

const TITLE = "Contact NCI Answering Service | Call 914-333-9348";
const DESC = "Reach NCI Answering Service in Fishkill, New York. Call 914-333-9348, email info@nciansweringservice.net, or send a message and a member of our core team will get back to you.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <Schema nodes={[{ ...webPageNode("/contact", TITLE, DESC), "@type": "ContactPage" }, breadcrumbNode("/contact", [{ name: "Contact", path: "/contact" }])]} />
      <PageHero eyebrow="Contact us" image="/images/nci-contact-us-banner-1.webp" tall={false} title={<>Affordable, professional answering <span className="text-brand">tailored to you</span></>} lede="Call, email, or send a message. A person from our core team will respond, not an autoresponder." />

      <section className="bg-canvas">
        <div className="wrap grid gap-10 py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              <h2 className="h-card text-slate">Send us a message</h2>
              <p className="mt-1 text-[15px] text-muted-ink">Most questions get a same-day reply during business hours.</p>
              <Suspense fallback={null}><ContactForm /></Suspense>
            </div>
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="card p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-ink">Sales &amp; support</h2>
              <a href={SITE.phone.href} data-cta="phone" className="mt-2 block font-display text-[1.75rem] font-bold text-brand">{SITE.phone.display}</a>
              <p className="mt-1 text-[15px] text-muted-ink">Our core team can be reached 24/7 by phone or text for schedule changes and urgent client matters.</p>
            </div>
            <div className="card p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-ink">General information</h2>
              <a href={`mailto:${SITE.email}`} className="mt-2 block break-all text-[1.1rem] font-semibold text-brand">{SITE.email}</a>
            </div>
            <div className="card p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-ink">Headquarters</h2>
              <address className="mt-2 not-italic text-[15px] leading-relaxed text-slate">{SITE.name}<br />{SITE.address.street}<br />{SITE.address.city}, {SITE.address.stateLong} {SITE.address.zip}</address>
              <a href={SITE.mapsUrl} rel="noopener" target="_blank" className="btn-ghost mt-3 -ml-3">Open in Maps</a>
            </div>
            <div className="rounded-xl bg-slate p-6 text-white">
              <h2 className="font-display text-[1.2rem] font-bold text-white">Existing client?</h2>
              <p className="mt-2 text-[15px] text-white/80">Invoices can be paid by credit card or ACH through our secure payment portal.</p>
              <a href={SITE.paymentPortalUrl} rel="noopener" target="_blank" className="btn-alert mt-4 uppercase">Make a Payment</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
