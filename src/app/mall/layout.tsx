import type { MenuItem } from '@/types';
import AmaraHeader from '@/components/mall/AmaraHeader2';
import AmaraFooter from '@/components/mall/AmaraFooter';

async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/menu`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export default async function MallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuItems();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FDF6F0' }}>
      <AmaraHeader menuItems={menuItems} />
      <main className="flex-1">{children}</main>
      <AmaraFooter />
    </div>
  );
}
