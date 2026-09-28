import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Schema, webPageNode, breadcrumbNode } from "@/components/Schema";

const TITLE = "Privacy Policy";
const DESC = "How NCI Answering Service handles information submitted through this website.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/privacy-policy" });

const SECTIONS: [string, React.ReactNode][] = [
  ["Who we are", <>{SITE.name}, {SITE.address.street}, {SITE.address.city}, {SITE.address.stateLong} {SITE.address.zip}. Our website address is {SITE.domain}.</>],
  ["What this website collects", "When you send a message, request a callback, or use the Find Your Coverage tool, we receive the information you type: your name, phone number, email address, company, and the details of your request. We use it to respond to you and to set up service you ask for. Please do not include patient information in any website form."],
  ["Analytics", "This site may use standard web analytics to understand which pages are visited. Analytics data is aggregated and does not include the contents of your messages."],
  ["Payments", "Payments are processed through a third-party payment portal. Card and bank details are entered on that provider's site and are not collected or stored by this website."],
  ["Who we share your data with", "We do not sell website inquiries. Information you submit is shared only with the service providers that deliver it to us, such as our email delivery provider."],
  ["Client communications and HIPAA", "Protected health information handled on behalf of our healthcare clients is governed by the Business Associate Agreement with each client, not by this website policy."],
  ["Contact", <>Questions about this policy: <a className="font-semibold text-brand" href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phone.display}.</>],
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Schema nodes={[webPageNode("/privacy-policy", TITLE, DESC), breadcrumbNode("/privacy-policy", [{ name: "Privacy Policy", path: "/privacy-policy" }])]} />
      <section className="bg-surface"><div className="wrap py-12 lg:py-16"><p className="eyebrow">Legal</p><h1 className="h-section mt-3">Privacy Policy</h1><p className="mt-3 text-[14px] text-muted-ink">Last updated September 28, 2026.</p></div></section>
      <section className="bg-canvas">
        <div className="wrap max-w-3xl py-12 lg:py-16">
          <div className="space-y-8 text-[16px] leading-relaxed text-slate">
            {SECTIONS.map(([h, body]) => <div key={h}><h2 className="h-card mb-2 text-slate">{h}</h2><p>{body}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
