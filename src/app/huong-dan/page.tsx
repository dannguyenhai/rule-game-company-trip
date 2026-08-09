import type { Metadata } from "next";
import { GuideDeck } from "@/components/deck/GuideDeck";

export const metadata: Metadata = {
  title: "Hướng dẫn người chơi — Dẫn Lối | Xipat Company Trip 2026",
  description:
    "05 Thử thách, cơ chế đầu tư Energy, đấu giá 04 Booster và điều kiện giành ngôi Quán quân.",
};

export default function GuidePage() {
  return <GuideDeck />;
}
