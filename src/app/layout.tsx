import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}
