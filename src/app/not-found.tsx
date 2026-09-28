import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-surface">
      <div className="wrap py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Page not found</p>
          <h1 className="h-section mt-3">That page isn&rsquo;t here, but a person is.</h1>
          <p className="lede mt-5">The link may be out of date. Try one of the pages below, or call us and we&rsquo;ll point you the right way.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-brand">Home</Link>
            <Link href="/pricing" className="btn-outline">Pricing</Link>
            <a href={SITE.phone.href} data-cta="phone" className="btn-ghost">Call {SITE.phone.display}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
