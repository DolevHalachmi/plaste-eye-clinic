import bgImage from '../assets/Img/orly-with-logo.JPG'; 
import appImg from '../assets/Img/appImg.png';
export default function Contact() {
  return (
    <>
      <section className="hero-section background-contact" style={{backgroundImage: `url(${bgImage})`}}>
        <header>
          <h2>אסתטיקה</h2>
        </header>
      </section>

    <section className="simple-page">
      <h1>צור קשר</h1>
      <div className="content-card contact-card">
        <p><b>כתובת:</b> עפולה, בניין נקסטופ, רחוב התוכנה 4, כניסה B, קומה 3, משרד 13</p>
        <p><b>מענה טלפון ממוחשב:</b> 073-3808758</p>
        <p><b>ווצאפ / סמס:</b> 050-5311200</p>
        <p><b>שעות קבלה:</b> ראשון ושני, 15:30–18:30</p>
        <p><b>מענה טלפון בשעות קבלה:</b> 046040555</p>
      </div>
    </section>

    <section className="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1462.8350432636835!2d35.299252757002584!3d32.61385112499432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c53d7abf0879b%3A0xe6c3cf9e38e3d89a!2z15TXqteV15vXoNeUIDQsIEFmdWxh!5e0!3m2!1sen!2sil!4v1773166625239!5m2!1sen!2sil" 
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
        <span class = "map-content">
          <h1>ד"ר אורלי הלחמי</h1>
          <h3> h3 </h3>
          <p> אני כותב על כמה אמא רופאה טובה </p>
        </span>  
    </section>
    
    <section className="appointmentSite">
      <img src={appImg} id = "appointmentImg" />
      <a id = "appSiteBtn" target="_blank" href="https://www.rofim.org.il/minisite/%D7%93%D7%A8_%D7%94%D7%9C%D7%97%D7%9E%D7%99-%D7%90%D7%99%D7%99%D7%9C_%D7%90%D7%95%D7%A8%D7%9C%D7%99">לאתר קביעת תורים</a>
    </section>

    </>
  );
}
