import examinationImage from '../assets/Img/examination.webp';
import surgeryImage from '../assets/Img/surgery.jpeg';

export default function Home() {
  return (
    <>
      <section className="hero-section background" style={{ backgroundImage: `linear-gradient(to left, hsla(0, 4%, 18%, 0), hsla(0, 40%, 2%, 0.151)), url(${examinationImage})` }}>
        <header>
          <h2>דף בית</h2>
        </header>
      </section>

      <section className="video">
        <div className="video-content">
          <h1>ד&quot;ר אורלי הלחמי</h1>
          <h3>מומחית ברפואת עיניים, פזילה וילדים</h3>
          <h5>מנהלת יחידת עיניים ילדים בעמק, אסתטיקה, הזרקות, לייזר, PRP וטיפולים מתקדמים</h5>
        </div>

        <iframe
          src="https://www.youtube.com/embed/BHsQbE7WsuA"
          title='ד"ר אורלי הלחמי'
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </section>

      <section className="surgery">
        <div className="surg-text">
          <p>שמי דוקטור אורלי הלחמי. אני רופאת עיניים מומחית, בוגרת הטכניון, עם התמחות על במחלות עיניים ילדים ופזילה בילדים ומבוגרים.</p>
          <p>משנת 2008 אני מנתחת פזילה.</p>
          <p>ביצעתי התמחות על באוסטרליה, במלבורן, בפזילה בבית החולים Royal Victorian Eye and Ear Hospital, והתמחות על נוספת בילדים בבית החולים Royal Children&apos;s Hospital.</p>
          <p>משנת 2020 אני עוסקת באסתטיקה מתוך מחשבה והבנה שמראה אסתטי אינו פחות חשוב מתפקוד מיטבי.</p>
        </div>

        <img src={surgeryImage} alt="Surgery" loading="lazy" />
      </section>
    </>
  );
}
