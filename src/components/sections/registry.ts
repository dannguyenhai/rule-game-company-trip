import type { ComponentType } from "react";
import { ActivateSection } from "./ActivateSection";
import { AuctionSection } from "./AuctionSection";
import { BoosterSection } from "./BoosterSection";
import { EnergyMathSection } from "./EnergyMathSection";
import { FlowSection } from "./FlowSection";
import { GoalSection } from "./GoalSection";
import { IntroSection } from "./IntroSection";
import { InvestSection } from "./InvestSection";
import { MapSection } from "./MapSection";
import { PrepSection } from "./PrepSection";
import { RememberSection } from "./RememberSection";
import { ResultSection } from "./ResultSection";
import { TiebreakSection } from "./TiebreakSection";

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
  { id: "kich-hoat", label: "Kích hoạt Energy", Component: ActivateSection },
  { id: "hai-trinh", label: "Hải trình", Component: FlowSection },
  { id: "so-do", label: "Sơ đồ", Component: MapSection },
  { id: "dau-tu", label: "Đầu tư Energy", Component: InvestSection },
  { id: "cong-tru", label: "Cộng / Trừ", Component: EnergyMathSection },
  { id: "dau-gia", label: "Đấu giá", Component: AuctionSection },
  { id: "booster", label: "Booster", Component: BoosterSection },
  { id: "ket-qua", label: "Kết quả", Component: ResultSection },
  { id: "phan-dinh", label: "Phân định", Component: TiebreakSection },
  { id: "ghi-nho", label: "07 điều cần nhớ", Component: RememberSection },
];
