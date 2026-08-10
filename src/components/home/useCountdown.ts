"use client";

import { useEffect, useState } from "react";
import { UNLOCK_AT_MS } from "@/lib/event-time";

export type Countdown = {
  /** null cho tới khi đồng hồ máy người dùng được đọc lần đầu. */
  ready: boolean;
  unlocked: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const IDLE: Countdown = {
  ready: false,
  unlocked: false,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function useCountdown(): Countdown {
  const [state, setState] = useState<Countdown>(IDLE);

  useEffect(() => {
    const tick = () => {
      const remain = Math.max(0, UNLOCK_AT_MS - Date.now());
      const total = Math.floor(remain / 1000);
      setState({
        ready: true,
        unlocked: remain === 0,
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
      });
    };

    // Đọc ngay ở khung hình đầu, rồi nhịp mỗi giây.
    const frame = requestAnimationFrame(tick);
    const timer = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  return state;
}
