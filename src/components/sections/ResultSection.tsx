import { DeckShell } from "@/components/deck/DeckShell";
import { Callout, Card, RuleList, deckDelay } from "@/components/ui";

export function ResultSection() {
  return (
    <DeckShell
      index="10"
      title="Khi kết quả được công bố"
      lead="Sau mỗi Thử thách, Captain cần kiểm tra lại 05 thông tin."
    >
      <Card accent="route">
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
          Nếu phát hiện sai sót, Captain cần trao đổi ngay với Game Master trước
          khi kết quả được khóa. Sau khi Game Master tuyên bố{" "}
          <strong className="uppercase text-delta">kết quả đã được khóa</strong>,
          kết quả của Thử thách chính thức có hiệu lực.
        </Callout>
      </div>
    </DeckShell>
  );
}
