import Link from 'next/link';
import { LayoutList, ChevronRight, PlusCircle, GripVertical, Link2, Trash2 } from 'lucide-react';

export const metadata = {
  title: 'Navigation Menu',
  description: 'Learn how to build and manage your site navigation in Pantheon.',
};

const steps = [
  {
    icon: PlusCircle,
    title: 'Add a menu item',
    body: 'In your admin dashboard, go to Menu. Click "Add Item" and fill in a label (the text visitors see) and a destination — either one of your published pages or any external URL.',
  },
  {
    icon: Link2,
    title: 'Link to pages or external URLs',
    body: 'Each menu item can point to an internal page (like your About or Products page) or to any external website. Both options are supported without any configuration.',
  },
  {
    icon: GripVertical,
    title: 'Reorder with drag and drop',
    body: 'Drag items up or down to change the order they appear in your site\'s navigation bar. The order you set here is exactly what visitors see.',
  },
  {
    icon: LayoutList,
    title: 'Attach icons',
    body: 'Give each menu item a visual icon to make navigation more intuitive. Choose from a curated set of icons that match common page types — Home, Products, Pricing, About, Contact.',
  },
  {
    icon: Trash2,
    title: 'Remove items any time',
    body: 'Delete any menu item you no longer need. Your remaining items will reflow automatically. Changes are reflected on your live site immediately after saving.',
  },
];

const examples = [
  { label: 'Home', url: '/' },
  { label: 'Products', url: '/products' },
  { label: 'Pricing', url: '/pricing' },
  { label: 'About', url: '/about' },
  { label: 'Contact', url: '/contact' },
];

export default function NavigationMenuDoc() {
  return (
    <div className="bg-white dark:bg-[#020c15] min-h-screen">
      {/* Breadcrumb + header */}
      <div className="bg-teal-light/40 dark:bg-[#04101f] border-b border-border dark:border-teal-900/40 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted dark:text-slate-500 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-teal">Navigation Menu</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 dark:bg-teal/20 border border-teal/30 flex items-center justify-center">
              <LayoutList size={18} className="text-teal" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Docs</p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
            Navigation Menu
          </h1>
          <p className="mt-4 text-text-primary dark:text-slate-300 leading-relaxed">
            Build your site&apos;s navigation visually. Add items, reorder them, attach icons, and
            link to any page or URL — all without touching code. Think of it like rearranging
            a shop window.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Example nav preview */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-4">
            Example navigation
          </h2>
          <p className="text-sm text-text-muted dark:text-slate-400 mb-5">
            Here&apos;s a typical menu structure for a product-focused website:
          </p>
          <div className="bg-teal-light/30 dark:bg-[#071828] rounded-xl border border-border dark:border-teal-900/60 p-1 inline-flex flex-wrap gap-1">
            {examples.map((item) => (
              <span
                key={item.label}
                className="px-4 py-2 rounded-lg text-sm font-medium text-teal-deep dark:text-teal bg-white dark:bg-[#0a1f33] border border-border dark:border-teal-900/40"
              >
                {item.label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-text-muted dark:text-slate-500">
            You can add, remove, or reorder these items to match your business.
          </p>
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

        {/* Tip */}
        <div className="bg-teal/5 dark:bg-teal/10 border border-teal/20 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-teal mb-2">Keep it simple</p>
          <p className="text-sm text-text-primary dark:text-slate-300 leading-relaxed">
            The most effective navigation menus have 5 items or fewer. Too many choices can overwhelm visitors and make your site harder to navigate. Focus on the pages that matter most.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-teal-light/40 dark:bg-[#071828] border border-border dark:border-teal-900/60 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-text-primary dark:text-white">Ready to build your menu?</p>
            <p className="text-xs text-text-muted dark:text-slate-400 mt-1">Open the Menu section in your admin dashboard.</p>
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
