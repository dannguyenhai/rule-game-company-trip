import type { Metadata } from "next";
import { GuideDeck } from "@/components/deck/GuideDeck";
import { SECTION_NODES } from "@/components/sections";

export const metadata: Metadata = {
  title: "Hướng dẫn người chơi — Dẫn Lối | Xipat Company Trip 2026",
  description:
    "05 Thử thách, cơ chế đầu tư Energy, đấu giá 04 Booster và điều kiện giành ngôi Quán quân.",
};

/**
 * Luôn dựng theo yêu cầu, không sinh sẵn bản tĩnh — nhờ vậy mọi lượt truy cập
 * đều đi qua cổng kiểm tra giờ mở trong proxy.ts.
 */
export const dynamic = "force-dynamic";

export default function GuidePage() {
  return <GuideDeck sections={SECTION_NODES} />;
}
