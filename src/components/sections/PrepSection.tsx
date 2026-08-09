import { DeckShell } from "@/components/deck/DeckShell";
import { Callout, Card, Chip, Hi, RuleList, deckDelay } from "@/components/ui";

export function PrepSection() {
  return (
    <DeckShell
      index="02"
      title="Trước khi Hải trình bắt đầu"
      lead="Mỗi đội chuẩn bị 05 nội dung, sau đó hoàn thành màn ra mắt để được kích hoạt Energy."
    >
      <Card title="Đội cần chuẩn bị" accent="energy">
        <RuleList
          marker="number"
          items={[
            "01 Captain.",
            "Tên đội.",
            "Slogan.",
            "Một màn ra mắt tập thể.",
            "Phương án phân bổ thành viên tham gia 05 Thử thách.",
          ]}
        />
      </Card>

      <Card title="Vai trò của Captain" delay={60}>
        <p className="text-[15px] leading-relaxed text-muted">
          Captain là người đại diện đội để chốt mức Energy đầu tư, tham gia đấu
          giá, lựa chọn và kích hoạt Booster, trao đổi với Game Master khi có
          thắc mắc.
        </p>
        <div className="mt-4">
          <Callout tone="danger" label="Lưu ý">
            Captain được bàn bạc với toàn đội trước khi quyết định. Sau khi Game
            Master thông báo quyết định đã được khóa, đội không được thay đổi.
          </Callout>
        </div>
      </Card>

      <Card
        title="Nhiệm vụ kích hoạt Energy"
        eyebrow="Tối đa 03 phút"
        accent="energy"
        delay={100}
      >
        <RuleList
          marker="number"
          items={[
            "Giới thiệu Captain.",
            "Công bố tên đội.",
            "Hô slogan.",
            "Thực hiện một phần thể hiện tập thể mang màu sắc riêng của đội.",
          ]}
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip>Điệu nhảy</Chip>
          <Chip>Ca khúc</Chip>
          <Chip>Hô khẩu hiệu</Chip>
          <Chip tone="energy">Hình thức sáng tạo khác</Chip>
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <RuleList
            items={[
              <>
                <Hi tone="danger">Bắt buộc</Hi> với cả 04 đội, hoàn thành đầy đủ
                trong thời gian quy định.
              </>,
              "Đội chưa hoàn thành sẽ chưa được kích hoạt Energy và chưa thể bước vào Hải trình.",
            ]}
          />
        </div>
      </Card>

      <div style={deckDelay(140)} className="deck-item">
        <Callout label="Game Master tuyên bố">
          <p className="font-semibold uppercase leading-relaxed tracking-tight text-energy-soft">
            Hải trình đã được kích hoạt — nguồn Energy của các đội chính thức
            được mở.
          </p>
          <p className="mt-2 text-muted">
            Số Energy khởi đầu được Game Master công bố trực tiếp tại Gameshow.
          </p>
        </Callout>
      </div>
    </DeckShell>
  );
}
