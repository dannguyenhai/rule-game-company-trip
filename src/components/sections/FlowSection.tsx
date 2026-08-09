import { DeckShell } from "@/components/deck/DeckShell";
import { Callout, Card, RuleList } from "@/components/ui";

const STEPS = [
  {
    step: "Bước 1",
    title: "Nhận thông tin",
    body: (
      <RuleList
        items={[
          "Chủ đề Thử thách.",
          "Số lượng người tham gia.",
          "Điều kiện chiến thắng.",
          "Thời gian thực hiện.",
          "Phần thưởng của Thử thách.",
          "Thử thách có áp dụng đầu tư Energy hay không.",
        ]}
      />
    ),
  },
  {
    step: "Bước 2",
    title: "Bàn bạc và chọn người",
    body: (
      <p className="text-[15px] leading-relaxed text-text/90">
        Toàn đội cùng phân tích chủ đề và lựa chọn thành viên phù hợp nhất.
      </p>
    ),
  },
  {
    step: "Bước 3",
    title: "Đầu tư Energy",
    body: (
      <p className="text-[15px] leading-relaxed text-text/90">
        Nếu Thử thách có áp dụng đầu tư Energy, Captain bí mật chốt số Energy đội
        muốn đầu tư.
      </p>
    ),
  },
  {
    step: "Bước 4",
    title: "Thực hiện Thử thách",
    body: (
      <p className="text-[15px] leading-relaxed text-text/90">
        Các thành viên được lựa chọn tham gia theo hướng dẫn của Game Master.
      </p>
    ),
  },
  {
    step: "Bước 5",
    title: "Nhận kết quả",
    body: (
      <p className="text-[15px] leading-relaxed text-text/90">
        Game Master công bố đội chiến thắng.
      </p>
    ),
  },
];

export function FlowSection() {
  return (
    <DeckShell
      index="04"
      title="Hải trình sẽ diễn ra như thế nào?"
      lead="Gameshow gồm 05 Thử thách. Trước mỗi Thử thách, đội chỉ được biết chủ đề, chưa biết trước nội dung trò chơi cụ thể."
    >
      <div className="space-y-3">
        {STEPS.map((item, i) => (
          <Card
            key={item.step}
            eyebrow={item.step}
            title={item.title}
            delay={Math.min(i * 40, 200)}
          >
            {item.body}
          </Card>
        ))}
      </div>

      <Card title="Quy định tham gia" delay={240} accent="route">
        <p className="text-[15px] leading-relaxed text-text/90">
          Mỗi thành viên trong đội phải tham gia ít nhất{" "}
          <strong className="text-route">01 Thử thách</strong> trong toàn bộ
          Gameshow.
        </p>
        <p className="mt-3 text-[14px] text-muted">
          Đội cần chủ động phân bổ người chơi để bảo đảm:
        </p>
        <RuleList
          className="mt-3"
          items={[
            "Chọn đúng người cho từng chủ đề.",
            "Không có thành viên nào bị bỏ lại khỏi Hải trình.",
            "Đúng số lượng người chơi theo yêu cầu của từng Thử thách.",
          ]}
        />
        <div className="mt-4">
          <Callout tone="danger" label="Quyền của BTC">
            BTC có quyền yêu cầu đội điều chỉnh danh sách nếu phát hiện có thành
            viên chưa được tham gia bất kỳ Thử thách nào.
          </Callout>
        </div>
      </Card>
    </DeckShell>
  );
}
