import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE, SERVICES } from "@/lib/site";
import { Schema, webPageNode, serviceNode } from "@/components/Schema";
import { PerCallCards, SetupLine } from "@/components/PriceCards";

export const metadata = createMetadata({
  title: "HIPAA-Compliant Medical Answering Service | NCI, 25+ Years",
  description: SITE.description,
  path: "/",
});

const ICONS: Record<string, JSX.Element> = {
  "after-hours": <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  daytime: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  business: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
  temporary: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></>,
  translation: <path d="M4 5h9M8 3v2M6 12c2-2 3.5-4 4.5-7M4 12c2.5 0 5-3 6-7M13 21l4-10 4 10M14.5 17h5" />,
};

export default function HomePage() {
  return (
    <>
      <Schema nodes={[webPageNode("/", `${SITE.name} | HIPAA-Compliant Medical Answering Service`, SITE.description), ...SERVICES.map((s) => serviceNode(s.id, s.name, s.short))]} />

      {/* HERO: photo block on mobile, washed background on desktop (design-reference/v1, 2026-09-28 revision) */}
      <section className="relative overflow-hidden bg-canvas lg:bg-surface">
        <Image src="/images/nci-mobile-hero-800.webp" alt="" width={800} height={476} priority sizes="100vw" className="block aspect-[800/476] w-full object-cover lg:hidden" />
        <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
          <Image src="/images/nci-answering-service-hero-2000-2.webp" alt="" width={2000} height={850} priority sizes="100vw" className="h-full w-full object-cover object-left" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_18%,rgba(255,255,255,0.86)_42%,rgba(255,255,255,0.97)_60%,rgba(255,255,255,1)_100%)]" />
        </div>
        <div className="wrap relative grid py-10 lg:min-h-[640px] lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="eyebrow">{SITE.name}</p>
            <h1 className="h-display mt-3 text-slate">Safeguarding your reputation with <span className="text-brand">25 years</span> of compassionate medical answering</h1>
            <p className="lede mt-5 max-w-xl">Affordable, professional answering services tailored for medical and professional organizations. Every call is answered by a seasoned person, day or night.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/find-your-coverage" className="btn-brand">Find Your Coverage</Link>
              <a href={SITE.phone.href} data-cta="phone" className="btn-outline">Call {SITE.phone.display}</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-slate">
              {["HIPAA-compliant", "No contracts", "24/7 live support", "Spanish translation"].map((t) => (
                <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* THE HUMAN DIFFERENCE */}
      <section className="bg-canvas">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="eyebrow">The human difference</p>
              <h2 className="h-section mt-3">Human interaction is not replaced in emergent medical care.</h2>
              <p className="lede mt-5">When a patient calls at 2 a.m., they reach a dispatcher who has done this for years, not a menu and not a bot. That is the reason our clients and our staff stay.</p>
              <Link href="/about" className="btn-outline mt-7">Why practices choose NCI</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              <div className="card p-6"><p className="stat">8–15</p><h3 className="h-card mt-3 text-slate">Years our dispatchers average with NCI</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Seasoned call handlers who know your account, your providers, and the difference between an administrative message and an urgent one.</p></div>
              <div className="card p-6"><p className="stat">25+</p><h3 className="h-card mt-3 text-slate">Years as one of the longest-standing medical call centers</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Unmatched client and staff retention, because we provide the best quality of service at the lowest possible rate.</p></div>
              <div className="card p-6"><h3 className="h-card text-slate">Same dispatchers, every night</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Low turnover means your patients hear familiar voices and your call schedules are executed the same way every time.</p></div>
              <div className="card p-6"><h3 className="h-card text-slate">Secure, HIPAA-compliant handling</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Protected health information is handled under HIPAA-compliant procedures, with secure texting available as an add-on and a Business Associate Agreement on request.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="bg-surface">
        <div className="wrap py-16 lg:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl"><p className="eyebrow">Services</p><h2 className="h-section mt-3">Coverage that fits how your office actually runs</h2></div>
            <Link href="/services" className="btn-ghost self-start md:self-auto">All services</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s.id} href={`/services#${s.id}`} className="card group p-6 transition hover:shadow-lift">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[s.id]}</svg>
                </span>
                <h3 className="h-card mt-4 text-slate group-hover:text-brand">{s.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">{s.short}</p>
              </Link>
            ))}
            <Link href="/find-your-coverage" className="group flex flex-col justify-between rounded-xl bg-brand p-6 text-white shadow-card transition hover:bg-brand-hover">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80">Not sure which?</p>
                <h3 className="mt-3 font-display text-[1.4rem] font-bold leading-tight text-white">Answer six questions and we&rsquo;ll recommend the right coverage.</h3>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold">Find your coverage <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-canvas">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Who we serve</p>
            <h2 className="h-section mt-3">Hospitals, practices, and the professionals who can&rsquo;t miss a call</h2>
            <p className="lede mt-5">NCI predominately works on accounts for hospitals and medical practices. The qualities that set us apart there, accuracy, efficiency, compassion, and cost, benefit non-medical businesses just as much.</p>
            <ul className="check-list mt-6 space-y-3 text-[15px]">
              <li><strong className="text-slate">Hospitals and health systems.</strong> Quality and affordability in balance, with staff who streamline communication during emergencies.</li>
              <li><strong className="text-slate">Medical practices and specialty groups.</strong> An extension of your team that understands call schedules and dispatches through the right channels.</li>
              <li><strong className="text-slate">Business and professional services.</strong> Trades, funeral homes, property management, legal, and more.</li>
            </ul>
            <Link href="/who-we-serve" className="btn-outline mt-8">Who we serve</Link>
          </div>
          <figure className="order-1 lg:order-2">
            <Image src="/images/nci-banner-black-man.webp" alt="An NCI dispatcher wearing a headset smiles while taking a call in the call center" width={810} height={391} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[16/10] w-full rounded-xl2 object-cover object-left shadow-card" />
          </figure>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="bg-surface" id="pricing">
        <div className="wrap py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pricing packages</p>
            <h2 className="h-section mt-3">Affordable, transparent, and straightforward</h2>
            <p className="lede mt-4">Most call centers bill by the minute. We almost always bill by the call, because it costs you less and lets our dispatchers take the time a patient needs.</p>
          </div>
          <ul className="rule-list mx-auto mt-10 max-w-md">
            {["Serving clients nationwide for 25+ years", "Serving the Tri-State area & beyond", "HIPAA-compliant", "No contracts", "24/7 support", "Translation services"].map((t) => <li key={t}>{t}</li>)}
          </ul>
          <div className="mt-12">
            <h3 className="text-center font-display text-[1.6rem] font-bold text-brand">NCI &ldquo;Per Call&rdquo; Packages</h3>
            <SetupLine />
            <div className="mt-8"><PerCallCards /></div>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/pricing" className="btn-brand">See all pricing, including Professional plans</Link>
            <Link href="/find-your-coverage" className="btn-ghost">Which plan fits me?</Link>
          </div>
        </div>
      </section>

      {/* WHY NCI */}
      <section className="bg-canvas">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="eyebrow">Why NCI Answering Service?</p><h2 className="h-section mt-3">Best quality of service at the lowest possible rate</h2></div>
            <div className="lg:col-span-8">
              <p className="lede">We are one of the longest-standing medical call centers, with unmatched client and staff retention. Our seasoned dispatchers, averaging 8 to 15 years with NCI, are some of the most experienced, accurate, and efficient in the industry. Combined with our values rooted in empathy and compassion, we help safeguard your reputation, enhance patient satisfaction, and optimize your bottom line.</p>
              <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                <div className="border-l-2 border-brand pl-4"><dt className="font-display text-[1.1rem] font-bold text-slate">Short hold times</dt><dd className="mt-1 text-[15px] text-muted-ink">Calls answered quickly by staff who already know the account.</dd></div>
                <div className="border-l-2 border-brand pl-4"><dt className="font-display text-[1.1rem] font-bold text-slate">Accurate dispatching</dt><dd className="mt-1 text-[15px] text-muted-ink">Alpha paging, texting, and calling through the channel each provider prefers.</dd></div>
                <div className="border-l-2 border-brand pl-4"><dt className="font-display text-[1.1rem] font-bold text-slate">Reachable 24/7</dt><dd className="mt-1 text-[15px] text-muted-ink">Call or text our core team any time for schedule changes or urgent matters.</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
