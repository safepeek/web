import Link from 'next/link';

export default function TermsOfService() {
  return (
    <>
      <main className="flex-1 container px-4 py-12 md:py-16 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <h2 className="text-xl font-semibold mb-2">Effective Date: March 21, 2024</h2>
        <p className="mb-4">
          Welcome to SafePeek. These Terms of Service (&quot;Terms&quot;) govern your use of the SafePeek Bot
          (&quot;Bot&quot;) and the website located at <Link href="https://safepeek.org">https://safepeek.org</Link>{' '}
          (&quot;Site&quot;), both of which are operated by SafePeek Bot (&quot;we&quot;, &quot;us&quot;,
          &quot;our&quot;). By accessing or using our Bot or Site, you agree to be bound by these Terms. If you disagree
          with any part of the Terms, then you may not access the Bot or Site.
        </p>
        <h2 className="text-lg font-semibold mb-2">1. Ownership of Content and Intellectual Property</h2>
        <p className="mb-4">
          All content published and made available on our Bot and Site, including, but not limited to, text, graphics,
          logos, icons, images, and software, is the property of SafePeek Bot and is protected by United States and
          international copyright laws. The name &quot;SafePeek,&quot; the SafePeek logo, and other SafePeek branding
          elements are exclusively owned by SafePeek Bot and may not be used without our express written consent.
        </p>
        <h2 className="text-lg font-semibold mb-2">2. User Feedback</h2>
        <p className="mb-4">
          We welcome and encourage feedback from our users. You agree that any feedback, comments, ideas, improvements,
          or suggestions (collectively, &quot;Feedback&quot;) sent to us regarding the Bot or Site can be used by us
          without any obligation to compensate you. We have the right to use, reproduce, modify, adapt, publish,
          distribute, and incorporate such Feedback into the Bot or Site, with or without credit to you.
        </p>
        <h2 className="text-lg font-semibold mb-2">3. User Conduct</h2>
        <p className="mb-4">
          Users are expected to use the Bot and Site responsibly and in compliance with these Terms and applicable laws.
          You shall not use the Bot or Site for any unlawful purpose, nor shall you:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>Violate any laws, third-party rights, or our policies;</li>
          <li>Distribute malware, harmful code, or anything that could harm the Bot, Site, or users;</li>
          <li>
            Harvest or otherwise collect information about others, including email addresses, without their consent.
          </li>
        </ul>
        <h2 className="text-lg font-semibold mb-2">4. Disclaimers</h2>
        <p className="mb-4">
          The Bot and Site are provided on an &quot;as is&quot; and &quot;as available&quot; basis. SafePeek Bot makes
          no representations or warranties of any kind, express or implied, as to the operation of the Bot or Site or
          the information, content, or materials included therein. You expressly agree that your use of the Bot and Site
          is at your sole risk.
        </p>
        <h2 className="text-lg font-semibold mb-2">5. Limitation of Liability</h2>
        <p className="mb-4">
          SafePeek Bot shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary
          damages resulting from your use of the Bot or Site.
        </p>
        <h2 className="text-lg font-semibold mb-2">6. Modifications to the Terms</h2>
        <p className="mb-4">
          We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide
          notice of such changes by posting the new Terms on the Site and updating the &quot;Last Updated&quot; date at
          the top of these Terms. Your continued use of the Bot or Site after any such changes constitutes your
          acceptance of the new Terms.
        </p>
        <h2 className="text-lg font-semibold mb-2">7. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of the State of Ohio, United States,
          without regard to its conflict of law provisions.
        </p>
        <h2 className="text-lg font-semibold mb-2">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at{' '}
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
