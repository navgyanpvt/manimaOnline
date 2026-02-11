"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Loader = ({ onLoaded }: { onLoaded: () => void }) => {
    const [shouldRender, setShouldRender] = useState(true);
    const [opacity, setOpacity] = useState(0); // Start invisible to prevent flash on reload

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (hasVisited) {
            setShouldRender(false);
            onLoaded();
        } else {
            // Fade in for new visitors
            requestAnimationFrame(() => {
                setOpacity(1);
            });

            const timer = setTimeout(() => {
                setOpacity(0); // Start fade out
                sessionStorage.setItem('hasVisited', 'true');

                // Wait for transition to finish before unmounting
                setTimeout(() => {
                    setShouldRender(false);
                    onLoaded();
                }, 800);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [onLoaded]);

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-[#FDFAF0] flex flex-col items-center justify-center transition-opacity duration-800 ease-in-out"
            style={{ opacity: opacity }}
        >
            <div className="relative w-32 h-32 mb-4 mix-blend-multiply">
                <Image
                    src="/assets/loader_diya.gif"
                    alt="Loading..."
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>
            {/* Using styles matching .brand-name from Header.css but adapted for Tailwind/Inline if needed or just using custom class */}
            <h1
                className="text-3xl font-bold uppercase tracking-widest text-[#DAA520]"
                style={{ fontFamily: 'var(--font-heading)' }}
            >
                Manima
            </h1>
        </div>
    );
};

export default Loader;
