import clsx from "clsx";
import type { Booster } from "@/lib/content";
import { deckDelay } from "./ui";

const TONE: Record<
  Booster["key"],
  { text: string; border: string; glow: string; dot: string }
> = {
  alpha: {
    text: "text-alpha",
    border: "border-alpha/25",
    glow: "rgb(91 140 255 / 0.2)",
    dot: "bg-alpha",
  },
  beta: {
    text: "text-beta",
    border: "border-beta/25",
    glow: "rgb(63 214 176 / 0.18)",
    dot: "bg-beta",
  },
  gamma: {
    text: "text-gamma",
    border: "border-gamma/25",
    glow: "rgb(255 194 75 / 0.18)",
    dot: "bg-gamma",
  },
  delta: {
    text: "text-delta",
    border: "border-delta/25",
    glow: "rgb(255 122 138 / 0.18)",
    dot: "bg-delta",
  },
};

export function BoosterCard({
  booster,
  delay = 0,
}: {
  booster: Booster;
  delay?: number;
}) {
  const tone = TONE[booster.key];

  return (
    <article
      style={deckDelay(delay)}
      className={clsx(
        "deck-item relative overflow-hidden rounded-2xl border bg-surface/70 p-5 sm:p-6",
        tone.border,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 100% 0%, ${tone.glow}, transparent 70%)`,
        }}
      />

      <header className="relative flex items-center gap-2.5">
        <span className={clsx("size-2.5 rounded-sm", tone.dot)} aria-hidden />
        <h3 className="text-lg font-extrabold uppercase tracking-tight">
          {booster.name}
        </h3>
        <span className="text-dim">—</span>
        <span className={clsx("text-sm font-semibold", tone.text)}>
          {booster.alias}
        </span>
      </header>

      <p className="relative mt-3 text-[15px] font-medium leading-relaxed">
        {booster.tagline}
      </p>

      <p className="relative mt-3 rounded-lg bg-bg-deep/60 px-3.5 py-2.5 text-[13px] font-medium leading-relaxed text-muted">
        {booster.timing}
      </p>

      <div className="relative mt-4 space-y-4">
        {booster.effect ? (
          <Block label="Hiệu ứng" items={booster.effect} dotClass={tone.dot} />
        ) : null}
        {booster.win ? (
          <Block
            label="Nếu chiến thắng"
            items={booster.win}
            dotClass="bg-beta"
          />
        ) : null}
        {booster.lose ? (
          <Block
            label="Nếu không chiến thắng"
            items={booster.lose}
            dotClass="bg-delta"
          />
        ) : null}
        {booster.examples ? (
          <div className="rounded-lg border border-line bg-bg-deep/40 px-3.5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Ví dụ
            </p>
            <ul className="mt-2 space-y-1.5">
              {booster.examples.map((ex) => (
                <li key={ex} className="text-[14px] leading-relaxed text-muted">
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Block({
  label,
  items,
  dotClass,
}: {
  label: string;
  items: string[];
  dotClass: string;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
        {label}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed">
            <span aria-hidden className="shrink-0 leading-relaxed">
              <span
                className={clsx(
                  "block size-1.5 translate-y-2 rounded-full",
                  dotClass,
                )}
              />
            </span>
            <span className="text-text/90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
