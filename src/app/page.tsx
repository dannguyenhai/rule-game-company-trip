import type { Metadata } from "next";
import { Suspense } from "react";
import { QRPanel } from "@/components/QRPanel";
import { Reveal } from "@/components/Reveal";
import { XipatLogo } from "@/components/XipatLogo";
import { AccessGate } from "@/components/home/AccessGate";
import { Countdown } from "@/components/home/Countdown";
import { DESTINATION_NODES, EVENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dẫn Lối — Make Your Move | Gala Dinner Xipat Company Trip 2026",
};

const FACTS = [
  { value: "04", label: "Đội" },
  { value: "05", label: "Thử thách" },
  { value: "04", label: "Booster" },
  { value: "01", label: "Quán quân" },
];

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-9 sm:py-14">
      <SeaRoute />

      {/* Một cột trên điện thoại, hai cột khi chiếu lên màn hình ngang. */}
      <div className="relative grid w-full max-w-md items-center gap-9 lg:max-w-5xl lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="text-center lg:text-left">
          <Reveal>
            <XipatLogo size="lg" className="justify-center lg:justify-start" />
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
              {EVENT.org}
            </p>

            <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-7 bg-line-strong" />
              <p className="font-mono text-[12px] uppercase tracking-[0.34em] text-route">
                {EVENT.occasion}
              </p>
              <span className="h-px w-7 bg-line-strong" />
            </div>

            <h1 className="chrome-text mt-2 font-display text-[clamp(3rem,15vw,7rem)] font-black uppercase leading-[1.02] tracking-[-0.01em]">
              {EVENT.title}
            </h1>

            <p className="mt-3 font-mono text-[clamp(0.72rem,3.4vw,1.05rem)] uppercase tracking-[0.42em] text-text/90">
              {EVENT.titleEn}
              <span className="text-energy">_</span>
            </p>

            <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-7 bg-line-strong lg:hidden" />
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-energy">
                {EVENT.subtitle}
              </p>
              <span className="h-px w-7 bg-line-strong" />
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-5 text-[15px] leading-relaxed text-muted lg:max-w-md">
              Mỗi nước đi là một quyết định. Mỗi quyết định là Energy. Giữ Tổng
              Energy cao nhất khi Hải trình khép lại.
            </p>
          </Reveal>

          <Reveal delay={110} className="mt-6 lg:max-w-md">
            <Countdown />
          </Reveal>

          <Reveal delay={210} className="hidden lg:mt-7 lg:block">
            <Facts />
          </Reveal>
        </div>

        <div>
          <Reveal delay={140}>
            <QRPanel />
          </Reveal>

          <Reveal delay={180} className="mx-auto mt-5 flex max-w-70">
            <Suspense fallback={<div className="h-12 w-full" />}>
              <AccessGate />
            </Suspense>
          </Reveal>

          <Reveal delay={220} className="mt-8 lg:hidden">
            <Facts />
          </Reveal>
        </div>
      </div>
    </main>
  );
}

function Facts() {
  return (
    <>
      <dl className="grid grid-cols-4 gap-2 border-y border-line py-5">
        {FACTS.map((fact) => (
          <div key={fact.label} className="text-center lg:text-left">
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-mono text-xl font-bold text-text">
              {fact.value}
            </dd>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-dim">
              {fact.label}
            </p>
          </div>
        ))}
      </dl>
      {/* Phần thưởng là thứ kéo người chơi vào cuộc — không để nó chìm. */}
      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 overflow-hidden rounded-2xl border border-energy/30 bg-bg-deep/85 px-4 py-3.5 text-left">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 120% at 100% 50%, rgb(79 193 255 / 0.18), transparent 70%)",
          }}
        />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-energy">
            Giải Quán quân
          </p>
          <p className="mt-1 text-[12px] font-medium text-muted">
            Dẫn Lối Xuất Sắc 2026
          </p>
        </div>
        <p
          className="relative font-mono text-[clamp(1.3rem,6.5vw,1.8rem)] font-black leading-none whitespace-nowrap text-energy"
          style={{ textShadow: "0 0 26px rgb(79 193 255 / 0.45)" }}
        >
          {EVENT.prize}
        </p>
      </div>
    </>
  );
}

const ROUTE_PATH =
  "M-40 400 C 220 380, 300 300, 460 288 S 720 250, 880 190 S 1140 120, 1300 40";

/**
 * Các điểm nằm chính xác trên đường hải trình, dồn về nửa trái như Key Visual
 * để nhãn không chạm vùng mã QR bên phải.
 */
const ROUTE_NODES = [
  { x: 247, y: 341, at: 0.21 },
  { x: 460, y: 288, at: 0.34 },
  { x: 670, y: 257, at: 0.47 },
];

/**
 * Hải trình của Key Visual: đường sáng chạy qua các cột mốc chiến lược,
 * kết thúc ở la bàn Destination 2026. Vẽ bằng SVG nên nét ở mọi kích thước.
 */
function SeaRoute() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Node vẽ trong cùng hệ toạ độ với đường, nên luôn nằm đúng trên hải trình. */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[40%] w-full opacity-45 sm:opacity-100"
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <path
          d={ROUTE_PATH}
          pathLength="1"
          stroke="var(--energy)"
          strokeOpacity="0.35"
          strokeWidth="2"
          className="route-draw"
        />
        <path
          d={ROUTE_PATH}
          pathLength="1"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="1"
          className="route-draw"
        />

        {/* Cột mốc sáng lên đúng lúc nét vẽ chạy tới, nên chuyển động nói
            đúng một điều: hải trình đi qua đây. */}
        {ROUTE_NODES.map(({ x, y, at }, i) => (
          <g
            key={DESTINATION_NODES[i]}
            // Trên màn hẹp, chấm mốc rơi trúng vùng chữ nên chỉ hiện từ sm trở lên.
            className="route-node max-sm:hidden"
            style={{ "--node-delay": `${200 + at * 1400}ms` } as React.CSSProperties}
          >
            <circle cx={x} cy={y} r="12" fill="var(--energy)" fillOpacity="0.14" />
            <circle cx={x} cy={y} r="5" fill="var(--energy)" fillOpacity="0.9" />
          </g>
        ))}
      </svg>

      <Compass />
    </div>
  );
}

function Compass() {
  return (
    <svg
      className="absolute -right-24 top-[6%] size-[420px] opacity-[0.12] sm:-right-16 lg:right-[4%] lg:opacity-30"
      viewBox="0 0 200 200"
      fill="none"
    >
      <circle cx="100" cy="100" r="88" stroke="var(--energy)" strokeOpacity="0.45" />
      <circle cx="100" cy="100" r="72" stroke="var(--route)" strokeOpacity="0.25" />
      <circle
        cx="100"
        cy="100"
        r="58"
        stroke="var(--energy)"
        strokeOpacity="0.3"
        strokeDasharray="2 6"
      />
      <path
        d="M100 26 L110 96 L100 174 L90 96 Z"
        fill="var(--route)"
        fillOpacity="0.5"
      />
      <path
        d="M26 100 L96 90 L174 100 L96 110 Z"
        fill="var(--route)"
        fillOpacity="0.28"
      />
      <circle cx="100" cy="100" r="9" stroke="var(--energy)" strokeOpacity="0.7" />
      <circle cx="100" cy="16" r="2.5" fill="var(--energy)" />
    </svg>
  );
}
