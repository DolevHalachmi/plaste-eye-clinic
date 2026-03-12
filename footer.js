
class myFooter extends HTMLElement {
    connectedCallback() {
    this.innerHTML = `
        <footer>
            <table id="footer-table">
                <tr>
                    <th width = 150px>כתובת</th>
                    <th width = 150px>טלפון להשארת הודעה בווצאפ/סמס</th>
                    <th width = 150px>מענה טלפון בזמן קבלת קהל</th>
                    <th width = 150px>לתיאום תור ממוחשב 24 שעות ביממה</th>
                </tr>
                <tr>
                    <td width = 200px>עפולה בניין נקסטופ רחוב התוכנה <b> 4 </b> כניסה <b>B</b> קומה שלישית משרד מספר<b> 13 <b></td>
                    <td width = 150px><b>0505311200</b></td>
                    <td width = 150px><b>046040555</b></td>
                    <td width = 150px><b>073-3808758</b></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td width = 150px> שעות קבלה בימי ראשון, שני בשעות 15:30-18:30 </td>
                    <td></td>
                </tr>
            </table>
        </footer>
        `;
    }
}
customElements.define('main-footer', myFooter);