import type { Metadata } from 'next/types';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import type { MenuItem } from '@/types';

export const metadata: Metadata = {
  title: {
    default: 'Pantheon',
    template: '%s | Pantheon',
  },
  description: 'Where developers build the foundation, Pantheon lets creators shape the experience.',
};

async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const baseUrl = process.env.NEXT_INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/menu`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuItems();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Header menuItems={menuItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
