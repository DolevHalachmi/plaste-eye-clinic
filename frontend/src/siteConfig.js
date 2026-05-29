const routeList = [
  {
    key: 'home',
    path: '/',
    title: 'Dr. Orly Halachmi Clinic | קליניקה ד"ר אורלי הלחמי',
    description:
      'Dr. Orly Halachmi Clinic in Afula offers pediatric ophthalmology, strabismus care, eye exams, and medical aesthetic treatments.',
  },
  {
    key: 'aesthetic',
    path: '/aesthetic',
    title: 'Medical Aesthetics | Dr. Orly Halachmi Clinic',
    description:
      'Explore medical aesthetic treatments including injectables, lasers, PRP, and skin rejuvenation at Dr. Orly Halachmi Clinic.',
  },
  {
    key: 'eyes',
    path: '/eyes',
    title: 'Eye Care and Strabismus | Dr. Orly Halachmi Clinic',
    description:
      'Learn about pediatric ophthalmology, strabismus evaluation, eye exams, and educational eye-care resources from Dr. Orly Halachmi Clinic.',
  },
  {
    key: 'team',
    path: '/team',
    title: 'Clinic Team | Dr. Orly Halachmi Clinic',
    description:
      'Meet the medical team behind Dr. Orly Halachmi Clinic and learn about the clinic approach to eye care and aesthetic medicine.',
  },
  {
    key: 'blog',
    path: '/blog',
    title: 'Questions and Answers Blog | Dr. Orly Halachmi Clinic',
    description:
      'Read common patient questions and expert answers about eye care, strabismus, and clinic treatments from Dr. Orly Halachmi Clinic.',
  },
  {
    key: 'contact',
    path: '/contact',
    title: 'Contact and Appointments | Dr. Orly Halachmi Clinic',
    description:
      'Find contact details, clinic hours, location, and appointment booking information for Dr. Orly Halachmi Clinic in Afula.',
  },
  {
    key: 'clinic',
    path: '/clinic',
    title: 'Clinic Admin Login | Dr. Orly Halachmi Clinic',
    description:
      'Secure admin login for the Dr. Orly Halachmi Clinic website content and clinic management tools.',
    robots: 'noindex, nofollow',
  },
  {
    key: 'notFound',
    path: '/404',
    title: 'Page Not Found | Dr. Orly Halachmi Clinic',
    description: 'The requested page could not be found on the Dr. Orly Halachmi Clinic website.',
    robots: 'noindex, nofollow',
  },
];

const aliasPathMap = {
  '/home': '/',
};

const legacyHashPathMap = {
  '#home': '/',
  '#aesthetic': '/aesthetic',
  '#eyes': '/eyes',
  '#team': '/team',
  '#blog': '/blog',
  '#contact': '/contact',
  '#clinic': '/clinic',
};

export const routesByKey = Object.fromEntries(routeList.map((route) => [route.key, route]));

function normalizePath(pathname) {
  if (!pathname || pathname === '') {
    return '/';
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function resolveLegacyHashPath(hash) {
  return legacyHashPathMap[hash] ?? null;
}

export function resolveRoute(pathname) {
  const normalizedPath = aliasPathMap[normalizePath(pathname)] ?? normalizePath(pathname);
  const matchedRoute = routeList.find((route) => route.path === normalizedPath);

  if (matchedRoute) {
    return matchedRoute;
  }

  return {
    ...routesByKey.notFound,
    path: normalizedPath,
  };
}
