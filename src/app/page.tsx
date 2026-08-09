import type { Metadata } from "next";
import { QRPanel } from "@/components/QRPanel";
import { Reveal } from "@/components/Reveal";
import { EVENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Make Your Move — The Strategy Game | Xipat Company Trip 2026",
};

const FACTS = [
  { value: "04", label: "Đội" },
  { value: "05", label: "Thử thách" },
  { value: "04", label: "Booster" },
  { value: "01", label: "Quán quân" },
];

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-5 py-14 sm:py-20">
      <RouteLines />

      {/* Một cột trên điện thoại, hai cột khi chiếu lên màn hình ngang. */}
      <div className="relative grid w-full max-w-md items-center gap-12 lg:max-w-5xl lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
              {EVENT.org}
            </p>

            <h1 className="mt-6 text-[clamp(2.6rem,13vw,5.5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
              Make
              <br />
              Your
              <br />
              <span className="text-energy">Move</span>
            </h1>

            <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-8 bg-line-strong lg:hidden" />
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-route">
                {EVENT.subtitle}
              </p>
              <span className="h-px w-8 bg-line-strong" />
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-6 text-[15px] leading-relaxed text-muted lg:max-w-md">
              Mỗi nước đi là một quyết định. Mỗi quyết định là Energy. Giữ Tổng
              Energy cao nhất khi Hải trình khép lại.
            </p>
          </Reveal>

          <Reveal delay={210} className="hidden lg:block">
            <Facts />
          </Reveal>
        </div>

        <div>
          <Reveal delay={140}>
            <QRPanel />
          </Reveal>

          <Reveal delay={210} className="mt-12 lg:hidden">
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
      <p className="mt-5 text-center text-[13px] leading-relaxed text-dim lg:text-left">
        {EVENT.prizeTitle} —{" "}
        <span className="font-semibold text-energy-soft">{EVENT.prize}</span>
      </p>
    </>
  );
}

/** Route + node — mô-típ chủ đạo của Key Visual, vẽ bằng SVG nên nét ở mọi kích thước. */
function RouteLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
      preserveAspectRatio="none"
      viewBox="0 0 400 800"
      fill="none"
    >
      <path
        d="M-20 210 L110 210 L170 150 L330 150 L420 240"
        stroke="var(--route)"
        strokeOpacity="0.28"
        strokeWidth="1"
        className="route-flow"
      />
      <path
        d="M-20 620 L90 620 L150 680 L300 680 L420 590"
        stroke="var(--energy)"
        strokeOpacity="0.22"
        strokeWidth="1"
        className="route-flow"
      />
      <circle cx="110" cy="210" r="3" fill="var(--route)" fillOpacity="0.5" />
      <circle cx="330" cy="150" r="3" fill="var(--route)" fillOpacity="0.5" />
      <circle cx="150" cy="680" r="3" fill="var(--energy)" fillOpacity="0.45" />
      <circle cx="300" cy="680" r="3" fill="var(--energy)" fillOpacity="0.45" />
    </svg>
  );
}
