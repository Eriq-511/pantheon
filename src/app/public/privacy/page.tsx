export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <section className="max-w-2xl text-base text-slate-800 dark:text-slate-200">
        <p>
          <strong>Effective Date: March 14, 2026</strong>
        </p>
        <p>
          This Privacy Policy describes how Pantheon CMS ("we", "us", or "our") collects, uses, discloses, and protects your personal information when you use our platform. By accessing or using Pantheon CMS, you consent to the practices described herein.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li><strong>Account Information:</strong> When you register, we collect your username and password. Passwords are securely hashed and never stored in plain text.</li>
          <li><strong>Content:</strong> We collect content you create or upload, such as pages, images, and menu items.</li>
          <li><strong>Usage Data:</strong> We may collect information about your interactions with the platform for analytics and security purposes.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Information</h2>
        <ul className="list-disc pl-6">
          <li>To provide, maintain, and improve Pantheon CMS services</li>
          <li>To communicate with you regarding your account or support requests</li>
          <li>To ensure the security and integrity of the platform</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Disclosure of Information</h2>
        <p>
          We do not sell or rent your personal information. We may share information with trusted service providers (such as Cloudinary for image storage) only as necessary to operate Pantheon CMS. We may disclose information if required by law or to protect our rights.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data, including encrypted connections and secure password storage. However, no method of transmission over the Internet is 100% secure.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by contacting our support team. We will respond to all requests in accordance with applicable law.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at support@pantheoncms.com.
        </p>
      </section>
    </main>
  );
}