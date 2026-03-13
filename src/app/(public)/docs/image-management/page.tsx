import Link from 'next/link';
import { ImageIcon, ChevronRight, Upload, Search, RefreshCw, Trash2 } from 'lucide-react';

export const metadata = {
  title: 'Image Management',
  description: 'Learn how to upload, organise, and manage your media library in Pantheon.',
};

const steps = [
  {
    icon: Upload,
    title: 'Upload your images',
    body: 'Navigate to Images in your admin dashboard. Drag and drop files onto the upload area, or click to browse your computer. Supported formats include JPG, PNG, WebP, and GIF.',
  },
  {
    icon: Search,
    title: 'Browse your media library',
    body: 'All uploaded images appear in your media library as a visual grid. Search by filename or scroll to find any asset instantly — no folders or complex organisation needed.',
  },
  {
    icon: ImageIcon,
    title: 'Use images across your site',
    body: 'Copy an image URL directly from the library to use it in your page content, homepage banners, or product entries. Images are delivered via Cloudinary\'s fast global CDN.',
  },
  {
    icon: RefreshCw,
    title: 'Replace an image',
    body: 'Need to update a banner or swap a product photo? Upload a new version and it replaces the old one. Any page already using that image will update automatically.',
  },
  {
    icon: Trash2,
    title: 'Delete unused assets',
    body: 'Keep your library clean by removing images you no longer need. Deleted images are permanently removed from storage — make sure they are not in use before deleting.',
  },
];

const useCases = [
  { name: 'Homepage banners', desc: 'Eye-catching hero images that greet visitors when they land on your site.' },
  { name: 'Product images', desc: 'High-quality photos that showcase your products in the best light.' },
  { name: 'Campaign assets', desc: 'Promotional graphics for seasonal sales, launches, or special events.' },
  { name: 'Brand media', desc: 'Logos, icons, and identity assets used consistently across your site.' },
];

export default function ImageManagementDoc() {
  return (
    <div className="bg-white dark:bg-[#020c15] min-h-screen">
      {/* Breadcrumb + header */}
      <div className="bg-teal-light/40 dark:bg-[#04101f] border-b border-border dark:border-teal-900/40 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-text-muted dark:text-slate-500 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-teal">Image Management</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 dark:bg-teal/20 border border-teal/30 flex items-center justify-center">
              <ImageIcon size={18} className="text-teal" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Docs</p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
            Image Management
          </h1>
          <p className="mt-4 text-text-primary dark:text-slate-300 leading-relaxed">
            Upload, preview, and manage all your visual assets from one place. Banners, product
            photos, campaign graphics — your entire media library, organised and ready to use.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Use cases */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-6">
            What can I store in my media library?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((uc) => (
              <div
                key={uc.name}
                className="bg-teal-light/30 dark:bg-[#071828] rounded-xl border border-border dark:border-teal-900/60 p-5"
              >
                <p className="text-sm font-semibold text-teal-deep dark:text-teal mb-1">{uc.name}</p>
                <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <h2 className="text-lg font-bold text-text-primary dark:text-white mb-6">
            How it works
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-6 bottom-6 w-px bg-teal/20 dark:bg-teal/30" />
            <div className="space-y-4">
              {steps.map(({ icon: Icon, title, body }, i) => (
                <div key={title} className="relative flex gap-4 pl-12">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-teal" />
                  </div>
                  <div className="bg-white dark:bg-[#071828] rounded-xl border border-border dark:border-teal-900/60 p-4 flex-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-teal/60">0{i + 1}</span>
                    <p className="text-sm font-semibold text-text-primary dark:text-white mt-0.5">{title}</p>
                    <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tip callout */}
        <div className="bg-teal/5 dark:bg-teal/10 border border-teal/20 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-teal mb-2">Pro tip</p>
          <p className="text-sm text-text-primary dark:text-slate-300 leading-relaxed">
            Use descriptive filenames before uploading (e.g. <span className="font-mono text-xs bg-surface-muted dark:bg-slate-800 px-1.5 py-0.5 rounded">summer-sale-banner.jpg</span> instead of <span className="font-mono text-xs bg-surface-muted dark:bg-slate-800 px-1.5 py-0.5 rounded">IMG_4821.jpg</span>). This makes finding assets much faster as your library grows.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-teal-light/40 dark:bg-[#071828] border border-border dark:border-teal-900/60 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-text-primary dark:text-white">Ready to upload your first image?</p>
            <p className="text-xs text-text-muted dark:text-slate-400 mt-1">Open the Images section in your admin dashboard.</p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors flex-shrink-0"
          >
            Open Dashboard <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
