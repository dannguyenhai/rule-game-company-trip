"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { DECK } from "@/components/sections/registry";

export function DeckNav({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const firstMeasureRef = useRef(true);

  // Con trượt và thanh cuộn ngang điều khiển trực tiếp qua DOM: đổi màn không
  // kéo theo một lần re-render nào của thanh nav.
  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    const pill = list?.querySelector<HTMLElement>(
      `[data-nav-index="${activeIndex}"]`,
    );
    if (!list || !indicator || !pill) return;

    if (firstMeasureRef.current) indicator.style.transitionDuration = "0ms";

    indicator.style.width = `${pill.offsetWidth}px`;
    indicator.style.transform = `translateX(${pill.offsetLeft}px)`;

    if (firstMeasureRef.current) {
      void indicator.offsetWidth; // ép reflow để bỏ transition của lần đầu
      indicator.style.transitionDuration = "";
      firstMeasureRef.current = false;
    }

    const gutter = 24;
    const min = pill.offsetLeft - gutter;
    const max = pill.offsetLeft + pill.offsetWidth + gutter - list.clientWidth;
    const target = Math.min(min, Math.max(list.scrollLeft, max));

    if (Math.abs(target - list.scrollLeft) > 1) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      list.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    }
  }, [activeIndex]);

  return (
    <div
      ref={listRef}
      className="relative mx-auto flex max-w-3xl gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <span
        ref={indicatorRef}
        aria-hidden
        style={{ width: 0 }}
        className="pointer-events-none absolute left-0 top-2.5 bottom-2.5 rounded-full bg-energy transition-[transform,width] duration-[220ms] ease-out motion-reduce:transition-none"
      />

      {DECK.map((entry, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={entry.id}
            type="button"
            data-nav-index={i}
            aria-current={isActive ? "step" : undefined}
            onClick={() => onSelect(i)}
            className={clsx(
              "pressable relative z-10 shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium whitespace-nowrap",
              "transition-colors duration-200 ease-out",
              isActive ? "text-bg-deep" : "text-muted hover:text-text",
            )}
          >
            {entry.label}
          </button>
        );
      })}
    </div>
  );
}
