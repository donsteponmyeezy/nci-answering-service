"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

/** Conversion floor: bottom-fixed Call + Find Coverage on mobile after 120px of scroll. */
export function StickyCallBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const update = () => setShow(window.scrollY > 120);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.body.style.paddingBottom = show && window.innerWidth < 1024 ? "4.5rem" : "";
    return () => { document.body.style.paddingBottom = ""; };
  }, [show]);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-canvas/95 backdrop-blur lg:hidden safe-bottom" hidden={!show}>
      <div className="grid grid-cols-2 gap-2 px-4 pt-2">
        <a href={SITE.phone.href} data-cta="phone" className="btn-brand">Call Now</a>
        <Link href="/find-your-coverage" className="btn-outline">Find Coverage</Link>
      </div>
    </div>
  );
}
