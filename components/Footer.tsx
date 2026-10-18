import {
  Facebook,
  Globe2,
  Instagram,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const navItems = [
  ["Home", "#home"],
  ["Rooms", "#rooms"],
  ["Gallery", "#gallery"],
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
] as const;

function Logo() {

  return (

    <a className="logo" href="#home" aria-label="Hotel Orchid Bodhgaya home">

      <svg

        className="logo-mark"

        viewBox="0 0 48 48"

        aria-hidden="true"

        fill="none"

        stroke="currentColor"

        strokeWidth="2.2"

        strokeLinecap="round"

        strokeLinejoin="round"

      >

        <path d="M24 38V23" />

        <path d="M24 29C15 29 10 24 9 15c9 0 15 4 15 14Z" />

        <path d="M24 29c9 0 15-5 15-14-9 0-15 4-15 14Z" />

        <path d="M24 25c-6-5-7-11 0-18 7 7 6 13 0 18Z" />

        <path d="M12 37c7-3 17-3 24 0" />

      </svg>

      <span>

        <span className="logo-title">HOTEL ORCHID</span>

        <span className="logo-sub">BODHGAYA</span>

      </span>

    </a>

  );

}

export default function Footer() {
  return (
<footer className="footer">

        <div className="container footer-main">

          <div>

            <Logo />

            <p className="footer-desc">

              A perfect blend of modern comfort and traditional hospitality near

              the sacred Mahabodhi Temple.

            </p>

            <div className="footer-socials">

              <a href="#contact" aria-label="Facebook">

                <Facebook size={15} />

              </a>

              <a href="#contact" aria-label="Instagram">

                <Instagram size={15} />

              </a>

              <a href="#contact" aria-label="YouTube">

                <Youtube size={15} />

              </a>

              <a href="#contact" aria-label="WhatsApp">

                <Phone size={15} />

              </a>

            </div>

          </div>

          <div>

            <h4>Quick Links</h4>

            <div className="footer-links">

              {navItems.map(([label, href]) => (

                <a href={href} key={label}>

                  {label}

                </a>

              ))}

            </div>

          </div>

          <div>

            <h4>Room Tariff</h4>

            <div className="footer-links">

              <span>Deluxe Double (A/C)</span>

              <span>Deluxe Triple (A/C)</span>

              <span>Standard (Non A/C)</span>

              <span>Check-out: 12:00 PM</span>

            </div>

          </div>

          <div>

            <h4>Nearby Places</h4>

            <div className="footer-links">

              <span>Mahabodhi Temple</span>

              <span>80 Feet Buddha</span>

              <span>Thai Temple</span>

              <span>Japanese Temple</span>

              <span>Dungeshwari Cave</span>

            </div>

          </div>

          <div className="footer-contact-info">

            <h4>Contact Info</h4>

            <div className="footer-links">

              <span>

                <MapPin size={13} /> Near Karmappa Temple, Sujata Bypass, Bodhgaya,

                <br />

                Bodh Gaya, Bihar – 824231, India

              </span>

              <a href="tel:+919934070237">
                <Phone size={13} /> +91 99340 70237
              </a>

              <a href="tel:+917992269493">
                <Phone size={13} /> +91 79922 69493
              </a>

              <a href="mailto:hotelorchidbodhgaya@gmail.com">

                <Globe2 size={13} /> hotelorchidbodhgaya@gmail.com

              </a>

            </div>

          </div>

        </div>

        <div className="container footer-bottom">

          <span>© 2026 Hotel Orchid Bodhgaya | All Rights Reserved | <a href="https://www.thecyberloom.com" target="_blank" rel="noopener noreferrer">Powered by TheCyberLoom</a></span>

          <span>Hospitality with heart in Bodh Gaya</span>

        </div>

      </footer>
  );
}
