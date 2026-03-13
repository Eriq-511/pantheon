export const metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of the Pantheon platform.',
};

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By creating a Pantheon account or using any part of the platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use Pantheon.',
      'These terms apply to all users of the platform, including account holders, contributors, and visitors who interact with content published through Pantheon.',
    ],
  },
  {
    title: 'Your Account',
    body: [
      'You are responsible for maintaining the confidentiality of your login credentials. Do not share your password with anyone. You are responsible for all activity that occurs under your account.',
      'You must provide accurate information when registering. Impersonating another person or creating accounts for misleading purposes is prohibited.',
      'You must be at least 16 years old to create a Pantheon account. By registering, you confirm that you meet this requirement.',
      'We reserve the right to suspend or terminate accounts that violate these terms, engage in abusive behaviour, or pose a security risk to other users.',
    ],
  },
  {
    title: 'Acceptable Use',
    body: [
      'You agree to use Pantheon only for lawful purposes. You may not use the platform to publish content that is unlawful, harassing, defamatory, obscene, or infringing on the rights of others.',
      'You may not attempt to gain unauthorised access to other accounts, circumvent security measures, or interfere with the platform\'s normal operation.',
      'Automated scraping, bulk data harvesting, or any action that places an unreasonable load on our infrastructure without prior written consent is prohibited.',
      'You may not use Pantheon to distribute malware, phishing content, spam, or any material intended to deceive or harm others.',
    ],
  },
  {
    title: 'Content Ownership & Responsibility',
    body: [
      'You retain full ownership of all content you create and publish through Pantheon — pages, images, menus, and product data are yours.',
      'By uploading content, you grant Pantheon a limited licence to display, cache, and deliver that content as part of the normal operation of the platform. This licence ends when you delete the content or close your account.',
      'You are solely responsible for ensuring your content complies with applicable laws, including copyright, data protection, and consumer protection regulations.',
      'Pantheon does not review or moderate user-published content. We reserve the right to remove content that is brought to our attention as violating these terms or applicable law.',
    ],
  },
  {
    title: 'Platform Availability',
    body: [
      'We aim to keep Pantheon available 24/7, but we do not guarantee uninterrupted service. Scheduled maintenance, updates, or circumstances beyond our control may occasionally cause downtime.',
      'We reserve the right to modify, suspend, or discontinue features of the platform at any time. Where possible, we will provide advance notice of significant changes.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'Pantheon is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the platform will be error-free or meet your specific requirements.',
      'To the fullest extent permitted by law, Pantheon shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the platform.',
      'Our total liability to you for any claim arising out of these terms shall not exceed the amount you paid us in the twelve months preceding the claim.',
    ],
  },
  {
    title: 'Changes to These Terms',
    body: [
      'We may revise these Terms of Service at any time. Major changes will be communicated via email or a notice in your dashboard at least 14 days before they take effect.',
      'Continued use of Pantheon after changes take effect constitutes your acceptance of the revised terms. If you disagree with the new terms, you may close your account before the effective date.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-[#020c15] min-h-screen">
      {/* Header banner */}
      <div className="bg-teal-light/40 dark:bg-[#04101f] border-b border-border dark:border-teal-900/40 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-3 text-text-muted dark:text-slate-400 text-sm">
            Effective date: <span className="font-medium">March 6, 2026</span>
          </p>
          <p className="mt-4 text-text-primary dark:text-slate-300 leading-relaxed">
            Please read these terms carefully. They explain your rights and responsibilities as a
            Pantheon user, and ours as the team that builds and maintains the platform.
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
          <h3 className="text-sm font-semibold text-text-primary dark:text-white mb-1">Contact Us</h3>
          <p className="text-sm text-text-muted dark:text-slate-400">
            If you have questions about these Terms or need to reach us regarding a legal matter,
            contact us at{' '}
            <span className="text-teal font-medium">legal@pantheon.app</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
