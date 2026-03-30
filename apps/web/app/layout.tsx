import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { getOrganizationJsonLd } from '@/lib/metadata';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Lighthouse HLTH | Healthcare Sustainability Platform',
    template: '%s | Lighthouse HLTH',
  },
  description:
    'Reduce emissions, improve patient care, and save money — all from one integrated platform.',
  metadataBase: new URL('https://lighthousehlth.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Lighthouse HLTH',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
