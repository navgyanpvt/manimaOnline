import React from 'react';
// import './Footer.css'; // Removed custom CSS
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
    onOpenPuja?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPuja }) => {
    return (
        <footer className="bg-[#fffbf2] text-[#5c4d44] pt-20 text-[0.95rem]" id="contact">
            <div className="container mx-auto px-6 flex flex-wrap justify-between gap-12 pb-16">
                <div className="flex-1 min-w-[250px]">
                    <div className="mb-6">
                        <Image src="/assets/manima_logo.png" alt="Manima" width={180} height={60} className="h-[60px] w-auto" unoptimized />
                    </div>
                    <p className="text-[#7f6e63] leading-relaxed mb-6">
                        Connecting the Odia diaspora with their roots. Perform sacred rituals with authenticity and devotion, no matter where you are.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="flex text-[#D35400] bg-[#D35400]/10 p-2 rounded-full transition-all hover:bg-[#D35400] hover:text-white hover:-translate-y-[3px]"><Facebook size={20} /></a>
                        <a href="#" className="flex text-[#D35400] bg-[#D35400]/10 p-2 rounded-full transition-all hover:bg-[#D35400] hover:text-white hover:-translate-y-[3px]"><Instagram size={20} /></a>
                        <a href="#" className="flex text-[#D35400] bg-[#D35400]/10 p-2 rounded-full transition-all hover:bg-[#D35400] hover:text-white hover:-translate-y-[3px]"><Youtube size={20} /></a>
                    </div>
                </div>

                <div className="flex-1 min-w-[250px]">
                    <h4 className="text-[#2c0e0e] text-xl mb-6 relative inline-block font-bold">Quick Links</h4>
                    <ul className="list-none">
                        {[
                            { name: 'Home', href: '#hero' },
                            { name: 'About Us', href: '#about' },
                            { name: 'Ritual Packages', href: '/services' },
                            { name: 'FAQs', href: '#faq' },
                            { name: 'Privacy Policy', href: '/privacy-policy' },
                            { name: 'Terms & Conditions', href: '/terms-conditions' },
                            { name: 'Agent Login', href: '/agent/login' }
                        ].map((link) => (
                            <li key={link.name} className="mb-3">
                                <Link
                                    className="pb-[4px] relative group transition-colors hover:text-[#D35400]"
                                    href={link.href}
                                >
                                    {link.name}
                                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#D35400] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 min-w-[250px]">
                    <h4 className="text-[#2c0e0e] text-xl mb-6 relative inline-block font-bold">Contact Us</h4>
                    <ul className="list-none">
                        <li className="flex items-start gap-3 mb-4">
                            <Phone size={18} className="text-[#D35400]" /> <span>+91 9668093025</span> <span>+91 9040693050</span>
                        </li>
                        <li className="flex items-start gap-3 mb-4">
                            <Mail size={18} className="text-[#D35400]" /> <span>manima.app@gmail.com</span>
                        </li>
                        <li className="flex items-start gap-3 mb-4">
                            <MapPin size={18} className="text-[#D35400] mt-1 shrink-0" />
                            <div className="flex flex-col">
                                <a href="https://navgyaninnovations.com/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#E67E22] transition-colors">
                                    Navgyan Innovations Pvt Ltd
                                </a>
                                <span>Nilachakra Nagar, Gunupur, Rayagada, Odisha, India, 765022</span>
                            </div>
                        </li>
                    </ul>
                    <button
                        className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 rounded-[4px] font-semibold transition-all duration-300 uppercase tracking-[0.05em] bg-[#D35400] text-white shadow-sm hover:bg-[#E67E22] hover:-translate-y-0.5 hover:shadow-md animate-bounce"
                        onClick={onOpenPuja}
                    >
                        Request Puja Assistance
                    </button>

                </div>
            </div>
            <div className="bg-[#D35400]/5 py-6 text-center text-[#8d7a6f] text-[0.85rem] border-t border-[#D35400]/10">
                <div className="container mx-auto px-6 flex justify-end items-center">
                    <p>&copy; {new Date().getFullYear()} Manima Services. All rights reserved. | Jai Jagannath</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
