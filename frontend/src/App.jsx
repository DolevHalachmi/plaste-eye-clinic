import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import Layout from './component/Layout';
import { resolveLegacyHashPath, resolveRoute, routesByKey } from './siteConfig';
import { usePageSeo } from './usePageSeo';
import { inject } from "@vercel/analytics";

const HomePage = lazy(() => import('./pages/Home'));
const AestheticPage = lazy(() => import('./pages/Aesthetic'));
const EyesPage = lazy(() => import('./pages/Eyes'));
const TeamPage = lazy(() => import('./pages/OurTeam'));
const BlogPage = lazy(() => import('./pages/Blog'));
const ContactPage = lazy(() => import('./pages/Contact'));
const ClinicPage = lazy(() => import('./pages/Clinic'));

const pageComponents = {
  home: HomePage,
  aesthetic: AestheticPage,
  eyes: EyesPage,
  team: TeamPage,
  blog: BlogPage,
  contact: ContactPage,
  clinic: ClinicPage,
  notFound: NotFoundPage,
};

function buildInitialRoute() {
  const legacyPath = resolveLegacyHashPath(window.location.hash);
  if (legacyPath) {
    window.history.replaceState({}, '', legacyPath);
  }

  return resolveRoute(window.location.pathname);
}

function NotFoundPage() {
  return (
    <section className="simple-page page-loading">
      <div className="content-card">
        <h1>Page not found</h1>
        <p>The page you requested does not exist. Please use the main navigation to continue browsing the clinic site.</p>
      </div>
    </section>
  );
}

export default function App() {
  const initialRoute = useMemo(buildInitialRoute, []);
  const [route, setRoute] = useState(initialRoute);

  useEffect(() => {
    inject();
  }, []);
  
  usePageSeo(route);
  

  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolveRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextPage, options = {}) => {
    const nextRoute = routesByKey[nextPage] ?? resolveRoute(nextPage);
    const method = options.replace ? 'replaceState' : 'pushState';

    if (window.location.pathname !== nextRoute.path) {
      window.history[method]({}, '', nextRoute.path);
    }

    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const CurrentPage = pageComponents[route.key] ?? HomePage;

  return (
    <Layout currentPage={route.key} onNavigate={navigate}>
      <Suspense
        fallback={
          <section className="simple-page page-loading">
            <div className="content-card">
              <p>Loading page...</p>
            </div>
          </section>
        }
      >
        <CurrentPage />
      </Suspense>
    </Layout>
  );
}