"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/lib/content";

export function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Dải hẹp quanh 1/3 trên màn hình: mục nào đang được đọc thì mục đó sáng.
      { rootMargin: "-88px 0px -66% 0px", threshold: 0 },
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Kéo mục đang đọc vào tầm nhìn của thanh cuộn ngang trên mobile.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-nav-id="${active}"]`,
    );
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-xl">
      <div
        ref={listRef}
        className="mx-auto flex max-w-3xl gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <Link
              key={section.id}
              href={`#${section.id}`}
              data-nav-id={section.id}
              aria-current={isActive ? "location" : undefined}
              className={clsx(
                "pressable shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium whitespace-nowrap",
                "transition-[color,background-color,border-color] duration-200 ease-out",
                isActive
                  ? "bg-energy text-bg-deep"
                  : "text-muted hover:text-text",
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
