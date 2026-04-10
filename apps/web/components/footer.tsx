import Link from 'next/link';
import { LighthouseBeam } from '@/components/icons';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LighthouseBeam className="text-primary" size={22} />
              <span className="font-display text-sm font-semibold">Lighthouse HLTH</span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/50">
              Founded by Nicolas Vinson. Previously shadow.eco (100+ hospitals, EU &amp; Canada).
            </p>
            <p className="mt-2 text-xs text-white/40">nick@lighthousehlth.com · Boulder, CO</p>
          </div>
          <div className="flex flex-col gap-3 text-xs text-white/60 sm:flex-row sm:gap-8">
            <Link href="/carbon" className="transition-colors hover:text-white">
              CliniCarbon
            </Link>
            <Link href="/#platform" className="transition-colors hover:text-white">
              Platform
            </Link>
            <Link href="/colorado-playbook" className="transition-colors hover:text-white">
              Colorado Playbook
            </Link>
            <Link href="/blog" className="transition-colors hover:text-white">
              Editorial
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
          <div className="text-xs text-white/60 sm:text-right">
            <p>&copy; {new Date().getFullYear()} Indigo Labs LLC</p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-[10px] text-white/40">
          Healthcare carbon intelligence — from emission factors to funded capital projects.
        </div>
      </div>
    </footer>
  );
}
