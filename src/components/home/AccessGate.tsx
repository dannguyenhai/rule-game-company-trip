"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UNLOCK_FULL_LABEL } from "@/lib/event-time";
import { SlipperStrike } from "./SlipperStrike";
import { useCountdown } from "./useCountdown";

const GUIDE_PATH = "/huong-dan";

export function AccessGate() {
  const { ready, unlocked } = useCountdown();
  const router = useRouter();
  const params = useSearchParams();
  const wasRedirected = params.get("khoa") === "1";

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  /** Đếm số lần gõ sai — đổi giá trị là dép bay lại từ đầu. */
  const [strikes, setStrikes] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);

    if (res?.ok) {
      router.push(GUIDE_PATH);
      return;
    }
    setStatus("error");
    setStrikes((count) => count + 1);
  }

  if (unlocked) {
    return (
      <a
        href={GUIDE_PATH}
        className="pressable flex h-12 w-full items-center justify-center rounded-full bg-energy px-6 text-sm font-bold text-bg-deep"
      >
        Mở hướng dẫn
      </a>
    );
  }

  return (
    <div className="w-full">
      {strikes > 0 ? <SlipperStrike key={strikes} /> : null}

      <div
        aria-disabled
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold text-dim"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M4.5 7V5a3.5 3.5 0 1 1 7 0v2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect
            x="3"
            y="7"
            width="10"
            height="7"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        {ready ? "Hướng dẫn chưa mở" : "Đang kiểm tra giờ mở"}
      </div>

      {wasRedirected ? (
        <p className="mt-2.5 text-center text-[13px] leading-relaxed text-delta">
          Hướng dẫn sẽ mở lúc {UNLOCK_FULL_LABEL}.
        </p>
      ) : null}

      {open ? (
        <form onSubmit={submit} className="mt-3">
          <label
            htmlFor="admin-password"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim"
          >
            Mật khẩu BTC
          </label>
          <div className="mt-2 flex gap-2">
            <input
              ref={inputRef}
              id="admin-password"
              type="password"
              value={password}
              autoComplete="off"
              onChange={(event) => {
                setPassword(event.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="h-12 min-w-0 flex-1 rounded-xl border border-line-strong bg-bg-deep/60 px-4 text-base outline-none transition-colors duration-200 ease-out focus:border-energy/60"
            />
            <button
              type="submit"
              disabled={status === "sending" || password.length === 0}
              className="pressable h-12 shrink-0 rounded-xl bg-energy px-5 text-sm font-bold text-bg-deep disabled:pointer-events-none disabled:opacity-30"
            >
              {status === "sending" ? "Đang mở…" : "Vào"}
            </button>
          </div>
          {status === "error" ? (
            <p className="mt-2 text-[13px] font-semibold text-delta">
              Mật khẩu không đúng — thử lại lần nữa.
            </p>
          ) : null}
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pressable mt-2.5 flex h-10 w-full items-center justify-center rounded-full text-[13px] font-medium text-muted transition-colors duration-200 ease-out hover:text-text"
        >
          BTC vào trước giờ mở →
        </button>
      )}
    </div>
  );
}
