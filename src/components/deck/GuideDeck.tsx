"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { DECK_META, HASH_ALIASES } from "@/lib/deck-meta";
import { DeckNav } from "./DeckNav";

const EASE = [0.23, 1, 0.32, 1] as const;
/** Khoá chuyển màn: đủ dài để animation chạy xong, đủ ngắn để không thấy chờ. */
const LOCK_MS = 520;

export function GuideDeck({ sections }: { sections: ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();

  const scrollerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLSpanElement>(null);
  const lockRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const armRelease = useCallback((ms: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      lockRef.current = false;
    }, ms);
  }, []);

  const goTo = useCallback(
    (next: number, dir?: number) => {
      if (next < 0 || next >= DECK_META.length) return;
      setDirection(dir ?? (next > index ? 1 : -1));
      setIndex(next);
      lockRef.current = true;
      armRelease(LOCK_MS);
    },
    [armRelease, index],
  );

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      goTo(index + dir, dir);
    },
    [goTo, index],
  );

  /** Đang ở mép trên / mép dưới của phần nội dung đang mở? */
  const edges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return { atTop: true, atBottom: true };
    return {
      atTop: el.scrollTop <= 1,
      atBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 1,
    };
  }, []);

  // Vệt mờ ở đáy chỉ xuất hiện khi phần đang mở còn nội dung bên dưới.
  const syncFade = useCallback(() => {
    const el = scrollerRef.current;
    const fade = fadeRef.current;
    if (!el || !fade) return;
    const remaining = el.scrollHeight - el.clientHeight - el.scrollTop;
    fade.style.opacity = remaining > 24 ? "1" : "0";
  }, []);

  // Bàn phím: mũi tên, Page Up/Down, Home/End.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const { atTop, atBottom } = edges();
      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          if (!atBottom) return;
          event.preventDefault();
          step(1);
          break;
        case "ArrowUp":
        case "PageUp":
          if (!atTop) return;
          event.preventDefault();
          step(-1);
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(DECK_META.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edges, goTo, step]);

  // Hash phải được đọc ngay ở lần render đầu: effect có thể chạy hai lần và
  // lần ghi hash sẽ xoá mất địa chỉ người dùng gửi tới (#booster, #ghi-nho…).
  const initialHashRef = useRef<string | null>(null);
  if (initialHashRef.current === null) {
    initialHashRef.current =
      typeof window === "undefined" ? "" : window.location.hash.slice(1);
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const hash = initialHashRef.current ?? "";
      const id = HASH_ALIASES[hash] ?? hash;
      const found = DECK_META.findIndex((entry) => entry.id === id);
      if (found > 0) goTo(found, 1);
    });
    return () => cancelAnimationFrame(frame);
    // Chỉ chạy một lần lúc mở trang.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${DECK_META[index].id}`);
  }, [index]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const { id } = DECK_META[index];
  const total = DECK_META.length;

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      transform: reduce
        ? "translateY(0px)"
        : `translateY(${dir >= 0 ? 24 : -24}px)`,
    }),
    center: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: reduce ? 0.2 : 0.26, ease: EASE },
    },
    exit: (dir: number) => ({
      opacity: 0,
      transform: reduce
        ? "translateY(0px)"
        : `translateY(${dir >= 0 ? -18 : 18}px)`,
      transition: { duration: reduce ? 0.12 : 0.15, ease: EASE },
    }),
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <header className="relative z-30 shrink-0 border-b border-line bg-bg/92 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <DeckNav activeIndex={index} onSelect={(next) => goTo(next)} />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-energy transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${(index + 1) / total})` }}
        />
      </header>

      <div
        ref={scrollerRef}
        onScroll={syncFade}
        className="relative flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence
          mode="wait"
          custom={direction}
          onExitComplete={() => {
            if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
          }}
        >
          <motion.section
            key={id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationComplete={syncFade}
            // flex + m-auto ở trong: màn ngắn thì căn giữa theo chiều dọc,
            // màn dài vẫn cuộn bình thường.
            className="flex min-h-full"
          >
            {sections[index]}
          </motion.section>
        </AnimatePresence>
      </div>

      <span
        ref={fadeRef}
        aria-hidden
        style={{ opacity: 0 }}
        className="pointer-events-none relative z-20 -mt-16 h-16 shrink-0 bg-linear-to-t from-bg to-transparent transition-opacity duration-200 ease-out"
      />

      {/* Thanh điều hướng nằm trong tầm ngón cái, chừa chỗ cho home indicator. */}
      <footer className="relative z-30 shrink-0 border-t border-line bg-bg/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={index === 0}
            className="pressable flex h-12 shrink-0 items-center rounded-full border border-line-strong px-5 text-sm font-semibold text-muted transition-colors duration-200 ease-out hover:text-text disabled:pointer-events-none disabled:opacity-25"
          >
            ← Trước
          </button>

          <p className="flex-1 text-center font-mono text-[13px] tabular-nums text-dim">
            <span className="text-text">
              {String(index + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(total).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={index === total - 1}
            className="pressable flex h-12 shrink-0 items-center rounded-full bg-energy px-6 text-sm font-bold text-bg-deep disabled:pointer-events-none disabled:opacity-25"
          >
            Tiếp →
          </button>
        </div>
      </footer>
    </div>
  );
}
