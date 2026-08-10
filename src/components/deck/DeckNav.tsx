"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { DECK_META } from "@/lib/deck-meta";
import { XipatLogo } from "@/components/XipatLogo";

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

    const gutter = 20;
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
    <div className="mx-auto flex max-w-3xl items-center gap-2 pl-3 pr-1 sm:gap-3 sm:pl-4">
      {/* Logo đứng yên ngoài vùng cuộn, luôn bấm được để về màn đầu. */}
      <button
        type="button"
        onClick={() => onSelect(0)}
        aria-label="Về màn Mở đầu"
        className="pressable -ml-1 flex h-11 shrink-0 items-center rounded-xl px-2 transition-opacity duration-200 ease-out hover:opacity-80"
      >
        <XipatLogo size="sm" />
      </button>

      <span aria-hidden className="h-5 w-px shrink-0 bg-line-strong" />

      <div
        ref={listRef}
        className="relative flex flex-1 gap-1.5 overflow-x-auto py-2 pr-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <span
          ref={indicatorRef}
          aria-hidden
          style={{ width: 0 }}
          className="pointer-events-none absolute left-0 top-2 bottom-2 rounded-full bg-energy transition-[transform,width] duration-[220ms] ease-out motion-reduce:transition-none"
        />

        {DECK_META.map((entry, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={entry.id}
              type="button"
              data-nav-index={i}
              aria-current={isActive ? "step" : undefined}
              onClick={() => onSelect(i)}
              className={clsx(
                // Vùng chạm cao 40px — đủ cho ngón tay, đúng chuẩn cảm ứng.
                "pressable relative z-10 flex h-10 shrink-0 items-center rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap",
                "transition-colors duration-200 ease-out",
                isActive ? "text-bg-deep" : "text-muted hover:text-text",
              )}
            >
              {entry.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
