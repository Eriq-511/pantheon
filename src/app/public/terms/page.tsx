export default function TermsOfServicePage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <section className="max-w-2xl text-base text-slate-800 dark:text-slate-200">
        <p>
          <strong>Effective Date: March 14, 2026</strong>
        </p>
        <p>
          These Terms of Service ("Terms") govern your use of Pantheon CMS ("the Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use Pantheon CMS.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
        <ul className="list-disc pl-6">
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for all content you create, upload, or publish using Pantheon CMS.</li>
          <li>You agree not to use the Service for any unlawful, harmful, or abusive activities.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Content Ownership</h2>
        <p>
          You retain ownership of all content you create. By using Pantheon CMS, you grant us a non-exclusive license to display, store, and distribute your content as necessary to provide the Service.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Account Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use of your account.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to Pantheon CMS at our discretion, with or without notice, for violation of these Terms or for any other reason.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Disclaimer</h2>
        <p>
          Pantheon CMS is provided "as is" without warranties of any kind. We disclaim all liability for damages arising from your use of the Service.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
        <p>
          For questions about these Terms, contact us at support@pantheoncms.com.
        </p>
      </section>
    </main>
  );
}