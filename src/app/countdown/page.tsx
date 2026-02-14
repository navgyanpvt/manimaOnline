"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const CountdownPage = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const calculateTimeLeft = () => {
            const now = new Date();
            // Fixed target: Feb 15, 2026, 06:00:00 IST
            const target = new Date('2026-02-15T06:00:00+05:30');

            const difference = target.getTime() - now.getTime();

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60))),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            // If difference <= 0, we should reload the page to let middleware handle the redirection
            if (difference <= 0 && isMounted) {
                window.location.reload();
            }
            return { hours: 0, minutes: 0, seconds: 0 };
        };

        // Initial set
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isMounted) {
        return null; // Prevent hydration mismatch
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950 -z-10" />



            <div className="max-w-3xl w-full text-center space-y-12">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-sm font-medium animate-pulse">
                        <Clock className="w-4 h-4" />
                        <span>Upcoming</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        Happy <br /> Mahashivratri
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto">
                        "For Every Ritual That Matters." <br />
                        Perform sacred rituals with authenticity and devotion. <br />
                        Connecting you with your roots.
                    </p>
                    <p className="text-md text-neutral-500 max-w-lg mx-auto mt-4">
                        We are launching our full experience tomorrow at 6:00 AM.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
                    <TimeBlock value={timeLeft.hours} label="Hours" />
                    <TimeBlock value={timeLeft.minutes} label="Minutes" />
                    <TimeBlock value={timeLeft.seconds} label="Seconds" />
                </div>

                <div className="pt-8">
                    <div className="text-xl md:text-2xl font-medium tracking-wide text-neutral-400">
                        Stay Tuned
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => {
    return (
        <div className="flex flex-col items-center p-6 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl">
            <span className="text-5xl md:text-7xl font-mono font-bold tabular-nums text-white">
                {value.toString().padStart(2, "0")}
            </span>
            <span className="text-sm md:text-base text-neutral-500 uppercase tracking-widest mt-2">{label}</span>
            <span className="text-xs text-neutral-700 mt-1">Remaining</span>
        </div>
    );
};

export default CountdownPage;
