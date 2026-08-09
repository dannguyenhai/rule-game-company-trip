"use client";

import NumberFlow from "@number-flow/react";
import { useState } from "react";

const PRESETS = [100, 150, 200, 260];

/**
 * Công cụ cho Captain: nhập Tổng Energy đang có, ra ngay các ngưỡng
 * mà luật quy định. Mọi kết quả đều làm tròn xuống, đúng như luật.
 */
export function EnergyCalculator() {
  const [raw, setRaw] = useState("200");
  const energy = Math.max(0, Math.floor(Number(raw) || 0));

  const maxInvest = Math.floor(energy * 0.3);
  const auctionFund = Math.floor(energy * 0.8);
  const reserved = energy - auctionFund;
  const lastBooster = Math.floor(auctionFund * 0.5);

  return (
    <div className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-6">
      <label
        htmlFor="energy-input"
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim"
      >
        Tổng Energy đội đang có
      </label>

      <div className="mt-3 flex items-center gap-3">
        <input
          id="energy-input"
          type="number"
          inputMode="numeric"
          min={0}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="w-full rounded-xl border border-line-strong bg-bg-deep/60 px-4 py-3 font-mono text-2xl font-bold text-energy outline-none transition-colors duration-200 ease-out focus:border-energy/60"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setRaw(String(preset))}
            className="pressable rounded-full border border-line px-3 py-1.5 font-mono text-[12px] text-muted transition-colors duration-200 ease-out hover:border-line-strong hover:text-text"
          >
            {preset}
          </button>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        <Metric
          label="Đầu tư tối đa / Thử thách"
          hint="30% Energy, làm tròn xuống"
          value={maxInvest}
          tone="energy"
        />
        <Metric
          label="Quỹ đấu giá tối đa"
          hint="80% Energy sau Thử thách 2"
          value={auctionFund}
          tone="route"
        />
        <Metric
          label="Energy được bảo toàn"
          hint="Tối thiểu 20% không dùng để đấu giá"
          value={reserved}
        />
        <Metric
          label="Giá Booster cuối cùng"
          hint="50% quỹ đấu giá, nếu đội nhận Booster còn lại"
          value={lastBooster}
        />
      </dl>

      <p className="mt-4 text-[13px] leading-relaxed text-dim">
        Công cụ tham khảo nhanh. Con số chính thức luôn do Game Master công bố
        tại Gameshow.
      </p>
    </div>
  );
}

function Metric({
  label,
  hint,
  value,
  tone = "neutral",
}: {
  label: string;
  hint: string;
  value: number;
  tone?: "neutral" | "energy" | "route";
}) {
  return (
    <div className="rounded-xl border border-line bg-bg-deep/50 px-3.5 py-3">
      <dt className="text-[12px] font-medium leading-snug text-muted">
        {label}
      </dt>
      <dd
        className={
          "mt-1 font-mono text-xl font-bold tabular-nums sm:text-2xl " +
          (tone === "energy"
            ? "text-energy"
            : tone === "route"
              ? "text-route"
              : "text-text")
        }
      >
        <NumberFlow value={value} />
      </dd>
      <p className="mt-1 text-[12px] leading-snug text-dim">{hint}</p>
    </div>
  );
}
