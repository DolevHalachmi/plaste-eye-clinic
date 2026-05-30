export default function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="footer-shell">
        <article className="footer-card">
          <h3>כתובת</h3>
          <p>עפולה, בניין נקסטופ, רחוב התוכנה 4, כניסה B, קומה 3, משרד 13</p>
        </article>

        <article className="footer-card">
          <h3>ווצאפ / סמס</h3>
          <p>0505311200</p>
        </article>

        <article className="footer-card">
          <h3>מענה טלפון</h3>
          <p>046040555</p>
          <p>ימי ראשון ושני, 15:30-18:30</p>
        </article>

        <article className="footer-card">
          <h3>מוקד תורים</h3>
          <p>073-3808758</p>
        </article>

        <article className="footer-card footer-card-action">
          <h3>לאתר קביעת תורים אונליין</h3>
           <button
            type="button"
            id="footer-btn"
            className="footer-link-button"
            onClick={() =>
              window.open(
                'https://www.rofim.org.il/minisite/%D7%93%D7%A8_%D7%94%D7%9C%D7%97%D7%9E%D7%99-%D7%90%D7%99%D7%99%D7%9C_%D7%90%D7%95%D7%A8%D7%9C%D7%99',
                '_blank'
              )
            }
          >
            אתר קביעת תורים
          </button>
        </article>
      </div>

      <p className="footer-privacy">
        אתר זה משתמש ב-Vercel Analytics לצורך ספירת ביקורים בלבד. המידע לא יועבר לצד שלישי ולא ישמש לשיווק.
        שאלות שנשלחות דרך הבלוג משמשות למענה בלבד ולא יתווספו לרשימת תפוצה.
        {' · '}
        This site uses Vercel Analytics solely to count visits. No data is shared or used for marketing.
        Questions submitted via the blog are used for reply purposes only and will not be added to any mailing list.
      </p>
    </footer>
  );
}
