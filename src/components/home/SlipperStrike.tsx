"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/** Tổng thời lượng màn trừng phạt, tính bằng ms. */
const TOTAL_MS = 2100;

/**
 * Nhập sai mật khẩu BTC thì ăn một chiếc dép tông: dép bay tới, màn hình nứt,
 * cả trang rung, cảnh báo đỏ nổi lên. Chạy đúng một lượt rồi biến mất.
 *
 * Người chơi chỉ gặp khi gõ sai nên đây là chỗ hiếm hoi được phép bày trò;
 * ai bật chế độ giảm chuyển động thì chỉ thấy cảnh báo đỏ, không dép không rung.
 */
export function SlipperStrike() {
  const [gone, setGone] = useState(false);

  // Đọc một lần lúc dựng: hiệu ứng chỉ sống hai giây, không cần theo dõi tiếp.
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!reduce) {
      // Rung phần nội dung, không rung body: body có transform sẽ trở thành
      // gốc neo của position:fixed và kéo lớp phủ đi theo trang.
      const stage = document.querySelector("main");
      const shakeOn = window.setTimeout(
        () => stage?.classList.add("screen-shake"),
        600,
      );
      const shakeOff = window.setTimeout(
        () => stage?.classList.remove("screen-shake"),
        1150,
      );
      const done = window.setTimeout(() => setGone(true), TOTAL_MS);
      return () => {
        window.clearTimeout(shakeOn);
        window.clearTimeout(shakeOff);
        window.clearTimeout(done);
        stage?.classList.remove("screen-shake");
      };
    }

    const done = window.setTimeout(() => setGone(true), 1400);
    return () => window.clearTimeout(done);
  }, [reduce]);

  if (gone || typeof document === "undefined") return null;

  // Lớp phủ treo thẳng vào body để không phần tử cha nào kéo nó lệch đi.
  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* Ánh chớp đỏ lúc va chạm */}
      {!reduce ? <span className="strike-flash absolute inset-0" /> : null}

      {/* Vết nứt lan ra từ điểm dép đập vào */}
      <CrackOverlay instant={reduce} />

      {/* Viền cảnh báo */}
      <span className="warning-frame absolute inset-0" />

      {!reduce ? (
        <div className="slipper-fly absolute left-1/2 top-1/2 w-[clamp(120px,34vw,220px)]">
          <Slipper />
        </div>
      ) : null}

      <div className="absolute inset-x-0 top-[18%] flex justify-center px-5">
        <div className="warning-badge flex items-center gap-2.5 rounded-xl border-2 border-delta bg-bg-deep/90 px-4 py-3 sm:px-5 sm:py-3.5">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-delta"
          >
            <path
              d="M12 3.5 22 20H2L12 3.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M12 10v4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="17" r="1.2" fill="currentColor" />
          </svg>
          <div>
            <p className="text-[15px] font-black uppercase tracking-tight text-delta sm:text-lg">
              Sai mật khẩu!
            </p>
            <p className="mt-0.5 text-[12px] font-medium text-delta/80">
              Ăn nguyên một chiếc dép của BTC.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Slipper() {
  return (
    <svg viewBox="0 0 120 264" fill="none" className="w-full drop-shadow-2xl">
      <path
        d="M60 6c31 0 47 27 47 63 0 41-10 63-10 106 0 47-15 85-37 85s-37-38-37-85c0-43-10-65-10-106C13 33 29 6 60 6Z"
        fill="#eef3fa"
        stroke="#0b3fa8"
        strokeWidth="6"
      />
      <path
        d="M60 24c22 0 33 20 33 46 0 30-7 46-7 78 0 34-11 62-26 62s-26-28-26-62c0-32-7-48-7-78 0-26 11-46 33-46Z"
        fill="none"
        stroke="#0b3fa8"
        strokeOpacity="0.28"
        strokeWidth="3"
      />
      <path
        d="M60 52 33 104"
        stroke="#0b3fa8"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M60 52 87 104"
        stroke="#0b3fa8"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx="60" cy="50" r="9" fill="#0b3fa8" />
    </svg>
  );
}

function CrackOverlay({ instant }: { instant: boolean }) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={instant ? "absolute inset-0 size-full" : "crack absolute inset-0 size-full"}
    >
      <g stroke="#ffffff" strokeOpacity="0.85" strokeLinecap="round">
        <path d="M200 200 172 150 186 96 160 34" strokeWidth="2.4" />
        <path d="M200 200 246 158 268 104 316 44" strokeWidth="2.2" />
        <path d="M200 200 258 214 318 196 386 214" strokeWidth="2.4" />
        <path d="M200 200 236 252 226 314 264 388" strokeWidth="2" />
        <path d="M200 200 178 258 128 292 96 372" strokeWidth="2.2" />
        <path d="M200 200 140 216 82 202 10 226" strokeWidth="2.4" />
        <path d="M200 200 150 172 92 168 22 132" strokeWidth="2" />
        <path d="M186 96 232 118M268 104 246 158M318 196 258 214M226 314 236 252M128 292 178 258M82 202 140 216M92 168 150 172" strokeWidth="1.4" strokeOpacity="0.5" />
      </g>
      <g stroke="#4fc1ff" strokeOpacity="0.5" strokeLinecap="round" strokeWidth="1.2">
        <path d="M200 200 172 150 186 96 160 34" />
        <path d="M200 200 258 214 318 196 386 214" />
        <path d="M200 200 178 258 128 292 96 372" />
      </g>
      <circle cx="200" cy="200" r="26" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="200" cy="200" r="12" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2.4" />
    </svg>
  );
}
