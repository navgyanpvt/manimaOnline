import React from 'react';
import './ProcessFlow.css';
import { Calendar, Video, FileCheck } from 'lucide-react';
import borderPattern from '../assets/border-pattern.png';

const steps = [
    {
        icon: <Calendar size={48} />,
        title: "Select Ritual & Date",
        description: "Choose from our Basic, Special, or Annual Pinda Daan packages and pick a convenient date."
    },
    {
        icon: <Video size={48} />,
        title: "Priest Performs Ritual",
        description: "Our authentic Odia verified pandits perform the ritual at Swargadwar or Baitarani. Live streaming available."
    },
    {
        icon: <FileCheck size={48} />,
        title: "Receive Video & Photos",
        description: "Get a complete high-quality recording and photos of the ceremony shared directly to your WhatsApp."
    }
];

const ProcessFlow = () => {
    return (
        <section id="how-it-works" className="process-section">
            <div className="container">
                <h2 className="section-title">How It Works</h2>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
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

export default ProcessFlow;
