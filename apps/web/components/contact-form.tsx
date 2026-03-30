'use client';

import { useState, type FormEvent } from 'react';

const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">Message sent.</p>
        <p className="mt-2 text-sm text-text-muted">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-neutral-700">Name</label>
        <input id="name" name="name" type="text" required className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-neutral-700">Email</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="you@hospital.org" />
      </div>
      <div>
        <label htmlFor="organization" className="block text-xs font-semibold text-neutral-700">Organization</label>
        <input id="organization" name="organization" type="text" required className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Health system name" />
      </div>
      <div>
        <label htmlFor="role" className="block text-xs font-semibold text-neutral-700">Role</label>
        <input id="role" name="role" type="text" required className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your role" />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-neutral-700">Message <span className="font-normal text-neutral-400">(optional)</span></label>
        <textarea id="message" name="message" rows={3} className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="What are you looking to solve?" />
      </div>
      <button type="submit" disabled={status === 'submitting'} className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-soft disabled:opacity-50">
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-center text-xs text-critical">Something went wrong. Please email nick@lighthousehlth.com directly.</p>
      )}
    </form>
  );
}
