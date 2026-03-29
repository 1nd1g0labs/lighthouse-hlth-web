import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Lighthouse HLTH | Healthcare Sustainability Platform',
    template: '%s | Lighthouse HLTH',
  },
  description:
    'Reduce emissions, improve patient care, and save money — all from one integrated platform.',
  metadataBase: new URL('https://lighthousehlth.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
