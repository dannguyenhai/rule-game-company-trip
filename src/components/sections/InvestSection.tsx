import { DeckShell } from "@/components/deck/DeckShell";
import { EnergyCalculator } from "@/components/EnergyCalculator";
import {
  Callout,
  Card,
  Chip,
  Example,
  Hi,
  RuleList,
  deckDelay,
} from "@/components/ui";

export function InvestSection() {
  return (
    <DeckShell
      index="05"
      title="Đầu tư Energy"
      lead="Tại một số Thử thách, Captain bí mật quyết định số Energy đội muốn đặt vào kết quả."
    >
      <Card title="Áp dụng tại" accent="energy">
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
              Tối thiểu <Hi>01 Energy</Hi>, tối đa <Hi>30%</Hi> số Energy đội
              đang sở hữu.
            </>,
            <>
              Chỉ nhận <Hi tone="route">số nguyên</Hi>, số lẻ{" "}
              <Hi tone="route">làm tròn xuống</Hi>.
            </>,
          ]}
        />
      </Card>

      <div style={deckDelay(100)} className="deck-item">
        <EnergyCalculator
          labels={{
            input: "Tổng Energy đội đang có",
            note: "Công cụ tham khảo nhanh. Con số chính thức luôn do Game Master công bố tại Gameshow.",
            metrics: [
              {
                key: "invest",
                label: "Đầu tư tối đa / Thử thách",
                hint: "30% Energy, làm tròn xuống",
              },
              {
                key: "fund",
                label: "Quỹ đấu giá tối đa",
                hint: "80% Energy sau Thử thách 2",
              },
              {
                key: "reserved",
                label: "Energy được bảo toàn",
                hint: "Tối thiểu 20% không dùng để đấu giá",
              },
              {
                key: "last",
                label: "Giá Booster cuối cùng",
                hint: "50% quỹ đấu giá, nếu đội nhận Booster còn lại",
              },
            ],
          }}
        />
      </div>

      <div style={deckDelay(140)} className="deck-item">
        <Callout tone="danger" label="Sau khi Game Master thông báo">
          <span className="font-semibold uppercase tracking-tight text-delta">
            Đầu tư đã được khóa
          </span>{" "}
          — đội không được thay đổi mức Energy đã đặt.
        </Callout>
      </div>

      {/* Thắng và thua đặt cạnh nhau: người chơi so sánh trong một cái nhìn. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Nếu chiến thắng" accent="energy" delay={180}>
          <p className="text-[15px] leading-relaxed text-text/90">
            Nhận{" "}
            <strong className="text-energy">
              phần thưởng Thử thách + Energy đã đầu tư
            </strong>
            .
          </p>
          <div className="mt-4">
            <Example
              rows={[
                { label: "Phần thưởng", value: "40 Energy" },
                { label: "Đội đầu tư", value: "20 Energy" },
              ]}
              result={{ label: "Nhận thêm", value: "+60" }}
            />
          </div>
        </Card>

        <Card title="Nếu không chiến thắng" delay={220}>
          <p className="text-[15px] leading-relaxed text-text/90">
            Chỉ mất đúng số Energy đã đầu tư.
          </p>
          <div className="mt-4">
            <Example
              rows={[
                { label: "Đội đầu tư", value: "20 Energy" },
                { label: "Kết quả", value: "Không thắng" },
              ]}
              result={{ label: "Bị trừ", value: "−20" }}
            />
          </div>
        </Card>
      </div>

      <Card title="Hai trường hợp cần nhớ" delay={260}>
        <RuleList
          items={[
            <>
              Một Thử thách có thể có <Hi>nhiều đội cùng thắng</Hi>: mọi đội đáp
              ứng đủ điều kiện đều nhận phần thưởng và cộng lại đúng mức Energy
              chính đội đó đã đầu tư.
            </>,
            <>
              Đội <Hi tone="route">hết Energy</Hi> vẫn tiếp tục tham gia Thử
              thách, chỉ là không đầu tư thêm được — thắng vẫn nhận phần thưởng.
            </>,
          ]}
        />
      </Card>
    </DeckShell>
  );
}
