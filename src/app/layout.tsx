import type { Metadata } from 'next';

import { Providers } from '@/providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'QAhub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kz' data-theme='light'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
