export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lighthouse HLTH',
    url: 'https://lighthousehlth.com',
    logo: 'https://lighthousehlth.com/logo.png',
    description: 'Healthcare sustainability platform — reduce emissions, improve patient care, and save money.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Boulder',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'nick@lighthousehlth.com',
      contactType: 'sales',
    },
  };
}
