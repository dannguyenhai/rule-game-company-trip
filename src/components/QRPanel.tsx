"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState, useSyncExternalStore } from "react";

const GUIDE_PATH = "/huong-dan";

/** Origin không đổi trong suốt một phiên, nên không cần subscribe gì cả. */
const subscribeToOrigin = () => () => {};
const getOrigin = () => window.location.origin;
const getServerOrigin = () => "";

/**
 * Mã QR luôn trỏ về chính domain đang phục vụ trang này, nên bản in,
 * bản chiếu và bản preview đều quét ra đúng địa chỉ mà không cần cấu hình.
 */
export function QRPanel() {
  const origin = useSyncExternalStore(
    subscribeToOrigin,
    getOrigin,
    getServerOrigin,
  );
  const url = origin ? origin + GUIDE_PATH : "";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);


  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-3xl border border-line-strong bg-white p-4 shadow-[0_0_70px_-10px_rgb(79_193_255/0.55)] sm:p-5">
        {url ? (
          <QRCodeSVG
            value={url}
            size={208}
            // Mức sửa lỗi H chịu được 30% mã bị che, nên logo ở giữa không
            // làm mã mất khả năng quét.
            level="H"
            bgColor="#ffffff"
            fgColor="#041226"
            marginSize={0}
            imageSettings={{
              src: "/xipat-qr-mark.svg",
              height: 46,
              width: 46,
              excavate: true,
            }}
          />
        ) : (
          <div className="size-52 animate-pulse rounded-lg bg-neutral-200" />
        )}
      </div>

      <p className="mt-5 text-center text-[15px] font-semibold">
        Quét mã để đọc Hướng dẫn người chơi
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={async () => {
            if (!url) return;
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          className="pressable flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-semibold text-muted transition-colors duration-200 ease-out hover:text-text"
        >
          {copied ? "Đã sao chép" : "Sao chép link"}
        </button>
      </div>
    </div>
  );
}
