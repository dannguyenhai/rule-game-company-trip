import { DeckShell } from "@/components/deck/DeckShell";
import { Callout, Card, Example, RuleList, deckDelay } from "@/components/ui";

export function EnergyMathSection() {
  return (
    <DeckShell index="07" title="Energy được cộng, trừ như thế nào?">
      <Card title="Nếu đội chiến thắng" accent="energy">
        <p className="text-[15px] leading-relaxed text-text/90">
          Đội nhận{" "}
          <strong className="text-energy">
            phần thưởng Thử thách + Energy đã đầu tư
          </strong>
          .
        </p>
        <div className="mt-4">
          <Example
            rows={[
              { label: "Phần thưởng Thử thách", value: "40 Energy" },
              { label: "Đội đầu tư", value: "20 Energy" },
            ]}
            result={{ label: "Đội nhận thêm", value: "+60" }}
          />
        </div>
      </Card>

      <Card title="Nếu đội không chiến thắng" delay={60}>
        <p className="text-[15px] leading-relaxed text-text/90">
          Đội chỉ mất đúng số Energy đã đầu tư.
        </p>
        <div className="mt-4">
          <Example
            rows={[
              { label: "Đội đầu tư", value: "20 Energy" },
              { label: "Kết quả", value: "Không chiến thắng" },
            ]}
            result={{ label: "Đội bị trừ", value: "−20" }}
          />
        </div>
      </Card>

      <Card title="Có thể có nhiều đội cùng chiến thắng" delay={100}>
        <p className="text-[15px] leading-relaxed text-muted">
          Nếu nhiều đội cùng đáp ứng đầy đủ điều kiện mà Game Master đã công bố:
        </p>
        <RuleList
          className="mt-3"
          items={[
            "Tất cả các đội đó đều được công nhận chiến thắng.",
            "Mỗi đội nhận đầy đủ phần thưởng của Thử thách.",
            "Mỗi đội được cộng thêm mức Energy mà chính đội đó đã đầu tư.",
          ]}
        />
      </Card>

      <div style={deckDelay(140)} className="deck-item">
        <Callout tone="route" label="Nếu đội không còn Energy">
          Đội vẫn được tiếp tục tham gia Thử thách nhưng không thể đầu tư thêm
          Energy. Nếu chiến thắng, đội vẫn nhận phần thưởng của Thử thách.
        </Callout>
      </div>
    </DeckShell>
  );
}
