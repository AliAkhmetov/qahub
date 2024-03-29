import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Nunito_Sans } from 'next/font/google';
import type { Metadata } from 'next';

import { Providers } from '@/providers';
import './globals.scss';

const fontNunitoSans = Nunito_Sans({
  subsets: ['cyrillic'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'QAhub',
  description: 'Структурированно и просто о QA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kz' data-theme='light'>
      <head>
        <meta
          name='google-site-verification'
          content='8JqOq6Fg0y7T6KrjtYok67XFH5dwgFh9WnC7MVbiDPg'
        />
      </head>
      <body className={fontNunitoSans.variable}>
        <Providers>{children}</Providers>
        <Analytics mode={'production'} />
        <SpeedInsights />
      </body>
    </html>
  );
}
