import type { Metadata, Viewport } from "next";
import "./globals.css";
import { play, roboto, robotoSlab } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer, CtaBand } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { CallLedger } from "@/components/analytics/CallLedger";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: `${SITE.name} | HIPAA-Compliant Medical Answering Service`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  icons: { icon: "/images/nci-favicon.jpg" },
};

export const viewport: Viewport = { themeColor: "#038855", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${play.variable} ${roboto.variable} ${robotoSlab.variable}`}>
      <head>
        <GoogleTagManager />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <Header />
        <main id="main">{children}</main>
        <CtaBand />
        <Footer />
        <StickyCallBar />
        <CallLedger />
      </body>
    </html>
  );
}
