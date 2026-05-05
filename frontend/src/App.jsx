import { Suspense, lazy, useMemo, useState } from 'react';
import Layout from './component/Layout';

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
};

export default function App() {
  const initialPage = useMemo(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  }, []);

  const [page, setPage] = useState(initialPage);

  const navigate = (nextPage) => {
    window.location.hash = nextPage;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const CurrentPage = pageComponents[page] ?? HomePage;

  return (
    <Layout currentPage={page} onNavigate={navigate}>
      <Suspense
        fallback={
          <section className="simple-page page-loading">
            <div className="content-card">
              <p>טוענים את הדף...</p>
            </div>
          </section>
        }
      >
        <CurrentPage />
      </Suspense>
    </Layout>
  );
}
