import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 sm:py-16">
      <Reveal>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-energy">
            {index}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {lead}
          </p>
        ) : null}
      </Reveal>
      <div className="mt-7 space-y-4">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function Card({
  title,
  eyebrow,
  children,
  className,
  delay = 0,
  accent,
}: {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  accent?: "energy" | "route" | "none";
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={clsx(
          "relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-sm sm:p-6",
          className,
        )}
      >
        {accent && accent !== "none" ? (
          <span
            aria-hidden
            className={clsx(
              "absolute inset-x-0 top-0 h-px",
              accent === "energy"
                ? "bg-linear-to-r from-transparent via-energy to-transparent"
                : "bg-linear-to-r from-transparent via-route to-transparent",
            )}
          />
        ) : null}
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h3
            className={clsx(
              "text-base font-bold tracking-tight sm:text-lg",
              eyebrow && "mt-2",
            )}
          >
            {title}
          </h3>
        ) : null}
        <div className={clsx(title || eyebrow ? "mt-3" : undefined)}>
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Danh sách quy định                                                  */
/* ------------------------------------------------------------------ */

export function RuleList({
  items,
  marker = "dot",
  className,
}: {
  items: ReactNode[];
  marker?: "dot" | "number" | "check";
  className?: string;
}) {
  return (
    <ul className={clsx("space-y-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
          <span
            aria-hidden
            className={clsx(
              "mt-[7px] shrink-0",
              marker === "dot" && "size-1.5 rounded-full bg-energy",
              marker === "check" && "mt-0 text-energy",
              marker === "number" &&
                "mt-0 font-mono text-[11px] leading-6 text-energy",
            )}
          >
            {marker === "number" ? String(i + 1).padStart(2, "0") : null}
            {marker === "check" ? "✓" : null}
          </span>
          <span className="text-text/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Callout — dùng cho tuyên bố của Game Master và cảnh báo             */
/* ------------------------------------------------------------------ */

export function Callout({
  tone = "energy",
  label,
  children,
}: {
  tone?: "energy" | "route" | "danger";
  label?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border-l-2 bg-surface-2/60 px-4 py-3.5",
        tone === "energy" && "border-l-energy",
        tone === "route" && "border-l-route",
        tone === "danger" && "border-l-delta",
      )}
    >
      {label ? (
        <p
          className={clsx(
            "font-mono text-[10px] uppercase tracking-[0.22em]",
            tone === "energy" && "text-energy",
            tone === "route" && "text-route",
            tone === "danger" && "text-delta",
          )}
        >
          {label}
        </p>
      ) : null}
      <div className={clsx("text-[15px] leading-relaxed", label && "mt-1.5")}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chip / Tag                                                          */
/* ------------------------------------------------------------------ */

export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "energy" | "route" | "muted";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none",
        tone === "neutral" && "border-line-strong text-muted",
        tone === "energy" && "border-energy/30 bg-energy/10 text-energy",
        tone === "route" && "border-route/30 bg-route/10 text-route",
        tone === "muted" && "border-line text-dim",
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Ví dụ có phép tính                                                  */
/* ------------------------------------------------------------------ */

export function Example({
  rows,
  result,
}: {
  rows: { label: string; value: string }[];
  result: { label: string; value: string };
}) {
  return (
    <div className="rounded-xl border border-line bg-bg-deep/60 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
        Ví dụ
      </p>
      <dl className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <dd className="font-mono text-text/90">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3">
        <span className="text-sm font-semibold">{result.label}</span>
        <span className="font-mono text-lg font-bold text-energy">
          {result.value}
        </span>
      </div>
    </div>
  );
}
