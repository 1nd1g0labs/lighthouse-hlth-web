'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#platform', label: 'Platform' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-white">
          Lighthouse HLTH
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-soft"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-white/80"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-3 block rounded-md bg-primary px-5 py-2 text-center text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  );
}
