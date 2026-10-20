"use client";

import Link from "next/link";

import Image from "next/image";

import { FormEvent, useEffect, useState } from "react";

import {
  ArrowRight,
  BedDouble,
  Building2,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Compass,
  Facebook,
  Globe2,
  HeartHandshake,
  Instagram,
  Landmark,
  MapPin,
  Phone,
  Plane,
  Star,
  TrainFront,
  UtensilsCrossed,
  X,
  Send,
  UserRound,
  UserPlus,
  Youtube,
  Coffee,
  ShieldCheck,
  Globe,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { images, attractionImages } from "@/lib/images";

import { attractions } from "@/lib/constants";

import HeroBenefits from "@/components/HeroBenefits";

const navItems = [
  ["Home", "/#home"],

  ["Rooms", "/rooms"],

  ["Gallery", "/gallery"],

  ["About Us", "/#about"],

  ["Contact Us", "/#contact"],
];

// Room Tariff Data matching the official rate card

const roomTariffData = [
  {
    name: "Deluxe Double (A/C)",

    noMeals: 1800,

    breakfast: 2000,

    extraPax: 500,

    guests: "2 Guests",

    bed: "1 King / Double Bed",

    amenities: [
      "Air Conditioning",

      "Free High-Speed Wi-Fi",

      "LED TV",

      "Room Service",

      "En-suite Bathroom",
    ],

    image: "deluxe",

    tag: "Popular Choice",

    description:
      "Designed for couples or solo travelers seeking modern comfort, generous ambient lighting, and quiet relaxation after visiting Bodhgaya's sacred sites.",
  },

  {
    name: "Deluxe Triple (A/C)",

    noMeals: 2200,

    breakfast: 2500,

    extraPax: 500,

    guests: "3 Guests",

    bed: "1 Double + 1 Single Bed",

    amenities: [
      "Air Conditioning",

      "Free High-Speed Wi-Fi",

      "Spacious Layout",

      "Room Service",

      "En-suite Bathroom",
    ],

    image: "suite",

    tag: "Spacious Family Room",

    description:
      "Extra spacious accommodation tailored for families and small pilgrim groups, featuring comfortable dual beds, air conditioning, and full hospitality amenities.",
  },

  {
    name: "Standard (Non A/C)",

    noMeals: 1500,

    breakfast: 1700,

    extraPax: 500,

    guests: "2 Guests",

    bed: "1 Double Bed",

    amenities: [
      "Ceiling Fan Cooling",

      "Free High-Speed Wi-Fi",

      "LED TV",

      "Daily Housekeeping",

      "En-suite Bathroom",
    ],

    image: "standard",

    tag: "Budget Friendly",

    description:
      "A peaceful, clean, and economical choice offering essential comforts, comfortable bedding, and quick access to the Mahabodhi Temple complex.",
  },
];

type EnquiryState = {
  name: string;

  email: string;

  mobile: string;

  checkIn: string;

  checkOut: string;

  guests: string;

  room: string;

  message: string;
};

const emptyForm: EnquiryState = {
  name: "",

  email: "",

  mobile: "",

  checkIn: "",

  checkOut: "",

  guests: "",

  room: "",

  message: "",
};

const locationCards = [
  {
    title: "Mahabodhi Temple",

    descriptor: "",

    distance: "Main attraction in Bodh Gaya",

    detail: "Central Location",

    icon: Landmark,

    pin: true,
  },

  {
    title: "Gaya International Airport",

    descriptor: "",

    distance: "Approx. 9 – 12 km",

    detail: "Depending on reference point",

    icon: Plane,

    pin: true,
  },

  {
    title: "Gaya Junction",

    descriptor: "(Railway Station)",

    distance: "Approx. 15 – 25 km",

    detail: "from Bodh Gaya",

    icon: TrainFront,

    pin: true,
  },

  {
    title: "Patna Airport",

    descriptor: "",

    distance: "Approx. 120 km",

    detail: "from Bodh Gaya",

    icon: Globe,

    pin: true,
  },
];

const guestReviews = [
  {
    name: "Rohit Sharma",

    place: "Delhi, India",

    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",

    quote:
      "“Excellent stay at Hotel Orchid. Very clean rooms, polite staff and great location near Mahabodhi Temple. Highly recommended!”",
  },

  {
    name: "Priya Mehta",

    place: "Mumbai, India",

    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",

    quote:
      "“Beautiful property with amazing hospitality. Rooms are spacious and well-maintained. Food was also delicious.”",
  },

  {
    name: "David Lee",

    place: "Singapore",

    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80",

    quote:
      "“Perfect place for a peaceful stay in Bodhgaya. The staff is very helpful and the ambience is truly relaxing. Will visit again!”",
  },
];

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

function SectionHeading({
  eyebrow,

  title,

  subtitle,

  centered = false,
}: {
  eyebrow: string;

  title: string;

  subtitle?: string;

  centered?: boolean;
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

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.push("Enter a valid email address.");

    if (!/^[0-9+\-\s]{10,15}$/.test(form.mobile.trim()))
      next.push("Enter a valid mobile number.");

    if (!form.checkIn) next.push("Check-in date is required.");

    if (!compact && !form.checkOut) next.push("Check-out date is required.");

    if (!form.guests) next.push("Please select number of guests.");

    if (
      !compact &&
      form.checkIn &&
      form.checkOut &&
      form.checkOut < form.checkIn
    )
      next.push("Check-out must be after check-in.");

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
    <form
      className={compact ? "contact-form" : "enquiry-card"}
      onSubmit={submit}
      noValidate
    >
      {!compact && (
        <>
          <h2>Enquire Now</h2>

          <p>
            Book your stay or send an enquiry.
            <br />
            We&apos;ll get back to you shortly.
          </p>
        </>
      )}

      {compact && <h3>Send Us an Enquiry</h3>}

      {sent && (
        <div className="success" role="status">
          Your email app is ready with the enquiry. Review it and press Send to
          complete your request.
        </div>
      )}

      {errors.length > 0 && (
        <div className="form-error" role="alert" style={{ marginBottom: 8 }}>
          {errors[0]}
        </div>
      )}

      <div className="form-grid" style={{ marginTop: sent ? 10 : 0 }}>
        <div className="field">
          <label htmlFor={`${compact ? "contact" : "hero"}-name`}>
            Full Name <span className="required-mark">*</span>
          </label>

          <div className="input-with-icon">
            <UserRound aria-hidden="true" size={17} />

            <input
              id={`${compact ? "contact" : "hero"}-name`}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor={`${compact ? "contact" : "hero"}-email`}>
            Email Address
          </label>

          <div className="input-with-icon">
            <Globe2 aria-hidden="true" size={17} />

            <input
              id={`${compact ? "contact" : "hero"}-email`}
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor={`${compact ? "contact" : "hero"}-mobile`}>
            {compact ? "Phone Number" : "Mobile Number"}{" "}
            <span className="required-mark">*</span>
          </label>

          <div className="input-with-icon">
            <Phone aria-hidden="true" size={17} />

            <input
              id={`${compact ? "contact" : "hero"}-mobile`}
              value={form.mobile}
              onChange={(e) => update("mobile", e.target.value)}
              placeholder="Enter mobile number"
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor={`${compact ? "contact" : "hero"}-checkin`}>
              Check-in Date <span className="required-mark">*</span>
            </label>

            <input
              id={`${compact ? "contact" : "hero"}-checkin`}
              type="date"
              value={form.checkIn}
              onChange={(e) => update("checkIn", e.target.value)}
            />
          </div>

          {!compact && (
            <div className="field">
              <label htmlFor={`${compact ? "contact" : "hero"}-checkout`}>
                Check-out Date <span className="required-mark">*</span>
              </label>

              <input
                id={`${compact ? "contact" : "hero"}-checkout`}
                type="date"
                value={form.checkOut}
                onChange={(e) => update("checkOut", e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor={`${compact ? "contact" : "hero"}-guests`}>
              Number of Guests <span className="required-mark">*</span>
            </label>

            <select
              id={`${compact ? "contact" : "hero"}-guests`}
              value={form.guests}
              onChange={(e) => update("guests", e.target.value)}
            >
              <option value="">Select guests</option>

              <option>1 Guest</option>

              <option>2 Guests</option>

              <option>3 Guests</option>

              <option>4 Guests</option>

              <option>5+ Guests</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor={`${compact ? "contact" : "hero"}-room`}>
              Room Type
            </label>

            <select
              id={`${compact ? "contact" : "hero"}-room`}
              value={form.room}
              onChange={(e) => update("room", e.target.value)}
            >
              <option value="">Select room type</option>

              {roomTariffData.map((room) => (
                <option key={room.name}>{room.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor={`${compact ? "contact" : "hero"}-message`}>
            Message (Optional)
          </label>

          <textarea
            id={`${compact ? "contact" : "hero"}-message`}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Any special request?"
          />
        </div>

        <button className="gold-btn form-submit" type="submit">
          <Send size={13} /> {compact ? "Submit Enquiry" : "Send Enquiry"}{" "}
          <ArrowRight size={13} />
        </button>
      </div>
    </form>
  );
}

export default function HotelHomepage() {
  const [roomOpen, setRoomOpen] = useState<number | null>(null);

  useEffect(() => {
    if (roomOpen === null) return;

    function handleModalKeys(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setRoomOpen(null);
      }
    }

    window.addEventListener("keydown", handleModalKeys);
    return () => window.removeEventListener("keydown", handleModalKeys);
  }, [roomOpen]);

  return (
    <main>
      <section id="home" className="hero">
        <Image
          className="hero-bg-image"
          src={images.hero}
          alt="Hotel Orchid Bodhgaya exterior"
          fill
          priority
          sizes="100vw"
        />

        <div className="hero-bg-overlay" aria-hidden="true" />

        <div className="container hero-main">
          <div className="hero-left">
            <div className="hero-copy">
              <div className="eyebrow">
                A PEACEFUL STAY NEAR MAHABODHI TEMPLE
              </div>

              <h1 className="hero-title">
                A Spiritual Journey
                <br />
                with Modern Comfort
                <br />
                <span>in Bodhgaya</span>
              </h1>

              <p className="hero-desc">
                Experience warm hospitality, elegant rooms and a peaceful
                atmosphere near the sacred Mahabodhi Temple.
              </p>

              <div className="hero-actions">
                <a className="gold-btn" href="#rooms">
                  EXPLORE ROOMS <ArrowRight size={13} />
                </a>

                <a className="outline-btn" href="#contact">
                  ENQUIRE NOW <ArrowRight size={13} />
                </a>
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
            <h2 className="section-title">
              Perfectly Located for Your Convenience
            </h2>

            <p className="section-subtitle">
              Easy access to major attractions and transport hubs from Bodh
              Gaya.
            </p>
          </div>

          <div className="location-grid">
            {locationCards.map((item) => (
              <div className="location-card" key={item.title}>
                <div className="location-icon" aria-hidden="true">
                  <item.icon size={43} strokeWidth={2.2} />
                </div>

                <div className="location-card-copy">
                  <h3>
                    {item.title}{" "}
                    {item.descriptor && <span>{item.descriptor}</span>}
                  </h3>

                  <b className={item.pin ? "has-pin" : ""}>{item.distance}</b>

                  <p
                    className={"location-detail" + (item.pin ? " has-pin" : "")}
                  >
                    {item.detail}
                  </p>
                </div>

                <ChevronRight className="location-arrow" size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream" id="attractions">
        <span className="decor left" aria-hidden="true">
          ❧
        </span>

        <span className="decor right" aria-hidden="true">
          ❧
        </span>

        <div className="container">
          <div className="section-head-row">
            <div className="reference-section-heading">
              <h2 className="section-title">Explore Bodhgaya</h2>

              <p className="section-subtitle">
                Spiritual Destinations &amp; Tourist Attractions
              </p>
            </div>

            <a
              className="small-gold-btn attractions-cta"
              href="https://www.google.com/maps/search/?api=1&query=Bodhgaya+tourist+attractions"
              target="_blank"
              rel="noreferrer"
            >
              View All Places <ArrowRight size={12} />
            </a>
          </div>

          <div className="attractions-scroll">
            {attractions.map(([name, distance, desc], i) => (
              <article className="attraction-card" key={name}>
                <div className="attraction-image">
                  <Image
                    src={attractionImages[i]}
                    alt={name}
                    width={300}
                    height={220}
                  />
                </div>

                <div className="attraction-info">
                  <h3>{name}</h3>

                  <div className="attraction-distance">
                    <MapPin size={10} /> {distance}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY ALTERNATING ROOMS & TARIFF SHOWCASE */}

      <section className="section rooms" id="rooms">
        <div className="container">
          <div
            className="section-head-row rooms-head"
            style={{ marginBottom: 40, alignItems: "flex-end" }}
          >
            <div className="reference-section-heading">
              <div
                className="eyebrow"
                style={{
                  color: "#d4a373",

                  fontWeight: 700,

                  letterSpacing: "1.2px",

                  textTransform: "uppercase",

                  fontSize: "0.85rem",

                  marginBottom: 6,
                }}
              >
                Accommodation &amp; Tariff
              </div>

              <h2 className="section-title">Our Rooms &amp; Rates</h2>

              <p className="section-subtitle">
                Spacious, tranquil sanctuaries tailored for pilgrims and
                travelers with flexible meal plans.
              </p>
            </div>

            <div
              style={{
                display: "inline-flex",

                alignItems: "center",

                flexWrap: "wrap",

                gap: 12,
              }}
            >
              <div
                style={{
                  display: "inline-flex",

                  alignItems: "center",

                  gap: 8,

                  backgroundColor: "#f4f6f9",

                  padding: "8px 16px",

                  borderRadius: 30,

                  border: "1px solid #e2e8f0",

                  fontSize: "0.82rem",

                  color: "#0c2340",

                  fontWeight: 600,
                }}
              >
                <Clock3 size={15} color="#b87d28" />

                <span>
                  Check-out Time: <strong>12:00 PM</strong>
                </span>
              </div>

              <div
                style={{
                  display: "inline-flex",

                  alignItems: "center",

                  gap: 8,

                  backgroundColor: "#fdf8ee",

                  padding: "8px 16px",

                  borderRadius: 30,

                  border: "1px solid #fae6c6",

                  fontSize: "0.82rem",

                  color: "#b87d28",

                  fontWeight: 600,
                }}
              >
                <UserPlus size={15} color="#b87d28" />

                <span>
                  Extra Pax: <strong>₹500</strong> / night
                </span>
              </div>
            </div>
          </div>

          {/* Alternating Left-Right-Left Showcase */}

          <div
            style={{ display: "flex", flexDirection: "column", gap: "36px" }}
          >
            {roomTariffData.map((room, i) => {
              const isEven = i % 2 === 1; // 0: Left, 1: Right, 2: Left

              return (
                <article
                  key={room.name}
                  style={{
                    backgroundColor: "#ffffff",

                    borderRadius: 16,

                    border: "1px solid #e8ecf2",

                    boxShadow: "0 8px 30px rgba(12, 35, 64, 0.05)",

                    overflow: "hidden",

                    display: "flex",

                    flexDirection: isEven ? "row-reverse" : "row",

                    flexWrap: "wrap",

                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  {/* Image Column */}

                  <div
                    style={{
                      flex: "1 1 420px",

                      position: "relative",

                      minHeight: "340px",

                      backgroundColor: "#1a2536",
                    }}
                  >
                    <Image
                      src={
                        images[room.image as keyof typeof images] ||
                        images.bedroom1 ||
                        images.hero
                      }
                      alt={room.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />

                    <div
                      style={{
                        position: "absolute",

                        inset: 0,

                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)",
                      }}
                    />

                    {room.tag && (
                      <span
                        style={{
                          position: "absolute",

                          top: 18,

                          left: isEven ? "auto" : 18,

                          right: isEven ? 18 : "auto",

                          backgroundColor: "rgba(12, 35, 64, 0.9)",

                          backdropFilter: "blur(4px)",

                          color: "#f6cf7d",

                          fontSize: "0.75rem",

                          fontWeight: 700,

                          padding: "5px 12px",

                          borderRadius: 6,

                          letterSpacing: "0.6px",

                          border: "1px solid rgba(246, 207, 125, 0.35)",

                          textTransform: "uppercase",
                        }}
                      >
                        {room.tag}
                      </span>
                    )}

                    <div
                      style={{
                        position: "absolute",

                        bottom: 16,

                        left: 18,

                        right: 18,

                        color: "#ffffff",

                        display: "flex",

                        flexWrap: "wrap",

                        gap: 16,

                        fontSize: "0.82rem",

                        fontWeight: 500,

                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",

                          alignItems: "center",

                          gap: 6,
                        }}
                      >
                        <CircleUserRound size={14} color="#f6cf7d" />{" "}
                        {room.guests}
                      </span>

                      <span
                        style={{
                          display: "inline-flex",

                          alignItems: "center",

                          gap: 6,
                        }}
                      >
                        <BedDouble size={14} color="#f6cf7d" /> {room.bed}
                      </span>

                      <span
                        style={{
                          display: "inline-flex",

                          alignItems: "center",

                          gap: 6,
                        }}
                      >
                        <UserPlus size={14} color="#f6cf7d" /> Extra Pax: ₹
                        {room.extraPax}
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}

                  <div
                    style={{
                      flex: "1 1 440px",

                      padding: "32px 36px",

                      display: "flex",

                      flexDirection: "column",

                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",

                          justifyContent: "space-between",

                          alignItems: "flex-start",

                          gap: 12,
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontSize: "0.75rem",

                              textTransform: "uppercase",

                              letterSpacing: "1px",

                              color: "#b87d28",

                              fontWeight: 700,
                            }}
                          >
                            Category {i + 1}
                          </span>

                          <h3
                            style={{
                              fontSize: "1.5rem",

                              color: "#0c2340",

                              margin: "4px 0 10px",

                              fontWeight: 700,
                            }}
                          >
                            {room.name}
                          </h3>
                        </div>
                      </div>

                      <p
                        style={{
                          color: "#556377",

                          fontSize: "0.92rem",

                          lineHeight: 1.6,

                          margin: "0 0 18px",
                        }}
                      >
                        {room.description}
                      </p>

                      {/* Amenities Pills */}

                      <div
                        style={{
                          display: "flex",

                          flexWrap: "wrap",

                          gap: "8px",

                          marginBottom: 22,
                        }}
                      >
                        {room.amenities.map((a) => (
                          <span
                            key={a}
                            style={{
                              display: "inline-flex",

                              alignItems: "center",

                              gap: 5,

                              backgroundColor: "#f8fafc",

                              border: "1px solid #e2e8f0",

                              color: "#334155",

                              fontSize: "0.78rem",

                              padding: "4px 10px",

                              borderRadius: 6,

                              fontWeight: 500,
                            }}
                          >
                            <Check size={11} color="#b87d28" /> {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Integrated Official Rates (Dual Pricing: No Meals vs Breakfast) */}

                    <div>
                      <div
                        style={{
                          backgroundColor: "#fdfbf7",

                          borderRadius: 12,

                          border: "1px solid #fae6c6",

                          padding: "16px 20px",

                          display: "grid",

                          gridTemplateColumns: "1fr 1fr",

                          gap: 16,

                          marginBottom: 14,
                        }}
                      >
                        <div
                          style={{
                            borderRight: "1px solid #f2dec0",

                            paddingRight: 12,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.72rem",

                              textTransform: "uppercase",

                              letterSpacing: "0.6px",

                              color: "#64748b",

                              fontWeight: 600,

                              display: "block",

                              marginBottom: 2,
                            }}
                          >
                            No Meals Plan
                          </span>

                          <div
                            style={{
                              display: "flex",

                              alignItems: "baseline",

                              gap: 4,
                            }}
                          >
                            <strong
                              style={{
                                fontSize: "1.45rem",

                                color: "#0c2340",

                                fontWeight: 800,
                              }}
                            >
                              ₹{room.noMeals.toLocaleString()}
                            </strong>

                            <span
                              style={{ fontSize: "0.75rem", color: "#888" }}
                            >
                              / night
                            </span>
                          </div>

                          <span
                            style={{ fontSize: "0.7rem", color: "#94a3b8" }}
                          >
                            Standard Room Only
                          </span>
                        </div>

                        <div style={{ paddingLeft: 6 }}>
                          <span
                            style={{
                              fontSize: "0.72rem",

                              textTransform: "uppercase",

                              letterSpacing: "0.6px",

                              color: "#b87d28",

                              fontWeight: 700,

                              display: "inline-flex",

                              alignItems: "center",

                              gap: 4,

                              marginBottom: 2,
                            }}
                          >
                            <Coffee size={12} /> With Breakfast
                          </span>

                          <div
                            style={{
                              display: "flex",

                              alignItems: "baseline",

                              gap: 4,
                            }}
                          >
                            <strong
                              style={{
                                fontSize: "1.45rem",

                                color: "#b87d28",

                                fontWeight: 800,
                              }}
                            >
                              ₹{room.breakfast.toLocaleString()}
                            </strong>

                            <span
                              style={{ fontSize: "0.75rem", color: "#888" }}
                            >
                              / night
                            </span>
                          </div>

                          <span
                            style={{ fontSize: "0.7rem", color: "#b87d28" }}
                          >
                            Inclusive of Breakfast
                          </span>
                        </div>
                      </div>

                      {/* Extra Pax Note */}

                      <div
                        style={{
                          display: "inline-flex",

                          alignItems: "center",

                          gap: 6,

                          fontSize: "0.78rem",

                          color: "#475569",

                          backgroundColor: "#f8fafc",

                          border: "1px dashed #cbd5e1",

                          borderRadius: 6,

                          padding: "6px 12px",

                          marginBottom: 16,
                        }}
                      >
                        <UserPlus size={13} color="#b87d28" />

                        <span>
                          Extra Person / Bed:{" "}
                          <strong style={{ color: "#0c2340" }}>
                            ₹{room.extraPax.toLocaleString()}
                          </strong>{" "}
                          / night
                        </span>
                      </div>

                      {/* Card Actions & Official Fine Print */}

                      <div
                        style={{
                          display: "flex",

                          justifyContent: "space-between",

                          alignItems: "center",

                          flexWrap: "wrap",

                          gap: 12,
                        }}
                      >
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          <span># Taxes as applicable</span>

                          <span style={{ margin: "0 6px" }}>·</span>

                          <span>* Rates subjected to revision</span>
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                          <button
                            className="outline-btn"
                            type="button"
                            onClick={() => setRoomOpen(i)}
                            style={{
                              padding: "8px 14px",

                              fontSize: "0.8rem",

                              height: "auto",
                            }}
                          >
                            Details
                          </button>

                          <a
                            href="#contact"
                            className="gold-btn"
                            style={{
                              padding: "8px 18px",

                              fontSize: "0.8rem",

                              height: "auto",

                              textDecoration: "none",
                            }}
                          >
                            Enquire Now <ArrowRight size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <span className="decor right">❧</span>

        <div className="container about-grid">
          <div className="about-image">
            <Image
              src={images.lobby}
              alt="Warmly lit hotel lobby inspiration"
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
            />

            <span className="about-tour">
              <span className="tour-play">▶</span> Watch Our Hotel Tour
            </span>
          </div>

          <div className="about-copy">
            <SectionHeading
              eyebrow="ABOUT HOTEL ORCHID"
              title="Hospitality Rooted in Peace"
            />

            <p>
              Hotel Orchid Bodhgaya offers a perfect blend of modern comfort and
              traditional hospitality. Located close to the sacred Mahabodhi
              Temple, we provide a serene and welcoming stay for pilgrims,
              families and travellers from around the world.
            </p>

            <div className="about-features">
              {[
                [
                  BedDouble,

                  "Comfortable Rooms",

                  "Spacious A/C and Non-A/C choices",
                ],

                [
                  UtensilsCrossed,

                  "Multi-Cuisine Dining",

                  "Fresh meals & wholesome breakfast",
                ],

                [
                  Clock3,

                  "24/7 Guest Support",

                  "Prompt desk & round-the-clock service",
                ],

                [
                  Car,

                  "Easy Access to Local Travel",

                  "Temple connectivity & cab assistance",
                ],
              ].map(([Icon, title, sub]) => (
                <div className="about-feature" key={title as string}>
                  <Icon className="about-feature-icon" size={20} />

                  <div>
                    <strong>{title as string}</strong>

                    <span>{sub as string}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section home-gallery-preview" id="gallery">
        <div className="container">
          <div className="section-head-row home-gallery-preview-heading">
            <div className="reference-section-heading">
              <div className="eyebrow">A CLOSER LOOK AT HOTEL ORCHID</div>
              <h2 className="section-title">Explore Our Gallery</h2>
              <p className="section-subtitle">
                Discover our welcoming interiors, comfortable rooms and the
                exterior of Hotel Orchid.
              </p>
            </div>
            <Link
              href="/gallery"
              className="small-gold-btn home-gallery-full-link"
            >
              View Full Gallery <ArrowRight size={12} />
            </Link>
          </div>

          <div
            className="home-gallery-preview-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1.35fr) repeat(2, minmax(0, 1fr))",
              gridTemplateRows: "190px 160px",
              gap: "12px",
              width: "100%",
              marginTop: "22px",
            }}
          >
            {[
              {
                src: "/hotel-orchid.png",
                alt: "Exterior view of Hotel Orchid in Bodh Gaya",
                title: "Hotel Exterior",
                className: "home-gallery-preview-featured",
              },
              {
                src: "/lobby.png",
                alt: "Welcoming lobby at Hotel Orchid",
                title: "Welcoming Lobby",
                className: "",
              },
              {
                src: "/ac2.png",
                alt: "Deluxe double air-conditioned room",
                title: "Deluxe Double Room",
                className: "",
              },
              {
                src: "/corridor-1.png",
                alt: "Bright hotel corridor",
                title: "Thoughtful Interiors",
                className: "",
              },
            ].map((item) => (
              <Link
                href="/gallery"
                className={`home-gallery-preview-card ${item.className}`}
                key={item.src}
                style={{
                  position: "relative",
                  display: "block",
                  minWidth: 0,
                  minHeight: 0,
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "8px",
                  background: "#e8e0d4",
                  boxShadow: "0 7px 20px rgba(34, 25, 11, .09)",
                  gridRow: item.className.includes("featured")
                    ? "span 2"
                    : "auto",
                }}
                aria-label={`View ${item.title} in the full gallery`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
                <span className="home-gallery-preview-shade" />
                <span className="home-gallery-preview-caption">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials">
        <div className="container">
          <div className="section-head-row reviews-heading">
            <div className="reference-section-heading">
              <h2 className="section-title">What Our Guests Say</h2>

              <p className="section-subtitle">
                Real experiences from our valued guests.
              </p>
            </div>

            <div className="review-arrows">
              <button aria-label="Previous guest reviews">
                <ChevronLeft size={16} />
              </button>

              <button aria-label="Next guest reviews">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="testimonial-grid guest-review-grid">
            {guestReviews.map((review) => (
              <article className="testimonial guest-review" key={review.name}>
                <div className="guest-review-head">
                  <Image src={review.avatar} alt="" width={58} height={58} />

                  <div>
                    <strong>{review.name}</strong>

                    <span>{review.place}</span>

                    <div className="review-stars" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                <p>{review.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section travel">
        <span className="decor left">❧</span>

        <span className="decor right">❧</span>

        <div className="container travel-layout">
          <div className="travel-temple" aria-hidden="true">
            <Image src={images.temple} alt="" fill sizes="300px" />
          </div>

          <div className="travel-content">
            <div className="section-head-row">
              <div className="reference-section-heading">
                <h2 className="section-title">Plan Your Bodhgaya Journey</h2>

                <p className="section-subtitle">
                  Spiritual highlights, local sightseeing and travel
                  information.
                </p>
              </div>

              <a className="small-gold-btn attractions-cta" href="#attractions">
                Explore All Attractions <ArrowRight size={12} />
              </a>
            </div>

            <div className="travel-grid">
              {[
                [
                  Landmark,

                  "Spiritual Highlights",

                  [
                    "Mahabodhi Temple",

                    "80 Feet Buddha",

                    "Thai Temple",

                    "The Royal Bhutanese Monastery Bodh Gaya",
                  ],
                ],

                [
                  Compass,

                  "Local Sightseeing",

                  [
                    "Dungeshwari Cave",

                    "Sujata Stupa",

                    "Metta Buddharam Temple",

                    "Vishnupad Temple",
                  ],
                ],

                [
                  Plane,

                  "Airport & Railway",

                  [
                    "Gaya International Airport • ~ 7–11 km",

                    "Gaya Junction • ~ 15–20 km",

                    "Patna Airport • ~ 135 km",
                  ],
                ],

                [
                  Car,

                  "Local Transport",

                  [
                    "Taxis & Cabs",

                    "Auto Rickshaws",

                    "Local Sightseeing Tours",

                    "Easy connectivity to nearby places",
                  ],
                ],
              ].map(([Icon, title, list]) => {
                const TravelIcon = Icon as LucideIcon;

                return (
                  <article className="travel-card" key={title as string}>
                    <TravelIcon className="travel-icon" size={24} />

                    <h3>{title as string}</h3>

                    <ul>
                      {(list as string[]).map((item) => (
                        <li key={item}>
                          <Check size={11} />

                          {item}
                        </li>
                      ))}
                    </ul>
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

              <p>
                Have a question or want to make a booking?
                <br />
                Send us a message and we’ll get back to you soon.
              </p>
            </div>

            <div className="contact-list" style={{ marginTop: 22 }}>
              <div className="contact-item">
                <Phone size={18} />

                <div>
                  <strong>
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </strong>

                  <span>Available 24/7</span>
                </div>
              </div>

              <div className="contact-item">
                <MapPin size={18} />

                <div>
                  <strong>Near Karmappa Temple, Sujata Bypass, Bodhgaya</strong>

                  <span>Bodh Gaya, Bihar – 824231, India</span>
                </div>
              </div>

              <div className="contact-item">
                <Globe2 size={18} />

                <div>
                  <strong>
                    <a href="mailto:hotelorchidbodhgaya@gmail.com">
                      hotelorchidbodhgaya@gmail.com
                    </a>
                  </strong>

                  <span>Send us a message</span>
                </div>
              </div>
            </div>
          </div>

          <EnquiryForm compact />

          <a
            className="map"
            href="https://www.google.com/maps/search/?api=1&query=Hotel+Orchid+Bodhgaya"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Hotel Orchid Bodhgaya in Google Maps"
          >
            <iframe
              title="Map showing Hotel Orchid Bodhgaya"
              src="https://maps.google.com/maps?q=Hotel%20Orchid%20Bodhgaya&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />

            <span className="map-marker">
              <MapPin size={27} fill="currentColor" />

              <b>Hotel Orchid Bodhgaya</b>

              <small>Near Mahabodhi Temple</small>
            </span>
          </a>
        </div>
      </section>

      {roomOpen !== null && (
        <div className="room-modal-backdrop" onClick={() => setRoomOpen(null)}>
          <div
            className="room-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="room-modal-close"
              onClick={() => setRoomOpen(null)}
              aria-label="Close room details"
            >
              <X size={21} />
            </button>

            <div className="room-modal-photo">
              <Image
                src={
                  images[
                    roomTariffData[roomOpen].image as keyof typeof images
                  ] ||
                  images.bedroom1 ||
                  images.hero
                }
                alt={roomTariffData[roomOpen].name}
                fill
                sizes="(max-width: 650px) 100vw, 620px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="room-modal-content">
              <span className="room-category">HOTEL ORCHID · BODHGAYA</span>

              <h2 id="room-modal-title">{roomTariffData[roomOpen].name}</h2>

              <p className="modal-description">
                {roomTariffData[roomOpen].description}
              </p>

              <div className="modal-room-facts">
                <span>
                  <CircleUserRound size={17} />

                  {roomTariffData[roomOpen].guests}
                </span>

                <span>
                  <BedDouble size={18} />

                  {roomTariffData[roomOpen].bed}
                </span>

                <span>
                  <UserPlus size={17} />
                  Extra Pax: ₹
                  {roomTariffData[roomOpen].extraPax.toLocaleString("en-IN")}
                </span>
              </div>

              <h3 className="modal-subheading">Room amenities</h3>

              <div className="modal-amenities">
                {roomTariffData[roomOpen].amenities.map((amenity) => (
                  <span key={amenity}>
                    <Check size={14} />

                    {amenity}
                  </span>
                ))}
              </div>

              <div className="modal-prices">
                <div>
                  <span>Room only</span>

                  <strong>
                    ₹{roomTariffData[roomOpen].noMeals.toLocaleString("en-IN")}
                  </strong>

                  <small>Per night</small>
                </div>

                <div>
                  <span>With breakfast</span>

                  <strong>
                    ₹
                    {roomTariffData[roomOpen].breakfast.toLocaleString("en-IN")}
                  </strong>

                  <small>Per night</small>
                </div>
              </div>

              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: 8,

                  marginTop: 14,

                  padding: "10px 14px",

                  backgroundColor: "#fcfaf6",

                  border: "1px solid #ede3d1",

                  borderRadius: 6,

                  fontSize: "0.82rem",

                  color: "#172e49",
                }}
              >
                <UserPlus size={15} color="#bd873b" />

                <span>
                  Additional Guest / Extra Bed:{" "}
                  <strong>
                    ₹{roomTariffData[roomOpen].extraPax.toLocaleString("en-IN")}
                  </strong>{" "}
                  per night
                </span>
              </div>

              <p className="modal-tax-note">
                Taxes extra, if applicable. Check-out at 12:00 PM.
              </p>

              <a
                href="#contact"
                className="modal-book-button"
                onClick={() => setRoomOpen(null)}
              >
                Enquire About This Room
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .room-modal-backdrop {
          position: fixed;

          z-index: 1000;

          inset: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          overflow-y: auto;

          padding: 24px;

          background: rgba(12, 24, 39, 0.72);

          backdrop-filter: blur(5px);
        }

        .room-modal {
          position: relative;

          width: 100%;

          max-width: 640px;

          max-height: calc(100dvh - 48px);

          overflow-y: auto;

          border: 1px solid rgba(255, 255, 255, 0.5);

          border-radius: 12px;

          background: #fff;

          box-shadow: 0 25px 90px rgba(0, 0, 0, 0.24);

          animation: room-modal-appear 200ms ease-out;
        }

        @keyframes room-modal-appear {
          from {
            opacity: 0;

            transform: translateY(10px);
          }

          to {
            opacity: 1;

            transform: translateY(0);
          }
        }

        .room-modal-close {
          position: absolute;

          z-index: 3;

          top: 14px;

          right: 14px;

          display: grid;

          place-items: center;

          width: 38px;

          height: 38px;

          border: 1px solid rgba(255, 255, 255, 0.65);

          border-radius: 50%;

          background: rgba(23, 46, 73, 0.88);

          color: #fff;

          cursor: pointer;
        }

        .room-modal-photo {
          position: relative;

          height: 240px;

          background: #e6e2da;
        }

        .room-modal-content {
          padding: 28px;
        }

        .room-modal-content > h2 {
          margin: 9px 0 10px;

          color: #172e49;

          font-family: Georgia, "Times New Roman", serif;

          font-size: 29px;

          font-weight: 500;

          line-height: 1.2;
        }

        .modal-description {
          margin: 0;

          color: #697487;

          font-size: 13px;

          line-height: 1.8;
        }

        .modal-room-facts {
          display: flex;

          flex-wrap: wrap;

          gap: 17px;

          margin: 19px 0 24px;

          padding-bottom: 20px;

          border-bottom: 1px solid #ece8e0;
        }

        .modal-room-facts span {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color: #536175;

          font-size: 12px;
        }

        .modal-room-facts svg,
        .modal-amenities svg {
          flex-shrink: 0;

          color: #bd873b;
        }

        .modal-subheading {
          margin: 0 0 13px;

          color: #172e49;

          font-size: 14px;
        }

        .modal-amenities {
          display: grid;

          grid-template-columns: repeat(2, minmax(0, 1fr));

          gap: 12px;

          margin-bottom: 24px;
        }

        .modal-amenities span {
          display: flex;

          align-items: flex-start;

          gap: 8px;

          color: #536175;

          font-size: 12px;

          line-height: 1.5;
        }

        .modal-prices {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 12px;
        }

        .modal-prices > div {
          display: flex;

          flex-direction: column;

          align-items: flex-start;

          gap: 6px;

          padding: 15px;

          border: 1px solid #e9e2d5;

          border-radius: 7px;

          background: #fdfbf7;
        }

        .modal-prices > div > span,
        .modal-prices small {
          color: #778092;

          font-size: 11px;
        }

        .modal-prices strong {
          color: #172e49;

          font-size: 24px;
        }

        .modal-prices > div:nth-child(2) strong {
          color: #bd873b;
        }

        .modal-tax-note {
          margin: 17px 0;

          color: #858b96;

          font-size: 11px;

          line-height: 1.6;
        }

        .modal-book-button {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          width: 100%;

          min-height: 47px;

          padding: 12px 18px;

          border: 1px solid #bd873b;

          border-radius: 5px;

          background: #bd873b;

          color: #fff;

          font-size: 12px;

          font-weight: 700;

          text-decoration: none;

          transition: background 180ms ease;
        }

        .modal-book-button:hover {
          background: #986728;
        }

        @media (max-width: 600px) {
          .room-modal-backdrop {
            padding: 12px;
          }

          .room-modal {
            max-height: calc(100dvh - 24px);
          }

          .room-modal-photo {
            height: 195px;
          }

          .room-modal-content {
            padding: 21px 18px;
          }

          .room-modal-content > h2 {
            font-size: 25px;
          }

          .modal-amenities {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .room-modal {
            animation: none;
          }
        }
      `}</style>

      <a
        href="https://wa.me/919934070237?text=Hello%20Hotel%20Orchid%2C%20I%20would%20like%20to%20enquire%20about%20a%20stay."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hotel Orchid on WhatsApp"
        title="Chat on WhatsApp"
        style={{
          position: "fixed",

          right: "24px",

          bottom: "24px",

          zIndex: 9999,

          width: "58px",

          height: "58px",

          borderRadius: "50%",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          backgroundColor: "#25D366",

          color: "#ffffff",

          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",

          textDecoration: "none",

          transition: "transform 180ms ease, box-shadow 180ms ease",
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.04 3C8.87 3 3.04 8.75 3.04 15.82c0 2.25.6 4.45 1.75 6.38L3 29l7.02-1.83a13.2 13.2 0 0 0 6.02 1.44h.01c7.17 0 13-5.75 13-12.82 0-3.43-1.36-6.65-3.83-9.08A13.02 13.02 0 0 0 16.04 3Zm0 23.45h-.01c-1.85 0-3.66-.49-5.24-1.41l-.38-.22-4.16 1.09 1.11-4.02-.25-.41a10.62 10.62 0 0 1-1.63-5.66c0-5.8 4.76-10.52 10.57-10.52 2.81 0 5.46 1.09 7.45 3.07a10.42 10.42 0 0 1 3.09 7.45c0 5.8-4.76 10.52-10.55 10.52Zm5.8-7.88c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.36.24-.68.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.57-1.85-1.75-2.16-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.25-.61-.51-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.37 5.37 4.72.75.32 1.33.51 1.79.65.75.24 1.43.21 1.97.13.6-.09 1.88-.76 2.15-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </main>
  );
}
