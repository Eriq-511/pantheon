'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from '@/store/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Pantheon</title>
        <meta name="description" content="Where developers build the foundation, Pantheon lets creators shape the experience." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
