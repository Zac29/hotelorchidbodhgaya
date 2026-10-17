"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  Menu,
  Phone,
  Send,
  X,
} from "lucide-react";
import "./gallery.css";

type GalleryCategory = "All Photos" | "Rooms" | "Interiors";

type GalleryItem = {
  src: string;
  title: string;
  category: Exclude<GalleryCategory, "All Photos">;
  description: string;
  room?: string;
  layout: string;
};


const galleryItems: GalleryItem[] = [
  {
    src: "/ac2.png",
    title: "Deluxe Double Room",
    category: "Rooms",
    description:
      "A comfortable air-conditioned room for couples and individual travellers.",
    room: "Deluxe Double (A/C)",
    layout: "tile-one",
  },
  {
    src: "/lobby.png",
    title: "Hotel Lobby",
    category: "Interiors",
    description:
      "A welcoming lobby where guests can begin their stay at Hotel Orchid.",
    layout: "tile-two",
  },
  {
    src: "/ac3bed.png",
    title: "Deluxe Triple Room",
    category: "Rooms",
    description:
      "A spacious room for families and small groups.",
    room: "Deluxe Triple (A/C)",
    layout: "tile-three",
  },
  {
    src: "/dblbed.png",
    title: "Standard Room",
    category: "Rooms",
    description:
      "A practical and comfortable option for your visit to Bodhgaya.",
    room: "Standard (Non A/C)",
    layout: "tile-four",
  },
  {
    src: "/lobby2.png",
    title: "Reception & Guest Welcome",
    category: "Interiors",
    description:
      "Another view of the hotel's reception and guest welcome area.",
    layout: "tile-five",
  },
  {
    src: "/ac22.png",
    title: "A Thoughtful Interior",
    category: "Interiors",
    description:
      "Simple details and inviting spaces for a pleasant stay.",
    layout: "tile-six",
  },
  {
    src: "/ac2.png",
    title: "Deluxe Double Interior",
    category: "Rooms",
    description:
      "An additional look at our air-conditioned double room.",
    room: "Deluxe Double (A/C)",
    layout: "tile-seven",
  },
  {
    src: "/ac3bed.png",
    title: "Family Room Arrangement",
    category: "Rooms",
    description:
      "Room to settle in and enjoy a comfortable visit together.",
    room: "Deluxe Triple (A/C)",
    layout: "tile-eight",
  },
  {
    src: "/dblbed.png",
    title: "A Relaxed Stay",
    category: "Interiors",
    description:
      "A calm, welcoming setting for your time in Bodhgaya.",
    layout: "tile-nine",
  },
];


