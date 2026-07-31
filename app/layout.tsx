import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "AXON Software Library",
    description: "AXON 프로그램, Voice, 추천 이미지 스타일과 Remotion 애니메이션 라이브러리를 한곳에서 확인하세요.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "AXON Software Library",
      description: "프로그램, Voice, 이미지 스타일과 503개 Remotion 애니메이션 데모를 한곳에서.",
      images: [{ url: `${origin}/og-remotion.png`, width: 1200, height: 630, alt: "AXON Software Library Remotion catalog" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AXON Software Library",
      description: "프로그램, Voice, 이미지 스타일과 503개 Remotion 애니메이션 데모를 한곳에서.",
      images: [`${origin}/og-remotion.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
