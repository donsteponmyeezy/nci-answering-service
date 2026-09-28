import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

/** Closing CTA band, paired call + callback. Rendered above the footer on every page. */
export function CtaBand() {
  return (
    <section className="bg-brand text-on-brand">
      <div className="wrap grid items-center gap-8 py-14 lg:grid-cols-[1.4fr_1fr] lg:py-16">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80">See why we&rsquo;re the best value in the industry</p>
          <h2 className="mt-2 font-display text-[1.85rem] font-bold leading-tight text-white sm:text-[2.25rem]">Talk to a person about your coverage today.</h2>
          <p className="mt-3 max-w-xl text-white/85">No contracts, no hidden fees, and no bot on the line. Call us or request a callback and a member of our core team will reach out.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <a href={SITE.phone.href} data-cta="phone" className="btn bg-white text-brand hover:bg-brand-tint">Call {SITE.phone.display}</a>
          <Link href="/contact" className="btn border border-white/60 text-white hover:bg-white/10">Request a Callback</Link>
        </div>
      </div>
    </section>
  );
}

const COMPANY = [
  { href: "/about", label: "About NCI" },
  { href: "/who-we-serve", label: "Who We Serve" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/make-a-payment", label: "Make a Payment" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const SERVICES = [
  { href: "/services#after-hours", label: "After-Hours Medical Answering" },
  { href: "/services#daytime", label: "Daytime Medical Office Support" },
  { href: "/services#business", label: "Business & Professional Services" },
  { href: "/services#temporary", label: "Temporary & On-Demand Coverage" },
  { href: "/services#translation", label: "Translation Services" },
  { href: "/find-your-coverage", label: "Find Your Coverage" },
];

export function Footer() {
  return (
    <footer className="bg-canvas">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image src="/images/nci-answering-service-logo.webp" alt={SITE.name} width={147} height={67} className="h-[56px] w-auto" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-ink">A HIPAA-compliant answering service for hospitals, medical practices, and professional businesses. Serving New York, the Tri-State area, and clients nationwide for {SITE.yearsInService} years.</p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-semibold text-slate">
            <li>HIPAA-compliant</li><li>No contracts</li><li>24/7 support</li><li>Translation services</li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate">Company</h3>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {COMPANY.map((l) => <li key={l.href}><Link className="hover:text-brand" href={l.href}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate">Services</h3>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {SERVICES.map((l) => <li key={l.href}><Link className="hover:text-brand" href={l.href}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate">Headquarters</h3>
          <address className="mt-4 space-y-2.5 not-italic text-[15px]">
            <p>{SITE.name}<br />{SITE.address.street}<br />{SITE.address.city}, {SITE.address.stateLong} {SITE.address.zip}</p>
            <p><a className="font-semibold text-brand" href={SITE.phone.href} data-cta="phone">{SITE.phone.display}</a></p>
            <p><a className="hover:text-brand" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </address>
          <a href={SITE.paymentPortalUrl} rel="noopener" target="_blank" className="btn-alert mt-5 w-full uppercase sm:w-auto">Make a Payment</a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="wrap flex flex-col gap-2 py-5 text-[13px] text-muted-ink sm:flex-row sm:items-center sm:justify-between">
          <p>All Rights Reserved &copy; {new Date().getFullYear()} {SITE.name}</p>
          <p className="flex flex-wrap gap-x-4">
            <span>Answered by people. Never a bot.</span>
            {SITE.credit ? <a className="hover:text-brand" href={SITE.credit.href} rel="noopener" target="_blank">{SITE.credit.label}</a> : null}
          </p>
        </div>
      </div>
    </footer>
  );
}
