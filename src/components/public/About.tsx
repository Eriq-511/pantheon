import { CheckCircle2, PenLine, ImageIcon, LayoutList, PackageSearch, Rocket } from 'lucide-react';

const highlights = [
  'Manage pages — Homepage, About, Landing pages, Promotions',
  'Upload and organise images and banners in a media library',
  'Build your site navigation visually — add, reorder, link',
  'Sync live product catalogues via external API integration',
  'Publish changes instantly — no deployment, no developer',
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-teal-light dark:bg-gradient-to-br dark:from-[#071422] dark:to-[#040d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-deep dark:text-teal">
              About Pantheon
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-teal-deep dark:text-white leading-snug">
              What if your website felt as easy as{' '}
              <span className="text-teal">rearranging a shop window?</span>
            </h2>
            <p className="mt-5 text-text-primary dark:text-slate-300 leading-relaxed">
              In the early days of the internet, small product owners — artisans, startup founders,
              store managers — had great ideas but no control over their digital presence. Every
              small change meant contacting a developer. Days passed. Opportunities disappeared.
            </p>
            <p className="mt-4 text-text-primary dark:text-slate-300 leading-relaxed">
              Pantheon was born from that frustration. It gives product owners a single command
              center to edit content, upload images, manage navigation, and publish updates —
              without writing a single line of code. Where developers build the foundation,
              Pantheon lets creators shape the experience.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-teal flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-primary dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual side: Amara's story cards */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-teal/20 dark:bg-teal/30" />

            <div className="space-y-4">
              {[
                {
                  icon: PenLine,
                  step: '01',
                  title: 'Amara launches her skincare brand',
                  body: 'She has a live website — but every small change means emailing a developer and waiting days.',
                },
                {
                  icon: ImageIcon,
                  step: '02',
                  title: 'She discovers Pantheon',
                  body: 'One dashboard. She logs in, uploads a new banner, and it\'s live in under a minute.',
                },
                {
                  icon: LayoutList,
                  step: '03',
                  title: 'Her site evolves with her business',
                  body: 'New product launch? She updates the homepage, rearranges the menu, and publishes — no help needed.',
                },
                {
                  icon: PackageSearch,
                  step: '04',
                  title: 'Her catalogue stays fresh',
                  body: 'Live product data syncs automatically. Prices, images, and descriptions — always up to date.',
                },
                {
                  icon: Rocket,
                  step: '05',
                  title: 'She moves at the speed of her ideas',
                  body: 'No deployment wait. No developer bottleneck. Just her vision, published instantly.',
                },
              ].map(({ icon: Icon, step, title, body }) => (
                <div key={step} className="relative flex gap-4 pl-12">
                  {/* Step dot */}
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-teal" />
                  </div>
                  <div className="bg-white dark:bg-[#071828] rounded-xl border border-border dark:border-teal-900/60 p-4 flex-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-teal/60 dark:text-teal/50">{step}</span>
                    <p className="text-sm font-semibold text-text-primary dark:text-white mt-0.5">{title}</p>
                    <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
