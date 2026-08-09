"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Độ trễ stagger, giữ trong khoảng 30–80ms giữa các phần tử. */
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * IntersectionObserver chỉ lật attribute — toàn bộ chuyển động do CSS lo,
 * nên nó chạy ngoài main thread và không tốn re-render.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-reveal", "visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal="hidden"
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
