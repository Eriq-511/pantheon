'use client';

import { Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Zap, CheckCircle2 } from 'lucide-react';
import { loginThunk, clearError } from '@/store/slices/authSlice';
import type { AppDispatch, RootState } from '@/store/store';
import { clsx } from 'clsx';

function LoginPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin/dashboard';
  const justRegistered = searchParams.get('registered') === '1';

  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});

  useEffect(() => {
    if (user) {
      router.replace(from);
    }
  }, [user, router, from]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const validate = () => {
    const errs: typeof fieldErrors = {};
    if (!username.trim()) errs.username = 'Username is required';
    if (!password)        errs.password = 'Password is required';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(loginThunk({ username: username.trim(), password }));
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cloudDrift1 {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(40px); }
          100% { transform: translateX(0); }
        }
        @keyframes cloudDrift2 {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(-30px); }
          100% { transform: translateX(0); }
        }
        @keyframes cloudDrift3 {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(25px); }
          100% { transform: translateX(0); }
        }
        @keyframes mistRise {
          0%, 100% { opacity: 0.55; transform: translateY(0) scaleX(1); }
          50%       { opacity: 0.75; transform: translateY(-8px) scaleX(1.04); }
        }
        .auth-card { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
        .cloud1    { animation: cloudDrift1 18s ease-in-out infinite; }
        .cloud2    { animation: cloudDrift2 24s ease-in-out infinite; }
        .cloud3    { animation: cloudDrift3 14s ease-in-out infinite; }
        .mist      { animation: mistRise 8s ease-in-out infinite; }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-white">

        {/* ── Mount Olympus SVG Scene ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 520"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#e8f4fd" />
              <stop offset="60%"  stopColor="#f0f8ff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#c8d8e8" />
              <stop offset="40%"  stopColor="#a8bed4" />
              <stop offset="100%" stopColor="#8aa8c4" />
            </linearGradient>
            <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#dde8f2" />
              <stop offset="100%" stopColor="#b8cfe0" />
            </linearGradient>
            <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#eaf2f8" />
              <stop offset="100%" stopColor="#cde0ee" />
            </linearGradient>
            <linearGradient id="snowCap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e8f0f8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%"  stopColor="#f0f6fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <filter id="softBlur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <filter id="mistBlur">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Sky */}
          <rect width="800" height="520" fill="url(#sky)" />

          {/* Far background mountains (layer 3 — palest) */}
          <path
            d="M-10 420 L60 280 L130 340 L200 210 L280 310 L350 260 L430 330 L510 200 L590 310 L670 250 L750 320 L810 260 L810 520 L-10 520 Z"
            fill="url(#mtn3)" opacity="0.5"
          />

          {/* Mid mountains (layer 2) */}
          <path
            d="M-10 440 L80 310 L160 370 L250 250 L340 330 L420 280 L500 350 L580 230 L650 310 L720 270 L810 320 L810 520 L-10 520 Z"
            fill="url(#mtn2)" opacity="0.75"
          />

          {/* Main foreground mountains — Mount Olympus centrepiece */}
          {/* Left flanking peak */}
          <path
            d="M-10 520 L-10 430 L120 340 L200 400 L260 355 L350 440 L350 520 Z"
            fill="url(#mtn1)"
          />
          {/* Central peak of Olympus — tallest */}
          <path
            d="M240 520 L300 420 L360 460 L420 340 L490 430 L545 370 L600 420 L650 380 L720 440 L810 400 L810 520 Z"
            fill="url(#mtn1)"
          />
          {/* Right flanking ridge */}
          <path
            d="M580 520 L580 390 L650 340 L720 390 L810 350 L810 520 Z"
            fill="#9ab6cc" opacity="0.9"
          />

          {/* Snow caps */}
          {/* Main peak snow */}
          <path
            d="M420 340 L440 375 L420 368 L400 378 Z"
            fill="url(#snowCap)" opacity="0.95"
          />
          {/* Left peak snow */}
          <path
            d="M260 355 L275 378 L260 372 L248 380 Z"
            fill="url(#snowCap)" opacity="0.9"
          />
          {/* Far right peak snow */}
          <path
            d="M650 340 L663 360 L650 356 L638 363 Z"
            fill="url(#snowCap)" opacity="0.85"
          />

          {/* Cloud layer 1 (far, large) */}
          <g className="cloud1" opacity="0.88">
            <ellipse cx="620" cy="120" rx="110" ry="30" fill="white" filter="url(#softBlur)" />
            <ellipse cx="640" cy="108" rx="70"  ry="24" fill="white" filter="url(#softBlur)" />
            <ellipse cx="600" cy="112" rx="60"  ry="20" fill="white" filter="url(#softBlur)" />
          </g>

          {/* Cloud layer 2 (mid) */}
          <g className="cloud2" opacity="0.8">
            <ellipse cx="100" cy="160" rx="90"  ry="25" fill="white" filter="url(#softBlur)" />
            <ellipse cx="120" cy="148" rx="55"  ry="20" fill="white" filter="url(#softBlur)" />
            <ellipse cx="80"  cy="153" rx="50"  ry="18" fill="white" filter="url(#softBlur)" />
          </g>

          {/* Cloud layer 3 (near, wrapping peaks) */}
          <g className="cloud3" opacity="0.72">
            <ellipse cx="400" cy="330" rx="130" ry="28" fill="white" filter="url(#softBlur)" />
            <ellipse cx="430" cy="316" rx="85"  ry="22" fill="white" filter="url(#softBlur)" />
            <ellipse cx="370" cy="322" rx="75"  ry="20" fill="white" filter="url(#softBlur)" />
          </g>

          {/* Mist at the base — fuses mountains into white page */}
          <rect
            className="mist"
            x="-10" y="400" width="820" height="130"
            fill="url(#mistGrad)"
            filter="url(#mistBlur)"
          />
          {/* Hard white base fade */}
          <rect x="-10" y="460" width="820" height="70" fill="white" opacity="0.95" />
        </svg>

        {/* Card sits on top, fused with the white base */}
        <div className="auth-card relative z-10 w-full max-w-sm">
          <div
            className="rounded-2xl p-8 border shadow-xl"
            style={{
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderColor: 'rgba(180,205,225,0.5)',
              boxShadow: '0 8px 40px rgba(100,140,180,0.18), 0 1px 0 rgba(255,255,255,0.9) inset',
            }}
          >
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal shadow-lg shadow-teal/20 mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pantheon</h1>
              <p className="text-sm text-slate-500 mt-1">Sign in to your admin panel</p>
            </div>

            {/* Registered success banner */}
            {justRegistered && (
              <div className="mb-4 flex items-start gap-2.5 px-4 py-3 text-sm text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span><strong className="font-semibold">Account created!</strong> Welcome to Pantheon — sign in to get started.</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setFieldErrors((p) => ({ ...p, username: undefined })); }}
                  autoComplete="username"
                  placeholder="admin"
                  maxLength={50}
                  className={clsx(
                    'w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 bg-white transition-all',
                    'focus:outline-none focus:ring-2 focus:ring-teal/40',
                    fieldErrors.username
                      ? 'border border-red-400'
                      : 'border border-slate-200 hover:border-slate-300 focus:border-teal/60'
                  )}
                />
                {fieldErrors.username && <p className="text-red-500 text-xs mt-1">{fieldErrors.username}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    maxLength={128}
                    className={clsx(
                      'w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 bg-white transition-all',
                      'focus:outline-none focus:ring-2 focus:ring-teal/40',
                      fieldErrors.password
                        ? 'border border-red-400'
                        : 'border border-slate-200 hover:border-slate-300 focus:border-teal/60'
                    )}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-teal hover:bg-teal-dark transition-colors shadow-md shadow-teal/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 space-y-2 text-center">
              <p className="text-xs text-slate-500">
                Don&apos;t have an account?{' '}
                <Link href="/admin/signup" className="text-teal hover:underline font-medium">Create account</Link>
              </p>
              <p className="text-xs text-slate-400">
                ←{' '}
                <a href="/" className="hover:underline">Back to website</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginPageContent />
    </Suspense>
  );
}
