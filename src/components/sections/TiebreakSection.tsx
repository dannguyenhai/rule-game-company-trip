import { DeckShell } from "@/components/deck/DeckShell";
import { EVENT } from "@/lib/content";
import { Card, PrizeBanner, RuleList, deckDelay } from "@/components/ui";

export function TiebreakSection() {
  return (
    <DeckShell
      index="11"
      title="Thử thách phân định"
      lead="Áp dụng khi có từ hai đội trở lên cùng sở hữu Tổng Energy cao nhất sau Thử thách 5."
    >
      <Card accent="energy">
        <RuleList
          items={[
            "Chỉ các đội bằng Energy ở vị trí cao nhất được tham gia.",
            "Không đầu tư Energy.",
            "Không sử dụng Booster.",
            "Các đội thi đấu trong cùng điều kiện.",
            "Nếu tiếp tục hòa, các đội còn hòa sẽ thực hiện lượt phân định tiếp theo.",
          ]}
        />
      </Card>

      <div style={deckDelay(60)} className="deck-item">
        <PrizeBanner
          eyebrow="Gameshow chỉ có 01 Quán quân"
          lead="Đội chiến thắng Thử thách phân định sẽ trở thành"
          title="Giải Dẫn Lối Xuất Sắc 2026"
          amount={EVENT.prize}
        />
      </div>
    </DeckShell>
  );
}
