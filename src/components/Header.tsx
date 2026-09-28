"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";

const PhoneIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-canvas focus:px-4 focus:py-2 focus:text-brand">
        Skip to content
      </a>

      <div className="bg-brand text-on-brand">
        <div className="wrap flex h-10 items-center justify-between gap-4 text-[13px] font-semibold tracking-wide">
          <p className="hidden sm:block">Answering calls for medical practices and professionals for {SITE.yearsInService} years</p>
          <div className="ml-auto flex items-center gap-1">
            <a href={SITE.phone.href} data-cta="phone" className="rounded px-2.5 py-1.5 hover:bg-white/10">{SITE.phone.display}</a>
            <a href={`mailto:${SITE.email}`} className="hidden rounded px-2.5 py-1.5 hover:bg-white/10 md:inline-block">Email Us</a>
            <a href={SITE.paymentPortalUrl} rel="noopener" target="_blank" className="rounded bg-alert px-3 py-1.5 uppercase hover:bg-alert-hover">Make a Payment</a>
          </div>
        </div>
      </div>

      <header id="site-header" className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur">
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
            <Image src="/images/nci-answering-service-logo.webp" alt={SITE.name} width={147} height={67} priority className="h-[52px] w-auto md:h-[60px]" />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} className="nav-link" aria-current={current(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a href={SITE.phone.href} data-cta="phone" className="btn-ghost"><PhoneIcon />{SITE.phone.display}</a>
            <Link href="/find-your-coverage" className="btn-brand">Find Your Coverage</Link>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
        </div>
        <div id="mobile-menu" className="border-t border-border bg-canvas lg:hidden" hidden={!open}>
          <nav aria-label="Mobile" className="wrap flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} className="nav-link py-3" aria-current={current(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-4">
              <a href={SITE.phone.href} data-cta="phone" className="btn-outline">Call Us</a>
              <Link href="/find-your-coverage" className="btn-brand">Find Coverage</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
