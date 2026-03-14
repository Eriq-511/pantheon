export default function TermsOfServicePage() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#020c15] py-20 sm:py-28 lg:py-32 min-h-[60vh] flex flex-col items-center">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-teal-light/60 dark:bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-teal-light/30 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full hidden dark:block bg-cyan-500/5 blur-[140px]" />
      </div>
      <div className="relative w-full flex flex-col items-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-deep dark:text-white mb-6 mt-2 text-center drop-shadow-lg">Terms of Service</h1>
        <section className="max-w-2xl text-base text-text-muted dark:text-slate-300 bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-lg p-8">
          <p>
            <strong>Effective Date: March 14, 2026</strong>
          </p>
          <p>
            These Terms of Service ("Terms") govern your use of Pantheon CMS ("the Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use Pantheon CMS.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">1. Use of Service</h2>
          <ul className="list-disc pl-6">
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>You are responsible for all content you create, upload, or publish using Pantheon CMS.</li>
            <li>You agree not to use the Service for any unlawful, harmful, or abusive activities.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">2. Content Ownership</h2>
          <p>
            You retain ownership of all content you create. By using Pantheon CMS, you grant us a non-exclusive license to display, store, and distribute your content as necessary to provide the Service.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">3. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use of your account.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">4. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to Pantheon CMS at our discretion, with or without notice, for violation of these Terms or for any other reason.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">5. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">6. Disclaimer</h2>
          <p>
            Pantheon CMS is provided "as is" without warranties of any kind. We disclaim all liability for damages arising from your use of the Service.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">7. Contact</h2>
          <p>
            For questions about these Terms, contact us at support@pantheoncms.com.
          </p>
        </section>
      </div>
    </section>
  );
}