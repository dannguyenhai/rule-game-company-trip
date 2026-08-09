/**
 * Toàn bộ nội dung luật chơi. Một nguồn sự thật duy nhất — BTC sửa ở đây,
 * cả website cập nhật theo.
 */

export const EVENT = {
  org: "Xipat Company Trip 2026",
  occasion: "Gala Dinner",
  title: "Dẫn Lối",
  titleEn: "Make Your Move",
  subtitle: "The Strategy Game",
  destination: "Destination 2026",
  docTitle: "Hướng dẫn dành cho người chơi",
  prize: "6.000.000 VNĐ",
  prizeTitle: "Quán quân — Giải Dẫn Lối Xuất Sắc 2026",
} as const;

/** Các cột mốc chiến lược trên Key Visual của sự kiện. */
export const DESTINATION_NODES = ["X2", "Moats", "AI-First"] as const;

/* ------------------------------------------------------------------ */
/* Sơ đồ hải trình                                                      */
/* ------------------------------------------------------------------ */

export type JourneyKind = "ritual" | "challenge" | "auction" | "final";

export type JourneyStop = {
  code: string;
  title: string;
  detail: string;
  kind: JourneyKind;
  tags?: string[];
};

export const JOURNEY: JourneyStop[] = [
  {
    code: "00",
    title: "Nhiệm vụ kích hoạt Energy",
    detail: "Màn ra mắt đội — tối đa 03 phút.",
    kind: "ritual",
    tags: ["Bắt buộc với cả 04 đội"],
  },
  {
    code: "01",
    title: "Mở nguồn Energy",
    detail: "Game Master công bố số Energy khởi đầu.",
    kind: "ritual",
  },
  {
    code: "TT1",
    title: "Kiến thức",
    detail: "Chọn 05 người tham gia.",
    kind: "challenge",
    tags: ["05 người", "Có đầu tư Energy"],
  },
  {
    code: "TT2",
    title: "Nghệ thuật",
    detail: "Toàn đội cùng tham gia.",
    kind: "challenge",
    tags: ["Toàn đội", "Có đầu tư Energy"],
  },
  {
    code: "AUC",
    title: "Đấu giá vật phẩm Booster",
    detail: "Vòng kín rồi vòng công khai. Mỗi đội sở hữu đúng 01 Booster.",
    kind: "auction",
    tags: ["Quỹ tối đa 80% Energy"],
  },
  {
    code: "TT3",
    title: "Phản xạ",
    detail: "Chọn 10 người tham gia.",
    kind: "challenge",
    tags: ["10 người", "Không đầu tư Energy"],
  },
  {
    code: "TT4",
    title: "Teamwork",
    detail: "Toàn đội cùng tham gia.",
    kind: "challenge",
    tags: ["Toàn đội", "Có đầu tư Energy", "Có thể dùng Booster"],
  },
  {
    code: "TT5",
    title: "May rủi",
    detail: "Lượt đầu tư Energy cuối cùng của Hải trình.",
    kind: "challenge",
    tags: ["Toàn đội", "Có đầu tư Energy", "Có thể dùng Booster"],
  },
  {
    code: "99",
    title: "Công bố Tổng Energy",
    detail: "Chốt sổ toàn bộ Energy của 04 đội.",
    kind: "ritual",
  },
  {
    code: "★",
    title: "Quán quân",
    detail: "Make Your Move 2026.",
    kind: "final",
  },
];

/* ------------------------------------------------------------------ */
/* Booster                                                             */
/* ------------------------------------------------------------------ */

export type Booster = {
  key: "alpha" | "beta" | "gamma" | "delta";
  name: string;
  alias: string;
  tagline: string;
  timing: string;
  win?: string[];
  lose?: string[];
  effect?: string[];
  examples?: string[];
};

export const BOOSTERS: Booster[] = [
  {
    key: "alpha",
    name: "Alpha",
    alias: "AI Booster",
    tagline: "Dành cho đội chấp nhận rủi ro để nhận phần thưởng lớn.",
    timing: "Kích hoạt TRƯỚC Thử thách 4 hoặc Thử thách 5.",
    win: [
      "Nhận phần thưởng Thử thách.",
      "Nhận thêm Energy đã đầu tư.",
      "Nhận thêm 100% phần thưởng Thử thách, tối đa 40 Energy.",
    ],
    lose: ["Mất Energy đã đầu tư.", "Mất thêm 10 Energy."],
  },
  {
    key: "beta",
    name: "Beta",
    alias: "Shield",
    tagline: "Dành cho đội muốn bảo vệ Energy.",
    timing:
      "Kích hoạt NGAY SAU khi không chiến thắng tại Thử thách 4 hoặc Thử thách 5.",
    effect: ["Bảo vệ tối đa 25 Energy trong số Energy đội vừa đầu tư."],
    examples: [
      "Đầu tư 20, không thắng → không mất Energy.",
      "Đầu tư 30, không thắng → chỉ mất 5 Energy.",
    ],
  },
  {
    key: "gamma",
    name: "Gamma",
    alias: "Overdrive",
    tagline: "Tăng phần thưởng nhưng không chịu thêm hình phạt.",
    timing: "Kích hoạt TRƯỚC Thử thách 4 hoặc Thử thách 5.",
    win: [
      "Nhận phần thưởng Thử thách.",
      "Nhận thêm Energy đã đầu tư.",
      "Nhận thêm 50% phần thưởng Thử thách.",
    ],
    lose: ["Chỉ mất Energy đã đầu tư.", "Không bị trừ thêm."],
  },
  {
    key: "delta",
    name: "Delta",
    alias: "Rescue",
    tagline: "Dành cho đội đang cần cơ hội phục hồi.",
    timing:
      "Kích hoạt SAU khi không chiến thắng tại Thử thách 4 hoặc Thử thách 5, với điều kiện Tổng Energy sau khi bị trừ còn từ 80 Energy trở xuống.",
    effect: ["Hoàn lại 50% Energy vừa mất, tối đa 20 Energy."],
    examples: ["Mất 20 → được hoàn 10.", "Mất 50 → được hoàn tối đa 20."],
  },
];

export const BOOSTER_RULES = [
  "Mỗi đội sở hữu 01 Booster.",
  "Mỗi Booster chỉ được sử dụng 01 lần.",
  "Booster chỉ được dùng tại Thử thách 4 hoặc Thử thách 5.",
  "Alpha và Gamma phải kích hoạt trước khi Thử thách bắt đầu.",
  "Beta và Delta được kích hoạt sau khi kết quả được công bố.",
  "Booster chưa sử dụng sau Thử thách 5 sẽ tự động hết hiệu lực.",
  "Booster không được sử dụng trong Thử thách phân định.",
  "Sau khi Captain xác nhận kích hoạt, quyết định không được thay đổi.",
];

/* ------------------------------------------------------------------ */
/* 07 điều cần nhớ                                                     */
/* ------------------------------------------------------------------ */

export const REMEMBER = [
  "Hoàn thành màn ra mắt để kích hoạt nguồn Energy và chính thức bước vào Hải trình.",
  "Trước mỗi Thử thách, hãy phân tích chủ đề và chọn đúng người.",
  "Mỗi thành viên phải tham gia ít nhất 01 Thử thách.",
  "Chỉ đầu tư tối đa 30% số Energy đội đang có.",
  "Chiến thắng: nhận phần thưởng Thử thách và Energy đã đầu tư.",
  "Không chiến thắng: mất đúng số Energy đã đầu tư.",
  "Chọn Booster phù hợp và kích hoạt đúng thời điểm để giữ Tổng Energy cao nhất.",
];
