import Link from "next/link";
import { PRICING, money, moneyParts } from "@/lib/site";

function Amount({ cents }: { cents: number }) {
  const [d, c] = moneyParts(cents);
  return (
    <p className="price-card__amount">${d}<sup className="price-card__cents">{c}</sup></p>
  );
}

export function SetupLine({ stacked = false }: { stacked?: boolean }) {
  return (
    <p className="mt-2 text-center text-[15px] text-muted-ink">
      Setup fee to build account: <strong className="text-slate">{money(PRICING.setupFeeCents, { cents: true })}</strong>
      {stacked ? <br /> : " · "}
      Base rate for each plan: <strong className="text-slate">{money(PRICING.baseRateCents, { cents: true })} per month</strong>
    </p>
  );
}

/** The three after-hours per-call packages. `withCta` adds the "Start with…" buttons used on /pricing. */
export function PerCallCards({ withCta = false }: { withCta?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {PRICING.perCall.map((p) => (
        <article key={p.slug} className={`price-card ${p.featured ? "ring-2 ring-brand" : ""}`}>
          <div className={`price-card__head ${p.featured ? "bg-brand" : ""}`}>
            {p.featured && withCta ? <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">Most common</p> : null}
            <h3 className="font-display text-[1.3rem] font-bold text-white">{p.name}</h3>
            <p className="mt-1 text-[13px] text-white/80">for after-hours service only (when office is closed)</p>
          </div>
          <div className="px-6 py-7">
            <Amount cents={p.monthlyCents} />
            <p className="mt-2 font-semibold text-slate">{p.calls} calls{withCta ? " per month" : ""}</p>
            <hr className="my-5 border-border" />
            <p className="text-[15px] text-muted-ink">Over allotted number of calls: <strong className="text-slate">{money(p.overageCents, { cents: true })}</strong>{withCta ? " per call" : ""}</p>
            {withCta ? (
              <Link href={`/contact?plan=${p.slug}`} className={`${p.featured ? "btn-brand" : "btn-outline"} mt-6 w-full`}>Start with {p.calls} calls</Link>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProfessionalCards() {
  return (
    <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
      {PRICING.professional.map((p) => (
        <article key={p.slug} className="price-card">
          <div className="price-card__head">
            <h3 className="font-display text-[1.3rem] font-bold text-white">{p.name}</h3>
            <p className="mt-1 text-[13px] text-white/80">{p.sub}</p>
          </div>
          <div className="px-6 py-7">
            <Amount cents={p.amountCents} />
            <p className="mt-2 font-semibold text-slate">{p.unit}</p>
            <hr className="my-5 border-border" />
            <p className="text-[15px] text-muted-ink">{p.note}</p>
            <Link href={`/contact?plan=${p.slug}`} className="btn-outline mt-6 w-full">Ask about {p.name.toLowerCase()}</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
