"use client";

import Image from "next/image";

import Link from "next/link";

import { useEffect, useState } from "react";

import { roomTariffData } from "@/data/roomTariffData";

import {
  ArrowRight,
  BedDouble,
  Check,
  CircleUserRound,
  Coffee,
  UserPlus,
  X,
} from "lucide-react";

import { images } from "@/lib/images";
import "./rooms.css";

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function Rooms() {
  const [roomOpen, setRoomOpen] = useState<number | null>(null);

  useEffect(() => {
    if (roomOpen === null) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setRoomOpen(null);
    }

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [roomOpen]);

  return (
    <>
      <section className="orchid-rooms" id="rooms">
        {/* Hero inspired by the Hotel Orchid reference image. */}
        <div
          className="rooms-hero"
          style={{ backgroundImage: `url("${images.hero}")` }}
        >
          <div className="rooms-hero-overlay" />
          <div className="rooms-hero-inner">
            <div className="rooms-hero-copy">
              <span className="rooms-hero-eyebrow">
                <span className="rooms-hero-eyebrow-line" />
                YOUR STAY AT HOTEL ORCHID
              </span>

              <h1>
                A peaceful place
                <br />
                to <em>feel at home.</em>
              </h1>

              <p>
                Thoughtful comfort and a heartfelt welcome in the spiritual
                heart of Bodh Gaya.
              </p>

              <Link href="#available-rooms" className="rooms-hero-button">
                Discover your stay
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="rooms-hero-caption">
              <strong>HOTEL ORCHID</strong>
              <span className="rooms-hero-caption-line" />
              <span>BODHGAYA, INDIA</span>
            </div>
          </div>
        </div>

        <div className="orchid-rooms-container" id="available-rooms">

          <div className="rooms-summary">
            <span>
              <strong>{roomTariffData.length}</strong> thoughtfully designed
              room categories
            </span>

            <span className="summary-separator" />

            <span>Rates per room, per night</span>

            <span className="summary-separator" />

            <span>Extra Pax: ₹500 / night</span>
          </div>

          <div className="rooms-list">
            {roomTariffData.map((room, index) => {
              const roomImage = images[room.image] || images.hero;

              return (
                <article
                  className={`room-card ${
                    index % 2 === 1 ? "room-card-reverse" : ""
                  }`}
                  key={room.id}
                >
                  <div className="room-photo">
                    <Image
                      src={roomImage}
                      alt={room.name}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 760px) 100vw, 48vw"
                      className="room-photo-image"
                    />

                    <div className="room-photo-shade" />

                    <span className="room-tag">{room.tag}</span>

                    <div className="room-photo-caption">
                      <span>
                        <CircleUserRound size={16} />

                        {room.guests}
                      </span>

                      <span>
                        <BedDouble size={17} />

                        {room.bed}
                      </span>
                    </div>
                  </div>

                  <div className="room-information">
                    <div className="room-information-top">
                      <span className="room-category">
                        ROOM CATEGORY {String(index + 1).padStart(2, "0")}
                      </span>

                      <h2>{room.name}</h2>

                      <p className="room-description">{room.description}</p>

                      <div className="room-amenities">
                        {room.amenities.map((amenity) => (
                          <span className="amenity" key={amenity}>
                            <Check size={13} />

                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="room-information-bottom">
                      <div className="room-pricing">
                        <div className="price-option">
                          <span className="price-label">ROOM ONLY</span>

                          <div className="price-value">
                            {formatPrice(room.noMeals)}

                            <span>/ night</span>
                          </div>

                          <span className="price-description">
                            No meals included
                          </span>
                        </div>

                        <div className="price-divider" />

                        <div className="price-option breakfast-option">
                          <span className="price-label">
                            <Coffee size={14} />
                            WITH BREAKFAST
                          </span>

                          <div className="price-value">
                            {formatPrice(room.breakfast)}

                            <span>/ night</span>
                          </div>

                          <span className="price-description">
                            Breakfast included
                          </span>
                        </div>
                      </div>

                      <div className="extra-pax-badge">
                        <UserPlus size={13} />
                        <span>
                          Extra Person / Bed:{" "}
                          <strong>{formatPrice(room.extraPax)}</strong> / night
                        </span>
                      </div>

                      <div className="room-card-footer">
                        <p className="room-disclaimer">
                          Taxes extra, if applicable. Rates may change.
                        </p>

                        <div className="room-actions">
                          <button
                            type="button"
                            className="outline-btn room-details-button"
                            onClick={() => setRoomOpen(index)}
                          >
                            View Details
                          </button>

                          <Link
                            href="/#contact"
                            className="gold-btn room-enquire-button"
                          >
                            Enquire Now
                            <ArrowRight size={15} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="rooms-bottom-note">
            <div className="bottom-note-icon">
              <Check size={19} />
            </div>

            <div>
              <h3>A comfortable stay starts here.</h3>

              <p>
                Contact our team for room availability, reservations, and
                assistance with your stay in Bodhgaya.
              </p>
            </div>

            <Link href="/#contact" className="gold-btn bottom-contact-link">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {roomOpen !== null && (
          <div
            className="room-modal-backdrop"
            onClick={() => setRoomOpen(null)}
          >
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
                  src={images[roomTariffData[roomOpen].image] || images.hero}
                  alt={roomTariffData[roomOpen].name}
                  fill
                  sizes="(max-width: 650px) 100vw, 620px"
                  className="room-photo-image"
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

                    Extra Pax: {formatPrice(roomTariffData[roomOpen].extraPax)}
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
                      {formatPrice(roomTariffData[roomOpen].noMeals)}
                    </strong>

                    <small>Per night</small>
                  </div>

                  <div>
                    <span>With breakfast</span>

                    <strong>
                      {formatPrice(roomTariffData[roomOpen].breakfast)}
                    </strong>

                    <small>Per night</small>
                  </div>
                </div>

                <div className="modal-extra-pax-box">
                  <UserPlus size={15} />
                  <span>
                    Additional Guest / Extra Bed:{" "}
                    <strong>
                      {formatPrice(roomTariffData[roomOpen].extraPax)}
                    </strong>{" "}
                    per night
                  </span>
                </div>

                <p className="modal-tax-note">
                  Taxes extra, if applicable. Check-out at 12:00 PM.
                </p>

                <Link
                  href="/#contact"
                  className="gold-btn modal-book-button"
                  onClick={() => setRoomOpen(null)}
                >
                  Enquire About This Room
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

      </section>
    </>
  );
}
