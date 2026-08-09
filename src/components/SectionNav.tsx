"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/lib/content";

/** Khớp với scroll-padding-top của trang, cộng một chút khoảng thở. */
const NAV_OFFSET = 100;

export function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  /** Mục người dùng vừa bấm: khoá scrollspy tới khi trang cuộn tới nơi. */
  const pendingRef = useRef<string | null>(null);
  const firstMeasureRef = useRef(true);

  // Scrollspy: mục đang đọc là mục cuối cùng đã đi qua mép trên.
  // Đọc vị trí trong requestAnimationFrame nên không chặn luồng cuộn.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= NAV_OFFSET) {
          current = section.id;
        }
      }

      if (pendingRef.current) {
        if (pendingRef.current === current) pendingRef.current = null;
        return;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Con trượt và thanh cuộn ngang được điều khiển trực tiếp qua DOM: không
  // re-render, và chỉ chạm tới trục ngang của chính thanh nav — cuộn dọc của
  // người dùng không bao giờ bị can thiệp.
  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    const pill = list?.querySelector<HTMLElement>(`[data-nav-id="${active}"]`);
    if (!list || !indicator || !pill) return;

    // Lần đo đầu tiên đặt con trượt vào chỗ, không trượt từ số 0 ra.
    if (firstMeasureRef.current) indicator.style.transitionDuration = "0ms";

    indicator.style.width = `${pill.offsetWidth}px`;
    indicator.style.transform = `translateX(${pill.offsetLeft}px)`;

    if (firstMeasureRef.current) {
      void indicator.offsetWidth; // ép reflow để bỏ transition của lần đầu
      indicator.style.transitionDuration = "";
      firstMeasureRef.current = false;
    }

    // Chỉ cuộn ngang khi pill thực sự chạm mép, và cuộn tối thiểu đủ để thấy.
    const gutter = 24;
    const min = pill.offsetLeft - gutter;
    const max = pill.offsetLeft + pill.offsetWidth + gutter - list.clientWidth;
    const target = Math.min(min, Math.max(list.scrollLeft, max));

    if (Math.abs(target - list.scrollLeft) > 1) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    }
  }, [active]);

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-xl">
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

        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <Link
              key={section.id}
              href={`#${section.id}`}
              data-nav-id={section.id}
              aria-current={isActive ? "location" : undefined}
              onClick={() => {
                pendingRef.current = section.id;
                setActive(section.id);
              }}
              className={clsx(
                "pressable relative z-10 shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium whitespace-nowrap",
                "transition-colors duration-200 ease-out",
                isActive ? "text-bg-deep" : "text-muted hover:text-text",
              )}
            >
              {section.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
