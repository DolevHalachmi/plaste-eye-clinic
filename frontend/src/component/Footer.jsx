export default function Footer({onNavigate}) {
  return (
    <footer>
      <table id="footer-table">
        <thead>
          <tr>
            <th width="150">כתובת</th>
            <th width="150">טלפון להשארת הודעה בווצאפ/סמס</th>
            <th width="150">מענה טלפון בזמן קבלת קהל</th>
            <th width="150">לתיאום תור ממוחשב 24 שעות ביממה</th>
            <th width="150">לאתר תיאום תורים</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="200">עפולה בניין נקסטופ רחוב התוכנה <b>4</b> כניסה <b>B</b> קומה שלישית משרד מספר <b>13</b></td>
            <td width="150"><b>0505311200</b></td>
            <td width="150"><b>046040555</b></td>
            <td width="150"><b>073-3808758</b></td>
            <td width="100">לפרטים ולקישור לאתר קביעת תורים לחצו על דף   <button
                type="button" id="footer-btn"
                onClick={() => onNavigate('contact')}
              >
              <b>צור קשר</b>
            </button></td>
          </tr>
          <tr>
            <td />
            <td />
            <td width="150">שעות קבלה בימי ראשון, שני בשעות 15:30-18:30</td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </footer>
  );
}
