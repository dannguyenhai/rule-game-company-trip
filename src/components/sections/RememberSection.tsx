import Link from "next/link";
import { DeckShell } from "@/components/deck/DeckShell";
import { EVENT, REMEMBER } from "@/lib/content";
import { XipatLogo } from "@/components/XipatLogo";
import { deckDelay } from "@/components/ui";

export function RememberSection() {
  return (
    <DeckShell index="12" title="07 điều người chơi cần nhớ">
      <div className="space-y-2.5">
        {REMEMBER.map((item, i) => (
          <div
            key={item}
            style={deckDelay(Math.min(i * 40, 280))}
            className="deck-item flex items-start gap-4 rounded-2xl border border-line bg-surface/60 px-5 py-4"
          >
            <span className="font-mono text-sm font-bold text-energy">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[15px] leading-relaxed text-text/90">{item}</p>
          </div>
        ))}
      </div>

      <footer
        style={deckDelay(320)}
        className="deck-item mt-8 border-t border-line pt-8 text-center"
      >
        <XipatLogo className="justify-center" />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-dim">
          {EVENT.org}
        </p>
        <p className="chrome-text mt-3 font-display text-2xl font-black uppercase">
          {EVENT.title}
        </p>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {EVENT.titleEn}
        </p>
        <Link
          href="/"
          className="pressable mt-6 inline-block rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-muted transition-colors duration-200 ease-out hover:text-text"
        >
          Về trang mã QR
        </Link>
      </footer>
    </DeckShell>
  );
}
