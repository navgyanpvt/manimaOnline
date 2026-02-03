import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import PujaModal from "./PujaModal";

const Header = ({ onOpenPuja }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container header-container">

          <div className="logo">
            <img src={logo} alt="Manima Logo" />
            <span className="brand-name">Manima</span>
          </div>

          <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <a href="#hero" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#Services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>

            <button
              className="btn btn-primary nav-cta"
              onClick={() => {
                onOpenPuja();
                setMobileMenuOpen(false);
              }}
            >
              Book Puja
            </button>

          </nav>

          <div
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </header>

      {/* MODAL COMPONENT */}
      <PujaModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default Header;
