import { BoosterCard } from "@/components/BoosterCard";
import { DeckShell } from "@/components/deck/DeckShell";
import { BOOSTERS, BOOSTER_RULES } from "@/lib/content";
import { Card, RuleList } from "@/components/ui";

export function BoosterSection() {
  return (
    <DeckShell
      index="07"
      title="Hệ thống 04 Booster"
      lead="Mỗi Booster là một chiến thuật khác nhau. Chọn đúng thứ hợp với thế trận của đội bạn."
    >
      <div className="space-y-4">
        {BOOSTERS.map((booster, i) => (
          <BoosterCard
            key={booster.key}
            booster={booster}
            delay={Math.min(i * 45, 200)}
          />
        ))}
      </div>

      <Card title="Quy tắc sử dụng Booster" accent="energy" delay={240}>
        <RuleList marker="check" items={BOOSTER_RULES} />
      </Card>
    </DeckShell>
  );
}
