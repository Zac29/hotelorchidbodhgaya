"use client";

import Image from "next/image";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  ArrowRight,
  BedDouble,
  Check,
  CircleUserRound,
  Clock3,
  Coffee,
  UserPlus,
  X,
} from "lucide-react";

import { images } from "@/lib/images";

export interface RoomTariffItem {
  id: string;

  name: string;

  noMeals: number;

  breakfast: number;

  extraPax: number;

  guests: string;

  bed: string;

  amenities: string[];

  image: keyof typeof images | "hero";

  tag: string;

  description: string;
}

const roomTariffData: RoomTariffItem[] = [
  {
    id: "deluxe-double",

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

    image: "bedroom1",

    tag: "Popular Choice",

    description:
      "Designed for couples and solo travellers seeking modern comfort, warm ambient lighting, and a peaceful stay near Bodhgaya's sacred sites.",
  },

  {
    id: "deluxe-triple",

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

    image: "bedroom2",

    tag: "Ideal for Families",

    description:
      "Enjoy extra space for families and small pilgrimage groups, with comfortable bedding, air conditioning, and thoughtful hospitality.",
  },

  {
    id: "standard-non-ac",

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

    image: "bedroom3",

    tag: "Great Value",

    description:
      "A peaceful and economical choice with essential comforts, comfortable bedding, and convenient access to the Mahabodhi Temple complex.",
  },
];

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
        <div className="orchid-rooms-container">
          <header className="rooms-heading">
            <div className="rooms-heading-copy">
              <span className="rooms-eyebrow">
                <span className="eyebrow-line" />
                YOUR STAY, BEAUTIFULLY CONSIDERED
              </span>

              <h1>Rooms &amp; <em>Rates</em></h1>

              <p>
                Find your perfect retreat in Bodhgaya. Thoughtfully appointed
                rooms, warm hospitality, and transparent pricing for a
                comfortable stay.
              </p>
            </div>

            <div className="checkout-note">
              <Clock3 size={17} />

              <span>
                Check-out
                <strong>12:00 PM</strong>
              </span>
            </div>
          </header>

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

        <style jsx>{`
          .orchid-rooms {
            --orchid-navy: #091a30;

            --orchid-gold: #bd873b;

            --orchid-muted: #70757a;

            background: #fbf8f2;

            color: var(--orchid-navy);

            padding: 112px 0 82px;

            min-height: 100vh;
          }

          .orchid-rooms \* {
            box-sizing: border-box;
          }

          .orchid-rooms-container {
            width: min(1200px, calc(100% - 64px));

            margin: 0 auto;
          }

          .rooms-heading {
            display: flex;

            justify-content: space-between;

            align-items: flex-end;

            gap: 28px;

            margin-bottom: 28px;
          }

          .rooms-heading-copy {
            max-width: 690px;
          }

          .rooms-eyebrow {
            display: inline-flex;

            align-items: center;

            gap: 10px;

            color: var(--orchid-gold);

            font-size: 11px;

            font-weight: 750;

            letter-spacing: 2px;

            line-height: 1.5;
          }

          .eyebrow-line {
            width: 27px;

            height: 2px;

            background: var(--orchid-gold);
          }

          .rooms-heading h1 {
            margin: 12px 0 10px;

            font-family: var(--font-serif), Georgia, "Times New Roman", serif;

            font-size: clamp(34px, 4vw, 49px);

            line-height: 1.1;

            letter-spacing: -1.2px;

            font-weight: 500;

            color: var(--orchid-navy);
          }

          .rooms-heading h1 em {
            color: #bd873b;
            font-weight: 400;
          }

          .rooms-heading-copy > p {
            max-width: 650px;

            margin: 0;

            color: var(--orchid-muted);

            font-size: 14px;

            line-height: 1.85;
          }

          .checkout-note {
            flex-shrink: 0;

            display: flex;

            align-items: center;

            gap: 12px;

            padding: 12px 16px;

            background: #fff;

            border: 1px solid #eae5db;

            border-radius: 2px;

            color: var(--orchid-gold);
          }

          .checkout-note > span {
            display: flex;

            flex-direction: column;

            gap: 3px;

            font-size: 11px;

            color: var(--orchid-muted);
          }

          .checkout-note strong {
            font-size: 14px;

            color: var(--orchid-navy);
          }

          .rooms-summary {
            display: flex;

            align-items: center;

            flex-wrap: wrap;

            gap: 15px;

            padding: 14px 0;

            margin-bottom: 20px;

            border-top: 1px solid #e6ddcf;

            border-bottom: 1px solid #e6ddcf;

            color: var(--orchid-muted);

            font-size: 12px;
          }

          .rooms-summary strong {
            color: var(--orchid-navy);
          }

          .summary-separator {
            width: 4px;

            height: 4px;

            border-radius: 50%;

            background: var(--orchid-gold);
          }

          .rooms-list {
            display: flex;

            flex-direction: column;

            gap: 26px;
          }

          .room-card {
            display: grid;

            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

            align-items: stretch;

            min-width: 0;

            overflow: hidden;

            background: #fff;

            border: 1px solid #eee5d6;

            border-radius: 2px;

            box-shadow: 0 8px 30px rgba(42, 34, 20, 0.045);

            transition:
              box-shadow 220ms ease,
              transform 220ms ease;
          }

          .room-card:hover {
            box-shadow: 0 17px 45px rgba(42, 34, 20, 0.09);

            transform: translateY(-2px);
          }

          .room-card-reverse .room-photo {
            order: 2;
          }

          .room-card-reverse .room-information {
            order: 1;
          }

          .room-photo {
            position: relative;

            min-height: 390px;

            overflow: hidden;

            background: #e6e2da;
          }

          .room-photo-image {
            object-fit: cover;

            transition: transform 600ms ease;
          }

          .room-card:hover .room-photo-image {
            transform: scale(1.035);
          }

          .room-photo-shade {
            position: absolute;

            inset: 0;

            background: linear-gradient(
              180deg,
              rgba(9, 21, 35, 0.14) 0%,

              transparent 35%,

              rgba(9, 21, 35, 0.68) 100%
            );

            pointer-events: none;
          }

          .room-tag {
            position: absolute;

            top: 20px;

            left: 20px;

            z-index: 1;

            max-width: calc(100% - 44px);

            padding: 8px 11px;

            border: 1px solid rgba(232, 194, 126, 0.5);

            border-radius: 2px;

            background: rgba(9, 26, 48, 0.94);

            color: #f3d29b;

            font-size: 10px;

            font-weight: 750;

            letter-spacing: 1px;

            text-transform: uppercase;
          }

          .room-photo-caption {
            position: absolute;

            z-index: 1;

            bottom: 20px;

            left: 22px;

            right: 22px;

            display: flex;

            align-items: center;

            flex-wrap: wrap;

            gap: 18px;

            color: #fff;

            font-size: 12px;

            font-weight: 550;

            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
          }

          .room-photo-caption span {
            display: inline-flex;

            align-items: center;

            gap: 7px;
          }

          .room-photo-caption svg {
            flex-shrink: 0;

            color: #edc37d;
          }

          .room-information {
            display: flex;

            flex-direction: column;

            justify-content: space-between;

            gap: 24px;

            min-width: 0;

            padding: 32px 30px 27px;
          }

          .room-category {
            display: block;

            color: var(--orchid-gold);

            font-size: 10px;

            font-weight: 750;

            letter-spacing: 1.6px;
          }

          .room-information h2 {
            margin: 9px 0 11px;

            color: var(--orchid-navy);

            font-family: var(--font-serif), Georgia, "Times New Roman", serif;

            font-size: clamp(22px, 2.1vw, 29px);

            font-weight: 500;

            line-height: 1.2;

            letter-spacing: -0.45px;
          }

          .room-description {
            margin: 0;

            color: var(--orchid-muted);

            font-size: 13px;

            line-height: 1.85;
          }

          .room-amenities {
            display: flex;

            flex-wrap: wrap;

            gap: 8px;

            margin-top: 19px;
          }

          .amenity {
            display: inline-flex;

            align-items: center;

            gap: 6px;

            max-width: 100%;

            padding: 7px 9px;

            border: 1px solid #eee5d6;

            border-radius: 2px;

            background: #fff;

            color: #47566a;

            font-size: 10px;

            line-height: 1.35;
          }

          .amenity svg {
            flex-shrink: 0;

            color: var(--orchid-gold);
          }

          .room-information-bottom {
            margin-top: auto;
          }

          .room-pricing {
            display: grid;

            grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);

            align-items: center;

            gap: 16px;

            padding: 18px;

            border: 1px solid #eee5d6;

            border-radius: 2px;

            background: #fbf8f2;
          }

          .price-option {
            min-width: 0;
          }

          .price-label {
            display: flex;

            align-items: center;

            gap: 5px;

            margin-bottom: 8px;

            color: #778092;

            font-size: 9px;

            font-weight: 750;

            letter-spacing: 1px;
          }

          .breakfast-option .price-label {
            color: var(--orchid-gold);
          }

          .price-value {
            display: flex;

            align-items: baseline;

            flex-wrap: wrap;

            gap: 5px;

            color: var(--orchid-navy);

            font-size: clamp(21px, 2vw, 27px);

            font-weight: 750;

            line-height: 1.15;

            letter-spacing: -0.8px;
          }

          .breakfast-option .price-value {
            color: var(--orchid-gold);
          }

          .price-value > span {
            color: #8b929d;

            font-size: 10px;

            font-weight: 400;

            letter-spacing: 0;
          }

          .price-description {
            display: block;

            margin-top: 6px;

            color: #858b96;

            font-size: 10px;

            line-height: 1.5;
          }

          .breakfast-option .price-description {
            color: #a37c45;
          }

          .price-divider {
            width: 1px;

            align-self: stretch;

            background: #e9dcc9;
          }

          .extra-pax-badge {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            margin-top: 10px;
            padding: 6px 10px;
            background: #f3ede3;
            border: 1px dashed #dcd4c3;
            border-radius: 2px;
            font-size: 11px;
            color: var(--orchid-muted);
          }

          .extra-pax-badge svg {
            color: var(--orchid-gold);
            flex-shrink: 0;
          }

          .extra-pax-badge strong {
            color: var(--orchid-navy);
          }

          .room-card-footer {
            display: flex;

            flex-direction: column;

            gap: 15px;

            margin-top: 15px;
          }

          .room-disclaimer {
            margin: 0;

            color: #858b96;

            font-size: 10px;

            line-height: 1.6;
          }

          .room-actions {
            display: flex;

            justify-content: flex-end;

            align-items: center;

            flex-wrap: wrap;

            gap: 10px;
          }

          .room-details-button,
          .room-enquire-button {
            flex-shrink: 0;
          }

          .rooms-bottom-note {
            display: flex;

            align-items: center;

            gap: 17px;

            margin-top: 34px;

            padding: 24px 26px;

            border: 1px solid #e6ddcf;

            border-radius: 2px;

            background: #fff;
          }

          .bottom-note-icon {
            display: grid;

            place-items: center;

            flex-shrink: 0;

            width: 42px;

            height: 42px;

            border-radius: 50%;

            background: #f2e7d4;

            color: var(--orchid-gold);
          }

          .rooms-bottom-note h3 {
            margin: 0 0 5px;

            color: var(--orchid-navy);

            font-family: var(--font-serif), Georgia, "Times New Roman", serif;

            font-size: 18px;

            font-weight: 500;
          }

          .rooms-bottom-note p {
            margin: 0;

            color: var(--orchid-muted);

            font-size: 12px;

            line-height: 1.7;
          }

          .bottom-contact-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
          }

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

            animation: modal-appear 200ms ease-out;
          }

          @keyframes modal-appear {
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

            background: rgba(9, 26, 48, 0.92);

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

            color: var(--orchid-navy);

            font-family: var(--font-serif), Georgia, "Times New Roman", serif;

            font-size: 29px;

            font-weight: 500;

            line-height: 1.2;
          }

          .modal-description {
            margin: 0;

            color: var(--orchid-muted);

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

          .modal-room-facts svg {
            color: var(--orchid-gold);
          }

          .modal-subheading {
            margin: 0 0 13px;

            color: var(--orchid-navy);

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

          .modal-amenities svg {
            flex-shrink: 0;

            color: var(--orchid-gold);
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

            border: 1px solid #e6ddcf;

            border-radius: 2px;

            background: #fbf8f2;
          }

          .modal-prices > div > span {
            color: #778092;

            font-size: 11px;
          }

          .modal-prices strong {
            color: var(--orchid-navy);

            font-size: 24px;
          }

          .modal-prices > div:nth-child(2) strong {
            color: var(--orchid-gold);
          }

          .modal-prices small {
            color: #858b96;

            font-size: 10px;
          }

          .modal-extra-pax-box {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
            padding: 10px 14px;
            background: #fbf9f4;
            border: 1px solid #ede3d1;
            border-radius: 2px;
            font-size: 12px;
            color: var(--orchid-navy);
          }

          .modal-extra-pax-box svg {
            color: var(--orchid-gold);
            flex-shrink: 0;
          }

          .modal-tax-note {
            margin: 17px 0;

            color: #858b96;

            font-size: 11px;

            line-height: 1.6;
          }

          .modal-book-button {
            display: flex;
            width: 100%;
            min-height: 47px;
            text-decoration: none;
          }

          @media (max-width: 1050px) {
            .orchid-rooms-container {
              width: calc(100% - 44px);
            }

            .room-photo {
              min-height: 340px;
            }

            .room-information {
              padding: 24px 21px 20px;
            }

            .room-pricing {
              gap: 10px;

              padding: 14px 12px;
            }

            .price-value {
              font-size: 22px;
            }

            .room-amenities {
              gap: 6px;
            }
          }

          @media (max-width: 760px) {
            .orchid-rooms {
              padding: 64px 0 48px;
            }

            .orchid-rooms-container {
              width: calc(100% - 36px);
            }

            .rooms-heading {
              align-items: flex-start;

              flex-direction: column;

              gap: 18px;

              margin-bottom: 22px;
            }

            .rooms-heading h1 {
              margin-top: 10px;

              font-size: 36px;
            }

            .rooms-heading-copy > p {
              font-size: 13px;
            }

            .checkout-note {
              padding: 10px 13px;
            }

            .rooms-summary {
              gap: 10px;

              font-size: 11px;
            }

            .rooms-list {
              gap: 20px;
            }

            .room-card,
            .room-card-reverse {
              display: flex;

              flex-direction: column;

              border-radius: 2px;
            }

            .room-card-reverse .room-photo,
            .room-card-reverse .room-information {
              order: initial;
            }

            .room-photo {
              width: 100%;

              min-height: 0;

              height: clamp(225px, 60vw, 340px);
            }

            .room-tag {
              top: 14px;

              left: 14px;

              font-size: 9px;
            }

            .room-photo-caption {
              left: 15px;

              right: 15px;

              bottom: 15px;

              gap: 12px;

              font-size: 11px;
            }

            .room-information {
              gap: 24px;

              padding: 23px 18px 19px;
            }

            .room-information h2 {
              font-size: 25px;
            }

            .room-description {
              font-size: 12px;
            }

            .room-amenities {
              margin-top: 15px;
            }

            .amenity {
              padding: 7px 8px;

              font-size: 10px;
            }

            .room-pricing {
              gap: 12px;

              padding: 15px 12px;
            }

            .price-label {
              font-size: 8px;

              letter-spacing: 0.6px;
            }

            .price-value {
              font-size: clamp(19px, 5vw, 24px);
            }

            .price-description {
              font-size: 9px;
            }

            .room-card-footer {
              gap: 13px;
            }

            .room-actions {
              display: grid;

              grid-template-columns: 1fr 1.2fr;
            }

            .room-details-button,
            .room-enquire-button {
              width: 100%;
              min-width: 0;
            }

            .rooms-bottom-note {
              align-items: flex-start;

              flex-wrap: wrap;

              gap: 13px;

              padding: 20px 17px;
            }

            .bottom-note-icon {
              width: 37px;

              height: 37px;
            }

            .rooms-bottom-note > div:nth-child(2) {
              flex: 1;

              min-width: 180px;
            }

            .rooms-bottom-note h3 {
              font-size: 17px;
            }

            .rooms-bottom-note p {
              font-size: 11px;
            }

            .bottom-contact-link {
              width: 100%;

              justify-content: flex-start;

              margin: 5px 0 0 50px;
            }

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
          }

          @media (max-width: 380px) {
            .orchid-rooms-container {
              width: calc(100% - 28px);
            }

            .room-information {
              padding: 19px 13px 15px;
            }

            .room-pricing {
              gap: 8px;

              padding: 12px 8px;
            }

            .price-value {
              font-size: 19px;

              letter-spacing: -0.5px;
            }

            .room-photo-caption {
              gap: 9px;

              font-size: 10px;
            }

            .modal-amenities {
              grid-template-columns: 1fr;
            }
          }


          /* Premium Hotel Orchid button animation */
          .orchid-rooms .gold-btn,
          .orchid-rooms .outline-btn,
          .orchid-rooms button.room-details-button,
          .orchid-rooms .room-modal-close {
            position: relative;
            overflow: hidden;
            isolation: isolate;
            transition:
              transform 220ms ease,
              box-shadow 220ms ease,
              filter 220ms ease,
              background-color 220ms ease;
          }

          .orchid-rooms .gold-btn::before,
          .orchid-rooms .outline-btn::before,
          .orchid-rooms button.room-details-button::before {
            position: absolute;
            content: "";
            top: -40%;
            left: -75%;
            width: 45%;
            height: 180%;
            transform: skewX(-22deg);
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.32),
              transparent
            );
            transition: left 520ms ease;
            pointer-events: none;
            z-index: -1;
          }

          .orchid-rooms .gold-btn:hover,
          .orchid-rooms .room-details-button:hover {
            transform: translateY(-2px);
            filter: brightness(1.05);
            box-shadow: 0 11px 25px rgba(115, 71, 23, 0.24);
          }

          .orchid-rooms .gold-btn:hover::before,
          .orchid-rooms .outline-btn:hover::before,
          .orchid-rooms button.room-details-button:hover::before {
            left: 135%;
          }

          .orchid-rooms .outline-btn {
            border-color: #bd873b;
            background: #fff;
            color: #8a5b21;
          }

          .orchid-rooms .outline-btn:hover {
            transform: translateY(-2px);
            background: #fbf3e7;
            box-shadow: 0 8px 20px rgba(42, 34, 20, 0.09);
          }

          .orchid-rooms .room-modal-close:hover {
            transform: rotate(90deg);
            filter: brightness(1.12);
          }

          .orchid-rooms .gold-btn:active,
          .orchid-rooms .outline-btn:active {
            transform: translateY(0) scale(0.985);
          }

          .orchid-rooms .gold-btn:focus-visible,
          .orchid-rooms .outline-btn:focus-visible {
            outline: 3px solid rgba(189, 135, 59, 0.45);
            outline-offset: 3px;
          }

          @media (prefers-reduced-motion: reduce) {
            .room-card,
            .room-photo-image,
            .room-modal,
            .room-details-button,
            .room-enquire-button {
              animation: none;

              transition: none;
            }
          }
        `}</style>
      </section>
    </>
  );
}
