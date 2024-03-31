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
  description: 'Просто о QA',
  keywords: ['qa', "qahub", "qa hub", "qahub kz", "qa hub kz", "qa kz", "qa engineer", "тестирование", "Тестілеуші", "qa blog"],
  openGraph: {
    title: 'Все о QA',
    description: 'QA туралы блог, Статьи о QA в Казахстане',
    siteName: 'qahub.kz',
    url: 'https://www.qahub.kz/',
    type: 'website',
    images: [
      {
        url: 'https://ucarecdn.com/b4863285-c39a-4c35-be2d-6f1887acaf66/d77486f10aab473db38c2413a4e3d74c.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      }
    ],
  },
  verification: {
    google: "8JqOq6Fg0y7T6KrjtYok67XFH5dwgFh9WnC7MVbiDPg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kz' data-theme='light'>
      <head>
      </head>
      <body className={fontNunitoSans.variable}>
        <Providers>{children}</Providers>
        <Analytics mode={'production'} />
        <SpeedInsights />
      </body>
    </html>
  );
}
