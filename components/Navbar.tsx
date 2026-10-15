"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import "./Navbar.css";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About Us", href: "/#about" },
  { label: "Contact Us", href: "/#contact" },
];

function Logo() {
  return (
    <Link
      href="/#home"
      className="orchid-logo"
      aria-label="Hotel Orchid Bodhgaya home"
    >
      <svg
        className="orchid-logo-mark"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M24 23C16 16 17 9 24 3C31 9 32 16 24 23Z"
            fill="currentColor"
            fillOpacity=".9"
          />
          <path
            d="M22 26C11 28 6 22 5 15C15 14 22 18 24 25Z"
            fill="currentColor"
            fillOpacity=".8"
          />
          <path
            d="M26 26C37 28 42 22 43 15C33 14 26 18 24 25Z"
            fill="currentColor"
            fillOpacity=".8"
          />
          <path
            d="M23 29C16 24 12 28 12 34C17 35 22 32 24 28Z"
            fill="currentColor"
          />
          <path
            d="M25 29C32 24 36 28 36 34C31 35 26 32 24 28Z"
            fill="currentColor"
          />
          <path d="M24 25V40" />
          <path d="M11 39C19 36 29 36 37 39" />
          <path d="M15 42H33" />
        </g>
      </svg>

      <span className="orchid-logo-copy">
        <span className="orchid-logo-title">HOTEL ORCHID</span>
        <span className="orchid-logo-subtitle">BODHGAYA</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const updateActiveLink = () => {
      if (window.location.pathname === "/rooms") {
        setActiveLink("/rooms");
      } else {
        const hash = window.location.hash;
        setActiveLink(hash ? `/${hash}` : "/#home");
      }
    };

    updateScroll();
    updateActiveLink();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("hashchange", updateActiveLink);
    window.addEventListener("popstate", updateActiveLink);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("hashchange", updateActiveLink);
      window.removeEventListener("popstate", updateActiveLink);
    };
  }, []);

  function handleNavigation(href: string) {
    setActiveLink(href);
    setMenuOpen(false);
  }

  return (
    <header
      className={`orchid-navbar ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="orchid-navbar-inner">
        <Logo />

        <nav
          className="orchid-desktop-nav"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`orchid-nav-link ${
                activeLink === item.href ? "is-active" : ""
              }`}
              aria-current={
                activeLink === item.href ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="orchid-navbar-actions">
          <a
            className="orchid-phone-link"
            href="tel:+919876543210"
          >
            <Phone size={13} strokeWidth={2} />
            <span>+91 98765 43210</span>
          </a>

          <Link
            className="orchid-enquire-button"
            href="/#contact"
            onClick={() => handleNavigation("/#contact")}
          >
            <span>ENQUIRE NOW</span>
            <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>

        <button
          type="button"
          className="orchid-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="orchid-mobile-navigation"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      <nav
        id="orchid-mobile-navigation"
        className={`orchid-mobile-nav ${
          menuOpen ? "is-open" : ""
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => handleNavigation(item.href)}
            className={`orchid-mobile-link ${
              activeLink === item.href ? "is-active" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/#contact"
          tabIndex={menuOpen ? 0 : -1}
          className="orchid-mobile-enquire"
          onClick={() => handleNavigation("/#contact")}
        >
          ENQUIRE NOW <ArrowRight size={14} />
        </Link>
      </nav>
    </header>
  );
}