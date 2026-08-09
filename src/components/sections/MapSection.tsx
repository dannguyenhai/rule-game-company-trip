import { DeckShell } from "@/components/deck/DeckShell";
import { JourneyMap } from "@/components/JourneyMap";

export function MapSection() {
  return (
    <DeckShell
      index="05"
      title="Sơ đồ Hải trình"
      lead="Toàn bộ chặng đường từ màn ra mắt đến ngôi Quán quân."
    >
      <JourneyMap />
    </DeckShell>
  );
}
