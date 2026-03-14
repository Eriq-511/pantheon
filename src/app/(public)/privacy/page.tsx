export default function PrivacyPolicyPage() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#020c15] py-20 sm:py-28 lg:py-32 min-h-[60vh] flex flex-col items-center">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-teal-light/60 dark:bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-teal-light/30 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full hidden dark:block bg-cyan-500/5 blur-[140px]" />
      </div>
      <div className="relative w-full flex flex-col items-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-deep dark:text-white mb-6 mt-2 text-center drop-shadow-lg">Privacy Policy</h1>
        <section className="max-w-2xl text-base text-text-muted dark:text-slate-300 bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-lg p-8">
          <p>
            <strong>Effective Date: March 14, 2026</strong>
          </p>
          <p>
            This Privacy Policy describes how Pantheon CMS ("we", "us", or "our") collects, uses, discloses, and protects your personal information when you use our platform. By accessing or using Pantheon CMS, you consent to the practices described herein.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">1. Information We Collect</h2>
          <ul className="list-disc pl-6">
            <li><strong>Account Information:</strong> When you register, we collect your username and password. Passwords are securely hashed and never stored in plain text.</li>
            <li><strong>Content:</strong> We collect content you create or upload, such as pages, images, and menu items.</li>
            <li><strong>Usage Data:</strong> We may collect information about your interactions with the platform for analytics and security purposes.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">2. Use of Information</h2>
          <ul className="list-disc pl-6">
            <li>To provide, maintain, and improve Pantheon CMS services</li>
            <li>To communicate with you regarding your account or support requests</li>
            <li>To ensure the security and integrity of the platform</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">3. Disclosure of Information</h2>
          <p>
            We do not sell or rent your personal information. We may share information with trusted service providers (such as Cloudinary for image storage) only as necessary to operate Pantheon CMS. We may disclose information if required by law or to protect our rights.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including encrypted connections and secure password storage. However, no method of transmission over the Internet is 100% secure.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">5. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data by contacting our support team. We will respond to all requests in accordance with applicable law.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@pantheoncms.com.
          </p>
        </section>
      </div>
    </section>
  );
}