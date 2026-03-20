import Slider from '../component/Slider';
import VideoCard from '../component/VideoCard';
import bgImage from '../assets/eyeImg/A2.jpg';
import img1 from '../assets/eyeImg/image (5).png';
import img2 from '../assets/eyeImg/image (6).png';
import img3 from '../assets/eyeImg/image (7).png';
import img4 from '../assets/eyeImg/image (8).png';
import img5 from '../assets/eyeImg/image (9).png';
import img6 from '../assets/eyeImg/image (10).png';
import largeVideo from '../assets/eyeImg/large video.mp4';

const slides = [
  { src: img1, alt: 'תוצאה 1' },
  { src: img2, alt: 'תוצאה 2' },
  { src: img3, alt: 'תוצאה 3' },
  { src: img4, alt: 'תוצאה 4' },
  { src: img5, alt: 'תוצאה 5' },
  { src: img6, alt: 'תוצאה 6' },
];


const videoCards = [
  {
    icon: '✨',
    subTitle: 'קדימון',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102398125420863%2F&show_text=false&width=476&t=0"
        width="476"
        height="476"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="קדימון"
      />
    ),
    description:'סדרת סרטונים קצרים המציגה בדיקות עיניים לילדים, אבחון מוקדם של בעיות ראייה והטכנולוגיה המתקדמת המשמשת להבטחת התפתחות ראייה תקינה.'
  },
  {
    icon: '💧',
    subTitle: 'חסימת דרכי דמעות',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102392605421415%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="חסימת דרכי דמעות"
      />
    ),
    description:
      'הסבר על חסימת דרכי דמעות בתינוקות, הסימנים לכך ואפשרויות הטיפול.',
  },
  {
    icon: '🔬',
    subTitle: 'מיכשור רפואי אטורפרקטומטר+ רטינוסקופ',
    media: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://m.facebook.com/story.php?story_fbid=102380642089278&id=100069520266015"
      >
        קישור לסרטון
      </a>
    ),
    description:
      'הצגת מכשור מתקדם למדידת מספר המשקפיים והערכת מצב הראייה אצל ילדים.',
  },
  {
    icon: '💐',
    subTitle: 'ראיית צבעים',
    media: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://m.facebook.com/story.php?story_fbid=102171328776876&id=100069520266015"
      >
        קישור לסרטון
      </a>
    ),
    description:
      'הדגמה של בדיקות לזיהוי הפרעות בראיית צבעים והמשמעות שלהן בהתפתחות הראייה.',
  },
  {
    icon: '🩺',
    subTitle: 'מנורת סדק ומכשירי מדידת לחץ תוך עיני',
    media: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://m.facebook.com/story.php?story_fbid=102375778756431&id=100069520266015"
      >
        קישור לסרטון
      </a>
    ),
    description:
      'הצגת בדיקות עיניים באמצעות מנורת סדק ומכשירים למדידת לחץ תוך-עיני להערכת בריאות העין.',
  },
  {
    icon: '🌸',
    subTitle: 'בדיקת עיניים ילדים ובדיקה אורטופתית',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102371082090234%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="בדיקת עיניים ילדים ובדיקה אורטופתית"
      />
    ),
    description:
      'סקירה של בדיקת עיניים מקיפה לילדים הכוללת הערכת חדות ראייה, תנועות עיניים ושיתוף פעולה בין העיניים.',
  },
  {
    icon: '💎',
    subTitle: 'פזילה בתינוקות',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102364588757550%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="פזילה בתינוקות"
      />
    ),
    description:
      'הסבר כיצד להבחין בין פזילה אמיתית בתינוקות לבין פזילה מדומה הנגרמת ממבנה הפנים.',
  },
  {
    icon: '🌿',
    subTitle: 'בעיות רפרקציה / תשבורת',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102360222091320%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="בעיות רפרקציה תשבורת"
      />
    ),
    description:
      'בניית תכנית טיפול מדויקת בהתאם למבנה הפנים, העור והמטרות שלך.',
  },
  {
    icon: '🖋️',
    subTitle: 'התאמת משקפיים',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102345505426125%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="התאמת משקפיים"
      />
    ),
    description:
      'בסרטון מודגמת התאמת משקפיים לילדים בצורה מדויקת ומקצועית לשיפור הראייה וההתפתחות הראייתית.',
  },
  {
    icon: '👁‍🗨',
    subTitle: 'הרחבת אישונים',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102287288765280%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="הרחבת אישונים"
      />
    ),
    description:
      'הסבר על בדיקת עיניים עם הרחבת אישונים המאפשרת הערכה מלאה ומדויקת של בריאות העין ומספר המשקפיים.',
  },
  {
    icon: '👩‍⚕️',
    subTitle: 'תרגילי קונברגנציה/ כינוס עיניים',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102279418766067%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="תרגילי קונברגנציה כינוס עיניים"
      />
    ),
    description:
      'הדגמה של תרגילים לשיפור כינוס העיניים ולסיוע בילדים הסובלים מקושי במיקוד בקריאה ובמשימות קרובות.',
  },
  {
    icon: '🌺',
    subTitle: 'בעיות רפרקציה',
    media: (
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100069520266015%2Fvideos%2F102360222091320%2F&show_text=false&width=560&t=0"
        width="560"
        height="314"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="בעיות רפרקציה"
      />
    ),
    description:
      'הסבר על ליקויי תשבורת כגון קוצר ראייה, רוחק ראייה ואסטיגמטיזם וכיצד הם משפיעים על הראייה בילדים.',
  },
  {
    icon: '🥼',
    subTitle: 'ניתוחי פזילה',
    media: (
      <video controls>
        <source src={largeVideo} type="video/mp4" />
      </video>
    ),
    description: 'אנחנו בתקשרות בתוכית אסיפת הורים עם קובי מחט',
  },
];


export default function Eyes() {
  return (
    <>
      <section className="hero-section background-eyes" style={{ backgroundImage: `url(${bgImage})` }}>
        <header>
          <h2>עיניים</h2>
        </header>
      </section>

      <section className="Before-and-After">
        <h1>גלריית תמונות לפני ואחרי ניתוחי פזילה</h1>
      </section>

      <Slider slides={slides} />

      <section className="eyes-videos">
        <div className="eyes-videos-header">
          <span className="section-tag">למידע נוסף</span>
          <h2>סרטוני הדרכה להורים</h2>
        </div>

        <div className="videos-grid">
          {videoCards.map((card, index) => (
            <VideoCard
              key={index}
              icon={card.icon}
              subTitle={card.subTitle}
              video={card.media}
              description={card.description}
            />
          ))}
        </div>
      </section>
    </>
  );
}
