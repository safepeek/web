import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <main className="flex-1 container px-4 py-12 md:py-16 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <h2 className="text-xl font-semibold mb-2">Effective Date: March 21, 2024</h2>

        <p className="mb-4">
          Welcome to SafePeek! This Privacy Policy outlines how SafePeek (&quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;), known on Discord as &quot;SafePeek#0519&quot; with the user ID of
          &quot;1208283559799029760&quot;, collects, uses, and safeguards information when you interact with our Discord
          bot (&quot;Bot&quot;) or visit our website located at{' '}
          <Link href="https://safepeek.org">https://safepeek.org</Link> (&quot;Site&quot;). By utilizing our Bot, Site,
          or both, you consent to the practices described in this policy.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>

        <h3 className="text-md font-semibold mb-1">1.1 Data Provided by You</h3>
        <ul className="list-disc ml-4 mb-4">
          <li>
            <strong>Discord User ID:</strong> Your unique identifier on Discord.
          </li>
          <li>
            <strong>Discord Guild ID and Channel ID:</strong> Identifiers for the Discord server and channel where the
            Bot is used.
          </li>
          <li>
            <strong>User-Submitted Content:</strong> Commands you submit to the Bot, including URLs and associated
            metadata for analysis.
          </li>
          <li>
            <strong>Activity Data:</strong> The date, time, and user ID of the user who ran the command for operational
            and analytical purposes.
          </li>
        </ul>

        <h3 className="text-md font-semibold mb-1">1.2 Analytics Data</h3>
        <p className="mb-4">
          For our Site, we use Fathom Analytics, a privacy-centric tool, to collect aggregated data about user
          interactions and usage patterns. This may include visit frequency, page views, and other relevant metrics.
          Fathom Analytics prioritizes user privacy, ensuring individual identifiers are securely managed.
        </p>

        <h2 className="text-lg font-semibold mb-2">2. Use of Information</h2>
        <p className="mb-4">Your information is utilized to:</p>

        <ul className="list-disc ml-4 mb-4">
          <li>Provide, maintain, and improve the SafePeek Bot and website.</li>
          <li>Respond to user requests and provide customer service.</li>
          <li>Analyze and understand Service usage for improvement.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">3. Sharing of Information</h2>
        <p className="mb-4">We do not share personal information with third parties, except as required by law.</p>

        <h2 className="text-lg font-semibold mb-2">4. Data Retention</h2>
        <p className="mb-4">
          Information is retained only as long as necessary to provide our services, comply with legal obligations,
          resolve disputes, and enforce our agreements.
        </p>

        <h2 className="text-lg font-semibold mb-2">5. User Rights</h2>
        <p className="mb-4">
          You have the right to request access to, correction, or deletion of your personal data stored by us. Requests
          can be made by contacting us at <Link href="mailto:hello@safepeek.org">hello@safepeek.org</Link> or through
          our official support server at <Link href="https://discord.gg/2TvARX4Xwp">https://discord.gg/2TvARX4Xwp</Link>
          .
        </p>

        <h2 className="text-lg font-semibold mb-2">6. Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect the information we collect from unauthorized access, disclosure,
          alteration, or destruction.
        </p>

        <h2 className="text-lg font-semibold mb-2">7. International Data Transfers</h2>
        <p className="mb-4">
          Data transfers across international borders comply with the policies of services we use, such as Discord and
          Vercel.
        </p>

        <h2 className="text-lg font-semibold mb-2">8. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We reserve the right to update our Privacy Policy at any time. Changes will be communicated through our Site,
          and we encourage you to review this policy periodically.
        </p>

        <h2 className="text-lg font-semibold mb-2">9. Contact Us</h2>
        <p className="mb-2">
          For questions about this Privacy Policy, please contact us at{' '}
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
  );
}
