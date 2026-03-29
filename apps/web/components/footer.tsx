import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold">Lighthouse HLTH</p>
          <p className="mt-2 text-xs text-white/60">nick@lighthousehlth.com</p>
          <p className="text-xs text-white/60">Boulder, CO</p>
        </div>
        <div className="flex gap-8 text-xs text-white/60">
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/colorado-playbook" className="hover:text-white">
            Colorado Playbook
          </Link>
        </div>
        <div className="text-right text-xs text-white/60">
          <p>Privacy &middot; Terms</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Indigo Labs LLC</p>
        </div>
      </div>
    </footer>
  );
}
