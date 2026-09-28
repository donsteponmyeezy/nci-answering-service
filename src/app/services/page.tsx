import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { ADD_ON_SERVICES, INCLUDED_SERVICES, PRICING, SERVICES, money } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { RolloverCalculator } from "@/components/RolloverCalculator";
import { Schema, webPageNode, breadcrumbNode, serviceNode } from "@/components/Schema";

const TITLE = "Answering Services for Medical Practices & Professionals";
const DESC = "After-hours medical answering, daytime office support, business and professional answering, temporary coverage, and live translation. HIPAA-compliant, no contracts, answered by people.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/services" });

const JUMP = [["#after-hours", "After-Hours"], ["#daytime", "Daytime Support"], ["#business", "Business & Professional"], ["#temporary", "Temporary Coverage"], ["#translation", "Translation"], ["#included", "What's Included"]];

export default function ServicesPage() {
  return (
    <>
      <Schema nodes={[webPageNode("/services", TITLE, DESC), breadcrumbNode("/services", [{ name: "Services", path: "/services" }]), ...SERVICES.map((s) => serviceNode(s.id, s.name, s.short))]} />
      <PageHero eyebrow="Services" image="/images/nci-banner-man.webp" title={<>New York&rsquo;s most trusted <span className="text-brand">medical call center</span></>} lede="HIPAA-compliant answering services tailored to medical practices, healthcare facilities, and professionals." />

      <div className="sticky top-[76px] z-30 border-b border-border bg-canvas/95 backdrop-blur">
        <nav aria-label="On this page" className="wrap flex gap-1 overflow-x-auto py-2 text-[14px] font-semibold text-slate">
          {JUMP.map(([href, label]) => <a key={href} className="whitespace-nowrap rounded-md px-3 py-2 hover:bg-surface hover:text-brand" href={href}>{label}</a>)}
        </nav>
      </div>

      <section className="bg-canvas">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <h2 className="h-section">Highest value answering service in New York &amp; the Tri-State</h2>
            <p className="lede mt-5">We offer a wide range of HIPAA-compliant answering services tailored to meet the unique needs of medical practices, healthcare facilities, and professionals. With a focus on compassion, reliability, and efficiency, our services provide seamless communication and exceptional patient care, so your reputation, your patient satisfaction, and your bottom line are safeguarded at all times.</p>
          </div>
          <div className="lg:col-span-5">
            <div className="card p-6">
              <h3 className="h-card text-slate">Every plan comes with</h3>
              <ul className="check-list mt-4 space-y-2.5 text-[15px]"><li>24/7 support team you can call or text</li><li>HIPAA-compliant message handling</li><li>Seasoned dispatchers averaging 8–15 years with NCI</li><li>No contracts and no hidden fees</li></ul>
            </div>
          </div>
        </div>
      </section>

      <section id="after-hours" className="scroll-mt-header border-t border-border bg-canvas">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">01 · After hours</p>
            <h2 className="h-section mt-3">After-Hours Medical Answering</h2>
            <p className="lede mt-5">Our experienced call handlers quickly differentiate between administrative messages and urgent medical issues that must be forwarded to the on-call provider after hours.</p>
            <Link href="/pricing" className="btn-outline mt-7">Per-call packages from {money(PRICING.perCall[0].monthlyCents)}/mo</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-xl bg-surface p-6"><h3 className="h-card text-slate">Triage by people who know your account</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Routine requests are logged for the morning. Urgent matters reach the on-call provider through the channel they chose.</p></div>
            <div className="rounded-xl bg-surface p-6"><h3 className="h-card text-slate">Dispatch your way</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Alpha paging, texting, and calling are included. Secure HIPAA-compliant texting is available as an add-on.</p></div>
            <div className="rounded-xl bg-surface p-6"><h3 className="h-card text-slate">Daily message log</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">A daily log of every message, delivered by fax or email, with archived storage of past messages.</p></div>
            <div className="rounded-xl bg-surface p-6"><h3 className="h-card text-slate">Schedule changes any time</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Last-minute on-call changes go straight to our core team, day or night.</p></div>
          </div>
        </div>
      </section>

      <section id="daytime" className="scroll-mt-header bg-surface">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">02 · During business hours</p>
              <h2 className="h-section mt-3">Daytime Medical Office Support</h2>
              <p className="lede mt-5">Call services during advertised business hours, whether to alleviate call volume surges, assist during busy office hours, or help with live translation for bilingual patients. Our operators also handle inquiries, schedule appointments, and send reminders.</p>
              <p className="mt-4 text-[15px] text-muted-ink">Daytime rollover is billed per minute at <strong className="text-slate">{money(PRICING.daytimePerMinuteCents, { cents: true })}</strong>, because call volumes are higher during business hours. Appointment scheduling and reminders are add-ons billed on per-minute usage.</p>
            </div>
            <div className="lg:col-span-7">
              <div className="card overflow-hidden">
                <div className="grid sm:grid-cols-2">
                  <div className="p-6 sm:border-r sm:border-border">
                    <h3 className="font-display text-[1.1rem] font-bold text-slate">An in-house front-desk hire covers</h3>
                    <ul className="mt-4 space-y-2 text-[15px] text-muted-ink"><li>Salary, payroll taxes, and benefits</li><li>Sick days, vacations, and turnover</li><li>Training on your phone system and protocols</li><li>Only the hours that one person is at the desk</li></ul>
                  </div>
                  <div className="bg-brand-subtle p-6">
                    <h3 className="font-display text-[1.1rem] font-bold text-brand">Daytime rollover with NCI covers</h3>
                    <ul className="check-list mt-4 space-y-2 text-[15px] text-slate"><li>Only the minutes we actually handle</li><li>Surges, lunch hours, and staff absences</li><li>Bilingual dispatchers already trained</li><li>No contract, cancel any month</li></ul>
                  </div>
                </div>
                <RolloverCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="business" className="scroll-mt-header bg-canvas">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <figure><Image src="/images/nci-photo-banner-3.webp" alt="An NCI dispatcher takes a call while a colleague works at the next station" width={810} height={391} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[16/10] w-full rounded-xl2 object-cover object-left shadow-card" /></figure>
          <div>
            <p className="eyebrow">03 · Beyond medical</p>
            <h2 className="h-section mt-3">Business &amp; Professional Services</h2>
            <p className="lede mt-5">While our focus for 25+ years has been HIPAA-compliant answering for the medical field, we offer the same benefits and support to non-medical businesses. Your call center is a reflection of you, and we protect that reputation with reliability and professionalism.</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] font-semibold text-slate"><li>Plumbing &amp; heating</li><li>Funeral homes</li><li>Property management</li><li>Law offices</li><li>Home services</li><li>Professional firms</li></ul>
            <Link href="/who-we-serve" className="btn-outline mt-8">Who we serve</Link>
          </div>
        </div>
      </section>

      <section id="temporary" className="scroll-mt-header bg-surface">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">04 · Short term</p>
            <h2 className="h-section mt-3">Temporary &amp; On-Demand Coverage</h2>
            <p className="lede mt-5">Need a few weeks covered? Vacations, a staffing gap, a phone-system change, or a seasonal surge. Because we never require a contract, temporary coverage starts and ends when you say.</p>
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-4 sm:grid-cols-3">
              <li className="card p-5"><span className="font-slab text-[1.75rem] text-brand">1</span><h3 className="mt-2 font-display text-[1.05rem] font-bold text-slate">Tell us the dates</h3><p className="mt-1 text-[14px] text-muted-ink">Call or request a callback with your start and end dates.</p></li>
              <li className="card p-5"><span className="font-slab text-[1.75rem] text-brand">2</span><h3 className="mt-2 font-display text-[1.05rem] font-bold text-slate">We build your account</h3><p className="mt-1 text-[14px] text-muted-ink">A {money(PRICING.setupFeeCents)} setup fee, your call handling instructions, and your on-call list.</p></li>
              <li className="card p-5"><span className="font-slab text-[1.75rem] text-brand">3</span><h3 className="mt-2 font-display text-[1.05rem] font-bold text-slate">Forward your line</h3><p className="mt-1 text-[14px] text-muted-ink">Coverage runs on the per-call or per-minute plan that fits. Stop whenever you&rsquo;re ready.</p></li>
            </ol>
          </div>
        </div>
      </section>

      <section id="translation" className="scroll-mt-header bg-canvas">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">05 · Bilingual</p>
            <h2 className="h-section mt-3">Translation Services</h2>
            <p className="lede mt-5">We have bilingual members on staff who provide live Spanish and English translation, and we offer several additional language translation services. Use them after hours or during the day as a less costly alternative to hiring a full-time translator.</p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-surface p-6"><h3 className="h-card text-slate">Live Spanish / English</h3><p className="mt-2 text-[15px] text-muted-ink">On staff, not routed through a third-party line.</p></div>
              <div className="rounded-xl bg-surface p-6"><h3 className="h-card text-slate">Additional languages</h3><p className="mt-2 text-[15px] text-muted-ink">Several other languages are available. Ask which ones your patients need.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="included" className="scroll-mt-header bg-surface">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card p-7">
              <h2 className="font-display text-[1.5rem] font-bold text-brand">Included in every pricing package</h2>
              <ul className="check-list mt-5 space-y-2.5 text-[15px]">{INCLUDED_SERVICES.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="card p-7">
              <h2 className="font-display text-[1.5rem] font-bold text-slate">Add-on services</h2>
              <ul className="mt-5 space-y-2.5 text-[15px] text-slate">
                {ADD_ON_SERVICES.map((s, i) => <li key={s.name} className={`flex justify-between gap-4 ${i < ADD_ON_SERVICES.length - 1 ? "border-b border-border pb-2.5" : ""}`}><span>{s.name}</span><span className="text-muted-ink">{s.basis}</span></li>)}
              </ul>
              <Link href="/pricing" className="btn-brand mt-7">Pricing packages</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
