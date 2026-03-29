import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lighthouse HLTH | Healthcare Sustainability Platform',
  description:
    'Reduce emissions, improve patient care, and save money — all from one integrated platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
