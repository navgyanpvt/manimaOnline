import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <img src={logo} alt="Manima Logo" />
          <span className="brand-name">Manima</span>
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#book" className="btn btn-primary nav-cta" onClick={() => setMobileMenuOpen(false)}>Book Ritual</a>
        </nav>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
