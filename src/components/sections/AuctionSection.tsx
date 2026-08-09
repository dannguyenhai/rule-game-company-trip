import { Accordion } from "@/components/Accordion";
import { DeckShell } from "@/components/deck/DeckShell";
import { Callout, Card, Hi, RuleList, deckDelay } from "@/components/ui";

export function AuctionSection() {
  return (
    <DeckShell
      index="06"
      title="Đấu giá vật phẩm Booster"
      lead="Sau Thử thách 2, mỗi đội đấu giá để sở hữu đúng 01 Booster — vật phẩm chiến thuật giúp tăng phần thưởng, bảo vệ Energy, giảm thiệt hại hoặc lật ngược tình thế. Game Master giới thiệu đầy đủ công dụng của 04 Booster trước khi phiên đấu giá bắt đầu."
    >
      <Card title="Tóm tắt cơ chế" eyebrow="Phiên đấu giá gồm 02 vòng">
        <div className="space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-route">
              Vòng 1 — Đấu giá kín
            </p>
            <RuleList
              className="mt-2.5"
              items={[
                <>
                  Mỗi đội có Quỹ đấu giá tối đa bằng <Hi tone="route">80%</Hi>{" "}
                  Energy hiện có.
                </>,
                "Captain phân bổ mức giá cho 04 Booster.",
                "Tổng 04 mức giá không vượt quá Quỹ đấu giá.",
                <>
                  <Hi tone="route">Top 2</Hi> mức giá kín của từng Booster được
                  vào vòng công khai.
                </>,
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
                <>
                  Mỗi lần nâng tối thiểu <Hi>05 Energy</Hi>.
                </>,
                "Đội có thể trả đến toàn bộ Quỹ đấu giá.",
                <>
                  <Hi>Chỉ đội thắng</Hi> bị trừ Energy.
                </>,
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
                <>
                  Mỗi đội sở hữu đúng <Hi>01 Booster</Hi>.
                </>,
                <>
                  Ít nhất <Hi tone="route">20%</Hi> Energy được bảo toàn cho phần
                  còn lại của Hải trình.
                </>,
                "Booster không được đổi hoặc chuyển cho đội khác.",
                "Mức giá Captain đã xác nhận không được thay đổi.",
              ]}
            />
          </div>
        </div>
      </Card>

      <p
        style={deckDelay(100)}
        className="deck-item pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-dim"
      >
        Chi tiết từng vòng
      </p>

      <div className="space-y-3">
        <div style={deckDelay(120)} className="deck-item">
          <Accordion title="Quỹ đấu giá của đội" meta="Mục 9.2">
            <p>
              Quỹ đấu giá được tính dựa trên số Energy đội đang sở hữu sau Thử
              thách 2. Mỗi đội được sử dụng tối đa{" "}
              <strong className="text-route">80% Energy hiện có</strong> để tham
              gia đấu giá.
            </p>
            <p>
              Ít nhất <strong>20% Energy còn lại được bảo toàn</strong> để đội
              tiếp tục tham gia các Thử thách phía sau. Nếu kết quả có số lẻ, số
              Energy được phép đấu giá sẽ được làm tròn xuống.
            </p>
            <p className="text-muted">
              Đội không bắt buộc phải sử dụng hết Quỹ đấu giá. Game Master sẽ
              thông báo Quỹ đấu giá tối đa của từng đội trước khi phiên đấu giá
              bắt đầu.
            </p>
          </Accordion>
        </div>

        <div style={deckDelay(140)} className="deck-item">
          <Accordion title="Vòng 1 — Điền phiếu đấu giá kín" meta="Mục 9.3">
            <p>
              Mỗi Captain nhận một phiếu gồm 04 ô tương ứng với 04 Booster và
              phân bổ Quỹ đấu giá dựa trên mức độ ưu tiên của đội. Đội không bắt
              buộc phải phân bổ hết quỹ.
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
                Với mỗi Booster, <strong>02 đội chưa sở hữu vật phẩm</strong> có
                mức giá kín cao nhất sẽ được bước vào vòng đấu giá công khai. Nếu
                các đội bằng giá tại vị trí cuối cùng, Game Master sẽ bốc thăm
                công khai. Nếu một đội đã thắng Booster ở phiên trước, đội có mức
                giá kín cao tiếp theo sẽ được đưa lên thay thế.
              </Callout>
            </div>
          </Accordion>
        </div>

        <div style={deckDelay(160)} className="deck-item">
          <Accordion
            title="Vòng 2 — Thứ tự và giá mở đầu"
            meta="Mục 9.4.1 – 9.4.2"
          >
            <p>
              Sau khi toàn bộ phiếu kín được khóa, Game Master bốc thăm công khai
              để xác định thứ tự đưa 04 Booster ra đấu giá. Các Booster lần lượt
              được đưa ra cho đến khi mỗi đội sở hữu 01 vật phẩm.
            </p>
            <p>
              Giá mở đầu của mỗi Booster là mức giá kín cao nhất trong các đội đủ
              điều kiện tham gia.
            </p>
            <div className="pt-1">
              <Callout label="Ví dụ">
                Đội A và Đội B được vào vòng công khai. AI Booster bắt đầu ở mức{" "}
                <strong className="text-energy">50 Energy</strong>. Nếu Đội B
                không muốn trả cao hơn, Đội A sở hữu AI Booster với giá 50 Energy.
              </Callout>
            </div>
          </Accordion>
        </div>

        <div style={deckDelay(180)} className="deck-item">
          <Accordion title="Cách nâng giá và xác nhận" meta="Mục 9.4.3 – 9.4.4">
            <p>
              Mỗi lần nâng giá phải tăng tối thiểu{" "}
              <strong className="text-energy">05 Energy</strong> so với mức giá
              đang dẫn đầu. Giá hiện tại 50 Energy → mức giá tiếp theo phải từ 55
              Energy trở lên.
            </p>
            <p>
              Captain có thể nâng nhiều hơn 5 Energy, miễn không vượt quá Quỹ đấu
              giá của đội. Mức giá kín ban đầu không phải là mức giá tối đa: một
              đội đặt kín 10 Energy cho Booster vẫn có thể nâng giá đến toàn bộ
              Quỹ đấu giá của mình nếu được vào vòng công khai.
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
                  Đội muốn tiếp tục phải xác nhận trong thời gian đếm. Không xác
                  định quyền trả giá dựa trên việc đội nào giơ tay nhanh hơn.
                </p>
              </Callout>
            </div>
          </Accordion>
        </div>

        <div style={deckDelay(200)} className="deck-item">
          <Accordion
            title="Xác định đội sở hữu Booster"
            meta="Mục 9.4.5 – 9.4.6"
          >
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
                Nếu hai đội bắt đầu vòng công khai với cùng mức giá kín cao nhất:
                giá mở đầu là mức giá bằng nhau đó, Game Master mời hai đội nâng
                lên mức tiếp theo, đội còn tiếp tục trả giá sẽ tạm dẫn đầu. Nếu
                không đội nào muốn nâng giá, Game Master bốc thăm công khai — đội
                thắng bốc thăm vẫn phải trả đúng mức giá đã đặt.
              </Callout>
            </div>
          </Accordion>
        </div>

        <div style={deckDelay(220)} className="deck-item">
          <Accordion
            title="Booster cuối cùng và tính ràng buộc"
            meta="Mục 9.4.7 – 9.4.8"
          >
            <p>
              Khi chỉ còn 01 đội chưa sở hữu Booster và 01 Booster chưa có chủ,
              Booster còn lại sẽ được tự động trao cho đội đó. Đội phải trả{" "}
              <strong className="text-energy">50% Quỹ đấu giá</strong>. Booster
              cuối cùng không được nhận miễn phí.
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
        </div>
      </div>
    </DeckShell>
  );
}
