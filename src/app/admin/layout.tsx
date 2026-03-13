'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/admin/Sidebar';
import Navbar from '@/components/admin/Navbar';
import { fetchMeThunk } from '@/store/slices/authSlice';
import type { AppDispatch, RootState } from '@/store/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup';

  useEffect(() => {
    if (isAuthPage) return;
    if (!user) {
      dispatch(fetchMeThunk()).unwrap().catch(() => {
        router.push('/admin/login');
      });
    }
  }, [isAuthPage]); // eslint-disable-line

  // Login / Signup — render with no shell at all
  if (isAuthPage) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { borderRadius: '10px', fontSize: '14px' },
            success: { iconTheme: { primary: '#0D9488', secondary: '#fff' } },
          }}
        />
        {children}
      </>
    );
  }

  // Auth guard — show spinner while session is being verified
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-admin-bg">
        <span className="w-8 h-8 rounded-full border-4 border-teal/20 border-t-teal animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { borderRadius: '10px', fontSize: '14px' },
          success: { iconTheme: { primary: '#0D9488', secondary: '#fff' } },
        }}
      />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
