import type { ReactNode } from "react";
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

/**
 * Nội dung các màn, dựng ở phía máy chủ và truyền vào deck. Nhờ vậy luật chơi
 * không nằm trong gói JavaScript tải về trình duyệt, nên trước giờ mở không
 * ai đọc trước được. Thứ tự phải khớp DECK_META.
 */
export const SECTION_NODES: ReactNode[] = [
  <IntroSection key="mo-dau" />,
  <GoalSection key="muc-tieu" />,
  <PrepSection key="chuan-bi" />,
  <FlowSection key="hai-trinh" />,
  <MapSection key="so-do" />,
  <InvestSection key="dau-tu" />,
  <AuctionSection key="dau-gia" />,
  <BoosterSection key="booster" />,
  <ResultSection key="ket-qua" />,
  <RememberSection key="ghi-nho" />,
];
