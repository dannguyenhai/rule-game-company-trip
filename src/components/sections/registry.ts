import type { ComponentType } from "react";
import { AuctionSection } from "./AuctionSection";
import { BoosterSection } from "./BoosterSection";
import { FlowSection } from "./FlowSection";
import { GoalSection } from "./GoalSection";
import { IntroSection } from "./IntroSection";
import { InvestSection } from "./InvestSection";
import { MapSection } from "./MapSection";
import { PrepSection } from "./PrepSection";
import { RememberSection } from "./RememberSection";
import { ResultSection } from "./ResultSection";

export type DeckEntry = {
  /** Dùng cho hash trên URL, nên giữ nguyên khi sửa nội dung. */
  id: string;
  label: string;
  Component: ComponentType;
};

/** Thứ tự các màn của Hướng dẫn. Thêm một phần = thêm một dòng ở đây. */
export const DECK: DeckEntry[] = [
  { id: "mo-dau", label: "Mở đầu", Component: IntroSection },
  { id: "muc-tieu", label: "Mục tiêu", Component: GoalSection },
  { id: "chuan-bi", label: "Chuẩn bị", Component: PrepSection },
  { id: "hai-trinh", label: "Hải trình", Component: FlowSection },
  { id: "so-do", label: "Sơ đồ", Component: MapSection },
  { id: "dau-tu", label: "Energy", Component: InvestSection },
  { id: "dau-gia", label: "Đấu giá", Component: AuctionSection },
  { id: "booster", label: "Booster", Component: BoosterSection },
  { id: "ket-qua", label: "Kết quả", Component: ResultSection },
  { id: "ghi-nho", label: "Ghi nhớ", Component: RememberSection },
];
