'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  Image,
  Menu,
  Package,
  Sparkles,
  X,
} from 'lucide-react';

type Step = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  href: string;
  cta: string;
  icon: React.ElementType;
  tone: string;
};

const STEPS: Step[] = [
  {
    id: 'pages',
    title: 'Start With Pages',
    summary: 'Create content as drafts first, then publish when it is ready for the live site.',
    details: [
      'Use the Pages tab to write and edit site content.',
      'Keep unfinished work in draft mode until it is approved.',
      'Published pages become the base of your website structure.',
    ],
    href: '/admin/pages',
    cta: 'Open Pages',
    icon: FileText,
    tone: 'bg-teal/10 text-teal dark:text-teal-300',
  },
  {
    id: 'media',
    title: 'Add Images And Navigation',
    summary: 'Upload media, then organize how visitors move through your site with clear menus.',
    details: [
      'Upload brand, blog, or product images in the Images tab.',
      'Assign images to products or page content where needed.',
      'Use Menu to connect pages into a simple navigation flow.',
    ],
    href: '/admin/images',
    cta: 'Open Images',
    icon: Image,
    tone: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',
  },
  {
    id: 'catalog',
    title: 'Manage Products When Needed',
    summary: 'If Pantheon detects a commerce site, products become part of your daily workflow.',
    details: [
      'Create products with title, category, price, and image.',
      'Update product images from the Products or Images tabs.',
      'Commerce mode changes the dashboard to highlight catalog tasks.',
    ],
    href: '/admin/products',
    cta: 'Open Products',
    icon: Package,
    tone: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300',
  },
  {
    id: 'connect',
    title: 'Connect Your Live Site',
    summary: 'Add your website or social link in Settings so Pantheon can tune the workspace around it.',
    details: [
      'Paste your main website or social URL in Settings.',
      'Pantheon detects the platform in the background and adjusts the dashboard mode.',
      'Connection guidance then appears so you know how to control that platform from here.',
    ],
    href: '/admin/settings',
    cta: 'Open Settings',
    icon: Globe,
    tone: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
];

function StepScene({ stepId }: { stepId: string }) {
  if (stepId === 'pages') {
    return (
      <div className="relative h-40 rounded-2xl border border-teal/20 bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.16),_transparent_55%),linear-gradient(180deg,#ffffff,rgba(236,253,245,0.9))] dark:bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent_55%),linear-gradient(180deg,#08211d,#071828)] overflow-hidden">
        <style>{`
          @keyframes pagePulse {
            0%, 100% { transform: translateY(0); opacity: 0.92; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          @keyframes lineGrow {
            0%, 100% { transform: scaleX(0.88); opacity: 0.65; }
            50% { transform: scaleX(1); opacity: 1; }
          }
        `}</style>
        <div className="absolute left-7 top-7 w-24 h-28 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700" style={{ animation: 'pagePulse 3.2s ease-in-out infinite' }} />
        <div className="absolute left-12 top-15 w-14 h-2 rounded-full bg-teal/70" style={{ animation: 'lineGrow 2.4s ease-in-out infinite' }} />
        <div className="absolute left-12 top-22 w-12 h-2 rounded-full bg-slate-300 dark:bg-slate-600" style={{ animation: 'lineGrow 2.7s ease-in-out infinite' }} />
        <div className="absolute left-12 top-29 w-16 h-2 rounded-full bg-slate-300 dark:bg-slate-600" style={{ animation: 'lineGrow 2.1s ease-in-out infinite' }} />
        <div className="absolute right-10 top-12 flex flex-col gap-3">
          <div className="px-3 py-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-medium shadow-sm">Draft</div>
          <div className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs font-medium shadow-sm">Publish</div>
        </div>
      </div>
    );
  }

  if (stepId === 'media') {
    return (
      <div className="relative h-40 rounded-2xl border border-indigo-200/60 dark:border-indigo-900/40 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_55%),linear-gradient(180deg,#ffffff,rgba(238,242,255,0.95))] dark:bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_transparent_55%),linear-gradient(180deg,#081224,#071828)] overflow-hidden">
        <style>{`
          @keyframes floatCard {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes menuSlide {
            0%, 100% { transform: translateX(0); opacity: 0.7; }
            50% { transform: translateX(6px); opacity: 1; }
          }
        `}</style>
        <div className="absolute left-8 top-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-200 via-sky-100 to-white dark:from-indigo-900 dark:via-slate-800 dark:to-slate-700 shadow-lg" style={{ animation: 'floatCard 3s ease-in-out infinite' }}>
          <div className="absolute inset-4 rounded-xl border-2 border-white/70 dark:border-slate-500/60" />
          <div className="absolute left-5 bottom-5 w-12 h-8 rounded-full bg-emerald-300/80 dark:bg-emerald-500/30" />
        </div>
        <div className="absolute right-8 top-11 w-28 p-3 rounded-2xl bg-white/90 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-3 rounded-full bg-slate-200 dark:bg-slate-600 mb-2 last:mb-0" style={{ animation: 'menuSlide 2.8s ease-in-out infinite', animationDelay: `${item * 0.2}s` }} />
          ))}
        </div>
        <div className="absolute left-32 top-20 w-24 h-px border-t-2 border-dashed border-indigo-300 dark:border-indigo-700" />
      </div>
    );
  }

  if (stepId === 'catalog') {
    return (
      <div className="relative h-40 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.16),_transparent_55%),linear-gradient(180deg,#ffffff,rgba(253,242,248,0.95))] dark:bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.16),_transparent_55%),linear-gradient(180deg,#1f0b16,#071828)] overflow-hidden">
        <style>{`
          @keyframes productBob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes tagPulse {
            0%, 100% { opacity: 0.7; transform: scale(0.96); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}</style>
        <div className="absolute left-10 top-10 w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg" style={{ animation: 'productBob 3.2s ease-in-out infinite' }}>
          <div className="mx-auto mt-5 w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30" />
          <div className="mx-auto mt-3 w-14 h-2 rounded-full bg-slate-200 dark:bg-slate-600" />
        </div>
        <div className="absolute right-10 top-12 flex flex-col gap-3">
          <div className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs font-medium shadow-sm" style={{ animation: 'tagPulse 2.6s ease-in-out infinite' }}>UGX Price</div>
          <div className="px-3 py-2 rounded-xl bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 text-xs font-medium shadow-sm" style={{ animation: 'tagPulse 2.6s ease-in-out infinite 0.2s' }}>Image</div>
          <div className="px-3 py-2 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-xs font-medium shadow-sm" style={{ animation: 'tagPulse 2.6s ease-in-out infinite 0.4s' }}>Category</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-40 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_55%),linear-gradient(180deg,#ffffff,rgba(255,251,235,0.95))] dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_55%),linear-gradient(180deg,#211505,#071828)] overflow-hidden">
      <style>{`
        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes beamMove {
          0% { stroke-dashoffset: 18; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 160" fill="none">
        <path d="M60 82 H145" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 6" style={{ animation: 'beamMove 2s linear infinite' }} />
        <path d="M175 82 H260" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 6" style={{ animation: 'beamMove 2s linear infinite' }} />
      </svg>
      <div className="absolute left-8 top-11 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center" style={{ animation: 'nodePulse 3s ease-in-out infinite' }}>
        <Globe size={22} className="text-amber-500" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-11 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center" style={{ animation: 'nodePulse 3s ease-in-out infinite 0.25s' }}>
        <Sparkles size={22} className="text-teal" />
      </div>
      <div className="absolute right-8 top-11 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center" style={{ animation: 'nodePulse 3s ease-in-out infinite 0.5s' }}>
        <Menu size={22} className="text-indigo-500" />
      </div>
    </div>
  );
}

export default function PantheonOnboarding({
  open,
  onClose,
  username,
}: {
  open: boolean;
  onClose: () => void;
  username?: string;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = useMemo(() => STEPS[stepIndex], [stepIndex]);

  if (!open) return null;

  const StepIcon = step.icon;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-6xl rounded-[28px] border border-border dark:border-teal-900/50 bg-white dark:bg-[#071828] shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-[280px,1fr]">
          <div className="bg-[linear-gradient(180deg,#f7fafc,rgba(236,254,255,0.9))] dark:bg-[linear-gradient(180deg,#071828,#06202a)] border-b lg:border-b-0 lg:border-r border-border dark:border-teal-900/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted dark:text-slate-400">First Steps</p>
                <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-1">Using Pantheon</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-text-muted hover:text-text-primary dark:text-slate-400 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-text-muted dark:text-slate-400 mb-6 leading-relaxed">
              {username ? `${username}, here is the shortest path to using Pantheon well.` : 'Here is the shortest path to using Pantheon well.'}
            </p>

            <div className="space-y-2">
              {STEPS.map((item, index) => {
                const ItemIcon = item.icon;
                const active = index === stepIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStepIndex(index)}
                    className={clsx(
                      'w-full text-left rounded-2xl border p-4 transition-all',
                      active
                        ? 'border-teal/40 bg-white dark:bg-slate-800 shadow-sm'
                        : 'border-transparent bg-white/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-800/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', item.tone)}>
                        <ItemIcon size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-text-primary dark:text-white">{index + 1}. {item.title}</p>
                        <p className="text-xs text-text-muted dark:text-slate-400 mt-0.5">{item.summary}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className={clsx('inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium', step.tone)}>
                  <StepIcon size={14} />
                  Step {stepIndex + 1}
                </span>
                <h3 className="text-2xl font-semibold text-text-primary dark:text-white mt-4">{step.title}</h3>
                <p className="text-sm text-text-muted dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">{step.summary}</p>
              </div>
            </div>

            <StepScene stepId={step.id} />

            <div className="grid md:grid-cols-3 gap-3 mt-6">
              {step.details.map((detail) => (
                <div key={detail} className="rounded-2xl border border-border dark:border-slate-700 bg-surface-muted/60 dark:bg-slate-800/40 p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                    <p className="text-sm text-text-primary dark:text-slate-300 leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                {STEPS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to tutorial step ${index + 1}`}
                    onClick={() => setStepIndex(index)}
                    className={clsx(
                      'h-2.5 rounded-full transition-all',
                      index === stepIndex ? 'w-8 bg-teal' : 'w-2.5 bg-slate-300 dark:bg-slate-600'
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border dark:border-slate-700 text-text-primary dark:text-slate-300 disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                  Back
                </button>
                <Link
                  href={step.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-teal hover:bg-teal-dark transition-colors"
                >
                  {step.cta}
                </Link>
                {stepIndex < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStepIndex((current) => Math.min(STEPS.length - 1, current + 1))}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-primary dark:text-slate-200 border border-border dark:border-slate-700"
                  >
                    Next
                    <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-primary dark:text-slate-200 border border-border dark:border-slate-700"
                  >
                    Finish tutorial
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}