import React from 'react';
import Image from 'next/image';

const AboutManima = () => {
    return (
        <section className="w-full py-20 md:py-32 bg-[#FDFAF0] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-manima-gold via-transparent to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Enclosing Container */}
                <div className="bg-white/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 border border-manima-gold/20 shadow-xl relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-manima-gold/10 to-transparent rounded-br-[3rem] -z-10"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-manima-gold/10 to-transparent rounded-tl-[3rem] -z-10"></div>

                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        {/* Left Side - Logo Image */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end group" data-aos="fade-right">
                            <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px]">
                                {/* Spinning Ring */}
                                <div className="absolute inset-0 border-2 border-dashed border-manima-gold/30 rounded-full animate-[spin_10s_linear_infinite] group-hover:pause"></div>

                                {/* Logo */}
                                <Image
                                    src="/assets/logo.png"
                                    alt="Manima Logo"
                                    fill
                                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out p-8"
                                    unoptimized
                                />

                                {/* Glowing Background */}
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-manima-gold/20 rounded-full blur-[80px] animate-pulse"></div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="w-full md:w-1/2 text-center md:text-left" data-aos="fade-left">
                            <div className="inline-block mb-6 relative">
                                <h2 className="font-heading text-4xl md:text-6xl text-[#2C0E0F] leading-tight">
                                    About <br />
                                    <span className="text-manima-gold italic relative z-10">
                                        Manima
                                        <svg className="absolute w-full h-3 bottom-0 left-0 -z-10 text-manima-gold/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                        </svg>
                                    </span>
                                </h2>
                            </div>

                            <div className="space-y-6 text-lg md:text-xl text-[#582C12]/90 font-body leading-relaxed max-w-xl mx-auto md:mx-0">
                            <p>
                                <span className="text-4xl text-manima-gold font-heading float-left mr-2 mt-[-10px]">A</span>t Manima, we bridge the gap between tradition and technology, bringing sacred rituals directly to your doorstep. Our mission is to preserve the sanctity of ancient customs while providing a seamless, modern experience for devotees worldwide.
                            </p>
                            <p>
                                Whether it's Pinda Daana, Asthi Visarjan, or personalized Pujas, our dedicated team of experienced Pandits ensures every ceremony is performed with the utmost reverence and Vedic precision.
                            </p>
                        </div>

                            {/* Signature Only (Button Removed) */}
                            <div className="mt-10 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                                <div className="h-px w-16 bg-manima-gold/50 hidden md:block"></div>
                                <span className="font-heading text-xl text-manima-gold italic">Preserving Tradition, honoring Souls</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutManima;
