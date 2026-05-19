import staffImage from '../assets/Img/staff.webp';
import img1 from '../assets/eyeImg/A3 (3).jpg';
import img2 from '../assets/eyeImg/A3 (2).jpg';
import img3 from '../assets/eyeImg/A3 (1).jpg';
import img4 from '../assets/eyeImg/A7 (6) (1).jpg';
import img5 from '../assets/eyeImg/A7.jpg';
import img6 from '../assets/eyeImg/A7 (3) (1).jpg';


const members = [
  ['הגברת נטלי פלר', 'מזכירה רפואית', 'טיפולי לייזר להסרת שיער'],
  ['דוקטור אירנה וישניבצקי', 'רופאת עיניים', 'טיפולי לייזר מתקדמים וPRP'],
  ['דוקטור אורלי הלחמי', 'מומחית ברפואת עיניים, מנתחת פזילה וילדים, מנהלת יחידת עיניים ילדים בעמק', 'אסתטיקה הזרקות, לייזר, PRP וטיפולים מתקדמים'],
];
const imgs = [
  { src: img1, alt: 'גברת נטליה פלר' },
  { src: img2, alt: 'דוקטור אירנה וישניבצקי' },
  { src: img3, alt: 'דוקטור אורלי הלחמי' },
];


export default function OurTeam() {
  return (
    <>
    <section className="staff-background">
      <h1>הנבחרת שלנו</h1>
      <div className="content-card two-column">
        <img src={staffImage} alt="צוות המרפאה" loading="lazy" decoding="async" />
        <div>
          <p>המרפאה פועלת בגישה אישית, נעימה ומקצועית, עם דגש על ליווי רציף לפני, במהלך ולאחר הטיפול.</p>
          <p>הצוות משלב ניסיון רפואי, שירות אנושי ויחס מותאם לכל מטופל ומטופלת.</p>
        </div>
      </div>
    </section>
      <div className="members-grid">
        {members.map(([name, title, text], index) => (
          <article key={name} className="member-card">
          <img
            className="member-img" src={imgs[index].src} alt={imgs[index].alt} loading="lazy" decoding="async"/>
            <h2> {name} </h2>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
    </div>
    <div className="team-grid">
      <img src={img4} alt="צוות המרפאה 1" loading="lazy" decoding="async" />
      <img src={img5} alt="צוות המרפאה 2" loading="lazy" decoding="async" />
      <img src={img6} alt="צוות המרפאה 3" loading="lazy" decoding="async" />
    </div>


    </>
  );
}
