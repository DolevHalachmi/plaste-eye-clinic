import { useMemo, useState } from 'react';
import Layout from './component/Layout';
import Home from './pages/Home';
import Eyes from './pages/Eyes';
import Aesthetic from './pages/Aesthetic';
import OurTeam from './pages/OurTeam';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Clinic from './pages/Clinic';

export default function App() {
  const initialPage = useMemo(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  }, []);

  const [page, setPage] = useState(initialPage);

  const navigate = (nextPage) => {
    window.location.hash = nextPage;
    setPage(nextPage);
  };

  const currentPage = {
    home: <Home />,
    aesthetic: <Aesthetic />,
    eyes: <Eyes />,
    team: <OurTeam />,
    blog: <Blog />,
    contact: <Contact />,
    clinic: <Clinic />,
  }[page] ?? <Home />;

  return (
    <Layout currentPage={page} onNavigate={navigate}>
      {currentPage}
    </Layout>
  );
}
