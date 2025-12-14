import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import Link from "next/link"
import { Inter } from "next/font/google"
import Fathom from "@/components/fathom"
import { SocialIconsFooter } from "@/components/SocialIcons"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://safepeek.org"
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | SafePeek",
    default: "SafePeek - Secure Link Previews for Discord",
  },
  description: "Enhance Discord with secure link previews, metadata insights, and safety checks.",
  openGraph: {
    images: `${BASE_URL}/og.png`,
  },
}

export const viewport: Viewport = {
  themeColor: "#5B8DEF",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Fathom />
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-gradient-to-r from-slate-900 to-slate-800 py-4">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                  <Image src="/safepeek.svg" alt="SafePeek shield logo" width={48} height={48} />
                  <span className="text-2xl font-bold text-white">SafePeek</span>
                </Link>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link
                    href="https://discord.com/oauth2/authorize?client_id=1208283559799029760&permissions=274878024704&scope=bot+applications.commands"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Add SafePeek to Discord (opens in new tab)"
                  >
                    Add to Discord
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t bg-white py-8">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <nav className="flex items-center gap-6 text-sm" aria-label="Legal">
                  <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/legal/terms">
                    Terms
                  </Link>
                  <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/legal/privacy">
                    Privacy
                  </Link>
                  <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/legal/cookies">
                    Cookies
                  </Link>
                </nav>
                <SocialIconsFooter />
                <div className="text-sm text-muted-foreground">© 2025 Anthony Collier. All rights reserved.</div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
