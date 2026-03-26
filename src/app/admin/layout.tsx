'use client';


import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/admin/Sidebar';
import Navbar from '@/components/admin/Navbar';
import PantheonLoadingScreen from '@/components/admin/PantheonLoadingScreen';
import { fetchMeThunk, rehydrateUser } from '@/store/slices/authSlice';
import type { AppDispatch, RootState } from '@/store/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { user, status } = useSelector((state: RootState) => state.auth);

  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup';

  useEffect(() => {
    if (isAuthPage) return;
    if (!user) {
      // Try to rehydrate from sessionStorage first (avoids stale cross-origin cookie).
      // If nothing is stored, fall back to the /api/auth/me endpoint.
      const stored = typeof window !== 'undefined'
        ? sessionStorage.getItem('pantheon_user')
        : null;
      if (stored) {
        try {
          dispatch(rehydrateUser(JSON.parse(stored)));
          return;
        } catch {
          sessionStorage.removeItem('pantheon_user');
        }
      }
      dispatch(fetchMeThunk()).unwrap().catch(() => {
        router.push('/admin/login');
      });
    }
  }, [isAuthPage, user, router, dispatch]);

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


  // Auth guard — show neutral loading screen while verifying
  if (status === 'loading') {
    return <PantheonLoadingScreen />;
  }
  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }
  // status === 'authenticated' — render the protected content

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
