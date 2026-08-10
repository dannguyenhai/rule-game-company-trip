"use client";

import { UNLOCK_DATE_LABEL, UNLOCK_TIME_LABEL } from "@/lib/event-time";
import { useCountdown } from "./useCountdown";

export function Countdown() {
  const { ready, unlocked, days, hours, minutes, seconds } = useCountdown();

  if (unlocked) {
    return (
      <div className="flex items-center gap-2.5 rounded-xl border border-energy/30 bg-energy/8 px-4 py-3">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-energy opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-energy" />
        </span>
        <p className="text-[14px] font-semibold text-energy">
          Hướng dẫn đã mở — mời bạn quét mã
        </p>
      </div>
    );
  }

  const cells = [
    { value: days, label: "Ngày" },
    { value: hours, label: "Giờ" },
    { value: minutes, label: "Phút" },
    { value: seconds, label: "Giây" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-energy/25 bg-bg-deep/85 p-4 sm:p-5">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, rgb(79 193 255 / 0.16), transparent 72%)",
        }}
      />

      <p className="relative font-mono text-[10px] uppercase tracking-[0.24em] text-energy">
        Hướng dẫn mở lúc {UNLOCK_TIME_LABEL} · {UNLOCK_DATE_LABEL}
      </p>

      <div className="relative mt-3.5 grid grid-cols-4 gap-2 sm:gap-2.5">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="rounded-xl border border-line bg-bg-deep/60 px-1 py-3 text-center sm:py-4"
          >
            <p
              className="font-mono text-[clamp(1.9rem,9.5vw,3rem)] font-black leading-none tabular-nums text-energy"
              style={{ textShadow: "0 0 24px rgb(79 193 255 / 0.4)" }}
            >
              {ready ? String(cell.value).padStart(2, "0") : "--"}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-wider text-dim">
              {cell.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
