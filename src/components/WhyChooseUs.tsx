import React from 'react';
// import './WhyChooseUs.css'; // Removed custom CSS
import { ShieldCheck, Video, Heart, CreditCard } from 'lucide-react';

const reasons = [
    {
        icon: <ShieldCheck size={40} />,
        title: "Verified Vedic Pandits",
        text: "All our priests are registered with the Mukti Mandap of Puri and are highly experienced."
    },
    {
        icon: <Video size={40} />,
        title: "Live Streaming Option",
        text: "Watch the ritual happening live from anywhere in the world via Zoom/WhatsApp."
    },
    {
        icon: <Heart size={40} />,
        title: "100% Odia Vidhi",
        text: "We strictly follow the scriptures and traditions of the Jagannath culture."
    },
    {
        icon: <CreditCard size={40} />,
        title: "Secure Payment",
        text: "Pay safely online. No hidden charges. 100% satisfaction guaranteed."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-[#fcfaf0] text-center bg-cover bg-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
                    {reasons.map((reason, index) => (
                        <div key={index} className="p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl hover:bg-white/80 transition-all duration-300">
                            <div className="inline-block p-4 bg-orange-100/50 rounded-full text-orange-600 mb-6">{reason.icon}</div>
                            <div className="text-xl mb-3 text-gray-800 font-semibold">{reason.title}</div>
                            <p className="text-gray-600 text-[0.95rem]">{reason.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
