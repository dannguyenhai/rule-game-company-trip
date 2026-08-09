import { DeckShell } from "@/components/deck/DeckShell";
import { EnergyCalculator } from "@/components/EnergyCalculator";
import { Callout, Card, Chip, Hi, RuleList, deckDelay } from "@/components/ui";

export function InvestSection() {
  return (
    <DeckShell
      index="06"
      title="Đầu tư Energy là gì?"
      lead="Tại một số Thử thách, Captain sẽ bí mật quyết định số Energy đội muốn đầu tư vào kết quả của Thử thách đó."
    >
      <Card title="Cơ chế này được áp dụng tại" accent="energy">
        <div className="flex flex-wrap gap-2">
          <Chip tone="energy">Thử thách 1</Chip>
          <Chip tone="energy">Thử thách 2</Chip>
          <Chip tone="energy">Thử thách 4</Chip>
          <Chip tone="energy">Thử thách 5</Chip>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-text/90">
          <strong className="text-delta">Thử thách 3</strong> không áp dụng đầu
          tư Energy.
        </p>
      </Card>

      <Card title="Giới hạn đầu tư" delay={60}>
        <RuleList
          items={[
            <>
              Tối thiểu <Hi>01 Energy</Hi>.
            </>,
            <>
              Tối đa <Hi>30%</Hi> số Energy đội đang sở hữu.
            </>,
            <>
              Chỉ chấp nhận <Hi tone="route">số nguyên</Hi>.
            </>,
            <>
              Nếu kết quả 30% có số lẻ, <Hi tone="route">làm tròn xuống</Hi>.
            </>,
          ]}
        />
      </Card>

      <div style={deckDelay(100)} className="deck-item">
        <EnergyCalculator />
      </div>

      <Card title="Game Master công bố trước khi Captain quyết định" delay={140}>
        <RuleList
          items={[
            "Chủ đề Thử thách.",
            "Điều kiện chiến thắng.",
            "Phần thưởng cơ bản.",
            "Số người tham gia.",
            "Thời gian thực hiện.",
          ]}
        />
        <div className="mt-4">
          <Callout tone="danger" label="Sau khi Game Master thông báo">
            <span className="font-semibold uppercase tracking-tight text-delta">
              Đầu tư đã được khóa
            </span>{" "}
            — đội không được thay đổi mức Energy đã đầu tư.
          </Callout>
        </div>
      </Card>
    </DeckShell>
  );
}
