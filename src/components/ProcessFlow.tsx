import React from 'react';
// import './ProcessFlow.css'; // Removed custom CSS
import { Calendar, Video, FileCheck } from 'lucide-react';

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
        <section id="how-it-works" className="bg-[#FDFAF0] relative py-16">
            <div className="container mx-auto px-6">
                <h2 className="section-title">How It Works</h2>

                <div className="flex flex-wrap justify-between gap-8 mb-16">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex-1 min-w-[280px] bg-white px-6 py-10 text-center rounded-lg shadow-sm transition-all duration-300 border-t-[5px] border-[#DAA520] relative hover:-translate-y-2.5 hover:shadow-lg"
                        >
                            <div className="inline-flex p-4 bg-[#FDFAF0] rounded-full text-[#D35400] mb-6">
                                {step.icon}
                            </div>
                            <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 bg-[#C0392B] text-white w-[30px] h-[30px] rounded-full flex items-center justify-center font-bold font-serif">
                                {index + 1}
                            </div>
                            <h3 className="mb-4 text-[#2C3E50] text-xl font-bold">{step.title}</h3>
                            <p className="text-[#566573] text-[0.95rem]">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full h-[60px] bg-[url('/assets/border-pattern.png')] bg-repeat-x bg-[length:auto_100%] mt-8 opacity-90">
            </div>
        </section>
    );
};

export default ProcessFlow;
