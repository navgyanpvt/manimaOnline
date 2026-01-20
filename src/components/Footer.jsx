import React from 'react';
import './Footer.css';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-col brand-col">
                    <div className="footer-logo">
                        <img src={logo} alt="Manima" />
                        <span className="footer-brand-name">Manima</span>
                    </div>
                    <p>
                        Connecting the Odia diaspora with their roots. Perform sacred rituals with authenticity and devotion, no matter where you are.
                    </p>
                    <div className="social-links">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Youtube size={20} /></a>
                    </div>
                </div>

                <div className="footer-col links-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#packages">Ritual Packages</a></li>
                        <li><a href="#faq">FAQs</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-col contact-col">
                    <h4>Contact Us</h4>
                    <ul>
                        <li>
                            <Phone size={18} /> <span>+91 98765 43210</span>
                        </li>
                        <li>
                            <Mail size={18} /> <span>support@pindadaana.com</span>
                        </li>
                        <li>
                            <MapPin size={18} /> <span>Grand Road, Puri, Odisha</span>
                        </li>
                    </ul>
                    <button className="btn btn-primary footer-btn">
                        Chat on WhatsApp
                    </button>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2025 Manima Services. All rights reserved. | Jai Jagannath</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
