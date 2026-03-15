import Social from './Social';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ currentPage, onNavigate, children }) {
  return (
    <>
      <Social />
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
