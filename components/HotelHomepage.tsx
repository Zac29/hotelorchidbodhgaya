 "use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight, BedDouble, Building2, Car, Check, ChevronLeft, ChevronRight, CircleUserRound, Clock3, Compass,
  Facebook, Globe2, HeartHandshake, Instagram, Landmark, MapPin, Phone, Plane, Star, TrainFront,
  UtensilsCrossed, X, Send, UserRound, Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { images, attractionImages, galleryImages } from "@/lib/images";
import { attractions, rooms } from "@/lib/constants";
import HeroBenefits from "@/components/HeroBenefits";

const navItems = [
  ["Home", "#home"],
  ["Rooms", "#rooms"],
  ["Gallery", "#gallery"],
  ["About Us", "#about"],
  ["Contact Us", "#contact"],
];

type EnquiryState = {
  name: string; email: string; mobile: string; checkIn: string; checkOut: string;
  guests: string; room: string; message: string;
};

const emptyForm: EnquiryState = {
  name: "", email: "", mobile: "", checkIn: "", checkOut: "",
  guests: "", room: "", message: "",
};

const locationCards = [
  { title: "Mahabodhi Temple", descriptor: "", distance: "Main attraction in Bodh Gaya", detail: "Central Location", icon: Landmark, pin: true },
  { title: "Gaya International Airport", descriptor: "", distance: "Approx. 7 – 11 km", detail: "Depending on reference point", icon: Plane, pin: false },
  { title: "Gaya Junction", descriptor: "(Railway Station)", distance: "Approx. 15 – 20 km", detail: "from Bodh Gaya", icon: TrainFront, pin: true },
  { title: "Patna Airport", descriptor: "", distance: "Approx. 135 km", detail: "from Bodh Gaya", icon: Building2, pin: true },
];

