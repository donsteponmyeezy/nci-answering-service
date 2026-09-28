import { SITE, PRICING } from "@/lib/site";

/**
 * ONE JSON-LD GRAPH PER PAGE. Every page calls <Schema nodes={[...]} /> once; the
 * organization and website nodes are always prepended so every "@id" reference
 * on the page resolves. Honesty rails: no aggregateRating (NCI has no owner-confirmed
 * review count on file), no email in the graph, FAQPage only with visibly rendered questions.
 */
export type SchemaNode = Record<string, unknown>;

const abs = (path: string) => `${SITE.domain}${path === "/" ? "" : path}`;

export const SCHEMA_ID = {
  business: `${SITE.domain}/#business`,
  website: `${SITE.domain}/#website`,
  webPage: (path: string) => `${abs(path)}#webpage`,
  breadcrumb: (path: string) => `${abs(path)}#breadcrumb`,
  faq: (path: string) => `${abs(path)}#faq`,
  service: (id: string) => `${abs("/services")}#${id}`,
};

export function organizationNode(): SchemaNode {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": SCHEMA_ID.business,
    name: SITE.name,
    description: SITE.description,
    url: SITE.domain,
    telephone: SITE.phone.e164,
    logo: `${SITE.domain}/images/nci-answering-service-logo.webp`,
    image: `${SITE.domain}/images/nci-answering-service-hero-2000-2.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": name === "United States" ? "Country" : "State", name })),
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }],
    knowsAbout: ["Medical answering service", "HIPAA-compliant call handling", "After-hours physician answering", "Daytime overflow answering", "Spanish translation services"],
  };
}

export function webSiteNode(): SchemaNode {
  return { "@type": "WebSite", "@id": SCHEMA_ID.website, url: SITE.domain, name: SITE.name, publisher: { "@id": SCHEMA_ID.business } };
}

export function webPageNode(path: string, name: string, description: string): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": SCHEMA_ID.webPage(path),
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": SCHEMA_ID.website },
    about: { "@id": SCHEMA_ID.business },
    ...(path !== "/" ? { breadcrumb: { "@id": SCHEMA_ID.breadcrumb(path) } } : {}),
  };
}

export function breadcrumbNode(path: string, trail: { name: string; path: string }[]): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_ID.breadcrumb(path),
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

export function serviceNode(id: string, name: string, description: string): SchemaNode {
  return {
    "@type": "Service",
    "@id": SCHEMA_ID.service(id),
    name,
    description,
    serviceType: "Telephone answering service",
    provider: { "@id": SCHEMA_ID.business },
    areaServed: SITE.areaServed.map((n) => ({ "@type": n === "United States" ? "Country" : "State", name: n })),
    url: `${abs("/services")}#${id}`,
  };
}

/** Offer catalog from the published packages. Prices are the real ones on /pricing. */
export function offerCatalogNode(): SchemaNode {
  return {
    "@type": "OfferCatalog",
    "@id": `${abs("/pricing")}#offers`,
    name: "NCI Answering Service pricing packages",
    itemListElement: [
      ...PRICING.perCall.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: `${p.calls} after-hours calls per month; ${(p.overageCents / 100).toFixed(2)} USD per additional call. $25 monthly base rate and one-time $50 setup apply.`,
        price: (p.monthlyCents / 100).toFixed(2),
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", price: (p.monthlyCents / 100).toFixed(2), priceCurrency: "USD", unitText: "MONTH" },
        offeredBy: { "@id": SCHEMA_ID.business },
      })),
      ...PRICING.professional.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: `${p.sub}. ${p.note}. $25 monthly base rate and one-time $50 setup apply.`,
        price: (p.amountCents / 100).toFixed(2),
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", price: (p.amountCents / 100).toFixed(2), priceCurrency: "USD", unitText: p.unit },
        offeredBy: { "@id": SCHEMA_ID.business },
      })),
    ],
  };
}

/** Only pass questions that are visibly rendered on the same page. */
export function faqNode(path: string, faqs: readonly { q: string; a: string }[]): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": SCHEMA_ID.faq(path),
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function Schema({ nodes }: { nodes: SchemaNode[] }) {
  const graph = { "@context": "https://schema.org", "@graph": [organizationNode(), webSiteNode(), ...nodes] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
