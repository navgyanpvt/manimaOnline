"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Coupon {
    _id: string;
    code: string;
    discountType: 'PERCENTAGE' | 'FLAT';
    discountValue: number;
    minOrderValue: number;
    isActive: boolean;
    adImage?: string;
}

const CouponStack = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [visibleCoupons, setVisibleCoupons] = useState<Coupon[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const res = await fetch("/api/coupons");
                if (!res.ok) return;
                const data = await res.json();
                if (data.success) {
                    // Filter active coupons with ad images
                    const validCoupons = data.data.filter((c: Coupon) => c.isActive && c.adImage);
                    setCoupons(validCoupons);
                }
            } catch (error) {
                console.error("Failed to fetch coupons:", error);
            }
        };

        // Delay initial fetch/display by 7 seconds
        const initialTimer = setTimeout(() => {
            fetchCoupons();
        }, 7000);

        return () => clearTimeout(initialTimer);
    }, []);

    useEffect(() => {
        if (coupons.length === 0) return;

        // Show coupons one by one with 1s interval
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < coupons.length) {
                const nextCoupon = coupons[currentIndex];

                // Safety check to prevent undefined access
                if (nextCoupon) {
                    setVisibleCoupons(prev => {
                        // Avoid duplicates if strict mode causes double render
                        if (prev.find(c => c._id === nextCoupon._id)) return prev;
                        return [...prev, nextCoupon];
                    });
                }
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [coupons]);

    const handleCouponClick = (coupon: Coupon) => {
        // Navigate to /pujas with matching filters
        // Logic: "filter=lord-shiva&type=temple"
        // We'll hardcode this behavior as requested for "that coupon" (generic logic for all ad coupons for now)
        router.push("/pujas?filter=Lord%20Shiva&type=Temple");
        removeCoupon(coupon._id);
    };

    const removeCoupon = (id: string) => {
        setVisibleCoupons(prev => prev.filter(c => c._id !== id));
    };

    if (visibleCoupons.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 items-end">
            <AnimatePresence>
                {visibleCoupons.map((coupon) => {
                    if (!coupon) return null;
                    return (
                        <motion.div
                            key={coupon._id}
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative group cursor-pointer"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeCoupon(coupon._id);
                                }}
                                className="absolute -top-2 -right-2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                                <X size={14} />
                            </button>
                            <div
                                onClick={() => handleCouponClick(coupon)}
                                className="relative overflow-hidden rounded-lg shadow-lg border-2 border-white/20 hover:border-manima-gold/50 transition-colors w-48 md:w-64"
                            >
                                <img
                                    src={coupon.adImage}
                                    alt="Special Offer"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default CouponStack;
