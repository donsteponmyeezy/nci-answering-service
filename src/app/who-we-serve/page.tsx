import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Schema, webPageNode, breadcrumbNode } from "@/components/Schema";

const TITLE = "Who We Serve | Hospitals, Practices & Professionals";
const DESC = "HIPAA-compliant answering service for hospitals and medical practices, with the same accuracy, efficiency, and compassion for business and professional services. References on request.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/who-we-serve" });

const AUDIENCES = [
  { eyebrow: "Hospitals", title: "Quality and affordability in balance", interest: "hospitals", cta: "Talk about hospital coverage", body: "We work with hospitals looking to strike the balance between quality and affordability. As one of the longest-standing HIPAA-compliant answering services, with industry-high staff retention, we are positioned to provide the highest quality services at the lowest possible cost. Our seasoned staff enhances patient satisfaction through empathetic listening, streamlines communication during emergencies, complies with healthcare regulations, and prevents costly mistakes." },
  { eyebrow: "Medical practices", title: "An extension of your team", interest: "practices", cta: "Talk about practice coverage", body: "We are not just a medical call center, but an extension of your team and a reflection of your entire practice. With every call we answer, we strive to give your patients a positive experience through careful listening and empathetic communication. With nearly three decades of experience, we understand call schedules, accurately dispatch patient information through the correct channels, and provide 24/7 support for questions or last-minute schedule changes." },
  { eyebrow: "Business & professional services", title: "The same care for non-medical businesses", interest: "professionals", cta: "Talk about business coverage", body: "While our focus for 25+ years has been HIPAA-compliant answering for the medical field, we offer the same benefits and support to non-medical businesses. Plumbing and heating companies, funeral homes, property managers, law offices, and other professionals rely on us to protect their reputation and bottom line by enhancing their client experience." },
];

export default function WhoWeServePage() {
  return (
    <>
      <Schema nodes={[webPageNode("/who-we-serve", TITLE, DESC), breadcrumbNode("/who-we-serve", [{ name: "Who We Serve", path: "/who-we-serve" }])]} />
      <PageHero eyebrow="Who we serve" image="/images/nci-banne-who.webp" title={<>HIPAA-compliant answering for <span className="text-brand">hospitals, practices, &amp; professionals</span></>} />

      <section className="bg-canvas">
        <div className="wrap py-16 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="h-section">Efficient &amp; compassionate call services for 25+ years</h2>
            <p className="lede mt-5">NCI is a HIPAA-compliant answering service that predominately works on accounts for hospitals and medical practices. But the qualities that set us apart in the medical field, accuracy, efficiency, compassion, and cost, also benefit non-medical businesses. Whether you&rsquo;re a small clinic, a large hospital, or a non-medical business, your call center is a reflection of you. We take that responsibility seriously and protect your reputation with reliability and professionalism.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {AUDIENCES.map((a) => (
              <article key={a.interest} className="card flex flex-col p-7">
                <p className="eyebrow">{a.eyebrow}</p>
                <h3 className="h-card mt-3 text-slate">{a.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-ink">{a.body}</p>
                <Link href={`/contact?interest=${a.interest}`} className="btn-outline mt-6">{a.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow">References</p>
            <h2 className="h-section mt-3">Many clients have been with us since their inception</h2>
            <p className="lede mt-5">We take pride in our long list of satisfied clients, and we&rsquo;re happy to share references upon request. Ask, and we&rsquo;ll connect you with a practice like yours.</p>
            <Link href="/contact" className="btn-brand mt-7">Contact us for references</Link>
          </div>
          <figure><Image src="/images/nci-banner-photo-2.webp" alt="Two NCI dispatchers at their stations, one turned toward the camera" width={810} height={391} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[16/10] w-full rounded-xl2 object-cover object-left shadow-card" /></figure>
        </div>
      </section>
    </>
  );
}
