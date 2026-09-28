import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  tall?: boolean;
};

/**
 * Interior-page hero, same geometry as design-reference/v1 (2026-09-28 revision):
 *  - below lg: the banner is its own block at native aspect, so no face is ever cropped, copy sits on white beneath it;
 *  - lg and up: the banner sits behind the copy with a heavy white wash across the right two-thirds.
 */
export function PageHero({ eyebrow, title, lede, image, imageWidth = 810, imageHeight = 391, tall = true }: Props) {
  return (
    <section className="relative overflow-hidden bg-canvas lg:bg-surface">
      <Image src={image} alt="" width={imageWidth} height={imageHeight} priority sizes="100vw" className="block w-full object-cover lg:hidden" style={{ aspectRatio: `${imageWidth}/${imageHeight}` }} />
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        <Image src={image} alt="" width={imageWidth} height={imageHeight} sizes="100vw" className="h-full w-full object-cover object-left" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_14%,rgba(255,255,255,0.86)_40%,rgba(255,255,255,0.97)_58%,rgba(255,255,255,1)_100%)]" />
      </div>
      <div className={`wrap relative flex py-8 lg:items-center lg:py-14 ${tall ? "lg:min-h-[380px]" : "lg:min-h-[300px]"}`}>
        <div className="max-w-2xl lg:ml-auto lg:text-right">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h-display mt-2 text-slate">{title}</h1>
          {lede ? <p className="lede mt-4">{lede}</p> : null}
        </div>
      </div>
    </section>
  );
}
