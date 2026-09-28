import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Schema, webPageNode, breadcrumbNode } from "@/components/Schema";

const TITLE = "Make a Payment";
const DESC = "Pay your NCI Answering Service invoice by credit card or ACH through our secure payment portal.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/make-a-payment" });

/**
 * The previous site collected bank routing and account numbers in a page form.
 * That is deliberately not replicated: payments go to the hosted portal NCI already
 * uses, so card and bank details never touch this site (see privacy policy).
 */
export default function MakeAPaymentPage() {
  return (
    <>
      <Schema nodes={[webPageNode("/make-a-payment", TITLE, DESC), breadcrumbNode("/make-a-payment", [{ name: "Make a Payment", path: "/make-a-payment" }])]} />
      <section className="bg-surface">
        <div className="wrap py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Existing clients</p>
            <h1 className="h-section mt-3">Make a payment</h1>
            <p className="lede mt-5">Invoices can be paid by credit card or ACH through our secure payment portal. Have your invoice number ready; you can enter several separated by commas.</p>
            <a href={SITE.paymentPortalUrl} rel="noopener" target="_blank" className="btn-alert mt-8 uppercase">Open the payment portal</a>
            <p className="mt-6 text-[14px] text-muted-ink">Card and bank details are entered on the portal and are never collected by this website. Questions about an invoice? Call <a className="font-semibold text-brand" href={SITE.phone.href} data-cta="phone">{SITE.phone.display}</a> or email <a className="font-semibold text-brand" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
