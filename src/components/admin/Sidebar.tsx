'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Image,
  Menu,
  ShoppingBag,
  ChevronRight,
  Zap,
  Settings,
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/pages',     label: 'Pages',       icon: FileText },
  { href: '/admin/images',    label: 'Images',      icon: Image },
  { href: '/admin/menu',      label: 'Menu',        icon: Menu },
  { href: '/admin/products',  label: 'Products',    icon: ShoppingBag },
  { href: '/admin/settings',  label: 'Settings',    icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-admin-sidebar text-white shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-wider text-white">PANTHEON</p>
          <p className="text-xs text-border">CMS Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (pathname && pathname.startsWith(href + '/'));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-teal text-white shadow-md'
                  : 'text-border hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={14} className="opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-xs text-border/60 text-center">v1.0.0 — Pantheon CMS</p>
      </div>
    </aside>
  );
}
