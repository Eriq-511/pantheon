import { FileText, ImageIcon, LayoutList, ShieldCheck, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Page Management',
    description:
      'Create and edit pages — Homepage, About, Landing pages, Promotions. Set titles, slugs, rich content, and publication status. Every page follows your shared Header → Content → Footer layout automatically.',
    color: 'bg-teal-light/60 text-teal',
  },
  {
    icon: ImageIcon,
    title: 'Image Management',
    description:
      'Upload banners, product images, and campaign assets to your media library. Preview, replace, or delete files on demand — powered by Cloudinary for fast global delivery.',
    color: 'bg-teal-light/60 text-teal',
  },
  {
    icon: LayoutList,
    title: 'Navigation Menu',
    description:
      'Build and reorder your site navigation visually. Add items, attach icons, link to pages or external URLs, and drag to reorder — Home, Products, Pricing, About, Contact.',
    color: 'bg-teal-light/60 text-teal',
  },
  {
    icon: Zap,
    title: 'External API Integration',
    description:
      'Connect to any product catalogue API. View, refresh, and sync items — name, price, image, description — directly from the admin panel. Headless commerce without the complexity.',
    color: 'bg-teal-light/60 text-teal',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by Default',
    description:
      'Log in once and everything is waiting for you. JWT authentication with HttpOnly cookies keeps your admin dashboard private and protected from unauthorised access.',
    color: 'bg-teal-light/60 text-teal',
  },
  {
    icon: Globe,
    title: 'Instant Publishing',
    description:
      'Hit publish and changes go live immediately — no deployment pipeline, no developer handoff, no waiting. Real-time content control, exactly how it should be.',
    color: 'bg-teal-light/60 text-teal',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-surface-muted dark:bg-[#04101f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal">
            For Product Owners
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
            One dashboard. Everything you need.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-text-muted dark:text-slate-400">
            Pantheon gives non-technical content owners full control of their website through four focused modules — no code, no deployments, no bottlenecks.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-[#071828] rounded-2xl p-6 border border-border dark:border-teal-900/60 hover:shadow-md dark:hover:shadow-teal/5 transition-shadow duration-200"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${f.color} mb-5`}>
                <f.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-text-primary dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
