export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lighthouse HLTH',
    url: 'https://lighthousehlth.com',
    description: 'Healthcare carbon intelligence — from emission factors to funded capital projects. Founded by Nicolas Vinson, previously shadow.eco (100+ hospitals, EU & Canada).',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Boulder',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    founder: {
      '@type': 'Person',
      name: 'Nicolas Vinson',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'nick@lighthousehlth.com',
      contactType: 'sales',
    },
  };
}
