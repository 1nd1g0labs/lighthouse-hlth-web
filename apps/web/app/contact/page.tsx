import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Schedule a 30-minute discovery call to map your sustainability starting point.',
};

function TopoBackground() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 800 600" fill="none" stroke="#0E9BA7" strokeWidth="0.8" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="500" cy="380" rx="120" ry="80" />
      <ellipse cx="500" cy="380" rx="180" ry="120" />
      <ellipse cx="500" cy="380" rx="240" ry="160" />
      <ellipse cx="500" cy="380" rx="310" ry="210" />
      <ellipse cx="500" cy="380" rx="390" ry="270" />
      <ellipse cx="240" cy="160" rx="80" ry="60" />
      <ellipse cx="240" cy="160" rx="140" ry="100" />
      <ellipse cx="240" cy="160" rx="210" ry="150" />
      <ellipse cx="700" cy="120" rx="60" ry="45" />
      <ellipse cx="700" cy="120" rx="110" ry="80" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center bg-navy px-6 py-20">
      <TopoBackground />
      <div className="absolute left-[60%] top-[55%] h-2 w-2 rounded-full bg-sustainability shadow-[0_0_12px_rgba(22,163,74,0.4)]" />
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white/95 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-center text-h4 font-bold text-neutral-900">Let&apos;s Talk</h1>
        <p className="mt-2 text-center text-sm text-text-muted">30-minute discovery call to map your sustainability starting point.</p>
        <div className="mt-6">
          <ContactForm />
        </div>
        <div className="mt-6 border-t border-border-subtle pt-4 text-center text-xs text-text-muted">
          nick@lighthousehlth.com &middot; Boulder, CO
        </div>
      </div>
    </div>
  );
}
