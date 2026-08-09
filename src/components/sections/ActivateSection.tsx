import { DeckShell } from "@/components/deck/DeckShell";
import { Callout, Card, Chip, Hi, RuleList, deckDelay } from "@/components/ui";

export function ActivateSection() {
  return (
    <DeckShell
      index="03"
      title="Nhiệm vụ kích hoạt Energy"
      lead="Trước khi chính thức bước vào Hải trình, mỗi đội phải hoàn thành màn ra mắt trong tối đa 03 phút."
    >
      <Card title="Màn ra mắt gồm" eyebrow="Tối đa 03 phút" accent="energy">
        <RuleList
          marker="number"
          items={[
            "Giới thiệu Captain.",
            "Công bố tên đội.",
            "Hô slogan.",
            "Thực hiện một phần thể hiện tập thể mang màu sắc riêng của đội.",
          ]}
        />
        <p className="mt-4 text-[14px] text-muted">Phần thể hiện có thể là:</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <Chip>Điệu nhảy tập thể</Chip>
          <Chip>Ca khúc tập thể</Chip>
          <Chip>Hô khẩu hiệu</Chip>
          <Chip tone="energy">Hình thức sáng tạo khác</Chip>
        </div>
      </Card>

      <Card title="Quy định" delay={60}>
        <RuleList
          items={[
            <>
              Đây là nhiệm vụ <Hi tone="danger">bắt buộc</Hi> đối với cả 04 đội.
            </>,
            <>
              Đội cần hoàn thành đầy đủ các nội dung trong{" "}
              <Hi>tối đa 03 phút</Hi>.
            </>,
            "Đội chưa hoàn thành nhiệm vụ sẽ chưa được kích hoạt Energy và chưa thể chính thức bước vào Hải trình.",
          ]}
        />
      </Card>

      <div style={deckDelay(100)} className="deck-item">
        <Callout label="Game Master tuyên bố">
          <p className="font-semibold uppercase leading-relaxed tracking-tight text-energy-soft">
            Hải trình đã được kích hoạt — nguồn Energy của các đội chính thức
            được mở.
          </p>
          <p className="mt-2 text-muted">
            Số Energy khởi đầu sẽ được Game Master công bố trực tiếp tại
            Gameshow.
          </p>
        </Callout>
      </div>
    </DeckShell>
  );
}
