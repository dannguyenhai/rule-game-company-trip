import type { ReactNode } from "react";

/** Khung chung của một màn: số thứ tự, tiêu đề, câu dẫn, rồi nội dung. */
export function DeckShell({
  index,
  title,
  lead,
  children,
}: {
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="m-auto w-full max-w-3xl px-4 py-8 sm:px-5 sm:py-10">
      <header className="deck-item">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-energy">
            {index}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {lead}
          </p>
        ) : null}
      </header>
      <div className="mt-7 space-y-4">{children}</div>
    </div>
  );
}
