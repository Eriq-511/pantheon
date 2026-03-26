import React from 'react';

export default function PantheonLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg">
      <div className="flex flex-col items-center">
        <span className="w-12 h-12 mb-6 rounded-full border-4 border-teal/20 border-t-teal animate-spin" />
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#0D9488" fillOpacity="0.1" />
          <text x="32" y="40" textAnchor="middle" fontSize="28" fill="#0D9488" fontFamily="sans-serif" fontWeight="bold">P</text>
        </svg>
      </div>
    </div>
  );
}