const guestReviews = [
  { name: "Rohit Sharma", place: "Delhi, India", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80", quote: '“Excellent stay at Hotel Orchid. Very clean rooms, polite staff and great location near Mahabodhi Temple. Highly recommended!”' },
  { name: "Priya Mehta", place: "Mumbai, India", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80", quote: '“Beautiful property with amazing hospitality. Rooms are spacious and well-maintained. Food was also delicious.”' },
  { name: "David Lee", place: "Singapore", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80", quote: '“Perfect place for a peaceful stay in Bodhgaya. The staff is very helpful and the ambience is truly relaxing. Will visit again!”' },
];

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Hotel Orchid Bodhgaya home">
      <svg className="logo-mark" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 38V23"/><path d="M24 29C15 29 10 24 9 15c9 0 15 4 15 14Z"/><path d="M24 29c9 0 15-5 15-14-9 0-15 4-15 14Z"/><path d="M24 25c-6-5-7-11 0-18 7 7 6 13 0 18Z"/><path d="M12 37c7-3 17-3 24 0"/></svg>
      <span>
        <span className="logo-title">HOTEL ORCHID</span>
        <span className="logo-sub">BODHGAYA</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, subtitle, centered = false }: {
  eyebrow: string; title: string; subtitle?: string; centered?: boolean;
}) {
  return (
    <div className={centered ? "location-head" : ""}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  function update(key: keyof EnquiryState, value: string) {
    setForm((old) => ({ ...old, [key]: value }));
    setErrors([]);
    setSent(false);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: string[] = [];
    if (!form.name.trim()) next.push("Full name is required.");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.push("Enter a valid email address.");
    if (!/^[0-9+\-\s]{10,15}$/.test(form.mobile.trim())) next.push("Enter a valid mobile number.");
    if (!form.checkIn) next.push("Check-in date is required.");
    if (!compact && !form.checkOut) next.push("Check-out date is required.");
    if (!form.guests) next.push("Please select number of guests.");
    if (!compact && form.checkIn && form.checkOut && form.checkOut < form.checkIn) next.push("Check-out must be after check-in.");
    setErrors(next);
    if (!next.length) {
      const body = [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim() || "Not provided"}`,
        `Mobile: ${form.mobile.trim()}`,
        `Check-in: ${form.checkIn}`,
        `Check-out: ${form.checkOut}`,
        `Guests: ${form.guests}`,
        `Room: ${form.room || "No preference"}`,
        `Message: ${form.message.trim() || "None"}`,
      ].join("\n");
      const subject = `Hotel enquiry from ${form.name.trim()}`;
      window.location.href = `mailto:info@hotelorchidbodhgaya.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSent(true);
    }
  }

  return (
    <form className={compact ? "contact-form" : "enquiry-card"} onSubmit={submit} noValidate>
      {!compact && (
        <>
          <h2>Enquire Now</h2>
          <p>Book your stay or send an enquiry.<br />We&apos;ll get back to you shortly.</p>
        </>
      )}
      {compact && <h3>Send Us an Enquiry</h3>}
      {sent && <div className="success" role="status">Your email app is ready with the enquiry. Review it and press Send to complete your request.</div>}
      {errors.length > 0 && (
        <div className="form-error" role="alert" style={{ marginBottom: 8 }}>
          {errors[0]}
        </div>
      )}
      <div className="form-grid" style={{ marginTop: sent ? 10 : 0 }}>
        <div className="field">
          <label htmlFor={`${compact ? "contact" : "hero"}-name`}>Full Name <span className="required-mark">*</span></label>
          <div className="input-with-icon">
            <UserRound aria-hidden="true" size={17} />
            <input id={`${compact ? "contact" : "hero"}-name`} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter your name" autoComplete="name" />
          </div>
        </div>
        {compact && (
          <div className="field">
            <label htmlFor="contact-email">Email Address</label>
            <input id="contact-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter your email" autoComplete="email" />
          </div>
        )}
        <div className="field">
          <label htmlFor={`${compact ? "contact" : "hero"}-mobile`}>{compact ? "Phone Number" : "Mobile Number"} <span className="required-mark">*</span></label>
          <div className="input-with-icon">
            <Phone aria-hidden="true" size={17} />
            <input id={`${compact ? "contact" : "hero"}-mobile`} value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="Enter mobile number" inputMode="tel" autoComplete="tel" />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor={`${compact ? "contact" : "hero"}-checkin`}>Check-in Date <span className="required-mark">*</span></label>
            <input id={`${compact ? "contact" : "hero"}-checkin`} type="date" value={form.checkIn} onChange={(e) => update("checkIn", e.target.value)} />
          </div>
          {!compact && <div className="field">
            <label htmlFor={`${compact ? "contact" : "hero"}-checkout`}>Check-out Date <span className="required-mark">*</span></label>
            <input id={`${compact ? "contact" : "hero"}-checkout`} type="date" value={form.checkOut} onChange={(e) => update("checkOut", e.target.value)} />
          </div>}
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor={`${compact ? "contact" : "hero"}-guests`}>Number of Guests <span className="required-mark">*</span></label>
            <select id={`${compact ? "contact" : "hero"}-guests`} value={form.guests} onChange={(e) => update("guests", e.target.value)}>
              <option value="">Select guests</option>
              <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>5+ Guests</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${compact ? "contact" : "hero"}-room`}>Room Type</label>
            <select id={`${compact ? "contact" : "hero"}-room`} value={form.room} onChange={(e) => update("room", e.target.value)}>
              <option value="">Select room type</option>
              {rooms.map((room) => <option key={room.name}>{room.name}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor={`${compact ? "contact" : "hero"}-message`}>Message (Optional)</label>
          <textarea id={`${compact ? "contact" : "hero"}-message`} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any special request?" />
        </div>
        <button className="gold-btn form-submit" type="submit">
          <Send size={13} /> {compact ? "Submit Enquiry" : "Send Enquiry"} <ArrowRight size={13} />
        </button>
      </div>
    </form>
  );
}

export default function HotelHomepage() {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [roomOpen, setRoomOpen] = useState<number | null>(null);

  useEffect(() => {
    if (galleryOpen === null && roomOpen === null) return;
    function handleModalKeys(event: KeyboardEvent) {
      if (event.key === "Escape") { setGalleryOpen(null); setRoomOpen(null); }
      if (galleryOpen !== null && event.key === "ArrowRight") setGalleryOpen((current) => current === null ? null : (current + 1) % galleryImages.length);
      if (galleryOpen !== null && event.key === "ArrowLeft") setGalleryOpen((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
    }
    window.addEventListener("keydown", handleModalKeys);
    return () => window.removeEventListener("keydown", handleModalKeys);
  }, [galleryOpen, roomOpen]);

  return (
    <main>
      <section id="home" className="hero">
        <Image className="hero-bg-image" src={images.hero} alt="" fill priority sizes="100vw" aria-hidden="true" />
        <div className="hero-bg-overlay" aria-hidden="true" />
        <div className="container hero-main">
          <div className="hero-left">
            <div className="hero-copy">
              <div className="eyebrow">A PEACEFUL STAY NEAR MAHABODHI TEMPLE</div>
              <h1 className="hero-title">A Spiritual Journey<br />with Modern Comfort<br /><span>in Bodhgaya</span></h1>
              <p className="hero-desc">Experience warm hospitality, elegant rooms and a peaceful atmosphere near the sacred Mahabodhi Temple.</p>
              <div className="hero-actions">
                <a className="gold-btn" href="#rooms">EXPLORE ROOMS <ArrowRight size={13} /></a>
                <a className="outline-btn" href="#contact">ENQUIRE NOW <ArrowRight size={13} /></a>
              </div>
            </div>
            <HeroBenefits />
          </div>
          <div className="hero-form-wrap">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="section compact location">
        <span className="decor left location-floral" aria-hidden="true" />
        <span className="decor right location-floral" aria-hidden="true" />
        <div className="container">
          <div className="location-head">
            <h2 className="section-title">Perfectly Located for Your Convenience</h2>
            <p className="section-subtitle">Easy access to major attractions and transport hubs from Bodh Gaya.</p>
          </div>
          <div className="location-grid">
            {locationCards.map((item) => (
              <div className="location-card" key={item.title}>
                <div className="location-icon" aria-hidden="true"><item.icon size={43} strokeWidth={2.2} /></div>
                <div className="location-card-copy">
                  <h3>{item.title} {item.descriptor && <span>{item.descriptor}</span>}</h3>
                  <b className={item.pin ? "has-pin" : ""}>{item.distance}</b>
                  <p className={"location-detail" + (item.pin ? " has-pin" : "")}>{item.detail}</p>
                </div>
                <ChevronRight className="location-arrow" size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream" id="attractions">
        <span className="decor left" aria-hidden="true">❧</span><span className="decor right" aria-hidden="true">❧</span>
        <div className="container">
          <div className="section-head-row">
            <div className="reference-section-heading">
              <h2 className="section-title">Explore Bodhgaya</h2>
              <p className="section-subtitle">Spiritual Destinations &amp; Tourist Attractions</p>
            </div>
            <a className="small-gold-btn attractions-cta" href="https://www.google.com/maps/search/?api=1&query=Bodhgaya+tourist+attractions" target="_blank" rel="noreferrer">View All Places <ArrowRight size={12} /></a>
          </div>
          <div className="attractions-scroll">
            {attractions.map(([name, distance, desc], i) => (
              <article className="attraction-card" key={name}>
                <div className="attraction-image"><Image src={attractionImages[i]} alt={name} width={300} height={220} /></div>
                <div className="attraction-info">
                  <h3>{name}</h3>
                  <div className="attraction-distance"><MapPin size={10} /> {distance}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section rooms" id="rooms">
        <div className="container">
          <div className="section-head-row rooms-head">
            <div className="reference-section-heading">
              <h2 className="section-title">Our Rooms</h2>
              <p className="section-subtitle">Spacious, elegant and well-equipped rooms for a relaxing stay in Bodhgaya.</p>
            </div>
            <div className="rooms-heading-actions">
              <a className="small-gold-btn" href="#contact">View All Rooms <ArrowRight size={12} /></a>
              <button className="round-arrow previous" type="button" aria-label="Previous rooms"><ChevronLeft size={16} /></button>
              <button className="round-arrow next" type="button" aria-label="Next rooms"><ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="rooms-grid">
            {rooms.map((room, i) => (
              <article className="room-card" key={room.name}>
                <div className="room-img"><Image src={images[room.image as keyof typeof images]} alt={`Illustrative ${room.name.toLowerCase()} interior`} width={650} height={420} /></div>
                <div className="room-body">
                  <h3 className="room-name">{room.name}</h3>
                  <div className="room-meta"><span><CircleUserRound size={11} /> {room.guests}</span><span><BedDouble size={11} /> {room.bed}</span></div>
                  <div className="amenities">{room.amenities.map((a) => <span className="amenity" key={a}><Check size={9} style={{display:"inline"}} /> {a}</span>)}</div>
                  <div className="room-bottom">
                    <div className="room-price">{room.price} <small>/ night</small></div>
                    <button className="small-gold-btn" onClick={() => setRoomOpen(i)}>View Details <ArrowRight size={11} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <span className="decor right">❧</span>
        <div className="container about-grid">
          <div className="about-image">
            <Image src={images.lobby} alt="Warmly lit hotel lobby inspiration" fill sizes="(max-width: 900px) 100vw, 60vw" />
            <span className="about-tour"><span className="tour-play">▶</span> Watch Our Hotel Tour</span>
          </div>
          <div className="about-copy">
            <SectionHeading eyebrow="ABOUT HOTEL ORCHID" title="Hospitality Rooted in Peace" />
            <p>Hotel Orchid Bodhgaya offers a perfect blend of modern comfort and traditional hospitality. Located close to the sacred Mahabodhi Temple, we provide a serene and welcoming stay for pilgrims, families and travellers from around the world.</p>
            <div className="about-features">
              {[
                [BedDouble, "Comfortable Rooms", "Comfortable Rooms"],
                [UtensilsCrossed, "Multi-Cuisine Dining", "Multi-Cuisine Dining"],
                [Clock3, "24/7 Guest Support", "24/7 Guest Support"],
                [Car, "Easy Access to Local Travel", "Easy Access to Local Travel"],
              ].map(([Icon, title, sub]) => (
                <div className="about-feature" key={title as string}>
                  <Icon className="about-feature-icon" size={20} />
                  <div><strong>{title as string}</strong><span>{sub as string}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section gallery" id="gallery">
        <div className="container">
          <div className="section-head-row">
              <div className="reference-section-heading">
                <h2 className="section-title">Our Gallery</h2>
                <p className="section-subtitle">Take a glimpse of our property, rooms, dining and the beautiful surroundings.</p>
              </div>
            <button className="small-gold-btn gallery-cta" onClick={() => setGalleryOpen(0)}>View Full Gallery <ArrowRight size={12} /></button>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((src, i) => (
              <button className="gallery-item" key={src} onClick={() => setGalleryOpen(i)} aria-label={`Open gallery image ${i + 1}`}>
                <Image src={src} alt={`Hotel and Bodh Gaya travel inspiration ${i + 1}`} width={900} height={600} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials">
        <div className="container">
          <div className="section-head-row reviews-heading">
            <div className="reference-section-heading">
              <h2 className="section-title">What Our Guests Say</h2>
              <p className="section-subtitle">Real experiences from our valued guests.</p>
            </div>
            <div className="review-arrows"><button aria-label="Previous guest reviews"><ChevronLeft size={16} /></button><button aria-label="Next guest reviews"><ArrowRight size={16} /></button></div>
          </div>
          <div className="testimonial-grid guest-review-grid">
            {guestReviews.map((review) => (
              <article className="testimonial guest-review" key={review.name}>
                <div className="guest-review-head">
                  <Image src={review.avatar} alt="" width={58} height={58} />
                  <div><strong>{review.name}</strong><span>{review.place}</span><div className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</div></div>
                </div>
                <p>{review.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section travel">
        <span className="decor left">❧</span><span className="decor right">❧</span>
        <div className="container travel-layout">
          <div className="travel-temple" aria-hidden="true"><Image src={images.temple} alt="" fill sizes="300px" /></div>
          <div className="travel-content">
          <div className="section-head-row">
            <div className="reference-section-heading"><h2 className="section-title">Plan Your Bodhgaya Journey</h2><p className="section-subtitle">Spiritual highlights, local sightseeing and travel information.</p></div>
            <a className="small-gold-btn attractions-cta" href="#attractions">Explore All Attractions <ArrowRight size={12} /></a>
          </div>
          <div className="travel-grid">
            {[
              [Landmark, "Spiritual Highlights", ["Mahabodhi Temple", "80 Feet Buddha", "Thai Temple", "Japanese Temple"]],
              [Compass, "Local Sightseeing", ["Dungeshwari Cave", "Sujata Stupa", "Muchalinda Sarovar", "Vishnupad Temple"]],
              [Plane, "Airport & Railway", ["Gaya International Airport • ~ 7–11 km", "Gaya Junction • ~ 15–20 km", "Patna Airport • ~ 135 km"]],
              [Car, "Local Transport", ["Taxis & Cabs", "Auto Rickshaws", "Local Sightseeing Tours", "Easy connectivity to nearby places"]],
            ].map(([Icon, title, list]) => {
              const TravelIcon = Icon as LucideIcon;
              return (
                <article className="travel-card" key={title as string}>
                  <TravelIcon className="travel-icon" size={24} />
                  <h3>{title as string}</h3>
                  <ul>{(list as string[]).map((item) => <li key={item}><Check size={11} />{item}</li>)}</ul>
                </article>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <div className="contact-heading">
              <h2>Get In Touch</h2>
              <h3>We’d Love to Hear From You</h3>
              <p>Have a question or want to make a booking?<br />Send us a message and we’ll get back to you soon.</p>
            </div>
            <div className="contact-list" style={{marginTop:22}}>
              <div className="contact-item"><Phone size={18} /><div><strong><a href="tel:+919876543210">+91 98765 43210</a></strong><span>Available 24/7</span></div></div>
              <div className="contact-item"><MapPin size={18} /><div><strong>Near Mahabodhi Temple</strong><span>Bodh Gaya, Bihar – 824231, India</span></div></div>
              <div className="contact-item"><Globe2 size={18} /><div><strong><a href="mailto:info@hotelorchidbodhgaya.com">info@hotelorchidbodhgaya.com</a></strong><span>Send us a message</span></div></div>
            </div>
          </div>
          <EnquiryForm compact />
          <a className="map" href="https://www.google.com/maps/search/?api=1&query=Hotel+Orchid+Bodhgaya" target="_blank" rel="noreferrer" aria-label="Open Hotel Orchid Bodhgaya in Google Maps">
            <iframe title="Map showing Hotel Orchid Bodhgaya" src="https://maps.google.com/maps?q=Hotel%20Orchid%20Bodhgaya&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" />
            <span className="map-marker"><MapPin size={27} fill="currentColor" /><b>Hotel Orchid Bodhgaya</b><small>Near Mahabodhi Temple</small></span>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-main">
          <div>
            <Logo />
            <p className="footer-desc">A perfect blend of modern comfort and traditional hospitality near the sacred Mahabodhi Temple.</p>
            <div className="footer-socials"><a href="#contact" aria-label="Facebook"><Facebook size={15} /></a><a href="#contact" aria-label="Instagram"><Instagram size={15} /></a><a href="#contact" aria-label="YouTube"><Youtube size={15} /></a><a href="#contact" aria-label="WhatsApp"><Phone size={15} /></a></div>
          </div>
          <div><h4>Quick Links</h4><div className="footer-links">{navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div></div>
          <div><h4>Our Services</h4><div className="footer-links"><span>Comfortable Rooms</span><span>Multi-Cuisine Restaurant</span><span>Travel Assistance</span><span>24/7 Guest Support</span></div></div>
          <div><h4>Nearby Places</h4><div className="footer-links"><span>Mahabodhi Temple</span><span>80 Feet Buddha</span><span>Thai Temple</span><span>Japanese Temple</span><span>Dungeshwari Cave</span></div></div>
          <div className="footer-contact-info"><h4>Contact Info</h4><div className="footer-links"><span><MapPin size={13} /> Near Mahabodhi Temple,<br />Bodh Gaya, Bihar – 824231, India</span><a href="tel:+919876543210"><Phone size={13} /> +91 98765 43210</a><a href="mailto:info@hotelorchidbodhgaya.com"><Globe2 size={13} /> info@hotelorchidbodhgaya.com</a></div></div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Hotel Orchid Bodhgaya. All Rights Reserved.</span>
          <span>Hospitality with heart in Bodh Gaya</span>
        </div>
      </footer>

      
        {galleryOpen !== null && (
          <div className="modal-backdrop" onClick={() => setGalleryOpen(null)}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="gallery-dialog-title" onClick={(e) => e.stopPropagation()}>
              <h2 id="gallery-dialog-title" className="visually-hidden">Photo gallery</h2>
              <button className="modal-close" onClick={() => setGalleryOpen(null)} aria-label="Close gallery"><X size={19} /></button>
              <button className="modal-nav modal-prev" onClick={() => setGalleryOpen((current) => current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length)} aria-label="Previous photo">‹</button>
              <Image src={galleryImages[galleryOpen]} alt={`Hotel and Bodh Gaya travel inspiration ${galleryOpen + 1}`} width={1400} height={900} />
              <button className="modal-nav modal-next" onClick={() => setGalleryOpen((current) => current === null ? 0 : (current + 1) % galleryImages.length)} aria-label="Next photo">›</button>
            </div>
          </div>
        )}
        {roomOpen !== null && (
          <div className="modal-backdrop" onClick={() => setRoomOpen(null)}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="room-dialog-title" style={{maxWidth:620}} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setRoomOpen(null)} aria-label="Close room details"><X size={19} /></button>
              <Image src={images[rooms[roomOpen].image as keyof typeof images]} alt={`Illustrative ${rooms[roomOpen].name.toLowerCase()} interior`} width={1100} height={700} />
              <div className="room-modal-content">
                <h3 id="room-dialog-title">{rooms[roomOpen].name}</h3>
                <p>{rooms[roomOpen].guests} · {rooms[roomOpen].bed} · {rooms[roomOpen].amenities.join(" · ")}. A calm, thoughtfully appointed room designed for a comfortable Bodhgaya stay.</p>
                <a href="#contact" className="gold-btn" onClick={() => setRoomOpen(null)} style={{marginTop:12}}>ENQUIRE ABOUT THIS ROOM <ArrowRight size={13}/></a>
              </div>
            </div>
          </div>
        )}
      
    </main>
  );
}
