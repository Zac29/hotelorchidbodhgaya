"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import "./Navbar.css";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

function Logo() {
  return (
    <Link
      href="/#home"
      className="orchid-logo"
      aria-label="Hotel Orchid Bodhgaya home"
    >
      <Image
        className="orchid-logo-mark"
        src="/logo.png"
        alt="Hotel Orchid Bodhgaya logo"
        width={48}
        height={48}
        priority
        style={{ objectFit: "contain" }}
      />

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
    const syncNavigation = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      // Determine the active navigation item.
      if (pathname === "/rooms") {
        setActiveLink("/rooms");
      } else if (pathname === "/gallery") {
        setActiveLink("/gallery");
      } else if (pathname === "/about") {
        setActiveLink("/about");
      } else if (pathname === "/contact") {
        setActiveLink("/contact");
      } else if (hash === "#contact") {
        setActiveLink("/#contact");
      } else {
        setActiveLink("/#home");
      }

      setScrolled(window.scrollY > 30);
    };

    syncNavigation();

    window.addEventListener("scroll", syncNavigation, {
      passive: true,
    });
    window.addEventListener("popstate", syncNavigation);
    window.addEventListener("hashchange", syncNavigation);

    return () => {
      window.removeEventListener("scroll", syncNavigation);
      window.removeEventListener("popstate", syncNavigation);
      window.removeEventListener("hashchange", syncNavigation);
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
          {navItems.map((item) => {
            const active = activeLink === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`orchid-nav-link ${
                  active ? "is-active" : ""
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="orchid-navbar-actions">
          <div className="orchid-phone-link">
            <Phone size={13} strokeWidth={2} />
            <span>
              <a href="tel:+919934070237">+91 99340 70237</a>
              <span aria-hidden="true"> / </span>
              <a href="tel:+917992269493">+91 79922 69493</a>
            </span>
          </div>

          <Link
            className="orchid-enquire-button"
            href="/contact"
            onClick={() => handleNavigation("/contact")}
          >
            ENQUIRE NOW <ArrowRight size={12} />
          </Link>
        </div>

        <button
          type="button"
          className="orchid-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="orchid-mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
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
        inert={!menuOpen}
      >
        {navItems.map((item) => {
          const active = activeLink === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`orchid-mobile-link ${
                active ? "is-active" : ""
              }`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}

        <Link
          href="/contact"
          className="orchid-mobile-enquire"
          onClick={() => handleNavigation("/contact")}
        >
          ENQUIRE NOW <ArrowRight size={14} />
        </Link>
      </nav>
    </header>
  );
}