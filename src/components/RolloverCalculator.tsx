"use client";

import { useMemo, useRef, useState } from "react";
import { PRICING, money } from "@/lib/site";
import { trackToolEngaged } from "@/lib/analytics";

/** Daytime rollover estimate from NCI's published per-minute rate. Integer cents throughout. An estimate, never a quote. */
export function RolloverCalculator() {
  const [minutes, setMinutes] = useState(30);
  const [days, setDays] = useState(21);
  const engaged = useRef(false);
  const mark = () => { if (!engaged.current) { engaged.current = true; trackToolEngaged("rollover-calculator"); } };

  const { totalCents, mins } = useMemo(() => {
    const m = Math.max(0, Math.min(600, Number.isFinite(minutes) ? minutes : 0));
    const d = Math.max(1, Math.min(31, Number.isFinite(days) ? days : 1));
    const mins = m * d;
    return { totalCents: mins * PRICING.daytimePerMinuteCents + PRICING.baseRateCents, mins };
  }, [minutes, days]);

  return (
    <div className="border-t border-border p-6">
      <h3 className="font-display text-[1.1rem] font-bold text-slate">Estimate your monthly daytime rollover cost</h3>
      <p className="mt-1 text-[13px] text-muted-ink">Uses NCI&rsquo;s published daytime rate of {money(PRICING.daytimePerMinuteCents, { cents: true })} per minute plus the {money(PRICING.baseRateCents)} monthly base rate. An estimate, not a quote.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="label">Rollover minutes per business day</span>
          <input className="field" type="number" min={0} max={600} step={5} value={minutes} onChange={(e) => { mark(); setMinutes(e.target.valueAsNumber); }} />
        </label>
        <label className="block"><span className="label">Business days per month</span>
          <input className="field" type="number" min={1} max={31} step={1} value={days} onChange={(e) => { mark(); setDays(e.target.valueAsNumber); }} />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 rounded-lg bg-surface p-4" aria-live="polite">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-muted-ink">Estimated monthly total</p>
          <p className="font-slab text-[2.25rem] font-medium leading-none text-brand">{money(totalCents, { cents: true })}</p>
        </div>
        <p className="max-w-[16rem] text-[13px] text-muted-ink">{mins.toLocaleString()} minutes × {money(PRICING.daytimePerMinuteCents, { cents: true })} + {money(PRICING.baseRateCents)} base rate. One-time {money(PRICING.setupFeeCents)} setup not included.</p>
      </div>
    </div>
  );
}
