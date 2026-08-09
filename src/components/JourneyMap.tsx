import clsx from "clsx";
import { JOURNEY } from "@/lib/content";
import { Chip, deckDelay } from "./ui";

const NODE_STYLE: Record<string, string> = {
  ritual: "border-line-strong bg-surface-2 text-muted",
  challenge: "border-energy/60 bg-energy/10 text-energy",
  auction: "border-route/60 bg-route/10 text-route",
  final: "border-energy bg-energy text-bg-deep",
};

export function JourneyMap() {
  return (
    <ol className="relative">
      {/* Đường Hải trình nối các node */}
      <span
        aria-hidden
        className="absolute left-[21px] top-3 bottom-3 w-px bg-linear-to-b from-line-strong via-line-strong to-energy/50"
      />

      {JOURNEY.map((stop, i) => (
        <li
          key={stop.code}
          style={deckDelay(Math.min(i * 40, 320))}
          className="deck-item relative flex gap-4 pb-6 last:pb-0"
        >
          <div className="relative z-10 shrink-0">
            <span
              className={clsx(
                "relative grid size-[42px] place-items-center rounded-full border font-mono text-[11px] font-bold",
                NODE_STYLE[stop.kind],
                stop.kind === "final" && "energy-pulse",
              )}
            >
              {stop.code}
            </span>
          </div>

          <div className="min-w-0 flex-1 pt-1">
            {/* Tên Thử thách là thứ người chơi tìm trên sơ đồ, nên nó to nhất. */}
            <h3
              className={clsx(
                "font-extrabold tracking-tight",
                stop.kind === "challenge" &&
                  "text-[17px] uppercase text-energy sm:text-lg",
                stop.kind === "auction" && "text-[16px] uppercase text-route",
                stop.kind === "final" && "text-[17px] uppercase text-energy",
                stop.kind === "ritual" && "text-[15px]",
              )}
            >
              {stop.title}
            </h3>
            <p className="mt-1 text-[14px] leading-relaxed text-muted">
              {stop.detail}
            </p>
            {stop.tags?.length ? (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {stop.tags.map((tag) => (
                  <Chip
                    key={tag}
                    tone={stop.kind === "auction" ? "route" : "neutral"}
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
