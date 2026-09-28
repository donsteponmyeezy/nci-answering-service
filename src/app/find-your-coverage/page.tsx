import { createMetadata } from "@/lib/seo";
import { CoverageMatcher } from "@/components/CoverageMatcher";
import { Schema, webPageNode, breadcrumbNode } from "@/components/Schema";

const TITLE = "Find Your Coverage | Which Answering Plan Fits?";
const DESC = "Answer six quick questions and get a recommendation for daytime, overflow, after-hours, temporary, or 24/7 answering coverage, then request a callback from a real person. No chatbot.";

export const metadata = createMetadata({ title: TITLE, description: DESC, path: "/find-your-coverage" });

export default function FindYourCoveragePage() {
  return (
    <>
      <Schema nodes={[webPageNode("/find-your-coverage", TITLE, DESC), breadcrumbNode("/find-your-coverage", [{ name: "Find Your Coverage", path: "/find-your-coverage" }])]} />
      <section className="bg-surface">
        <div className="wrap py-14 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Find your coverage</p>
            <h1 className="h-section mt-3">Six questions. One recommendation. Then a real person.</h1>
            <p className="lede mt-4">Tell us how your office runs and we&rsquo;ll suggest the coverage and plan that fit. There is no chatbot here. The last step is a callback from our core team.</p>
          </div>
        </div>
      </section>
      <section className="bg-canvas"><div className="wrap py-12 lg:py-16"><CoverageMatcher /></div></section>
      <section className="bg-surface">
        <div className="wrap grid gap-6 py-14 sm:grid-cols-3">
          <div className="text-center"><p className="stat">0</p><p className="mt-2 font-semibold text-slate">Bots on the line</p><p className="mt-1 text-[14px] text-muted-ink">A person answers every call, every time.</p></div>
          <div className="text-center"><p className="stat">8–15</p><p className="mt-2 font-semibold text-slate">Years our dispatchers average with NCI</p><p className="mt-1 text-[14px] text-muted-ink">You get the same voices night after night.</p></div>
          <div className="text-center"><p className="stat">$0</p><p className="mt-2 font-semibold text-slate">In contracts or hidden fees</p><p className="mt-1 text-[14px] text-muted-ink">Start, pause, or stop any month.</p></div>
        </div>
      </section>
    </>
  );
}
