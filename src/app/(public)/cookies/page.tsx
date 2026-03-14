export default function CookiePolicyPage() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#020c15] py-20 sm:py-28 lg:py-32 min-h-[60vh] flex flex-col items-center">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-teal-light/60 dark:bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-teal-light/30 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full hidden dark:block bg-cyan-500/5 blur-[140px]" />
      </div>
      <div className="relative w-full flex flex-col items-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-deep dark:text-white mb-6 mt-2 text-center drop-shadow-lg">Cookie Policy</h1>
        <section className="max-w-2xl text-base text-text-muted dark:text-slate-300 bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-lg p-8">
          <p>
            <strong>Effective Date: March 14, 2026</strong>
          </p>
          <p>
            This Cookie Policy explains how Pantheon CMS ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our platform. By using Pantheon CMS, you consent to our use of cookies as described below.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device to help us provide a better user experience. They allow us to remember your preferences, keep you logged in, and analyze how you use Pantheon CMS.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">2. How We Use Cookies</h2>
          <ul className="list-disc pl-6">
            <li>To authenticate users and manage sessions securely</li>
            <li>To analyze usage and improve our services</li>
            <li>To remember your theme and other preferences</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">3. Managing Cookies</h2>
          <p>
            You can control or delete cookies through your browser settings. Please note that disabling cookies may affect your ability to use certain features of Pantheon CMS.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">4. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">5. Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at support@pantheoncms.com.
          </p>
        </section>
      </div>
    </section>
  );
}