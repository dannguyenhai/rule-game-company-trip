import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { BoosterCard } from "@/components/BoosterCard";
import { EnergyCalculator } from "@/components/EnergyCalculator";
import { JourneyMap } from "@/components/JourneyMap";
import { Reveal } from "@/components/Reveal";
import { SectionNav } from "@/components/SectionNav";
import {
  BOOSTERS,
  BOOSTER_RULES,
  EVENT,
  REMEMBER,
} from "@/lib/content";
import {
  Callout,
  Card,
  Chip,
  Example,
  RuleList,
  Section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Hướng dẫn người chơi — Make Your Move | Xipat Company Trip 2026",
  description:
    "05 Thử thách, cơ chế đầu tư Energy, đấu giá 04 Booster và điều kiện giành ngôi Quán quân.",
};

export default function GuidePage() {
  return (
    <>
      <GuideHero />
      <SectionNav />

      <main className="mx-auto w-full max-w-3xl px-5 pb-24">
        {/* ---------------------------------------------------------- */}
        <Section
          id="muc-tieu"
          index="01"
          title="Đội bạn cần làm gì để chiến thắng?"
          lead="Trong Gameshow, mỗi đội sẽ cùng nhau vượt qua 05 Thử thách và quản lý nguồn Energy của đội trong suốt Hải trình."
        >
          <Card title="Để tạo lợi thế, đội cần:" accent="energy">
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

          <Reveal delay={60}>
            <div className="relative overflow-hidden rounded-2xl border border-energy/25 bg-linear-to-br from-energy/12 to-transparent p-6 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-energy">
                Sau Thử thách 5
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text/90">
                Đội có <strong className="text-energy">Tổng Energy cao nhất</strong>{" "}
                sẽ trở thành
              </p>
              <p className="mt-2 text-xl font-extrabold uppercase leading-tight tracking-tight sm:text-2xl">
                Quán quân
                <span className="block text-[13px] font-semibold tracking-normal text-muted normal-case sm:text-sm">
                  Giải Dẫn Lối Xuất Sắc 2026
                </span>
              </p>
              <p className="mt-4 font-mono text-2xl font-black text-energy">
                {EVENT.prize}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Callout tone="route" label="Trường hợp bằng điểm">
              Nếu có nhiều đội cùng sở hữu Tổng Energy cao nhất, các đội đó sẽ
              tham gia một <strong>Thử thách phân định</strong> để tìm ra Quán
              quân duy nhất.
            </Callout>
          </Reveal>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="chuan-bi"
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
                Captain được quyền bàn bạc với toàn đội trước khi đưa ra quyết
                định. Sau khi Game Master thông báo quyết định đã được khóa, đội
                không được thay đổi.
              </Callout>
            </div>
          </Card>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="kich-hoat"
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
            <p className="mt-4 text-[14px] text-muted">
              Phần thể hiện có thể là:
            </p>
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
                "Đây là nhiệm vụ bắt buộc đối với cả 04 đội.",
                "Đội cần hoàn thành đầy đủ các nội dung trong thời gian quy định.",
                "Đội chưa hoàn thành nhiệm vụ sẽ chưa được kích hoạt Energy và chưa thể chính thức bước vào Hải trình.",
              ]}
            />
          </Card>

          <Reveal delay={100}>
            <Callout label="Game Master tuyên bố">
              <p className="font-semibold uppercase leading-relaxed tracking-tight text-energy-soft">
                Hải trình đã được kích hoạt — nguồn Energy của các đội chính
                thức được mở.
              </p>
              <p className="mt-2 text-muted">
                Số Energy khởi đầu sẽ được Game Master công bố trực tiếp tại
                Gameshow.
              </p>
            </Callout>
          </Reveal>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="hai-trinh"
          index="04"
          title="Hải trình sẽ diễn ra như thế nào?"
          lead="Gameshow gồm 05 Thử thách. Trước mỗi Thử thách, đội chỉ được biết chủ đề, chưa biết trước nội dung trò chơi cụ thể."
        >
          <div className="space-y-3">
            {[
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
                    Toàn đội cùng phân tích chủ đề và lựa chọn thành viên phù
                    hợp nhất.
                  </p>
                ),
              },
              {
                step: "Bước 3",
                title: "Đầu tư Energy",
                body: (
                  <p className="text-[15px] leading-relaxed text-text/90">
                    Nếu Thử thách có áp dụng đầu tư Energy, Captain bí mật chốt
                    số Energy đội muốn đầu tư.
                  </p>
                ),
              },
              {
                step: "Bước 4",
                title: "Thực hiện Thử thách",
                body: (
                  <p className="text-[15px] leading-relaxed text-text/90">
                    Các thành viên được lựa chọn tham gia theo hướng dẫn của
                    Game Master.
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
            ].map((item, i) => (
              <Card
                key={item.step}
                eyebrow={item.step}
                title={item.title}
                delay={Math.min(i * 45, 200)}
              >
                {item.body}
              </Card>
            ))}
          </div>

          <Card title="Quy định tham gia" delay={60} accent="route">
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
                BTC có quyền yêu cầu đội điều chỉnh danh sách nếu phát hiện có
                thành viên chưa được tham gia bất kỳ Thử thách nào.
              </Callout>
            </div>
          </Card>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="so-do"
          index="05"
          title="Sơ đồ Hải trình"
          lead="Toàn bộ chặng đường từ màn ra mắt đến ngôi Quán quân."
        >
          <JourneyMap />
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="dau-tu"
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
              <strong className="text-delta">Thử thách 3</strong> không áp dụng
              đầu tư Energy.
            </p>
          </Card>

          <Card title="Giới hạn đầu tư" delay={60}>
            <RuleList
              items={[
                <>
                  Tối thiểu: <strong className="text-energy">01 Energy</strong>.
                </>,
                <>
                  Tối đa:{" "}
                  <strong className="text-energy">
                    30% số Energy đội đang sở hữu
                  </strong>
                  .
                </>,
                "Chỉ chấp nhận số nguyên.",
                "Nếu kết quả 30% có số lẻ, làm tròn xuống.",
              ]}
            />
          </Card>

          <Reveal delay={100}>
            <EnergyCalculator />
          </Reveal>

          <Card title="Game Master công bố trước khi Captain quyết định" delay={60}>
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
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="cong-tru"
          index="07"
          title="Energy được cộng, trừ như thế nào?"
        >
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
              Nếu nhiều đội cùng đáp ứng đầy đủ điều kiện mà Game Master đã công
              bố:
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

          <Reveal delay={140}>
            <Callout tone="route" label="Nếu đội không còn Energy">
              Đội vẫn được tiếp tục tham gia Thử thách nhưng không thể đầu tư
              thêm Energy. Nếu chiến thắng, đội vẫn nhận phần thưởng của Thử
              thách.
            </Callout>
          </Reveal>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="dau-gia"
          index="08"
          title="Đấu giá vật phẩm Booster"
          lead="Sau Thử thách 2, hệ thống sẽ mở phiên đấu giá. Mỗi đội sẽ sở hữu đúng 01 Booster sau khi phiên đấu giá kết thúc."
        >
          <Card title="Booster là gì?" accent="route">
            <p className="text-[15px] leading-relaxed text-muted">
              Booster là vật phẩm chiến thuật có thể giúp đội:
            </p>
            <RuleList
              className="mt-3"
              items={[
                "Tăng phần thưởng.",
                "Bảo vệ Energy.",
                "Giảm thiệt hại.",
                "Tạo cơ hội lật ngược tình thế.",
              ]}
            />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              Trước khi đấu giá, Game Master sẽ giới thiệu đầy đủ công dụng và
              điều kiện sử dụng của 04 Booster.
            </p>
          </Card>

          <Card title="Tóm tắt cơ chế" eyebrow="Phiên đấu giá gồm 02 vòng" delay={60}>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-route">
                  Vòng 1 — Đấu giá kín
                </p>
                <RuleList
                  className="mt-2.5"
                  items={[
                    "Mỗi đội có Quỹ đấu giá tối đa bằng 80% Energy hiện có.",
                    "Captain phân bổ mức giá cho 04 Booster.",
                    "Tổng 04 mức giá không vượt quá Quỹ đấu giá.",
                    "Top 2 mức giá kín của từng Booster được vào vòng công khai.",
                  ]}
                />
              </div>
              <div className="border-t border-line pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-energy">
                  Vòng 2 — Đấu giá công khai
                </p>
                <RuleList
                  className="mt-2.5"
                  items={[
                    "Giá mở đầu bằng mức giá kín cao nhất.",
                    "Mỗi lần nâng tối thiểu 5 Energy.",
                    "Đội có thể trả đến toàn bộ Quỹ đấu giá.",
                    "Chỉ đội thắng bị trừ Energy.",
                    "Thắng 01 Booster thì rời khỏi các phiên đấu giá còn lại.",
                  ]}
                />
              </div>
              <div className="border-t border-line pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
                  Kết quả
                </p>
                <RuleList
                  className="mt-2.5"
                  items={[
                    "Mỗi đội sở hữu đúng 01 Booster.",
                    "Ít nhất 20% Energy được bảo toàn cho phần còn lại của Hải trình.",
                    "Booster không được đổi hoặc chuyển cho đội khác.",
                    "Mức giá Captain đã xác nhận không được thay đổi.",
                  ]}
                />
              </div>
            </div>
          </Card>

          <Reveal delay={100}>
            <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Chi tiết từng vòng
            </p>
          </Reveal>

          <div className="space-y-3">
            <Reveal delay={60}>
              <Accordion title="Quỹ đấu giá của đội" meta="Mục 9.2">
                <p>
                  Quỹ đấu giá được tính dựa trên số Energy đội đang sở hữu sau
                  Thử thách 2. Mỗi đội được sử dụng tối đa{" "}
                  <strong className="text-route">80% Energy hiện có</strong> để
                  tham gia đấu giá.
                </p>
                <p>
                  Ít nhất <strong>20% Energy còn lại được bảo toàn</strong> để
                  đội tiếp tục tham gia các Thử thách phía sau. Nếu kết quả có số
                  lẻ, số Energy được phép đấu giá sẽ được làm tròn xuống.
                </p>
                <p className="text-muted">
                  Đội không bắt buộc phải sử dụng hết Quỹ đấu giá. Game Master sẽ
                  thông báo Quỹ đấu giá tối đa của từng đội trước khi phiên đấu
                  giá bắt đầu.
                </p>
              </Accordion>
            </Reveal>

            <Reveal delay={80}>
              <Accordion title="Vòng 1 — Điền phiếu đấu giá kín" meta="Mục 9.3">
                <p>
                  Mỗi Captain nhận một phiếu gồm 04 ô tương ứng với 04 Booster và
                  phân bổ Quỹ đấu giá dựa trên mức độ ưu tiên của đội. Đội không
                  bắt buộc phải phân bổ hết quỹ.
                </p>
                <RuleList
                  items={[
                    "Mức giá phải là số nguyên.",
                    "Đội có thể ghi 0 Energy với Booster không muốn đấu giá.",
                    "Tổng mức giá của 04 Booster không được vượt quá Quỹ đấu giá.",
                    "Mức giá kín chưa bị trừ khỏi Energy.",
                    "Chỉ mức giá cuối cùng của Booster mà đội thắng mới bị trừ.",
                    "Sau khi Game Master khóa phiếu, đội không được thay đổi mức giá.",
                  ]}
                />
                <div className="pt-1">
                  <Callout tone="route" label="Điều kiện vào vòng công khai">
                    Với mỗi Booster, <strong>02 đội chưa sở hữu vật phẩm</strong>{" "}
                    có mức giá kín cao nhất sẽ được bước vào vòng đấu giá công
                    khai. Nếu các đội bằng giá tại vị trí cuối cùng, Game Master
                    sẽ bốc thăm công khai. Nếu một đội đã thắng Booster ở phiên
                    trước, đội có mức giá kín cao tiếp theo sẽ được đưa lên thay
                    thế.
                  </Callout>
                </div>
              </Accordion>
            </Reveal>

            <Reveal delay={100}>
              <Accordion title="Vòng 2 — Thứ tự và giá mở đầu" meta="Mục 9.4.1 – 9.4.2">
                <p>
                  Sau khi toàn bộ phiếu kín được khóa, Game Master bốc thăm công
                  khai để xác định thứ tự đưa 04 Booster ra đấu giá. Các Booster
                  lần lượt được đưa ra cho đến khi mỗi đội sở hữu 01 vật phẩm.
                </p>
                <p>
                  Giá mở đầu của mỗi Booster là mức giá kín cao nhất trong các
                  đội đủ điều kiện tham gia.
                </p>
                <div className="pt-1">
                  <Callout label="Ví dụ">
                    Đội A và Đội B được vào vòng công khai. AI Booster bắt đầu ở
                    mức <strong className="text-energy">50 Energy</strong>. Nếu
                    Đội B không muốn trả cao hơn, Đội A sở hữu AI Booster với giá
                    50 Energy.
                  </Callout>
                </div>
              </Accordion>
            </Reveal>

            <Reveal delay={120}>
              <Accordion title="Cách nâng giá và xác nhận" meta="Mục 9.4.3 – 9.4.4">
                <p>
                  Mỗi lần nâng giá phải tăng tối thiểu{" "}
                  <strong className="text-energy">05 Energy</strong> so với mức
                  giá đang dẫn đầu. Giá hiện tại 50 Energy → mức giá tiếp theo
                  phải từ 55 Energy trở lên.
                </p>
                <p>
                  Captain có thể nâng nhiều hơn 5 Energy, miễn không vượt quá Quỹ
                  đấu giá của đội. Mức giá kín ban đầu không phải là mức giá tối
                  đa: một đội đặt kín 10 Energy cho Booster vẫn có thể nâng giá
                  đến toàn bộ Quỹ đấu giá của mình nếu được vào vòng công khai.
                </p>
                <p>
                  Captain xác nhận bằng bảng hoặc tín hiệu do BTC cung cấp. Game
                  Master sẽ công bố mức giá và đếm:
                </p>
                <div className="pt-1">
                  <Callout label="Game Master">
                    <span className="font-semibold text-energy-soft">
                      “55 Energy — Ba, hai, một.”
                    </span>
                    <p className="mt-2 text-muted">
                      Đội muốn tiếp tục phải xác nhận trong thời gian đếm. Không
                      xác định quyền trả giá dựa trên việc đội nào giơ tay nhanh
                      hơn.
                    </p>
                  </Callout>
                </div>
              </Accordion>
            </Reveal>

            <Reveal delay={140}>
              <Accordion title="Xác định đội sở hữu Booster" meta="Mục 9.4.5 – 9.4.6">
                <p>
                  Khi không còn đội nào muốn trả cao hơn, Game Master công bố:
                  “Booster thuộc về đội… với giá… Energy.”
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-bg-deep/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-beta">
                      Đội thắng
                    </p>
                    <RuleList
                      className="mt-2.5"
                      items={[
                        "Bị trừ đúng mức giá cuối cùng.",
                        "Chính thức sở hữu Booster.",
                        "Không được tiếp tục tham gia các phiên đấu giá còn lại.",
                        "Các mức giá kín đã đặt cho Booster khác tự động hết hiệu lực.",
                      ]}
                    />
                  </div>
                  <div className="rounded-xl border border-line bg-bg-deep/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
                      Đội không thắng
                    </p>
                    <RuleList
                      className="mt-2.5"
                      items={[
                        "Không bị trừ Energy.",
                        "Vẫn giữ nguyên Quỹ đấu giá.",
                        "Có thể tiếp tục tham gia phiên đấu giá khác nếu đủ điều kiện.",
                      ]}
                    />
                  </div>
                </div>
                <div className="pt-1">
                  <Callout tone="route" label="Trường hợp bằng giá">
                    Nếu hai đội bắt đầu vòng công khai với cùng mức giá kín cao
                    nhất: giá mở đầu là mức giá bằng nhau đó, Game Master mời hai
                    đội nâng lên mức tiếp theo, đội còn tiếp tục trả giá sẽ tạm
                    dẫn đầu. Nếu không đội nào muốn nâng giá, Game Master bốc
                    thăm công khai — đội thắng bốc thăm vẫn phải trả đúng mức giá
                    đã đặt.
                  </Callout>
                </div>
              </Accordion>
            </Reveal>

            <Reveal delay={160}>
              <Accordion title="Booster cuối cùng và tính ràng buộc" meta="Mục 9.4.7 – 9.4.8">
                <p>
                  Khi chỉ còn 01 đội chưa sở hữu Booster và 01 Booster chưa có
                  chủ, Booster còn lại sẽ được tự động trao cho đội đó. Đội phải
                  trả <strong className="text-energy">50% Quỹ đấu giá</strong>.
                  Booster cuối cùng không được nhận miễn phí.
                </p>
                <p className="text-muted">Sau khi Captain xác nhận mức giá:</p>
                <RuleList
                  items={[
                    "Không được rút lại.",
                    "Không được yêu cầu giảm giá.",
                    "Không được chuyển quyền mua cho đội khác.",
                    "Không được đổi Booster sau khi đã sở hữu.",
                    "Không được mua bán hoặc trao đổi Booster giữa các đội.",
                  ]}
                />
              </Accordion>
            </Reveal>
          </div>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="booster"
          index="09"
          title="Hệ thống 04 Booster"
          lead="Mỗi Booster là một chiến thuật khác nhau. Chọn đúng thứ hợp với thế trận của đội bạn."
        >
          <div className="space-y-4">
            {BOOSTERS.map((booster, i) => (
              <BoosterCard
                key={booster.key}
                booster={booster}
                delay={Math.min(i * 50, 200)}
              />
            ))}
          </div>

          <Card title="Quy tắc sử dụng Booster" accent="energy" delay={60}>
            <RuleList marker="check" items={BOOSTER_RULES} />
          </Card>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="ket-qua"
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

          <Reveal delay={60}>
            <Callout tone="danger" label="Thời điểm khiếu nại">
              Nếu phát hiện sai sót, Captain cần trao đổi ngay với Game Master
              trước khi kết quả được khóa. Sau khi Game Master tuyên bố{" "}
              <strong className="uppercase text-delta">
                kết quả đã được khóa
              </strong>
              , kết quả của Thử thách chính thức có hiệu lực.
            </Callout>
          </Reveal>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="phan-dinh"
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

          <Reveal delay={60}>
            <div className="rounded-2xl border border-energy/25 bg-linear-to-br from-energy/12 to-transparent p-6 text-center">
              <p className="text-[15px] leading-relaxed text-text/90">
                Đội chiến thắng Thử thách phân định sẽ trở thành
              </p>
              <p className="mt-2 text-xl font-extrabold uppercase tracking-tight text-energy sm:text-2xl">
                Quán quân
              </p>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
                Gameshow chỉ có 01 Quán quân
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ---------------------------------------------------------- */}
        <Section
          id="ghi-nho"
          index="12"
          title="07 điều người chơi cần nhớ"
        >
          <div className="space-y-2.5">
            {REMEMBER.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 45, 300)}>
                <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface/60 px-5 py-4">
                  <span className="font-mono text-sm font-bold text-energy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-text/90">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Reveal>
          <footer className="mt-8 border-t border-line pt-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-dim">
              {EVENT.org}
            </p>
            <p className="mt-3 text-lg font-extrabold uppercase tracking-tight">
              Make Your Move
            </p>
            <p className="mt-1 text-[13px] text-muted">{EVENT.subtitle}</p>
            <Link
              href="/"
              className="pressable mt-6 inline-block rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-muted transition-colors duration-200 ease-out hover:text-text"
            >
              Về trang mã QR
            </Link>
          </footer>
        </Reveal>
      </main>
    </>
  );
}

function GuideHero() {
  return (
    <header className="relative mx-auto w-full max-w-3xl px-5 pb-8 pt-14 sm:pt-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {EVENT.org}
        </p>
        <h1 className="mt-5 text-[clamp(2.1rem,9vw,3.25rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
          Make Your <span className="text-energy">Move</span>
        </h1>
        <div className="mt-4 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-route">
            {EVENT.subtitle}
          </p>
          <span className="hidden h-3.5 w-px bg-line-strong sm:block" />
          <p className="text-[13px] font-medium text-muted">{EVENT.docTitle}</p>
        </div>
      </Reveal>

      <Reveal delay={70}>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
          05 Thử thách. 04 Booster. Một nguồn Energy duy nhất. Đọc kỹ luật chơi
          trước khi Hải trình bắt đầu — mỗi quyết định đều được tính bằng Energy.
        </p>
      </Reveal>
    </header>
  );
}
