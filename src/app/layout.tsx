import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/'
  },
  title: "SafePeek",
  description: "Enhance Discord with secure link previews, metadata insights, and safety checks.",
  openGraph: {
    images: `${BASE_URL}/og.png`
  }
};

export const viewport: Viewport = {
  themeColor: '#3871C1'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
