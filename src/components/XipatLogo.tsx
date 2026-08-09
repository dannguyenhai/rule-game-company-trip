import clsx from "clsx";

const SIZES = {
  sm: {
    text: "text-[19px]",
    mark: "size-[10px]",
    gap: "gap-[4px]",
    lift: "-translate-y-[2px]",
  },
  md: {
    text: "text-[24px]",
    mark: "size-[12px]",
    gap: "gap-[5px]",
    lift: "-translate-y-[2px]",
  },
  lg: {
    text: "text-[32px] sm:text-[40px]",
    mark: "size-[16px] sm:size-[20px]",
    gap: "gap-[6px] sm:gap-[7px]",
    lift: "-translate-y-[3px] sm:-translate-y-[4px]",
  },
} as const;

/**
 * Wordmark Xipat dựng lại bằng chữ + ký hiệu địa cầu.
 * Muốn khớp tuyệt đối bộ nhận diện, thay khối này bằng file SVG gốc của
 * thương hiệu — mọi nơi dùng logo đều đi qua component này.
 */
export function XipatLogo({
  className,
  size = "sm",
}: {
  className?: string;
  size?: keyof typeof SIZES;
}) {
  const s = SIZES[size];

  return (
    <span
      role="img"
      aria-label="Xipat"
      className={clsx("inline-flex items-center text-text", s.gap, className)}
    >
      <span
        className={clsx(
          "font-bold lowercase leading-none tracking-[-0.02em]",
          s.text,
        )}
      >
        xipat
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={clsx("shrink-0", s.mark, s.lift)}
      >
        <circle
          cx="12"
          cy="12"
          r="10.4"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="4.7"
          ry="10.4"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path d="M1.9 12h20.2" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    </span>
  );
}
