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
  return (
    <nav>
      <table id="tableHeader">
        <tbody>
          <tr>
            {navItems.map((item) => (
              <th key={item.key} width="100px">
                <button
                  type="button"
                  className={`nav-link ${currentPage === item.key ? 'active' : ''}`}
                  onClick={() => onNavigate(item.key)}
                >
                  {item.label}
                </button>
              </th>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="eye-container">
        <img src={eyeLogo} alt="Clinic logo" />
      </div>
    </nav>
  );
}
