"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu as MenuIcon, X as XIcon, Sparkles as SparklesIcon, ShoppingBag as ShoppingBagIcon } from 'lucide-react';
import type { MenuItem } from '@/types';

interface AmaraHeaderProps {
  menuItems: MenuItem[];
}

const AmaraHeader: React.FC<AmaraHeaderProps> = ({ menuItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = menuItems.length > 0 ? menuItems.map((item) => ({
    label: item.label,
    href: item.pageSlug ? `/${item.pageSlug}` : item.url || '#',
  })) : [];

  return (
    <header className="sticky top-0 z-50 bg-[#FDF6F0] border-b border-[#EDCFB8]/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <span className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8A598] to-[#D4826A] flex items-center justify-center shadow-md group-hover:from-[#D4826A] group-hover:to-[#BE6A52] transition-all">
              <SparklesIcon size={15} className="text-white" />
            </div>
            <div className="leading-tight">
              <span className="text-base font-bold text-[#3D2B1F] tracking-tight">No Site Connected</span>
              <span className="text-[10px] font-medium text-[#C0856A] tracking-widest uppercase block -mt-0.5">
                Connect a website or social account
              </span>
            </div>
          </span>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.length === 0 && (
              <span className="text-xs text-[#C0856A]">No navigation available</span>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#6B4A3A] hover:bg-[#F7E8DF] hover:text-[#3D2B1F] transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Cart"
              className="relative p-2 rounded-full text-[#6B4A3A] hover:bg-[#F7E8DF] transition-colors"
            >
              <ShoppingBagIcon size={20} />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-full text-[#6B4A3A] hover:bg-[#F7E8DF] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FDF6F0] border-t border-[#EDCFB8]/60 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#6B4A3A] hover:bg-[#F7E8DF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default AmaraHeader;
