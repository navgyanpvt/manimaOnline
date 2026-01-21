import React from 'react';
import './Services.css';
import { Calendar, Video, FileCheck } from 'lucide-react';
import borderPattern from '../assets/border-pattern.png';

const steps = [
    {
        id: 1,
        icon: <Calendar size={48} />,
        title: "Pind Daan",
        description: "Choose from our Basic, Special, or Annual Pinda Daan packages and pick a convenient date."
    },
    {
        id: 2,
        icon: <Video size={48} />,
        title: "Ashthi Visarjan",
        description: "Our authentic Odia verified pandits perform the ritual at Swargadwar or Baitarani. Live streaming available."
    },
    {
        id: 3,
        icon: <FileCheck size={48} />,
        title: "Special Puja",
        description: "Get a complete high-quality recording and photos of the ceremony shared directly to your WhatsApp."
    },
    {
        id: 4,
        icon: <FileCheck size={48} />,
        title: "Pandit at Service",
        description: "Get a complete high-quality recording and photos of the ceremony shared directly to your WhatsApp."
    }
];

const Services = ({ onServiceClick }) => {
    return (
        <section id="Services" className="process-section">
            <div className="container">
                <h2 className="section-title">Services</h2>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            className="step-card-services clickable-card"
                            onClick={() => onServiceClick(step.id)}
                        >
                            <div className="step-icon-wrapper">
                                {step.icon}
                            </div>
                            <div className="step-number">{index + 1}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-divider">
            </div>
        </section>
    );
};

export default Services;
