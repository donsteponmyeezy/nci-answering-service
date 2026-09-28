import Script from "next/script";

/**
 * GTM container + Consent Mode v2 default. Renders nothing when NEXT_PUBLIC_GTM_ID
 * is unset, so a fresh checkout never loads a tag it was not configured for.
 * Consent defaults to denied for ad storage; analytics storage is granted because
 * the site sets no advertising cookies and NCI's audience is US-only.
 */
export function GoogleTagManager() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;
  return (
    <>
      {/* Plain inline script (not next/script) so it is guaranteed to run before the GTM loader below. */}
      <script
        id="consent-default"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted',wait_for_update:500});`,
        }}
      />
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
      </Script>
    </>
  );
}

export function GoogleTagManagerNoScript() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${id}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
    </noscript>
  );
}
