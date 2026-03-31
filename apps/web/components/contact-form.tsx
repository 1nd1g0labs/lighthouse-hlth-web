'use client';

import { useEffect } from 'react';

export function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/embed/eqqlal?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
      loading="lazy"
      width="100%"
      height="400"
      frameBorder={0}
      title="Lighthouse HLTH Contact Form"
      className="w-full"
    />
  );
}
