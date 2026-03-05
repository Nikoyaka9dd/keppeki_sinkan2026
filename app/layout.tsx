import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026年度新歓特設サイト | 劇団ケッペキ",
  description: "劇団ケッペキ 2026年度新歓特設サイト メンテナンスページ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
