'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { clsx } from 'clsx';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import {
  FileText, Image, Menu, CheckCircle, Clock, TrendingUp, Package, Settings, UploadCloud,
  Globe, Share2, Newspaper, ShoppingBag,
} from 'lucide-react';
import { fetchPages } from '@/store/slices/pagesSlice';
import { fetchImages } from '@/store/slices/imagesSlice';
import { fetchMenu } from '@/store/slices/menuSlice';
import { productsService } from '@/services/productsService';
import { settingsService } from '@/services/settingsService';
import PantheonOnboarding from '@/components/admin/PantheonOnboarding';
import SettingsModal from '@/components/admin/SettingsModal';
// Demo: local state for connected entities
const DEMO_ENTITIES: any[] = [];
import type { AppDispatch, RootState } from '@/store/store';
import type { LinkAnalysisProfile, Product, SiteSettings } from '@/types';

/** Derive content-activity bar chart data from real pages + images. */
function buildChartData(
  pages: { createdAt: string }[],
  images: { uploadedAt: string }[]
) {
  // Build last-6-months slots (oldest first)
  const slots = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - (5 - i));
    return {
      month: d.toLocaleString('default', { month: 'short' }),
      year:  d.getFullYear(),
      monthIndex: d.getMonth(),
      pages: 0,
      images: 0,
    };
  });

  const bump = (iso: string, field: 'pages' | 'images') => {
    if (!iso) return;
    const d = new Date(iso);
    const slot = slots.find(
      (s) => s.monthIndex === d.getMonth() && s.year === d.getFullYear()
    );
    if (slot) slot[field]++;
  };

  pages.forEach((p)  => bump(p.createdAt,   'pages'));
  images.forEach((img) => bump(img.uploadedAt, 'images'));

  return slots.map(({ month, pages, images }) => ({ month, pages, images }));
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  colorClass: string;
  loading: boolean;
}

function StatCard({ icon: Icon, label, value, sub, colorClass, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-5 animate-pulse">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="h-8 w-14 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
        <div className="h-3 w-28 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-5 hover:shadow-md dark:hover:shadow-teal/5 transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider">{label}</span>
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
          <Icon size={16} />
        </span>
      </div>
      <div className="text-3xl font-bold text-text-primary dark:text-white mb-1">{value}</div>
      {sub && <div className="text-xs text-text-muted dark:text-slate-500">{sub}</div>}
    </div>
  );
}

