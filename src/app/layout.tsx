import type { Metadata, Viewport } from "next";
import {
  Be_Vietnam_Pro,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

/** Serif của Key Visual — chỉ dùng cho chữ “Dẫn Lối”. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dẫn Lối — Make Your Move | Xipat Company Trip 2026",
  description:
    "Luật chơi đầy đủ của Gameshow Make Your Move – The Strategy Game: 05 Thử thách, cơ chế đầu tư Energy, đấu giá Booster và điều kiện giành Quán quân.",
  openGraph: {
    title: "Dẫn Lối — Make Your Move | The Strategy Game",
    description:
      "Hướng dẫn dành cho người chơi — Gala Dinner, Xipat Company Trip 2026. Quét mã, đọc luật, giữ Tổng Energy cao nhất.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#041226",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${jetbrains.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="bg-field" aria-hidden />
        {children}
      </body>
    </html>
  );
}
