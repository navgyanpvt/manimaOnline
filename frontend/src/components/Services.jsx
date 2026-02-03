import React from 'react';
import './Services.css';
import { Calendar, Video, FileCheck } from 'lucide-react';
import borderPattern from '../assets/border-pattern.png';

const steps = [
    {
        id: 1,
        icon: <Calendar size={48} />,
        title: "Pind Daan",
        type: "PACKAGE",
        description: "Choose from our Basic, Special, or Annual Pinda Daan packages and pick a convenient date."
    },
    {
        id: 2,
        icon: <Video size={48} />,
        title: "Ashthi Visarjan",
        type: "PACKAGE",
        description: "Our authentic Odia verified pandits perform the ritual at Swargadwar or Baitarani."
    },
    {
        id: 3,
        icon: <FileCheck size={48} />,
        title: "Special Puja",
        type: "SPECIAL_PUJA",
        description: "Choose temple-based special pujas for birthday, marriage, anniversary, or promotion."
    },
    {
        id: 4,
        icon: <FileCheck size={48} />,
        title: "Pandit at Service",
        type: "LEAD_ONLY",
        description: "Book a verified Odia pandit for rituals at your location."
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
                            onClick={() => {
                                if (step.type === "SPECIAL_PUJA") {
                                    onServiceClick("SPECIAL_PUJA");
                                } else if (step.type === "LEAD_ONLY") {
                                    onServiceClick("PANDIT_SERVICE");
                                } else {
                                    onServiceClick(step.id);
                                }
                            }}

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
