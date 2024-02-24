import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafePeek",
  description: "Enhance Discord with secure link previews, metadata insights, and safety checks.",
  twitter: {
    card: 'summary_large_image',
    title: 'SafePeek',
    description: 'Enhance Discord with secure link previews, metadata insights, and safety checks.',
    // siteId: '1467726470533754880',
    // creator: '@safepeek',
    // creatorId: '1467726470533754880',
    images: ['https://safepeek.org/og.png'], // Must be an absolute URL
  },
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
