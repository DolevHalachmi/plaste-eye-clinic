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
          <h3>לתיאום תור</h3>
          <p>לקישור ולאפשרויות יצירת קשר עברו לדף צור קשר.</p>
          <button
            type="button"
            id="footer-btn"
            className="footer-link-button"
            onClick={() => onNavigate('contact')}
          >
            צור קשר
          </button>
        </article>
      </div>
    </footer>
  );
}
