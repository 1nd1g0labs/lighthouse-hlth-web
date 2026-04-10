import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { getOrganizationJsonLd } from '@/lib/metadata';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: {
    default: 'Lighthouse HLTH | Healthcare Carbon Intelligence',
    template: '%s | Lighthouse HLTH',
  },
  description:
    '1,413 audit-ready healthcare emission factors from 11 EPA datasets. Built by the team behind 100+ hospital deployments in EU and Canada. CliniCarbon is live — full platform coming.',
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
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
