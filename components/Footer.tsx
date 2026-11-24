import Image from "next/image";
import {
  Facebook,
  Globe2,
  Instagram,
  MapPin,
  Phone,
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
    <a
      className="logo"
      href="#home"
      aria-label="Hotel Orchid Bodhgaya home"
    >
      <Image
        className="logo-mark"
        src="/logo.png"
        alt="Hotel Orchid Bodhgaya logo"
        width={48}
        height={48}
        style={{ objectFit: "contain" }}
      />

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
        {/* Brand and Social Links */}
        <div className="footer-brand">
          <Logo />

          <p className="footer-desc">
            A perfect blend of modern comfort and traditional
            hospitality near the sacred Mahabodhi Temple.
          </p>

          <div className="footer-socials">
            <a href="#contact" aria-label="Facebook">
              <Facebook size={15} />
            </a>

            <a href="#contact" aria-label="Instagram">
              <Instagram size={15} />
            </a>

            <a
              href="https://wa.me/919934070237"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <div className="footer-links">
            {navItems.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Room Tariffs */}
        <div className="footer-column">
          <h4>Room Tariff</h4>

          <div className="footer-links">
            <span>Deluxe Double (A/C)</span>
            <span>Deluxe Triple (A/C)</span>
            <span>Standard (Non A/C)</span>
            <span>Check-out: 12:00 PM</span>
          </div>
        </div>

        {/* Nearby Places */}
        <div className="footer-column">
          <h4>Nearby Places</h4>

          <div className="footer-links">
            <span>Mahabodhi Temple</span>
            <span>80 Feet Buddha</span>
            <span>Thai Temple</span>
            <span>Japanese Temple</span>
            <span>Dungeshwari Cave</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="footer-contact-info footer-column">
          <h4>Contact Info</h4>

          <div className="footer-links">
            <span className="footer-contact-line">
              <MapPin size={15} />
              <span>
                Near Karmappa Temple, Sujata Bypass, Bodhgaya,
                Bodh Gaya, Bihar – 824231, India
              </span>
            </span>

            <a className="footer-contact-line" href="tel:+919876543210">
              <Phone size={13} />
              <span>+91 98765 43210</span>
            </a>

            <a
              className="footer-contact-line"
              href="mailto:hotelorchidbodhgaya@gmail.com"
            >
              <Globe2 size={13} />
              <span>hotelorchidbodhgaya@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container footer-bottom">
        <span>
          © 2026 Hotel Orchid Bodhgaya | All Rights Reserved |{" "}
          <a
            href="https://www.thecyberloom.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TheCyberLoom
          </a>
        </span>

        <span>Hospitality with heart in Bodh Gaya</span>
      </div>
    </footer>
  );
}