"use client";

import clsx from "clsx";
import { useId, useState, type ReactNode } from "react";

/**
 * Accordion mở/đóng bằng grid-template-rows 0fr → 1fr: chiều cao tự động,
 * transition (không phải keyframes) nên đóng giữa chừng vẫn mượt.
 */
export function Accordion({
  title,
  meta,
  children,
  defaultOpen = false,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="pressable flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span className="flex-1">
          <span className="block text-[15px] font-semibold tracking-tight">
            {title}
          </span>
          {meta ? (
            <span className="mt-0.5 block text-[13px] text-dim">{meta}</span>
          ) : null}
        </span>
        <span
          aria-hidden
          className={clsx(
            "grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-muted",
            "transition-transform duration-200 ease-out",
            open && "rotate-45",
          )}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v10M1 6h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className={clsx(
          "grid transition-[grid-template-rows,opacity] duration-[220ms] ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 px-5 pb-5 text-[15px] leading-relaxed text-text/90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
