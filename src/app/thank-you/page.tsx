import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = createMetadata({ title: "Thank You", description: "Your message has been received. A representative from NCI will get back to you shortly.", path: "/thank-you", noindex: true });

export default function ThankYouPage() {
  return (
    <section className="bg-surface">
      <div className="wrap py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Message received</p>
          <h1 className="h-section mt-3">Thank you for contacting {SITE.name}</h1>
          <p className="lede mt-5">Your message has been received. A representative from NCI will get back to you shortly. If you require immediate action, please call us.</p>
          <a href={SITE.phone.href} data-cta="phone" className="mt-6 inline-block font-display text-[2rem] font-bold text-brand">{SITE.phone.display}</a>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"><Link href="/" className="btn-outline">Back to home</Link><Link href="/pricing" className="btn-ghost">Review pricing</Link></div>
        </div>
      </div>
    </section>
  );
}
