import Link from 'next/link';
import { FileText, ChevronRight, PenLine, Eye, Trash2, Globe } from 'lucide-react';

export const metadata = {
  title: 'Page Management',
  description: 'Learn how to create, edit, and publish pages in Pantheon.',
};

const steps = [
  {
    icon: PenLine,
    title: 'Create a new page',
    body: 'From your admin dashboard, navigate to Pages and click "New Page". Give your page a title — Pantheon will automatically generate a URL slug for you, which you can customise.',
  },
  {
    icon: FileText,
    title: 'Write your content',
    body: 'Use the built-in content editor to write and format your page body. Add headings, paragraphs, and calls-to-action. No HTML or code knowledge required.',
  },
  {
    icon: Eye,
    title: 'Set publication status',
    body: 'Toggle between Draft and Published at any time. Draft pages are only visible to you in the admin. Published pages are live on your website immediately.',
  },
  {
    icon: Globe,
    title: 'Your page goes live',
    body: 'Once published, your page is instantly accessible at its URL. Visitors can reach it through your navigation menu, direct links, or search engines.',
  },
  {
    icon: Trash2,
    title: 'Edit or remove any time',
    body: 'Return to Pages in your dashboard to update content, change the slug, or delete a page. Changes take effect the moment you save.',
  },
];

const pageTypes = [
  { name: 'Homepage', desc: 'Your main landing page — the first impression visitors get of your brand.' },
  { name: 'About', desc: 'Tell your story. Who you are, what you do, and why customers should choose you.' },
  { name: 'Landing Page', desc: 'Focused pages built around a single campaign, product launch, or promotion.' },
  { name: 'Promotions', desc: 'Time-sensitive pages for sales events, discounts, or seasonal campaigns.' },
];

export default function PageManagementDoc() {
  return (
    <div className="bg-white dark:bg-[#020c15] min-h-screen">
      {/* Breadcrumb + header */}
      <div className="bg-teal-light/40 dark:bg-[#04101f] border-b border-border dark:border-teal-900/40 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted dark:text-slate-500 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-teal">Page Management</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 dark:bg-teal/20 border border-teal/30 flex items-center justify-center">
              <FileText size={18} className="text-teal" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Docs</p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
            Page Management
          </h1>
          <p className="mt-4 text-text-primary dark:text-slate-300 leading-relaxed">
            Create and manage every page on your website — Homepage, About, Landing pages, and
            Promotions — from a single admin panel. No code. No waiting.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Page types */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-6">
            What kinds of pages can I create?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {pageTypes.map((pt) => (
              <div
                key={pt.name}
                className="bg-teal-light/30 dark:bg-[#071828] rounded-xl border border-border dark:border-teal-900/60 p-5"
              >
                <p className="text-sm font-semibold text-teal-deep dark:text-teal mb-1">{pt.name}</p>
                <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-6">
            How it works
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-6 bottom-6 w-px bg-teal/20 dark:bg-teal/30" />
            <div className="space-y-4">
              {steps.map(({ icon: Icon, title, body }, i) => (
                <div key={title} className="relative flex gap-4 pl-12">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-teal" />
                  </div>
                  <div className="bg-white dark:bg-[#071828] rounded-xl border border-border dark:border-teal-900/60 p-4 flex-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-teal/60">0{i + 1}</span>
                    <p className="text-sm font-semibold text-text-primary dark:text-white mt-0.5">{title}</p>
                    <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-light/40 dark:bg-[#071828] border border-border dark:border-teal-900/60 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-text-primary dark:text-white">Ready to manage your pages?</p>
            <p className="text-xs text-text-muted dark:text-slate-400 mt-1">Head to the admin dashboard and start publishing.</p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors flex-shrink-0"
          >
            Open Dashboard <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
