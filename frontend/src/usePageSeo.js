import { useEffect } from 'react';

const defaultTitle = 'Dr. Orly Halachmi Clinic';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function buildStructuredData(route) {
  const siteUrl = `${window.location.origin}${route.path}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalBusiness',
        name: 'Dr. Orly Halachmi Clinic',
        url: siteUrl,
        image: `${window.location.origin}/favicon.svg`,
        telephone: '+972-50-531-1200',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HaTochna 4, Entrance B, Floor 3, Office 13',
          addressLocality: 'Afula',
          addressCountry: 'IL',
        },
        areaServed: 'Afula',
        medicalSpecialty: ['Pediatric ophthalmology', 'Strabismus', 'Medical aesthetics'],
      },
      {
        '@type': 'WebPage',
        name: route.title,
        description: route.description,
        url: siteUrl,
        inLanguage: 'he',
      },
    ],
  };
}

export function usePageSeo(route) {
  useEffect(() => {
    const pageTitle = route.title || defaultTitle;
    const pageDescription = route.description || defaultTitle;
    const canonicalUrl = `${window.location.origin}${route.path}`;
    const robots = route.robots || 'index, follow';

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: pageDescription,
    });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: robots,
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: pageDescription,
    });
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: defaultTitle,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: pageTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: pageDescription,
    });

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });

    let structuredDataElement = document.head.querySelector('script[data-seo="structured-data"]');
    if (!structuredDataElement) {
      structuredDataElement = document.createElement('script');
      structuredDataElement.setAttribute('type', 'application/ld+json');
      structuredDataElement.setAttribute('data-seo', 'structured-data');
      document.head.appendChild(structuredDataElement);
    }

    structuredDataElement.textContent = JSON.stringify(buildStructuredData(route));
  }, [route]);
}
