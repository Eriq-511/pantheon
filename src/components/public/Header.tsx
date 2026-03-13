'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Zap } from 'lucide-react';
import type { MenuItem } from '@/types';

interface HeaderProps {
  menuItems: MenuItem[];
}

export default function Header({ menuItems }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (item: MenuItem) => {
    if (item.pageSlug) return `/${item.pageSlug}`;
    return item.url || '#';
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-sm shadow-nav border-b border-border/60'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center shadow-md group-hover:bg-teal-dark transition-colors">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">Pantheon</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={getHref(item)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted
                           hover:bg-surface-muted hover:text-text-primary
                           transition-all duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: theme + mobile menu */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-text-muted hover:bg-surface-muted transition-colors"
                title="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-text-muted hover:bg-surface-muted transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border/40 py-3 pb-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={getHref(item)}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-text-muted
                           hover:bg-surface-muted hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
