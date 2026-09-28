import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Schema, webPageNode, breadcrumbNode } from "@/components/Schema";

const TITLE = "About NCI | HIPAA-Compliant Answering for 25+ Years";
const DESC = "NCI Answering Service is a HIPAA-compliant answering service based in Fishkill, New York, serving healthcare and professional clients nationwide for 25+ years with a seasoned, long-tenured team.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/about" });

const PILLARS = [
  { t: "24/7 support team", b: "We are not a “call us back Monday to Friday, 9 to 5” operation. You can call or text our core team any time, day or night. Last-minute schedule changes, general questions, urgent patient matters: we are always here." },
  { t: "Employees average 8 to 15 years at NCI", b: "Our highly-trained, retained team seamlessly executes call schedules, quickly differentiates administrative messages from urgent medical issues, accurately dispatches information, and ensures no patient is left unheard. With a stable team, you consistently get the same dispatchers." },
  { t: "25+ years in service", b: "As one of the longest-standing HIPAA-compliant answering services, we know this business. We understand the inner workings of medical offices and hospitals, and what really matters: short hold times, efficient conversations, accurate notetaking, fast dispatching, and representing your business well at all times." },
];

export default function AboutPage() {
  return (
    <>
      <Schema nodes={[webPageNode("/about", TITLE, DESC), breadcrumbNode("/about", [{ name: "About", path: "/about" }])]} />
      <PageHero eyebrow="About us" image="/images/nci-mobile-hero-800.webp" imageWidth={800} imageHeight={476} title={<>A HIPAA-compliant answering service for <span className="text-brand">25+ years</span></>} />

      <section className="bg-canvas">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <h2 className="h-section">Answering services that make people feel heard</h2>
            <p className="lede mt-5">Treating people with empathy and compassion, whether clients, patients, or employees, is the foundation of what sets us apart in this fast-paced healthcare industry. To us, compassion means actively listening to another person to make sure they feel heard, and truly understanding their needs so we can quickly take the right steps to help. This philosophy has enabled us to retain an unprecedented number of employees and clients over the past 25 years, making us one of the longest-standing HIPAA-compliant answering services in the industry.</p>
          </div>
          <div className="lg:col-span-5"><ul className="rule-list"><li>HIPAA-compliant</li><li>25+ years in service</li><li>No contracts</li><li>Translation services</li></ul></div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="wrap py-16 lg:py-20">
          <p className="eyebrow">What sets us apart</p>
          <h2 className="h-section mt-3 max-w-2xl">Four things our clients tell us they can&rsquo;t get elsewhere</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PILLARS.map((p) => <article key={p.t} className="card p-7"><h3 className="h-card text-slate">{p.t}</h3><p className="mt-3 text-[15px] leading-relaxed text-muted-ink">{p.b}</p></article>)}
            <article className="card p-7">
              <h3 className="h-card text-slate">Transparent pricing &amp; no contracts</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-ink">We don&rsquo;t lock clients into contracts because our services speak for themselves. We charge per call rather than per minute because it is the most cost-effective way to provide the best possible service. Pricing that is transparent, consistent, and clear. <Link className="font-semibold text-brand" href="/pricing">See the packages.</Link></p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <figure><Image src="/images/nci-banner-man.webp" alt="An NCI dispatcher smiles while on a call at his workstation" width={810} height={391} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[16/10] w-full rounded-xl2 object-cover object-left shadow-card" /></figure>
          <div>
            <p className="eyebrow">Based in {SITE.address.city}, {SITE.address.stateLong}</p>
            <h2 className="h-section mt-3">Local roots, clients nationwide</h2>
            <p className="lede mt-5">From our headquarters on {SITE.address.street} in {SITE.address.city}, we answer for practices across New York, the Tri-State area, and the country. Join us in safeguarding your reputation, enhancing patient satisfaction, and optimizing your bottom line.</p>
            <Link href="/contact" className="btn-brand mt-7">Contact us today</Link>
          </div>
        </div>
      </section>
    </>
  );
}
