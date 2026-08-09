import { EVENT } from "@/lib/content";
import { XipatLogo } from "@/components/XipatLogo";
import { deckDelay } from "@/components/ui";

const FACTS = [
  { value: "04", label: "Đội" },
  { value: "05", label: "Thử thách" },
  { value: "04", label: "Booster" },
  { value: "01", label: "Quán quân" },
];

export function IntroSection() {
  return (
    <div className="m-auto w-full max-w-3xl px-4 py-5 sm:px-5 sm:py-10">
      <div className="deck-item">
        <XipatLogo size="lg" />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted sm:text-[11px] sm:tracking-[0.3em]">
          {EVENT.org} — {EVENT.occasion}
        </p>
        <h1 className="chrome-text mt-2 font-display text-[clamp(2.5rem,11.5vw,4.75rem)] font-black uppercase leading-[1.02]">
          {EVENT.title}
        </h1>
        <p className="mt-1.5 font-mono text-[clamp(0.66rem,2.9vw,0.95rem)] uppercase tracking-[0.36em] text-text/90">
          {EVENT.titleEn}
          <span className="text-energy">_</span>
        </p>
        <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-energy">
            {EVENT.subtitle}
          </p>
          <span aria-hidden className="h-3.5 w-px bg-line-strong" />
          <p className="text-[13px] font-medium text-muted">{EVENT.docTitle}</p>
        </div>
      </div>

      <p
        style={deckDelay(60)}
        className="deck-item mt-5 max-w-xl text-[15px] leading-relaxed text-muted"
      >
        05 Thử thách. 04 Booster. Một nguồn Energy duy nhất — mỗi quyết định đều
        được tính bằng Energy.
      </p>

      <dl
        style={deckDelay(120)}
        className="deck-item mt-6 grid grid-cols-4 gap-2 border-y border-line py-4"
      >
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-mono text-xl font-bold text-text">
              {fact.value}
            </dd>
            <p className="mt-0.5 text-[11px] uppercase tracking-wider text-dim">
              {fact.label}
            </p>
          </div>
        ))}
      </dl>

      <div
        style={deckDelay(180)}
        className="deck-item mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-energy/25 bg-energy/8 px-4 py-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
          {EVENT.prizeTitle}
        </span>
        <span className="font-mono text-lg font-black whitespace-nowrap text-energy sm:text-xl">
          {EVENT.prize}
        </span>
      </div>
    </div>
  );
}
