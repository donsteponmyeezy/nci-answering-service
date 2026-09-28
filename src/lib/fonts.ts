import localFont from "next/font/local";

/** Self-hosted brand fonts (latin subsets salvaged from the previous site on 2026-09-28). Same files as design-reference/v1/assets/fonts. */
export const play = localFont({
  src: [
    { path: "../fonts/play-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/play-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-play",
  display: "swap",
});

export const roboto = localFont({
  src: [{ path: "../fonts/roboto-var.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-roboto",
  display: "swap",
});

export const robotoSlab = localFont({
  src: [{ path: "../fonts/roboto-slab-var.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-roboto-slab",
  display: "swap",
});
