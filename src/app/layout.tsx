import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffaf2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-dvh bg-linear-to-b from-cream via-peach to-apricot bg-fixed font-sans text-ink antialiased">
        {/* 글래스 카드 뒤에 비칠 은은한 빛 번짐 (장식용) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 size-80 rounded-full bg-orange-200/50 blur-3xl" />
          <div className="absolute top-1/2 -right-32 size-96 rounded-full bg-rose-200/40 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
