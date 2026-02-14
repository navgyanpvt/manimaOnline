import React from 'react';
import Image from 'next/image';

const AboutManima = () => {
    return (
        <section className="w-full py-20 md:py-32 bg-[#FDFAF0] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-manima-gold via-transparent to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex items-center justify-center">

                {/* Stack Container */}
                <div className="relative w-full max-w-5xl flex items-center justify-center">

                    {/* Bottom Layer: Logo & Effects */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-60">
                            {/* Spinning Ring */}
                            <div className="absolute inset-0 border-2 border-dashed border-manima-gold/30 rounded-full animate-[spin_10s_linear_infinite]"></div>

                            {/* Glowing Background */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-manima-gold/20 rounded-full blur-[20px] animate-pulse"></div>

                            {/* Logo */}
                            <Image
                                src="/assets/logo.png"
                                alt="Manima Logo"
                                fill
                                className="object-contain drop-shadow-2xl"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Top Layer: Glassmorphism Content Card */}
                    <div className="relative z-10 bg-white/50 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[3rem] p-8 md:p-20 text-center w-full max-w-4xl overflow-hidden">

                        {/* Decorative Gradients inside card */}
                        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-manima-gold/10 to-transparent rounded-br-[3rem] -z-10 pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-manima-gold/10 to-transparent rounded-tl-[3rem] -z-10 pointer-events-none"></div>

                        {/* Title */}
                        <div className="inline-block mb-8 relative" data-aos="fade-down">
                            <h2 className="font-heading text-4xl md:text-6xl text-[#843b11] leading-tight">
                                Our Philosophy<br />
                                <svg className="absolute w-full h-3 bottom--1 left-0 -z-10 text-[#843b11]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </h2>
                            <p className="mt-4 text-xl md:text-xl text-[#582C12] italic font-serif font-bold">"When you can't be there, your devotion still can"</p>
                        </div>

                        {/* Description */}
                        <div className="space-y-6 text-s md:text-lg text-[#000000] font-body leading-relaxed max-w-2xl mx-auto" data-aos="fade-up">
                            <p className='text-justify'>At Manima, we believe distance should never come between faith and responsibility. We help families stay connected to sacred traditions by making spiritual services <strong>simple</strong>, <strong>trusted</strong>, and <strong>accessible</strong>. For us, it is not just about services; it is about preserving connection, respect, and continuity of tradition for modern families.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutManima;
