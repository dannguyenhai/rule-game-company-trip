/**
 * Danh mục các màn của Hướng dẫn — chỉ id và nhãn, không kèm nội dung.
 * Phần này chạy ở trình duyệt (thanh mục lục, hash trên URL), nên nội dung
 * luật được giữ riêng ở phía máy chủ.
 */
export const DECK_META = [
  { id: "mo-dau", label: "Mở đầu" },
  { id: "muc-tieu", label: "Mục tiêu" },
  { id: "chuan-bi", label: "Chuẩn bị" },
  { id: "hai-trinh", label: "Hải trình" },
  { id: "so-do", label: "Sơ đồ" },
  { id: "dau-tu", label: "Energy" },
  { id: "dau-gia", label: "Đấu giá" },
  { id: "booster", label: "Booster" },
  { id: "ket-qua", label: "Kết quả" },
  { id: "ghi-nho", label: "Ghi nhớ" },
] as const;

/** Các phần đã gộp — link cũ vẫn mở đúng chỗ nội dung chuyển đến. */
export const HASH_ALIASES: Record<string, string> = {
  "kich-hoat": "chuan-bi",
  "cong-tru": "dau-tu",
  "phan-dinh": "ket-qua",
};
