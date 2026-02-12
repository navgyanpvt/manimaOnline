"use client";

import React, { useEffect, useState } from 'react';
// import './Services.css'; // Removed custom CSS
import { Calendar, Video, FileCheck, Users, Sparkles, Waves, Flame, HandHelping, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Service {
    _id: string;
    name: string;
    details: string;
    link?: string;
}

interface ServicesProps {
    onServiceClick?: (id: string) => void;
}

const getIconForService = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('pind')) return <HandHelping size={48} />; // Offering
    if (lowerName.includes('ashthi') || lowerName.includes('visarjan')) return <Waves size={48} />; // River/Water
    if (lowerName.includes('puja')) return <Flame size={48} />; // Fire/Ritual
    if (lowerName.includes('pandit')) return <BookOpen size={48} />; // Knowledge/Scripture
    return <Sparkles size={48} />;
};

const Services = ({ onServiceClick }: ServicesProps) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                if (res.ok) {
                    const data = await res.json();
                    // Add static "Ritual Puja" service at the beginning
                    const ritualPuja: Service = {
                        _id: 'ritual-puja-static',
                        name: 'Ritual Puja',
                        details: 'Perform authentic Vedic Pujas with experienced Pandits at sacred temples. Book online for smooth and divine experiences.',
                        link: '/pujas'
                    };
                    setServices([ritualPuja, ...data]);
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <section id="Services" className="bg-[#FDFAF0] relative py-16 scroll-mt-28">
            <div className="container mx-auto px-6">
                <h2 className="section-title">Services</h2>

                <div className="flex flex-wrap justify-center gap-8 mb-12">
                    {loading ? (
                        <div className="w-full text-center py-20 text-gray-500">Loading services...</div>
                    ) : services.length > 0 ? (
                        services.slice(0, 4).map((service, index) => (
                            <div
                                key={service._id}
                                className="flex-1 min-w-[280px] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out border-t-[5px] border-[#DAA520] relative group hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                            >
                                <Link href={service.link || `/services?serviceId=${service._id}`} className="block h-full w-full py-10 px-6 text-center">
                                    <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 bg-[#C0392B] text-white w-[30px] h-[30px] rounded-full flex items-center justify-center font-bold font-serif shadow-sm">
                                        {index + 1}
                                    </div>
                                    <h3 className="mb-4 text-[#2C3E50] text-xl font-bold">{service.name}</h3>
                                    <p className="text-[#566573] text-[0.95rem] leading-relaxed line-clamp-3">
                                        {service.details}
                                    </p>

                                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-[#D35400] font-medium text-sm border-b border-[#D35400]">
                                            Click to know
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center py-10 text-gray-400">No services available at the moment.</div>
                    )}
                </div>

                <div className="text-center">
                    <Link href="/services" className="inline-block px-8 py-3 bg-[#D35400] text-white font-bold rounded-full hover:bg-[#E67E22] transition-colors duration-300 shadow-md transform hover:scale-105">
                        See More Services
                    </Link>
                </div>
            </div>

            <div className="w-full h-[60px] bg-[url('/assets/border-pattern.png')] bg-repeat-x bg-[length:auto_100%] mt-8 opacity-90">
            </div>
        </section>
    );
};

export default Services;
