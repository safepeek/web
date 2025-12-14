import type { SVGProps } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DiscordIcon from "@/components/icons/DiscordIcon"

export default function Home() {
  return (
    <>
      {/* Hero Section with Navigation */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        {/* Hero Content */}
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <ShieldCheckIcon className="w-4 h-4" aria-hidden="true" />
                <span>Trusted by Discord communities</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Secure Link Previews for Discord
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 text-balance max-w-2xl mx-auto">
              Analyze links at the click of a button. Get rich metadata previews and comprehensive safety checks before
              you click.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Link
                  href="https://discord.com/oauth2/authorize?client_id=1208283559799029760&permissions=274878024704&scope=bot+applications.commands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  aria-label="Add SafePeek to Discord (opens in new tab)"
                >
                  <DiscordIcon fill="#fff" size={24} className="h-5 w-5" aria-hidden="true" />
                  Add to Discord
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Link
                  href="https://discord.gg/2TvARX4Xwp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join SafePeek community on Discord (opens in new tab)"
                >
                  Join Community
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32" aria-labelledby="features-heading">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 id="features-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
              Everything you need to stay safe
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              SafePeek provides comprehensive link analysis on demand, giving you control over what you inspect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 border-2 hover:border-primary transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <LinkIcon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Secure Link Previews</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate beautiful link previews on demand. Let your community safely inspect shared links with rich
                  visual cards at the click of a button.
                </p>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 border-2 hover:border-primary transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <InfoIcon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Metadata Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Uncover the story behind links with rich metadata. Know exactly what you're clicking with detailed
                  site information.
                </p>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 border-2 hover:border-primary transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <ShieldCheckIcon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Safety Checks</h3>
                <p className="text-muted-foreground leading-relaxed">
                  On-demand threat scanning and security analysis. We scan links when you need it, so your community can
                  browse with confidence.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-slate-50" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple, powerful protection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              SafePeek analyzes links when you need it, keeping your Discord server safe without intrusion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto"
                aria-label="Step 1"
              >
                1
              </div>
              <h3 className="text-xl font-bold">Add to Server</h3>
              <p className="text-muted-foreground">
                Invite SafePeek to your Discord server with one click. No complex setup required.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto"
                aria-label="Step 2"
              >
                2
              </div>
              <h3 className="text-xl font-bold">Analyze Links</h3>
              <p className="text-muted-foreground">
                Use the analyze command or button to inspect any link. Get instant previews and safety information.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto"
                aria-label="Step 3"
              >
                3
              </div>
              <h3 className="text-xl font-bold">Stay Protected</h3>
              <p className="text-muted-foreground">
                Get instant previews and safety alerts. Browse confidently with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Ready to secure your Discord server?
            </h2>
            <p className="text-xl text-slate-300 text-balance">
              Join thousands of communities using SafePeek to protect their members from malicious links.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Link
                  href="https://discord.com/oauth2/authorize?client_id=1208283559799029760&permissions=274878024704&scope=bot+applications.commands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  aria-label="Add SafePeek to Discord (opens in new tab)"
                >
                  <DiscordIcon fill="#fff" size={24} className="h-5 w-5" aria-hidden="true" />
                  Add to Discord
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-white border-t" aria-labelledby="newsletter-heading">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 id="newsletter-heading" className="text-2xl md:text-3xl font-bold">
              Stay updated
            </h3>
            <p className="text-muted-foreground">
              Get notified about new features, security updates, and best practices for keeping your Discord safe.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" aria-label="Newsletter signup">
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <Input
                id="email-input"
                className="flex-1"
                placeholder="Enter your email"
                type="email"
                disabled
                aria-describedby="newsletter-status"
              />
              <Button type="submit" disabled className="bg-primary hover:bg-primary/90">
                Sign up
              </Button>
            </form>
            <p id="newsletter-status" className="text-sm text-muted-foreground">
              Coming soon. We'll notify you when the newsletter is ready.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
