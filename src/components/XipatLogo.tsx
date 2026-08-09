import clsx from "clsx";

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
  size?: "sm" | "lg";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center",
        size === "sm" ? "gap-[3px]" : "gap-[5px]",
        className,
      )}
      aria-label="Xipat"
      role="img"
    >
      <span
        className={clsx(
          "font-extrabold lowercase leading-none tracking-[-0.03em] text-text",
          size === "sm" ? "text-[15px]" : "text-[22px] sm:text-[26px]",
        )}
      >
        xipat
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={clsx(
          "shrink-0 self-start text-text",
          size === "sm" ? "size-[8px]" : "size-[12px]",
        )}
      >
        <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="2.4" />
        <ellipse
          cx="12"
          cy="12"
          rx="4.6"
          ry="10.5"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path d="M1.5 12h21" stroke="currentColor" strokeWidth="2.4" />
      </svg>
    </span>
  );
}
