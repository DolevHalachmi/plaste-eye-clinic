import facebookIcon from '../assets/emoji/facebook.png';
import instagramIcon from '../assets/emoji/Instagram_logo_2022.svg.webp';

export default function Social() {
  return (
    <div className="social">
      <span className="email">
        <a href="mailto:md.halachmi@gmail.com">
          md.halachmi@gmail.com
          <svg id="mail-icon" viewBox="0 -960 960 960" aria-hidden="true">
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200Z" />
          </svg>
        </a>
      </span>

      <span className="message">
        <a target="_blank" rel="noopener noreferrer" href="https://wa.me/972505311200">
          0505311200
          <svg id="whatsapp-icon" viewBox="244 7439 20 20" aria-hidden="true">
            <path d="M259.821,7453.12124 C259.58,7453.80344 258.622,7454.36761 257.858,7454.53266 C257.335,7454.64369 256.653,7454.73172 254.355,7453.77943 C251.774,7452.71011 248.19,7448.90097 248.19,7446.36621 C248.19,7445.07582 248.934,7443.57337 250.235,7443.57337 C250.861,7443.57337 250.999,7443.58538 251.205,7444.07952 C251.446,7444.6617 252.034,7446.09613 252.104,7446.24317 C252.393,7446.84635 251.81,7447.19946 251.387,7447.72462 C251.252,7447.88266 251.099,7448.05372 251.27,7448.3478 C251.44,7448.63589 252.028,7449.59418 252.892,7450.36341 C254.008,7451.35771 254.913,7451.6748 255.237,7451.80984 C255.478,7451.90987 255.766,7451.88687 255.942,7451.69881 C256.165,7451.45774 256.442,7451.05762 256.724,7450.6635 C256.923,7450.38141 257.176,7450.3464 257.441,7450.44643 C257.62,7450.50845 259.895,7451.56477 259.991,7451.73382 C260.062,7451.85686 260.062,7452.43903 259.821,7453.12124 M254.002,7439 L253.997,7439 L253.997,7439 C248.484,7439 244,7443.48535 244,7449 C244,7451.18666 244.705,7453.21526 245.904,7454.86076 L244.658,7458.57687 L248.501,7457.3485 C250.082,7458.39482 251.969,7459 254.002,7459 C259.515,7459 264,7454.51465 264,7449 C264,7443.48535 259.515,7439 254.002,7439"></path>
          </svg>
        </a>
      </span>


      <span className="phone">
        <a href="tel:+972733808758">
          073-3808758
          <svg id="phone-icon" viewBox="0 0 512 512" aria-hidden="true">
            <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
          </svg>
        </a>
      </span>

      <span className="facebook">
        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100090267016651">
          <img id="facebook-icon" src={facebookIcon} alt="facebook" />
        </a>
      </span>

      <span className="instagram">
        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/dr.orly_halachmi/">
          <img id="instagram-icon" src={instagramIcon} alt="instagram" />
        </a>
      </span>
    </div>
  );
}
