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
  description: 'Узнайте все о QA.',
  keywords: 'qahub, qa engineer, тестирование, Тестілеуші, qa blog, блог о тестировании и qa',
  openGraph: {
    title: 'QA HUB KZ - все о QA',
    description: 'QA туралы блог, Статьи о QA в Казахстане',
    siteName: 'qahub.kz',
    images: ['/media/web/seo/logo.jpg'],
    type: 'website',
  },
  icons: [{ rel: 'shortcut icon', type: 'image/jpeg', url: '/media/web/seo/logo.jpg' }],
  verification: {
    google: '8JqOq6Fg0y7T6KrjtYok67XFH5dwgFh9WnC7MVbiDPg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kz' data-theme='light'>
      <body className={fontNunitoSans.variable}>
        <Providers>{children}</Providers>
        <Analytics mode={'production'} />
        <SpeedInsights />
      </body>
    </html>
  );
}
