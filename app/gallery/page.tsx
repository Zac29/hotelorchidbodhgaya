"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowRight, Camera, X } from "lucide-react";
import "./gallery.css";

const galleryImages = [
  {
      src: "/lobby.png",
      alt: "Welcoming hotel lobby at Hotel Orchid",
      title: "Hotel Lobby",
      category: "Interiors",
      size: "",
    },
  {
      src: "/lobby2.png",
      alt: "Reception and guest welcome area",
      title: "Reception & Guest Welcome",
      category: "Interiors",
      size: "gallery-wide",
    },
  {
      src: "/ac22.png",
      alt: "Thoughtful interior details at Hotel Orchid",
      title: "A Thoughtful Interior",
      category: "Interiors",
      size: "",
    },
  {
      src: "/dblbed.png",
      alt: "A relaxed and comfortable guest room",
      title: "A Relaxed Stay",
      category: "Interiors",
      size: "",
    },
  {
      src: "/ac2.png",
      alt: "Deluxe double air-conditioned room at Hotel Orchid",
      title: "Deluxe Double Room",
      category: "Rooms",
      size: "gallery-featured",
    },
  {
      src: "/ac3bed.png",
      alt: "Deluxe triple room with comfortable beds",
      title: "Deluxe Triple Room",
      category: "Rooms",
      size: "",
    },
  {
      src: "/dblbed.png",
      alt: "Standard guest room at Hotel Orchid",
      title: "Standard Room",
      category: "Rooms",
      size: "",
    },
  {
      src: "/ac2.png",
      alt: "Another view of the deluxe double room",
      title: "Deluxe Double Interior",
      category: "Rooms",
      size: "",
    },
  {
      src: "/ac3bed.png",
      alt: "Family room arrangement at Hotel Orchid",
      title: "Family Room Arrangement",
      category: "Rooms",
      size: "gallery-wide",
    }
];;

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Rooms", "Interiors"];
  const visibleImages = galleryImages
    .map((image, originalIndex) => ({ ...image, originalIndex }))
    .filter((image) => activeFilter === "All" || image.category === activeFilter);

  function showPrevious() {
    if (activeImage === null) return;
    setActiveImage((activeImage - 1 + galleryImages.length) % galleryImages.length);
  }

  function showNext() {
    if (activeImage === null) return;
    setActiveImage((activeImage + 1) % galleryImages.length);
  }

  return (
    <main className="orchid-gallery">
      <section className="gallery-hero" aria-labelledby="gallery-title">
        <div className="gallery-hero-image" />
        <div className="gallery-hero-shade" />
        <div className="gallery-hero-inner">
          <div className="gallery-hero-copy">
            <span className="gallery-eyebrow gallery-eyebrow-light">
              <span className="gallery-eyebrow-line" />
              A closer look at Hotel Orchid
            </span>
            <h1 id="gallery-title">
              Moments of calm,
              <br />
              <em>made to stay.</em>
            </h1>
            <p>
              Explore the spaces, thoughtful details and welcoming atmosphere
              that make your time in Bodh Gaya feel considered.
            </p>
            <a className="gold-btn gallery-primary-btn" href="#gallery-collection">
              Explore the gallery <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="gallery-hero-caption">
            <span>HOTEL ORCHID</span>
            <i />
            <span>BODH GAYA, INDIA</span>
          </div>
        </div>
      </section>

      {/* <section className="gallery-intro" aria-labelledby="gallery-intro-title">
        <div className="gallery-intro-inner">
          <div className="gallery-section-index">
            <span>01</span>
            <i />
            <small>THE EXPERIENCE</small>
          </div>
          <div className="gallery-intro-copy">
            <span className="gallery-eyebrow">
              <span className="gallery-eyebrow-line" />
              A sense of place
            </span>
            <h2 id="gallery-intro-title">
              A welcoming stay,
              <br />
              <em>in every detail.</em>
            </h2>
            <p className="gallery-intro-lead">
              From restful rooms to the little moments in between, discover a
              stay shaped around ease, warmth and the spirit of Bodh Gaya.
            </p>
            <p className="gallery-intro-body">
              Take a look around Hotel Orchid and picture yourself settling in.
              We believe a good stay is made up of simple comforts, thoughtful
              spaces and a warm welcome from the moment you arrive.
            </p>
            <Link className="gallery-text-link" href="/rooms">
              Find your room <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section> */}

      <section
        className="gallery-collection"
        id="gallery-collection"
        aria-labelledby="gallery-collection-title"
      >
        <div className="gallery-collection-inner">
          <div className="gallery-collection-heading">
            <div>
              <span className="gallery-eyebrow">
                <span className="gallery-eyebrow-line" />
                The photo collection
              </span>
              <h2 id="gallery-collection-title">
                A look <em>around.</em>
              </h2>
              <p>Explore the spaces and details that make Hotel Orchid feel welcoming.</p>
            </div>
            <div className="gallery-count">
              <Camera size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>{visibleImages.length.toString().padStart(2, "0")} photographs</span>
            </div>
          </div>

          {/* <div className="gallery-filters" aria-label="Filter gallery photographs">
            {filters.map((filter) => (
              <button
                className={`gallery-filter ${activeFilter === filter ? "is-active" : ""}`}
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div> */}

          <div className="gallery-grid">
            {visibleImages.map((image) => {
              return (
                <button
                  className={`gallery-item ${image.size}`}
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImage(image.originalIndex)}
                  aria-label={`View photograph: ${image.title}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span className="gallery-item-shade" />
                  <span className="gallery-item-caption">
                    <small>{image.category}</small>
                    <strong>{image.title}</strong>
                    <span className="gallery-item-arrow">
                      <ArrowDownRight size={18} aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="gallery-visit">
        <div className="gallery-visit-inner">
          <div>
            <span className="gallery-eyebrow gallery-eyebrow-light">
              <span className="gallery-eyebrow-line" />
              Your stay begins here
            </span>
            <h2>
              Come and experience
              <br />
              <em>Hotel Orchid.</em>
            </h2>
            <p>Make yourself at home in the spiritual heart of Bodh Gaya.</p>
          </div>
          <div className="gallery-visit-actions">
            <Link className="gold-btn gallery-primary-btn" href="/rooms">
              Discover our rooms <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link className="outline-btn gallery-outline-btn" href="/contact">
              Plan your stay
            </Link>
          </div>
        </div>
      </section>

      {activeImage !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="gallery-lightbox-close"
            type="button"
            aria-label="Close photograph"
            onClick={() => setActiveImage(null)}
          >
            <X size={22} />
          </button>
          <button
            className="gallery-lightbox-nav gallery-lightbox-prev"
            type="button"
            aria-label="Previous photograph"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            <ArrowLeft size={21} />
          </button>
          <figure className="gallery-lightbox-figure" onClick={(event) => event.stopPropagation()}>
            <img src={galleryImages[activeImage].src} alt={galleryImages[activeImage].alt} />
            <figcaption>
              <span>{galleryImages[activeImage].category}</span>
              <strong>{galleryImages[activeImage].title}</strong>
            </figcaption>
          </figure>
          <button
            className="gallery-lightbox-nav gallery-lightbox-next"
            type="button"
            aria-label="Next photograph"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            <ArrowRight size={21} />
          </button>
        </div>
      )}
    </main>
  );
}
