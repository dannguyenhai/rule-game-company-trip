import { DeckShell } from "@/components/deck/DeckShell";
import { EVENT } from "@/lib/content";
import {
  Callout,
  Card,
  PrizeBanner,
  RuleList,
  deckDelay,
} from "@/components/ui";

export function ResultSection() {
  return (
    <DeckShell
      index="08"
      title="Kết quả và Thử thách phân định"
      lead="Sau mỗi Thử thách, Captain kiểm tra lại kết quả trước khi Game Master khóa sổ."
    >
      <Card title="Captain cần kiểm tra" accent="route">
        <RuleList
          marker="number"
          items={[
            "Kết quả của đội.",
            "Số Energy đã đầu tư.",
            "Số Energy được cộng hoặc bị trừ.",
            "Hiệu ứng Booster, nếu có.",
            "Tổng Energy mới của đội.",
          ]}
        />
      </Card>

      <div style={deckDelay(60)} className="deck-item">
        <Callout tone="danger" label="Thời điểm khiếu nại">
          Phát hiện sai sót, Captain trao đổi ngay với Game Master trước khi kết
          quả được khóa. Sau khi Game Master tuyên bố{" "}
          <strong className="uppercase text-delta">kết quả đã được khóa</strong>,
          kết quả chính thức có hiệu lực.
        </Callout>
      </div>

      <Card
        title="Thử thách phân định"
        eyebrow="Khi hai đội trở lên bằng Tổng Energy cao nhất sau Thử thách 5"
        accent="energy"
        delay={100}
      >
        <RuleList
          items={[
            "Chỉ các đội bằng Energy ở vị trí cao nhất được tham gia.",
            "Không đầu tư Energy, không sử dụng Booster.",
            "Các đội thi đấu trong cùng điều kiện.",
            "Nếu tiếp tục hòa, các đội còn hòa thực hiện lượt phân định tiếp theo.",
          ]}
        />
      </Card>

      <div style={deckDelay(140)} className="deck-item">
        <PrizeBanner
          eyebrow="Gameshow chỉ có 01 Quán quân"
          lead="Đội giữ Tổng Energy cao nhất, hoặc thắng Thử thách phân định, sẽ trở thành"
          title="Giải Dẫn Lối Xuất Sắc 2026"
          amount={EVENT.prize}
        />
      </div>
    </DeckShell>
  );
}
