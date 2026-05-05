import { useState } from 'react';
import homeIcon from '../assets/emoji/house-solid-full.svg';
import eyeLogo from '../assets/Img/eyelogo_removedBackground.png';

const navItems = [
  { key: 'home', label: <img id="home-icon" src={homeIcon} alt="home" /> },
  { key: 'aesthetic', label: 'אסתטיקה' },
  { key: 'eyes', label: 'עיניים' },
  { key: 'team', label: 'הנבחרת שלנו' },
  { key: 'blog', label: 'בלוג שאלות ותשובות' },
  { key: 'contact', label: 'צור קשר' },
  { key: 'clinic', label: 'לשימוש המרפאה' },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <div className="nav-top">
          <div className="eye-container">
            <img src={eyeLogo} alt="Clinic logo" />
          </div>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="primary-nav"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? 'סגירה' : 'תפריט'}
          </button>
        </div>

        <div
          id="primary-nav"
          className={`nav-links ${isMenuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`nav-link ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate(item.key);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
