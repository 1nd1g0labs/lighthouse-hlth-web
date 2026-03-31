import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold">+ Lighthouse HLTH</p>
            <p className="mt-2 text-xs text-white/60">nick@lighthousehlth.com</p>
            <p className="text-xs text-white/60">Boulder, CO</p>
          </div>
          <div className="flex flex-col gap-3 text-xs text-white/60 sm:flex-row sm:gap-8">
            <Link href="/#platform" className="transition-colors hover:text-white">
              Platform
            </Link>
            <Link href="/colorado-playbook" className="transition-colors hover:text-white">
              Colorado Playbook
            </Link>
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
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
          Healthcare sustainability intelligence for hospitals and health systems.
        </div>
      </div>
    </footer>
  );
}
