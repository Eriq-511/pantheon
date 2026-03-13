import Link from 'next/link';
import { Sparkles, Instagram, Facebook, Twitter } from 'lucide-react';

export default function AmaraFooter() {
  return (
    <footer className="bg-[#3D2B1F] text-[#F7E8DF]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8A598] to-[#D4826A] flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight">Amara&apos;s Glow</span>
                <span className="text-[10px] font-medium text-[#C0856A] tracking-widest uppercase block -mt-0.5">
                  Skincare Boutique
                </span>
              </div>
            </div>
            <p className="text-sm text-[#C8A898] leading-relaxed max-w-xs">
              Thoughtfully curated skincare for every complexion. Glow from within, shine everywhere.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full border border-[#5C3D2E] flex items-center justify-center text-[#C8A898] hover:bg-[#5C3D2E] hover:text-[#F7E8DF] transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#E8A598] mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {['All Products', 'Moisturizers', 'Serums', 'Cleansers', 'Sunscreen'].map((item) => (
                <li key={item}>
                  <Link
                    href="/mall"
                    className="text-sm text-[#C8A898] hover:text-[#F7E8DF] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#E8A598] mb-4">
              Information
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us',        href: '/mall#about' },
                { label: 'Skin Quiz',        href: '/mall' },
                { label: 'FAQ',              href: '/mall' },
                { label: 'Shipping Policy',  href: '/mall' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#C8A898] hover:text-[#F7E8DF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#5C3D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#8A6050]">
            &copy; {new Date().getFullYear()} Amara&apos;s Glow. All rights reserved.
          </p>
          <p className="text-xs text-[#6A4535]">
            Managed by{' '}
            <a href="/" className="text-[#C0856A] hover:text-[#E8A598] transition-colors">
              Pantheon CMS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
