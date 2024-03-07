import type { Metadata } from 'next';

import { ReactQueryClient } from '@/providers/ReactQuery';
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
    <html lang='kz'>
      <body>
        <ReactQueryClient>{children}</ReactQueryClient>
      </body>
    </html>
  );
}
