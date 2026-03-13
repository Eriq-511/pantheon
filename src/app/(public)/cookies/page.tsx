import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy',
  description: 'How Pantheon uses cookies and similar technologies.',
};

const cookieTypes = [
  {
    name: 'Essential cookies',
    required: true,
    desc: 'These cookies are strictly necessary for the platform to function. They enable core features like user authentication, session management, and security protection. Without them, Pantheon cannot operate.',
    examples: ['Authentication token (keeps you logged into the admin dashboard)', 'CSRF protection token (prevents unauthorised form submissions)', 'Session identifier (maintains your active session)'],
  },
  {
    name: 'Preference cookies',
    required: false,
    desc: 'These cookies remember choices you make to personalise your experience on Pantheon, such as your preferred colour theme (light or dark mode). They are set only when you make a choice.',
    examples: ['Theme preference (light or dark mode)', 'Dashboard layout state'],
  },
  {
    name: 'Analytics cookies',
    required: false,
    desc: 'We may use analytics cookies to understand how users interact with the platform — which features are used most, where users encounter difficulty, and how to improve the overall experience. All analytics data is aggregated and anonymised.',
    examples: ['Page view events', 'Feature interaction counts', 'Session duration'],
  },
];

export default function CookiesPage() {
  return (
    <div className="bg-white dark:bg-[#020c15] min-h-screen">
      {/* Header banner */}
      <div className="bg-teal-light/40 dark:bg-[#04101f] border-b border-border dark:border-teal-900/40 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
            Cookie Policy
          </h1>
          <p className="mt-3 text-text-muted dark:text-slate-400 text-sm">
            Effective date: <span className="font-medium">March 6, 2026</span>
          </p>
          <p className="mt-4 text-text-primary dark:text-slate-300 leading-relaxed">
            Pantheon uses cookies to keep you securely logged in and to improve your experience. This
            page explains what cookies we use and why.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        {/* What are cookies */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-4 pb-2 border-b border-border dark:border-teal-900/40">
            What are cookies?
          </h2>
          <p className="text-sm text-text-primary dark:text-slate-300 leading-relaxed">
            Cookies are small text files placed on your device by websites you visit. They are widely
            used to make websites work correctly, remember your preferences, and provide useful information
            to the site owners. Pantheon uses cookies exclusively through HttpOnly and Secure flags,
            meaning they cannot be accessed by client-side scripts — keeping your session protected.
          </p>
        </div>

        {/* Cookie types */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-6 pb-2 border-b border-border dark:border-teal-900/40">
            Cookies we use
          </h2>
          <div className="space-y-6">
            {cookieTypes.map((ct) => (
              <div
                key={ct.name}
                className="bg-white dark:bg-[#071828] rounded-xl border border-border dark:border-teal-900/60 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-sm font-semibold text-text-primary dark:text-white">{ct.name}</p>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      ct.required
                        ? 'bg-teal/10 text-teal border border-teal/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-text-muted dark:text-slate-400 border border-border dark:border-slate-700'
                    }`}
                  >
                    {ct.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed mb-3">{ct.desc}</p>
                <ul className="space-y-1.5">
                  {ct.examples.map((ex) => (
                    <li key={ex} className="flex gap-2 text-xs text-text-muted dark:text-slate-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal/50 flex-shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Managing cookies */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-4 pb-2 border-b border-border dark:border-teal-900/40">
            Managing your cookies
          </h2>
          <div className="space-y-3">
            {[
              'You can control and delete cookies through your browser settings. Most browsers allow you to block or clear cookies at any time.',
              'Blocking essential cookies will prevent you from logging into the Pantheon admin dashboard, as they are required for authentication.',
              'To clear your Pantheon session, simply log out from the admin dashboard. This removes the authentication cookie from your browser.',
              'For more information on managing cookies in your specific browser, visit the help documentation for Chrome, Firefox, Safari, or Edge.',
            ].map((para, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                <p className="text-sm text-text-primary dark:text-slate-300 leading-relaxed">{para}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-teal-light/40 dark:bg-[#071828] border border-border dark:border-teal-900/60 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-text-primary dark:text-white mb-1">Questions about cookies?</h3>
          <p className="text-sm text-text-muted dark:text-slate-400">
            Reach out at{' '}
            <span className="text-teal font-medium">privacy@pantheon.app</span> and we will be happy
            to help. You can also review our{' '}
            <Link href="/privacy" className="text-teal hover:underline">Privacy Policy</Link> for
            the full picture of how we handle your data.
          </p>
        </div>
      </div>
    </div>
  );
}
