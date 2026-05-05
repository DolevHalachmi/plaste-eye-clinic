import Slider from '../component/Slider';
import bgImage from '../assets/aestheticImg/B5 1.jpg';
import video1 from '../assets/aestheticImg/anesthetic page video.mp4';
import video2 from '../assets/aestheticImg/B7.mp4';
import img1 from '../assets/aestheticImg/image (5).png';
import img2 from '../assets/aestheticImg/image (6).png';
import img3 from '../assets/aestheticImg/image (7).png';
import img4 from '../assets/aestheticImg/image (8).jpg';
import img5 from '../assets/aestheticImg/image (9).jpg';


const treatments = [
  ['✨', 'הזרקת בוטוקס לקמטים', 'לטשטוש קמטי הבעה ולמראה רענן, חלק וטבעי יותר.'],
  ['💧', 'הזרקת חומצה היאלורונית', 'לעיצוב, מילוי והחזרת נפח לאזורים שונים בפנים.'],
  ['🔬', 'טיפולי לייזר משולבים' ,'לאקנה, פיגמנטציה, צלקות, כתמים, קמטוטים ושיפור מרקם העור'],
  ['🖋️', 'הסרת קעקועים', 'טיפול מתקדם להפחתה או הסרה של קעקועים בהתאמה אישית.'],
  ['🌿', 'טיפולי שיער PRP', 'לעידוד צמיחת שיער וחיזוק הקרקפת בשיטה טבעית ומתקדמת.'],
  ['🌸', 'סקין בוסטרים', 'להחדרת לחות, שיפור זוהר העור ומראה חיוני ובריא יותר.'],
  ['💎', 'טיפולי אנטי-אייג', 'לשיפור גמישות העור, מיצוק ורענון מראה הפנים.'],
  ['🩺', 'ייעוץ והתאמה אישית', 'בניית תכנית טיפול מדויקת בהתאם למבנה הפנים, העור והמטרות שלך.'],
];
const slides = [
  { src: img1, alt: 'תוצאה 1' },
  { src: img2, alt: 'תוצאה 2' },
  { src: img3, alt: 'תוצאה 3' },
  { src: img4, alt: 'תוצאה 4' },
  { src: img5, alt: 'תוצאה 5' },
];

export default function Aesthetic() {
  return (
    <>
      <section className="hero-section background-aesthetic" style={{ backgroundImage: `url(${bgImage})` }}>
        <header>
          <h2>אסתטיקה</h2>
        </header>
      </section>

      <Slider slides={slides} interval={4000} />

      <section className="video-aesthetic">
        <video id="video-aesthetic1" controls muted preload="metadata" src={video1} />
        <video id="video-aesthetic2" controls muted preload="metadata" src={video2} />
      </section>

      <section className="aesthetic-treatments-section">
        <div className="aesthetic-treatments-header">
          <span className="section-tag">טיפולים</span>
          <div className="section-header">
            <h2>אסתטיקה רפואית במראה טבעי</h2>
            <p>שילוב בין דיוק רפואי, התאמה אישית והבנה אסתטית של צורכי המטופל.</p>
          </div>
        </div>

        <div className="treatments-grid">
          {treatments.map(([icon, title, text]) => (
            <article key={title} className="treatment-card">
              <div className="card-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