function buildStatCards(args: {
  platformType: string;
  pages: number;
  published: number;
  drafts: number;
  images: number;
  menuItems: number;
  products: Product[];
  siteConnection: SiteSettings['siteConnection'];
  analyzedLinks: LinkAnalysisProfile[];
}) {
  const {
    platformType,
    pages,
    published,
    drafts,
    images,
    menuItems,
    products,
    siteConnection,
    analyzedLinks,
  } = args;

  if (platformType === 'social_profile') {
    const linkedProfiles = analyzedLinks.length;

    return [
      {
        icon: FileText,
        label: 'Draft Updates',
        value: drafts,
        sub: `${published} ready to publish`,
        colorClass: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
      },
      {
        icon: Image,
        label: 'Media Assets',
        value: images,
        sub: 'Available for upcoming posts',
        colorClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      },
      {
        icon: Menu,
        label: 'Profile Links',
        value: menuItems,
        sub: 'Link destinations being managed',
        colorClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      },
      {
        icon: Share2,
        label: 'Connected Profiles',
        value: linkedProfiles,
        sub: siteConnection.platformName || 'Monitoring configured channels',
        colorClass: 'bg-teal-light/60 text-teal dark:bg-teal/20 dark:text-teal-400',
      },
    ];
  }

  if (['shopify', 'woocommerce', 'custom_ecommerce'].includes(platformType)) {
    const categories = new Set(products.map((product) => product.category).filter(Boolean)).size;
    const avgPrice =
      products.length > 0
        ? Math.round(products.reduce((sum, product) => sum + product.price, 0) / products.length)
        : 0;

    return [
      {
        icon: Package,
        label: 'Products',
        value: products.length,
        sub: `${categories} categories in catalog`,
        colorClass: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
      },
      {
        icon: Image,
        label: 'Product Media',
        value: images,
        sub: 'Images available for listings',
        colorClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      },
      {
        icon: FileText,
        label: 'Store Pages',
        value: pages,
        sub: `${published} live storefront pages`,
        colorClass: 'bg-teal-light/60 text-teal dark:bg-teal/20 dark:text-teal-400',
      },
      {
        icon: TrendingUp,
        label: 'Avg Price',
        value: products.length > 0 ? `UGX ${(avgPrice * 3700).toLocaleString('en-UG')}` : 'UGX 0',
        sub: 'Average catalog price',
        colorClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
      },
    ];
  }

  if (['wordpress', 'ghost', 'blogger', 'custom_blog', 'news'].includes(platformType)) {
    return [
      {
        icon: FileText,
        label: 'Articles',
        value: pages,
        sub: `${published} published · ${drafts} drafts`,
        colorClass: 'bg-teal-light/60 text-teal dark:bg-teal/20 dark:text-teal-400',
      },
      {
        icon: CheckCircle,
        label: 'Published',
        value: published,
        sub: 'Live on the connected publication',
        colorClass: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      },
      {
        icon: Image,
        label: 'Media Library',
        value: images,
        sub: 'Available for articles and pages',
        colorClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      },
      {
        icon: Menu,
        label: 'Navigation',
        value: menuItems,
        sub: 'Sections and category links',
        colorClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      },
    ];
  }

  return [
    {
      icon: FileText,
      label: 'Total Pages',
      value: pages,
      sub: `${published} published · ${drafts} drafts`,
      colorClass: 'bg-teal-light/60 text-teal dark:bg-teal/20 dark:text-teal-400',
    },
    {
      icon: CheckCircle,
      label: 'Published',
      value: published,
      sub: 'Live on public site',
      colorClass: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      icon: Image,
      label: 'Images',
      value: images,
      sub: 'In your media library',
      colorClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    {
      icon: Menu,
      label: 'Menu Items',
      value: menuItems,
      sub: 'Navigation entries',
      colorClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    },
  ];
}

function getWorkspaceProfile(siteConnection: SiteSettings['siteConnection']) {
  const platformType = (siteConnection.platformType || '').toLowerCase();
  const connectorStatus = siteConnection.connectorStatus || 'none';

  if (platformType === 'social_profile') {
    return {
      modeLabel: 'Social Workspace',
      subtitle: siteConnection.platformName
        ? `Pantheon is following ${siteConnection.platformName} and prioritising publishing workflows.`
        : 'Pantheon is prioritising publishing workflows for the connected social profile.',
      icon: Share2,
      accent: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
      focusTitle: 'Current focus',
      focusItems: ['Draft post ideas', 'Prepare media assets', 'Track profile updates'],
      quickActions: [
        { href: '/admin/pages', label: 'Draft social updates', icon: FileText, color: 'text-teal' },
        { href: '/admin/images', label: 'Prepare media assets', icon: UploadCloud, color: 'text-indigo-500' },
        { href: '/admin/menu', label: 'Manage profile links', icon: Menu, color: 'text-amber-500' },
        { href: '/admin/settings', label: 'Connection settings', icon: Settings, color: 'text-purple-500' },
      ],
      connectionLabel: connectorStatus === 'full_api' ? 'Connected API profile' : 'Observed profile',
    };
  }

  if (['shopify', 'woocommerce', 'custom_ecommerce'].includes(platformType)) {
    return {
      modeLabel: 'Commerce Workspace',
      subtitle: siteConnection.platformName
        ? `Pantheon detected ${siteConnection.platformName} and is emphasising catalog and storefront operations.`
        : 'Pantheon is emphasising catalog and storefront operations for the connected shop.',
      icon: ShoppingBag,
      accent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      focusTitle: 'Current focus',
      focusItems: ['Manage product catalog', 'Refresh product media', 'Update store pages'],
      quickActions: [
        { href: '/admin/products', label: 'Manage products', icon: Package, color: 'text-pink-500' },
        { href: '/admin/images', label: 'Upload product media', icon: UploadCloud, color: 'text-indigo-500' },
        { href: '/admin/pages', label: 'Update store pages', icon: FileText, color: 'text-teal' },
        { href: '/admin/settings', label: 'Store settings', icon: Settings, color: 'text-purple-500' },
      ],
      connectionLabel: connectorStatus === 'full_api' ? 'Connected storefront' : 'Detected storefront',
    };
  }

  if (['wordpress', 'ghost', 'blogger', 'custom_blog', 'news'].includes(platformType)) {
    return {
      modeLabel: 'Publishing Workspace',
      subtitle: siteConnection.platformName
        ? `Pantheon detected ${siteConnection.platformName} and is tuned for content publishing.`
        : 'Pantheon is tuned for content publishing on the connected site.',
      icon: Newspaper,
      accent: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
      focusTitle: 'Current focus',
      focusItems: ['Publish fresh content', 'Organise media', 'Maintain navigation'],
      quickActions: [
        { href: '/admin/pages', label: 'Create article', icon: FileText, color: 'text-teal' },
        { href: '/admin/images', label: 'Upload article media', icon: UploadCloud, color: 'text-indigo-500' },
        { href: '/admin/menu', label: 'Adjust navigation', icon: Menu, color: 'text-amber-500' },
        { href: '/admin/settings', label: 'Publishing settings', icon: Settings, color: 'text-purple-500' },
      ],
      connectionLabel: connectorStatus === 'full_api' ? 'Connected publication' : 'Detected publication',
    };
  }

  return {
    modeLabel: 'General Workspace',
    subtitle: siteConnection.platformName
      ? `Pantheon detected ${siteConnection.platformName} and prepared a general management workspace.`
      : "Here's what's happening with your site today.",
    icon: Globe,
    accent: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    focusTitle: 'Current focus',
    focusItems: ['Manage pages', 'Organise images', 'Keep settings updated'],
    quickActions: [
      { href: '/admin/pages', label: 'Create new page', icon: FileText, color: 'text-teal' },
      { href: '/admin/images', label: 'Upload images', icon: UploadCloud, color: 'text-indigo-500' },
      { href: '/admin/menu', label: 'Edit navigation', icon: Menu, color: 'text-amber-500' },
      { href: '/admin/products', label: 'Sync products', icon: Package, color: 'text-pink-500' },
      { href: '/admin/settings', label: 'Site settings', icon: Settings, color: 'text-purple-500' },
    ],
    connectionLabel: 'Connected site',
  };
}

function getConnectionProcedure(
  siteConnection: SiteSettings['siteConnection'],
  analyzedLinks: LinkAnalysisProfile[]
) {
  const platformType = (siteConnection.platformType || '').toLowerCase();
  const connectorStatus = siteConnection.connectorStatus || 'none';
  const activeUrl = siteConnection.connectedUrl || analyzedLinks[0]?.url || '';

  const baseStep = {
    title: 'Verify connected URL',
    detail: activeUrl
      ? `Connected target: ${activeUrl}`
      : 'Add a website or social URL in Settings.',
  };

  if (!activeUrl) {
    return {
      statusLabel: 'Awaiting link',
      steps: [
        baseStep,
        { title: 'Save Settings', detail: 'Save your connection details to trigger profile detection.' },
        { title: 'Review workspace mode', detail: 'Pantheon will switch to Publishing, Commerce, or Social mode automatically.' },
      ],
    };
  }

  if (platformType === 'social_profile') {
    if (connectorStatus === 'full_api' || connectorStatus === 'partial_api') {
      return {
        statusLabel: 'API connection path',
        steps: [
          baseStep,
          { title: 'Authorize account access', detail: 'Complete platform authorization in your provider dashboard (OAuth/API key).' },
          { title: 'Map publishing workflow', detail: 'Use Pages and Images to prepare post content and media for push updates.' },
          { title: 'Run sync checks', detail: 'Monitor profile updates and refresh to keep Pantheon aligned with account changes.' },
        ],
      };
    }
    return {
      statusLabel: 'Observed profile path',
      steps: [
        baseStep,
        { title: 'Operate in mirror mode', detail: 'Pantheon tracks profile structure and supports planning content workflows.' },
        { title: 'Enable direct control later', detail: 'Add provider API/OAuth credentials to publish directly from Pantheon.' },
        { title: 'Review updates regularly', detail: 'Use dashboard status and refresh routines to keep observed data current.' },
      ],
    };
  }

  if (['shopify', 'woocommerce', 'custom_ecommerce'].includes(platformType)) {
    if (connectorStatus === 'full_api' || connectorStatus === 'partial_api') {
      return {
        statusLabel: 'Storefront API path',
        steps: [
          baseStep,
          { title: 'Connect store credentials', detail: 'Provide store API token/app credentials in your deployment environment.' },
          { title: 'Control catalog in Pantheon', detail: 'Manage products, images, and store pages from the commerce workspace.' },
          { title: 'Keep bi-directional sync', detail: 'Use scheduled refresh or webhook strategy so store-side edits reflect here.' },
        ],
      };
    }
    return {
      statusLabel: 'Detected storefront path',
      steps: [
        baseStep,
        { title: 'Use content mirror controls', detail: 'Pantheon can organise store content and media while direct write access is limited.' },
        { title: 'Upgrade to direct control', detail: 'Add API credentials to enable product and page updates on the live store.' },
        { title: 'Validate synchronization', detail: 'Re-check profile status after credentials are configured.' },
      ],
    };
  }

  if (['wordpress', 'ghost', 'blogger', 'custom_blog', 'news'].includes(platformType)) {
    if (connectorStatus === 'full_api' || connectorStatus === 'partial_api') {
      return {
        statusLabel: 'Publishing API path',
        steps: [
          baseStep,
          { title: 'Configure author credentials', detail: 'Set platform API/app-password credentials for your publication.' },
          { title: 'Control content pipeline', detail: 'Create and update articles, media, and navigation from Pantheon.' },
          { title: 'Maintain sync integrity', detail: 'Run periodic pulls so external edits are reflected in dashboard views.' },
        ],
      };
    }
    return {
      statusLabel: 'Detected publication path',
      steps: [
        baseStep,
        { title: 'Work in assisted mode', detail: 'Pantheon can classify structure and prepare content workflows.' },
        { title: 'Enable full publishing control', detail: 'Attach platform API credentials to unlock direct publish and update operations.' },
        { title: 'Re-run profile detection', detail: 'Save settings again after credentials to upgrade connector status.' },
      ],
    };
  }

  return {
    statusLabel: 'General connection path',
    steps: [
      baseStep,
      { title: 'Review detected profile', detail: 'Check platform and connector status in this panel.' },
      { title: 'Configure connector credentials', detail: 'Add platform access keys where available to enable direct control.' },
      { title: 'Use dashboard actions', detail: 'Operate pages, media, and menu while Pantheon keeps mode-specific guidance.' },
    ],
  };
}

export default function DashboardPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [entities, setEntities] = useState(DEMO_ENTITIES);

  const handleConnect = (type: string, data: any) => {
    setEntities((prev) => [
      ...prev,
      { id: Date.now().toString(), type, name: data.url, url: data.url, status: 'connected' },
    ]);
  };
  const handleDisconnect = (id: string) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  };
  const dispatch = useDispatch<AppDispatch>();
  const { pages, loading: pagesLoading } = useSelector((s: RootState) => s.pages);
  const { images, loading: imagesLoading } = useSelector((s: RootState) => s.images);
  const { items: menuItems, loading: menuLoading } = useSelector((s: RootState) => s.menu);
  const user = useSelector((s: RootState) => s.auth.user);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [siteConnection, setSiteConnection] = useState<SiteSettings['siteConnection']>({
    connectedUrl: '',
    platformType: '',
    platformName: '',
    connectorStatus: '',
    summary: '',
    recommendation: '',
    updatedAt: '',
  });
  const [analyzedLinks, setAnalyzedLinks] = useState<SiteSettings['analyzedLinks']>([]);

  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchImages());
    dispatch(fetchMenu());

    settingsService.get()
      .then((s) => {
        setSiteConnection(s.siteConnection);
        setAnalyzedLinks(s.analyzedLinks);
      })
      .catch(() => { /* fallback to defaults */ });

    productsService.getAll()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    const storageKey = `pantheon_onboarding_seen:${user.username}`;
    try {
      const seen = window.localStorage.getItem(storageKey);
      if (!seen) {
        setShowOnboarding(true);
      }
    } catch {
      setShowOnboarding(true);
    }
  }, [user]);

  const publishedCount = useMemo(() => pages.filter(p => p.status === 'published').length, [pages]);
  const draftCount     = useMemo(() => pages.filter(p => p.status === 'draft').length,     [pages]);
  const recentPages    = useMemo(() => [...pages].slice(-5).reverse(), [pages]);
  const recentImages   = useMemo(() => [...images].slice(-6).reverse(), [images]);
  const chartData      = useMemo(() => buildChartData(pages, images), [pages, images]);
  const workspaceProfile = useMemo(() => getWorkspaceProfile(siteConnection), [siteConnection]);
  const isUnconfigured = useMemo(
    () => !siteConnection.connectedUrl.trim() && !siteConnection.platformType.trim(),
    [siteConnection.connectedUrl, siteConnection.platformType]
  );
  const platformType = useMemo(() => (siteConnection.platformType || '').toLowerCase(), [siteConnection.platformType]);
  const ProfileIcon = workspaceProfile.icon;
  const connectedHost = useMemo(() => {
    const displayUrl = siteConnection.connectedUrl || analyzedLinks[0]?.url || '';
    if (!displayUrl) return '';
    try {
      return new URL(displayUrl).host;
    } catch {
      return displayUrl;
    }
  }, [analyzedLinks, siteConnection.connectedUrl]);
  const connectionProcedure = useMemo(
    () => getConnectionProcedure(siteConnection, analyzedLinks),
    [analyzedLinks, siteConnection]
  );
  const statCards = useMemo(() => buildStatCards({
    platformType,
    pages: pages.length,
    published: publishedCount,
    drafts: draftCount,
    images: images.length,
    menuItems: menuItems.length,
    products,
    siteConnection,
    analyzedLinks,
  }), [platformType, pages.length, publishedCount, draftCount, images.length, menuItems.length, products, siteConnection, analyzedLinks]);
  const statCardsLoading = pagesLoading || imagesLoading || menuLoading || productsLoading;

  const handleCloseOnboarding = () => {
    if (user) {
      try {
        window.localStorage.setItem(`pantheon_onboarding_seen:${user.username}`, 'true');
      } catch {
        // Ignore localStorage failures and still close the modal.
      }
    }
    setShowOnboarding(false);
  };

  return (
    <div className="space-y-8">
      {/* Dashboard header with settings icon */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <button
          onClick={() => setSettingsOpen(true)}
          className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-teal-600 hover:text-white transition-colors"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        entities={entities}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {/* If no entities, show connect prompt */}
      {entities.length === 0 && (
        <div className="p-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center text-yellow-800 dark:text-yellow-200 mb-8">
          <p className="text-lg font-semibold mb-2">No site or social account connected</p>
          <p className="mb-4">Connect a website or social account to enable live controls, analytics, and publishing features.</p>
          <button
            onClick={() => setSettingsOpen(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            Connect Now
          </button>
        </div>
      )}
      <PantheonOnboarding
        open={showOnboarding}
        onClose={handleCloseOnboarding}
        username={user?.username}
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary dark:text-white">
          Welcome back{user ? `, ${user.username}` : ''}!
        </h1>
        <p className="text-text-muted dark:text-slate-400 mt-1 text-sm">
          {workspaceProfile.subtitle}
        </p>
      </div>

      {isUnconfigured && (
        <div className="rounded-2xl border border-teal/30 dark:border-teal-900/50 bg-teal/5 dark:bg-teal-950/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-text-muted dark:text-slate-300">
            You are in General Workspace mode. Connect your website or social profile in Settings to personalize this dashboard automatically.
          </p>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline shrink-0"
          >
            <Settings size={14} />
            Open Settings
          </Link>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            sub={card.sub}
            colorClass={card.colorClass}
            loading={statCardsLoading}
          />
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-text-primary dark:text-white">Content Activity</h2>
              <p className="text-xs text-text-muted dark:text-slate-400 mt-0.5">Pages & images over the last 6 months</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-teal dark:text-teal-400">
              <TrendingUp size={12} /> Last 6 months
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={10} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: 13 }}
                cursor={{ fill: 'rgba(148,163,184,0.08)' }}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Bar dataKey="pages" name="Pages" fill="#0D9488" radius={[4, 4, 0, 0]} />
              <Bar dataKey="images" name="Images" fill="#818CF8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6">
          <h2 className="font-semibold text-text-primary dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-1">
            {workspaceProfile.quickActions.map(({ href, label, icon: Icon, color }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-muted dark:hover:bg-slate-800/60 transition-colors group"
              >
                <Icon size={16} className={color} />
                <span className="text-sm text-text-primary dark:text-slate-300 group-hover:text-teal dark:group-hover:text-teal-400 transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 className="font-semibold text-text-primary dark:text-white">Workspace Profile</h2>
              <p className="text-xs text-text-muted dark:text-slate-400 mt-0.5">
                Dashboard mode changes automatically based on the connected site.
              </p>
            </div>
            <span className={clsx('inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium', workspaceProfile.accent)}>
              <ProfileIcon size={13} />
              {workspaceProfile.modeLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-border dark:border-slate-700 p-4 bg-surface-muted/50 dark:bg-slate-800/40">
              <p className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-2">
                {workspaceProfile.connectionLabel}
              </p>
              <p className="text-sm font-medium text-text-primary dark:text-white">
                {siteConnection.platformName || 'Not detected yet'}
              </p>
              <p className="text-xs text-text-muted dark:text-slate-500 mt-1 break-all">
                {connectedHost || 'Add a site URL in settings to personalise this dashboard.'}
              </p>
              {siteConnection.summary && (
                <p className="text-sm text-text-muted dark:text-slate-400 mt-3 leading-relaxed">
                  {siteConnection.summary}
                </p>
              )}
              {siteConnection.recommendation && (
                <p className="text-xs text-teal dark:text-teal-400 mt-3 leading-relaxed">
                  {siteConnection.recommendation}
                </p>
              )}
              {analyzedLinks.length > 1 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {analyzedLinks.slice(0, 4).map((profile) => (
                    <span
                      key={`${profile.sourceKey}:${profile.url}`}
                      className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {profile.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-border dark:border-slate-700 p-4 bg-surface-muted/50 dark:bg-slate-800/40">
              <p className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-2">
                {workspaceProfile.focusTitle}
              </p>
              <div className="space-y-2">
                {workspaceProfile.focusItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text-primary dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6">
          <h2 className="font-semibold text-text-primary dark:text-white mb-4">Connection Status</h2>
          <span className="inline-flex mb-4 px-2.5 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal dark:text-teal-400">
            {connectionProcedure.statusLabel}
          </span>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted dark:text-slate-400">Platform</span>
              <span className="font-medium text-text-primary dark:text-white text-right">
                {siteConnection.platformName || 'Pending detection'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted dark:text-slate-400">Connector</span>
              <span className="font-medium text-text-primary dark:text-white text-right">
                {siteConnection.connectorStatus || 'Not connected'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted dark:text-slate-400">Last profile update</span>
              <span className="font-medium text-text-primary dark:text-white text-right">
                {siteConnection.updatedAt ? new Date(siteConnection.updatedAt).toLocaleString() : 'Not available'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-muted dark:text-slate-400">Analyzed links</span>
              <span className="font-medium text-text-primary dark:text-white text-right">
                {analyzedLinks.length}
              </span>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-2">
              Connect and control procedure
            </p>
            <div className="space-y-2">
              {connectionProcedure.steps.map((step, index) => (
                <div key={step.title} className="rounded-lg border border-border dark:border-slate-700 p-3 bg-surface-muted/40 dark:bg-slate-800/40">
                  <p className="text-sm font-medium text-text-primary dark:text-slate-200">
                    {index + 1}. {step.title}
                  </p>
                  <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/admin/settings"
            className="mt-5 inline-flex items-center gap-2 text-sm text-teal hover:underline"
          >
            <Settings size={14} />
            Update connection details
          </Link>
          {analyzedLinks.length > 0 && (
            <div className="mt-5 border-t border-border dark:border-slate-700 pt-4">
              <p className="text-xs font-semibold text-text-muted dark:text-slate-400 uppercase tracking-wider mb-2">
                Analyzed targets
              </p>
              <div className="space-y-2">
                {analyzedLinks.slice(0, 5).map((profile) => (
                  <div key={`${profile.sourceKey}:${profile.url}`} className="rounded-lg border border-border dark:border-slate-700 p-3 bg-surface-muted/40 dark:bg-slate-800/40">
                    <p className="text-sm font-medium text-text-primary dark:text-slate-200">
                      {profile.label}: {profile.platformName || 'Detected target'}
                    </p>
                    <p className="text-xs text-text-muted dark:text-slate-400 mt-1 break-all">
                      {profile.url}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Pages + Images */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Pages */}
        <div className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-text-primary dark:text-white">Recent Pages</h2>
            <Link href="/admin/pages" className="text-xs text-teal hover:underline">View all</Link>
          </div>
          {pagesLoading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-11 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentPages.length === 0 ? (
            <div className="text-center py-8 text-text-muted dark:text-slate-500 text-sm">
              No pages yet.{' '}
              <Link href="/admin/pages" className="text-teal hover:underline">Create one</Link>.
            </div>
          ) : (
            <div className="space-y-1">
              {recentPages.map(page => (
                <div
                  key={page.id}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-muted dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary dark:text-slate-200 truncate">{page.title}</p>
                    <p className="text-xs text-text-muted dark:text-slate-500">/{page.slug}</p>
                  </div>
                  <span className={`ml-3 shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                    page.status === 'published'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {page.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Images */}
        <div className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-text-primary dark:text-white">Recent Images</h2>
            <Link href="/admin/images" className="text-xs text-teal hover:underline">View all</Link>
          </div>
          {imagesLoading ? (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentImages.length === 0 ? (
            <div className="text-center py-8 text-text-muted dark:text-slate-500 text-sm">
              No images yet.{' '}
              <Link href="/admin/images" className="text-teal hover:underline">Upload one</Link>.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {recentImages.map(img => (
                <div key={img.id} className="aspect-square rounded-xl overflow-hidden bg-surface-muted dark:bg-slate-800">
                  <img src={img.cloudinaryUrl} alt={img.altText || ''} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
