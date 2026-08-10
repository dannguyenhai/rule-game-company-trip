"use client";

import NumberFlow from "@number-flow/react";
import { useState } from "react";

const PRESETS = [100, 150, 200, 260];

export type CalculatorLabels = {
  input: string;
  note: string;
  metrics: {
    key: "invest" | "fund" | "reserved" | "last";
    label: string;
    hint: string;
  }[];
};

/**
 * Công cụ cho Captain: nhập Tổng Energy đang có, ra ngay các ngưỡng mà luật
 * quy định. Mọi kết quả đều làm tròn xuống, đúng như luật.
 *
 * Chữ nghĩa nhận từ phía máy chủ để không có câu luật nào lọt vào gói
 * JavaScript tải về trình duyệt trước giờ mở.
 */
export function EnergyCalculator({ labels }: { labels: CalculatorLabels }) {
  const [raw, setRaw] = useState("200");
  const energy = Math.max(0, Math.floor(Number(raw) || 0));

  const maxInvest = Math.floor(energy * 0.3);
  const auctionFund = Math.floor(energy * 0.8);
  const reserved = energy - auctionFund;
  const lastBooster = Math.floor(auctionFund * 0.5);

  const VALUES = {
    invest: maxInvest,
    fund: auctionFund,
    reserved,
    last: lastBooster,
  };

  return (
    <div className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-6">
      <label
        htmlFor="energy-input"
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim"
      >
        {labels.input}
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
        {labels.metrics.map((metric) => (
          <Metric
            key={metric.key}
            label={metric.label}
            hint={metric.hint}
            value={VALUES[metric.key]}
            tone={
              metric.key === "invest"
                ? "energy"
                : metric.key === "fund"
                  ? "route"
                  : "neutral"
            }
          />
        ))}
      </dl>

      <p className="mt-4 text-[13px] leading-relaxed text-dim">
        {labels.note}
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
