"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DECK } from "@/components/sections/registry";
import { DeckNav } from "./DeckNav";

const EASE = [0.23, 1, 0.32, 1] as const;
/** Khoá chuyển màn: đủ dài để animation chạy xong, đủ ngắn để không thấy chờ. */
const LOCK_MS = 520;
/** Trackpad có quán tính — chỉ nhả khoá khi ngón tay đã thực sự dừng. */
const MOMENTUM_MS = 400;
const WHEEL_THRESHOLD = 80;
const SWIPE_THRESHOLD = 60;

export function GuideDeck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();

  const scrollerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLSpanElement>(null);
  const lockRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const wheelAccRef = useRef(0);
  const touchRef = useRef({ y: 0, lastY: 0, atTop: false, atBottom: false });

  const armRelease = useCallback((ms: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      lockRef.current = false;
      wheelAccRef.current = 0;
    }, ms);
  }, []);

  const goTo = useCallback(
    (next: number, dir?: number) => {
      if (next < 0 || next >= DECK.length) return;
      setDirection(dir ?? (next > index ? 1 : -1));
      setIndex(next);
      lockRef.current = true;
      wheelAccRef.current = 0;
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

  // Nội dung dài hơn màn hình thì cuộn trong phần đó trước; chỉ khi đã chạm
  // mép mới chuyển sang phần kế tiếp.
  const onWheel = useCallback(
    (event: React.WheelEvent) => {
      if (lockRef.current) {
        armRelease(MOMENTUM_MS);
        return;
      }

      const { atTop, atBottom } = edges();
      const goingDown = event.deltaY > 0;
      if ((goingDown && !atBottom) || (!goingDown && !atTop)) {
        wheelAccRef.current = 0;
        return;
      }

      wheelAccRef.current += event.deltaY;
      if (Math.abs(wheelAccRef.current) >= WHEEL_THRESHOLD) {
        step(wheelAccRef.current > 0 ? 1 : -1);
      }
    },
    [armRelease, edges, step],
  );

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      const y = event.touches[0].clientY;
      const { atTop, atBottom } = edges();
      touchRef.current = { y, lastY: y, atTop, atBottom };
    },
    [edges],
  );

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    touchRef.current.lastY = event.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(() => {
    const { y, lastY, atTop, atBottom } = touchRef.current;
    const delta = y - lastY;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;

    const now = edges();
    // Phải ở mép cả lúc bắt đầu lẫn lúc kết thúc cú vuốt, để một cú vuốt dài
    // trong nội dung không vô tình nhảy màn.
    if (delta > 0 && atBottom && now.atBottom) step(1);
    if (delta < 0 && atTop && now.atTop) step(-1);
  }, [edges, step]);

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
          goTo(DECK.length - 1);
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
      const found = DECK.findIndex(
        (entry) => entry.id === initialHashRef.current,
      );
      if (found > 0) goTo(found, 1);
    });
    return () => cancelAnimationFrame(frame);
    // Chỉ chạy một lần lúc mở trang.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${DECK[index].id}`);
  }, [index]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const { Component, id } = DECK[index];
  const total = DECK.length;

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
        onWheel={onWheel}
        onScroll={syncFade}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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
            <Component />
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
