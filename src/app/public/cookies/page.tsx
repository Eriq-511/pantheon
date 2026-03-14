export default function CookiePolicyPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
      <section className="max-w-2xl text-base text-slate-800 dark:text-slate-200">
        <p>
          <strong>Effective Date: March 14, 2026</strong>
        </p>
        <p>
          This Cookie Policy explains how Pantheon CMS ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our platform. By using Pantheon CMS, you consent to our use of cookies as described below.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device to help us provide a better user experience. They allow us to remember your preferences, keep you logged in, and analyze how you use Pantheon CMS.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Cookies</h2>
        <ul className="list-disc pl-6">
          <li>To authenticate users and manage sessions securely</li>
          <li>To analyze usage and improve our services</li>
          <li>To remember your theme and other preferences</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Managing Cookies</h2>
        <p>
          You can control or delete cookies through your browser settings. Please note that disabling cookies may affect your ability to use certain features of Pantheon CMS.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us at support@pantheoncms.com.
        </p>
      </section>
    </main>
  );
}