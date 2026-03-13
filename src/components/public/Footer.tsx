import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
        { label: 'Products', href: '#products' },
      ],
    },
    {
      title: 'Docs',
      links: [
        { label: 'Page Management', href: '/docs/page-management' },
        { label: 'Image Management', href: '/docs/image-management' },
        { label: 'Navigation Menu', href: '/docs/navigation-menu' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  const socials = [
    { Icon: Github, href: 'https://github.com', label: 'GitHub' },
    { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-teal-deep border-t border-teal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center shadow-md">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">Pantheon</span>
            </Link>
            <p className="text-sm text-teal-light leading-relaxed max-w-xs">
              Where developers build the foundation, Pantheon lets creators shape the experience.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-teal-light hover:text-white hover:bg-teal/30 transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-light/70 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        className="text-sm text-teal hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-teal hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
          <div className="border-t border-teal/20 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-teal-light/60">
            &copy; {year} Pantheon CMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
