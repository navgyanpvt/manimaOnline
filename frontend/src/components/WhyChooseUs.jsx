import React from 'react';
import './WhyChooseUs.css';
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
        <section className="why-us-section">
            <div className="container">
                <h2 className="section-title">Why Choosing Us</h2>
                <div className="reasons-grid">
                    {reasons.map((reason, index) => (
                        <div key={index} className="reason-card">
                            <div className="icon-box">{reason.icon}</div>
                            <h4>{reason.title}</h4>
                            <p>{reason.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
