import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.scss';

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

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
      <body className={nunitoSans.className}>{children}</body>
    </html>
  );
}