const categories: GalleryCategory[] = ["All Photos", "Rooms", "Interiors"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All Photos");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredItems = galleryItems
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((item) => activeCategory === "All Photos" || item.category === activeCategory);

  const selected = selectedImage === null ? null : galleryItems[selectedImage];

  const showNext = useCallback(() => {
    setSelectedImage((current) =>
      current === null ? null : (current + 1) % galleryItems.length
    );
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedImage((current) =>
      current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage, showNext, showPrevious]);

  return (
    <main className="orchid-gallery-page">
      <header className="og-nav">
        {/* <div className="og-container og-nav-inner">
          <Link href="/" className="og-brand" aria-label="Hotel Orchid home">
            <span className="og-brand-mark"><Images size={22} /></span>
            <span>
              <span className="og-brand-name">HOTEL ORCHID</span>
              <span className="og-brand-sub">BODHGAYA</span>
            </span>
          </Link>

          <nav className="og-links" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/gallery" className="active">Gallery</Link>
            <Link href="/#about">About Us</Link>
            <Link href="/#contact">Contact Us</Link>
          </nav>

          <div className="og-nav-actions">
            <a className="og-phone" href="tel:+919876543210"><Phone size={14} /> +91 98765 43210</a>
            <Link className="og-enquire" href="/#contact">ENQUIRE NOW <ArrowRight size={14} /></Link>
          </div>

          <button
            type="button"
            className="og-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div> */}

        <nav className={`og-mobile-links ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/rooms" onClick={() => setMenuOpen(false)}>Rooms</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link className="og-mobile-enquire" href="/#contact" onClick={() => setMenuOpen(false)}>Enquire Now <ArrowRight size={15} /></Link>
        </nav>
      </header>

      <section className="og-intro">
        <div className="og-intro-kicker">HOTEL ORCHID · BODHGAYA</div>
        <h1>Spaces &amp; <em>Moments</em></h1>
        <p>A closer look at the rooms and welcoming spaces waiting for you.</p>
        <span className="og-intro-rule" />
      </section>

      <section className="og-gallery-section" id="gallery-photos">
        <div className="og-container">
          <div className="og-gallery-topline">
            <div>
              <p className="og-eyebrow">A VISUAL JOURNEY</p>
              <h2>Discover your <em>stay.</em></h2>
            </div>
            <div className="og-filters" aria-label="Filter gallery">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`og-filter ${activeCategory === category ? "active" : ""}`}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {activeCategory === "All Photos" ? (
            <div className="og-collage">
              {galleryItems.map((item, index) => (
                <article className={`og-collage-card ${item.layout}`} key={`${item.src}-${item.title}`}>
                  <button
                    type="button"
                    className="og-photo-button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View ${item.title}`}
                  >
                    <Image src={item.src} alt={item.title} fill sizes="(max-width: 700px) 90vw, 30vw" />
                    <span className="og-photo-shade" />
                    <span className="og-photo-title">{item.title}</span>
                    <span className="og-photo-open"><ArrowDownRight size={18} /></span>
                  </button>
                  <Link
                    className="og-photo-enquire"
                    href={`/?room=${encodeURIComponent(item.room || item.title)}#contact`}
                    aria-label={`Enquire about ${item.room || item.title}`}
                    title="Enquire about this room"
                  >
                    <Send size={14} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="og-filtered-grid">
              {filteredItems.map((item) => (
                <article className="og-filtered-card" key={`${item.src}-${item.title}`}>
                  <button type="button" className="og-filtered-photo" onClick={() => setSelectedImage(item.originalIndex)}>
                    <Image src={item.src} alt={item.title} fill sizes="(max-width: 700px) 100vw, 33vw" />
                    <span className="og-filtered-tag">{item.category}</span>
                  </button>
                  <div className="og-filtered-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link href={`/?room=${encodeURIComponent(item.room || item.title)}#contact`}>
                      Enquire about this space <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="og-bottom-cta">
        <div className="og-container og-bottom-cta-inner">
          <div>
            <p className="og-eyebrow">PLAN YOUR VISIT</p>
            <h2>Find the room that feels right.</h2>
            <p>Share your travel dates and requirements. Our team will help you choose a suitable room.</p>
          </div>
          <Link href="/#contact" className="og-enquire og-cta-button">MAKE AN ENQUIRY <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* <footer className="og-footer">
        <div className="og-container og-footer-grid">
          <div>
            <Link href="/" className="og-brand og-footer-brand">
              <span className="og-brand-mark"><Images size={21} /></span>
              <span><span className="og-brand-name">HOTEL ORCHID</span><span className="og-brand-sub">BODHGAYA</span></span>
            </Link>
            <p>A welcoming stay in Bodhgaya, with comfortable rooms and thoughtful hospitality.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <div className="og-footer-links">
              <Link href="/">Home</Link>
              <Link href="/rooms">Our Rooms</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/#about">About Us</Link>
              <Link href="/#contact">Contact Us</Link>
            </div>
          </div>
          <div>
            <h3>Get in Touch</h3>
            <a className="og-footer-phone" href="tel:+919876543210"><Phone size={16} /> +91 98765 43210</a>
            <Link className="og-footer-contact" href="/#contact">Send an enquiry <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="og-footer-bottom">© {new Date().getFullYear()} Hotel Orchid Bodhgaya. All rights reserved.</div>
      </footer> */}

      {selected && selectedImage !== null && (
        <div className="og-lightbox" role="dialog" aria-modal="true" aria-label="Photo preview" onClick={() => setSelectedImage(null)}>
          <button type="button" className="og-lightbox-control og-lightbox-close" aria-label="Close preview" onClick={() => setSelectedImage(null)}><X size={23} /></button>
          <button type="button" className="og-lightbox-control og-lightbox-prev" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); showPrevious(); }}><ChevronLeft size={25} /></button>
          <div className="og-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <div className="og-lightbox-image">
              <Image key={selected.src} src={selected.src} alt={selected.title} fill sizes="100vw" />
            </div>
            <div className="og-lightbox-caption">
              <div>
                <p>{selected.category.toUpperCase()} · BODHGAYA</p>
                <h3>{selected.title}</h3>
                <p>{selectedImage + 1} / {galleryItems.length}</p>
              </div>
              <Link className="og-enquire" href={`/?room=${encodeURIComponent(selected.room || selected.title)}#contact`}>
                ENQUIRE NOW <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <button type="button" className="og-lightbox-control og-lightbox-next" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); showNext(); }}><ChevronRight size={25} /></button>
        </div>
      )}
    </main>
  );
}
