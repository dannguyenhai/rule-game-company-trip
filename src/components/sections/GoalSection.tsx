import { DeckShell } from "@/components/deck/DeckShell";
import { EVENT } from "@/lib/content";
import {
  Callout,
  Card,
  PrizeBanner,
  RuleList,
  deckDelay,
} from "@/components/ui";

export function GoalSection() {
  return (
    <DeckShell
      index="01"
      title="Đội bạn cần làm gì để chiến thắng?"
      lead="Trong Gameshow, mỗi đội sẽ cùng nhau vượt qua 05 Thử thách và quản lý nguồn Energy của đội trong suốt Hải trình."
    >
      {/* Phần thưởng lên trước: đó là thứ người chơi muốn biết ngay. */}
      <div className="deck-item">
        <PrizeBanner
          eyebrow="Sau Thử thách 5"
          lead={
            <>
              Đội có <strong className="text-energy">Tổng Energy cao nhất</strong>{" "}
              sẽ trở thành
            </>
          }
          title="Giải Dẫn Lối Xuất Sắc 2026"
          amount={EVENT.prize}
        />
      </div>

      <Card title="Để tạo lợi thế, đội cần:" accent="energy" delay={60}>
        <RuleList
          items={[
            "Chọn đúng người tham gia từng Thử thách.",
            "Quyết định mức Energy muốn đầu tư.",
            "Đấu giá Booster phù hợp.",
            "Kích hoạt Booster đúng thời điểm.",
            "Giữ Tổng Energy cao nhất khi Hải trình kết thúc.",
          ]}
        />
      </Card>

      <div style={deckDelay(100)} className="deck-item">
        <Callout tone="route" label="Trường hợp bằng điểm">
          Nếu có nhiều đội cùng sở hữu Tổng Energy cao nhất, các đội đó sẽ tham
          gia một <strong>Thử thách phân định</strong> để tìm ra Quán quân duy
          nhất.
        </Callout>
      </div>
    </DeckShell>
  );
}
