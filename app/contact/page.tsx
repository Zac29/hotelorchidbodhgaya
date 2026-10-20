"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import "./contact-page.css";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const requestRef = useRef<{ signature: string; id: string } | null>(null);

    window.location.href = `mailto:hotelorchidbodhgaya@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="contact-page">
      <section className="contact-page-hero">
        <div className="contact-page-hero-copy">
          <span className="story-eyebrow"><i /> WE’RE HERE TO HELP</span>
          <h1>
            Let’s plan your
            <br />
            <em>Bodh Gaya stay.</em>
          </h1>
          <p>
            A question, a special request or ready to book? Our team would be
            delighted to hear from you.
          </p>
          <div className="contact-hero-note">
            <span className="contact-note-icon"><Clock3 size={18} /></span>
            <span>
              Personal assistance
              <strong>We’re happy to help with your plans</strong>
            </span>
          </div>
        </div>
        <div className="contact-page-hero-photo">
          <div className="contact-page-photo-frame" />
          <span>YOUR WELCOME AWAITS</span>
        </div>
      </section>

      <section className="contact-page-main story-container">
        <div className="contact-details-column">
          <span className="story-eyebrow">GET IN TOUCH</span>
          <h2>
            We’re just a
            <br />
            <em>message away.</em>
          </h2>
          <p className="contact-details-intro">
            Reach out directly or send us a note using the form. We’ll be glad
            to help with room availability, directions and any details for your
            visit.
          </p>

          <div className="contact-detail-card">
            <span><Phone size={19} /></span>
            <div>
              <small>CALL OUR TEAM</small>
              <strong><a href="tel:+919934070237">+91 99340 70237</a></strong>
              <strong><a href="tel:+917992269493">+91 79922 69493</a></strong>
              <p>Available to assist with your stay</p>
            </div>
            <ArrowRight size={16} />
          </div>

          <a className="contact-detail-card" href="mailto:hotelorchidbodhgaya@gmail.com">
            <span><Mail size={19} /></span>
            <div>
              <small>EMAIL US</small>
              <strong>hotelorchidbodhgaya@gmail.com</strong>
              <p>Send us your questions and requests</p>
            </div>
            <ArrowRight size={16} />
          </a>

          <div className="contact-address">
            <MapPin size={18} />
            <div>
              <small>FIND HOTEL ORCHID</small>
              <p>
                Near Mahabodhi Temple
                <br />
                Bodh Gaya, Bihar 824231, India
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hotel+Orchid+Bodhgaya"
                target="_blank"
                rel="noreferrer"
              >
                Get directions <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          <div className="contact-form-heading">
            <div>
              <span className="story-eyebrow">SEND AN ENQUIRY</span>
              <h2>How can we help?</h2>
            </div>
            <span className="contact-form-mark">✳</span>
          </div>
          <p className="contact-form-intro">
            Share a few details and we’ll help you plan a comfortable stay.
          </p>

          <form className="premium-contact-form" onSubmit={handleSubmit}>
            <div className="contact-fields-two">
              <label>
                Your name
                <input name="name" autoComplete="name" placeholder="Full name" required />
              </label>
              <label>
                Email address
                <input name="email" type="email" autoComplete="email" placeholder="hotelorchidbodhgaya@gmail.com" required />
              </label>
            </div>

            <div className="contact-fields-two">
              <label>
                Phone number
                <input name="phone" type="tel" autoComplete="tel" placeholder="+91" />
              </label>
              <label>
                Number of guests
                <select name="guests" defaultValue="2 guests">
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4+ guests</option>
                </select>
              </label>
            </div>

            <div className="contact-fields-two">
              <label>
                Arrival date
                <input name="arrival" type="date" />
              </label>
              <label>
                Departure date
                <input name="departure" type="date" />
              </label>
            </div>

            <label>
              Your message
              <textarea name="message" rows={4} placeholder="Tell us about your plans or any special requests…" />
            </label>

            <button className="contact-submit" type="submit">
              Send your enquiry <ArrowRight size={16} />
            </button>
            <small className="contact-form-footnote">
              Your email app will open with your enquiry ready to send.
            </small>
          </form>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="story-container contact-map-layout">
          <div>
            <span className="story-eyebrow">IN THE HEART OF BODH GAYA</span>
            <h2>
              Close to the places
              <br />
              <em>that move you.</em>
            </h2>
            <p>
              Find us near the Mahabodhi Temple, with Bodh Gaya’s landmarks and
              spiritual sites within easy reach.
            </p>
            <Link href="/about" className="story-text-link">
              Discover Hotel Orchid <ArrowRight size={15} />
            </Link>
          </div>

          <a
            className="contact-map"
            href="https://www.google.com/maps/search/?api=1&query=Hotel+Orchid+Bodhgaya"
            target="_blank"
            rel="noreferrer"
            aria-label="Find Hotel Orchid Bodhgaya on Google Maps"
          >
            <iframe
              title="Map showing Hotel Orchid Bodhgaya"
              src="https://maps.google.com/maps?q=Hotel%20Orchid%20Bodhgaya&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
            <span><MapPin size={18} /> Open directions <ArrowRight size={15} /></span>
          </a>
        </div>
      </section>
    </main>
  );
}
