import { DeckShell } from "@/components/deck/DeckShell";
import { Callout, Card, RuleList } from "@/components/ui";

export function PrepSection() {
  return (
    <DeckShell
      index="02"
      title="Trước khi Gameshow bắt đầu"
      lead="Mọi đội cần chuẩn bị trước 05 nội dung sau."
    >
      <Card accent="energy">
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
          Captain là người đại diện đội để:
        </p>
        <RuleList
          className="mt-3"
          items={[
            "Chốt mức Energy đầu tư.",
            "Tham gia đấu giá Booster.",
            "Lựa chọn Booster.",
            "Kích hoạt Booster.",
            "Trao đổi với Game Master khi có thắc mắc.",
          ]}
        />
        <div className="mt-4">
          <Callout tone="danger" label="Lưu ý">
            Captain được quyền bàn bạc với toàn đội trước khi đưa ra quyết định.
            Sau khi Game Master thông báo quyết định đã được khóa, đội không được
            thay đổi.
          </Callout>
        </div>
      </Card>
    </DeckShell>
  );
}
