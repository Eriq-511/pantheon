'use client';

import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, Moon, LogOut, User, ExternalLink } from 'lucide-react';
import { logoutThunk } from '@/store/slices/authSlice';
import type { AppDispatch, RootState } from '@/store/store';

interface NavbarProps {
  title?: string;
}

export default function Navbar({ title = 'Admin Panel' }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push('/admin/login');
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-border shadow-nav">
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-text-primary">{title}</h1>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* View Amara's Store */}
        {user && (
          <Link
            href="/mall"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#C0856A] border border-[#EDCFB8] hover:bg-[#FDF6F0] transition-colors"
          >
            <ExternalLink size={12} />
            View Amara&apos;s Store
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-text-muted hover:bg-surface-muted transition-colors"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Badge */}
        {user && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-muted">
            <User size={14} className="text-text-muted" />
            <span className="text-sm font-medium text-text-primary">
              {user.username}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-teal-light text-teal-deep font-medium">
              {user.role}
            </span>
          </div>
        )}

        {/* Logout — only when authenticated */}
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}
