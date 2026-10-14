import { CONTACT } from './site.js'
import { SITE_URL } from './routes-list.js'

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Aloha Creaciones',
    description:
      'Balloon bouquets and event decorations, hand-built and delivered with love across Miami.',
    url: SITE_URL,
    image: `${SITE_URL}/og/home.jpg`,
    telephone: '+1-786-908-4014',
    email: CONTACT.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: 'Miami' },
    sameAs: [CONTACT.instagram],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '23:00',
      },
    ],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aloha Creaciones',
    url: SITE_URL,
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function serviceJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'Miami' },
  }
}
