export const metadata = {
  title: 'Privacy Policy',
  description: 'How Pantheon collects, uses, and protects your information.',
};

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'When you create a Pantheon account, we collect your name and email address to identify you and send important service communications.',
      'As you use the platform, we collect usage data such as pages visited, actions performed in the dashboard, and feature interactions. This helps us understand how the product is used and where we can improve.',
      'When you upload images or media, files are stored securely via Cloudinary. We do not store raw files on our own servers.',
      'We collect standard server logs including IP address, browser type, and timestamps for security and diagnostic purposes.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'To operate and maintain your Pantheon account and provide you with the dashboard and content management features.',
      'To send transactional emails — such as password resets, login notifications, and billing confirmations — that are necessary for your use of the platform.',
      'To monitor and improve platform performance, diagnose technical issues, and develop new features.',
      'We do not sell, trade, or rent your personal information to third parties. We do not use your content or data to train AI models.',
    ],
  },
  {
    title: 'Data Storage & Security',
    body: [
      'Your account data is stored in a PostgreSQL database hosted in a secure environment. Data at rest is encrypted.',
      'Authentication is handled via JWT tokens delivered through HttpOnly cookies, which are protected against cross-site scripting (XSS) attacks.',
      'Media assets are delivered through Cloudinary\'s secure CDN. You retain full ownership of all content you upload.',
      'We apply industry-standard security practices and conduct ongoing reviews to protect your data. However, no internet transmission is 100% secure — we encourage you to use a strong, unique password.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'Pantheon integrates with Cloudinary for image hosting and delivery. Their privacy policy applies to media stored on their servers.',
      'We may use analytics tools to understand how users interact with our platform. Any analytics provider we use is contractually obligated to respect user privacy.',
      'If you connect Pantheon to an external product API (such as a catalogue or commerce service), your interactions with that API are governed by the third party\'s own privacy policy.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You may request a copy of all personal data we hold about you at any time.',
      'You may request deletion of your account and associated personal data. Note that content you have published to your website may need to be removed separately.',
      'You may update your profile information at any time from your account settings.',
      'If you believe we have handled your data incorrectly, you have the right to lodge a complaint with your local data protection authority.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you by email or by displaying a notice in your dashboard.',
      'The date at the top of this page indicates when the policy was last revised. Continued use of Pantheon after changes are posted constitutes your acceptance of those changes.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-[#020c15] min-h-screen">
      {/* Header banner */}
      <div className="bg-teal-light/40 dark:bg-[#04101f] border-b border-border dark:border-teal-900/40 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-text-muted dark:text-slate-400 text-sm">
            Effective date: <span className="font-medium">March 6, 2026</span>
          </p>
          <p className="mt-4 text-text-primary dark:text-slate-300 leading-relaxed">
            At Pantheon, we believe your data belongs to you. This policy explains what information
            we collect, how we use it, and the choices you have.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold text-text-primary dark:text-white mb-4 pb-2 border-b border-border dark:border-teal-900/40">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.body.map((para, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  <p className="text-sm text-text-primary dark:text-slate-300 leading-relaxed">{para}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-teal-light/40 dark:bg-[#071828] border border-border dark:border-teal-900/60 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-text-primary dark:text-white mb-1">Questions?</h3>
          <p className="text-sm text-text-muted dark:text-slate-400">
            If you have any questions about this Privacy Policy or how we handle your data, you can
            reach our team at{' '}
            <span className="text-teal font-medium">privacy@pantheon.app</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
