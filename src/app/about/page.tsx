import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE, COMPANY_HISTORY, CORE_VALUES, INDUSTRIES } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Schema, webPageNode, breadcrumbNode } from "@/components/Schema";
const TITLE = "About Next Call In (NCI) | Hudson Valley, New York";
const DESC = "Meet Next Call In (NCI), a woman-owned answering service based in Fishkill in New York’s Hudson Valley, supporting medical practices and businesses nationwide.";
export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/about" });
const paths: Record<string, string> = { briefcase: "M4 7h16v13H4z M8 7V4h8v3 M4 12h16", heart: "M12 20 3 11a5 5 0 0 1 9-7 5 5 0 0 1 9 7z", clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v5l3 2", check: "m5 12 4 4L19 6", person: "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M4 21v-2a8 8 0 0 1 16 0v2" };
export default function AboutPage() {
 return <>
  <Schema nodes={[webPageNode("/about", TITLE, DESC), breadcrumbNode("/about", [{ name: "About", path: "/about" }])]} />
  <PageHero eyebrow="About Next Call In (NCI)" title={<>People who make your callers <span className="text-brand">feel heard</span></>} lede="Compassionate answering, personal service, and a team you can count on." />
  <section className="bg-canvas"><div className="wrap grid gap-8 py-16 lg:grid-cols-2">
   <div><span className="inline-flex rounded-full bg-brand-tint px-4 py-2 text-sm font-semibold text-brand-ink">Woman-Owned Business</span><h2 className="h-section mt-5">Care is at the core of every call</h2><p className="lede mt-4">Next Call In (NCI) puts empathy and compassion at the center of the caller experience. We listen carefully, understand what each person needs, and take the right steps to help.</p><p className="mt-4 text-muted-ink">Based in {SITE.address.city}, in New York’s Hudson Valley, our team supports medical practices and professional businesses throughout the Tri-State area and nationwide.</p></div>
   <div className="card p-7"><h3 className="h-card text-slate">Experienced people. Personal attention.</h3><p className="mt-4 text-muted-ink">Our dispatchers average 8–15 years with NCI. Familiar voices, careful notes, and accurate dispatching help your callers feel supported.</p><h3 className="h-card mt-6 text-slate">Here when you need us</h3><p className="mt-3 text-muted-ink">Reach our core team 24/7 for schedule changes, questions, and urgent matters. No contracts, with clear pricing and coverage tailored to your office.</p></div>
  </div></section>
  <section className="bg-surface"><div className="wrap py-16"><p className="eyebrow">Our story</p><h2 className="h-section mt-3">A continuing commitment to answering with care</h2><p className="lede mt-4 max-w-3xl">Our name has evolved. The focus remains personal, dependable communication.</p><ol aria-label="Company name history" className="mt-8 grid gap-4 md:grid-cols-3">{COMPANY_HISTORY.map((name, i) => <li key={name} className="card p-6"><span className="text-sm font-semibold text-brand">{i === 2 ? "Today" : `Chapter ${i + 1}`}</span><h3 className="h-card mt-3 text-slate">{name}</h3>{i < 2 ? <span aria-hidden="true" className="mt-4 block text-2xl text-brand">→</span> : null}</li>)}</ol></div></section>
  <section className="bg-canvas"><div className="wrap py-16"><p className="eyebrow">Our Core Values</p><h2 className="h-section mt-3">What guides our team</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{CORE_VALUES.map(value => <article key={value.name} className="card p-6"><svg aria-hidden="true" className="h-8 w-8 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[value.icon]} /></svg><h3 className="h-card mt-4 text-slate">{value.name}</h3><p className="mt-3 text-muted-ink">{value.description}</p></article>)}</div></div></section>
  <section className="bg-surface"><div className="wrap py-16"><h2 className="h-section">Industries we serve</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{INDUSTRIES.map(industry => <li key={industry} className="card p-5 font-semibold text-slate">{industry}</li>)}</ul><Link href="/who-we-serve" className="btn-outline mt-7">Explore coverage for your business</Link></div></section>
 </>;
}
