import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "View the Cookie Policy for SafePeek.",
}

export default function CookiePolicy() {
  return (
    <>
      <main className="flex-1 container px-4 py-12 md:py-16 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <h2 className="text-xl font-semibold mb-2">Effective Date: March 21, 2024</h2>

        <p className="mb-4">
          This Cookie Policy explains how SafePeek (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and
          similar technologies to recognize you when you visit our website at{" "}
          <Link href="https://safepeek.org">https://safepeek.org</Link> (&quot;Site&quot;). It explains what these
          technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website.
          Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as
          to provide reporting information.
        </p>

        <h2 className="text-lg font-semibold mb-2">2. Why Do We Use Cookies?</h2>
        <p className="mb-4">
          We use first-party and third-party cookies for several reasons. We use cookies to help us understand how you
          use our Site and to improve your experience. Specifically, we use Fathom Analytics, a privacy-first analytics
          tool that helps us understand Site usage without compromising your privacy.
        </p>

        <h2 className="text-lg font-semibold mb-2">3. What Types of Cookies Do We Use?</h2>

        <h3 className="text-md font-semibold mb-1">3.1 Essential Website Cookies</h3>
        <p className="mb-4">
          These cookies are strictly necessary to provide you with services available through our Site and to use some
          of its features.
        </p>

        <h3 className="text-md font-semibold mb-1">3.2 Analytics and Performance Cookies</h3>
        <p className="mb-4">
          We use Fathom Analytics to collect information about how visitors use our Site. These cookies help us improve
          how our Site works. Fathom Analytics does not track individual users or collect personally identifiable
          information, making it a privacy-conscious choice.
        </p>

        <h2 className="text-lg font-semibold mb-2">4. How Can You Control Cookies?</h2>
        <p className="mb-4">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by
          setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies,
          you may still use our Site, though your access to some functionality and areas may be restricted.
        </p>

        <h2 className="text-lg font-semibold mb-2">5. Updates to This Cookie Policy</h2>
        <p className="mb-4">
          We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other
          operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about
          our use of cookies.
        </p>

        <h2 className="text-lg font-semibold mb-2">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our use of cookies or other technologies, please contact us at{" "}
          <Link href="mailto:hello@safepeek.org">hello@safepeek.org</Link>.
        </p>

        <p>
          <em>AI Transparency</em>
          <br />
          This document has been produced partially using AI/GPT software. Please note that it has not been reviewed by
          legal counsel. We recommend consulting with a qualified legal professional for advice specific to your
          situation.
        </p>
      </main>
    </>
  )
}
