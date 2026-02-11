"use client";

import React, { Suspense } from "react";
import ServicesSelection from "@/components/ServicesSelection";

function ServicesContent() {
    return (
        <div className="min-h-screen bg-[#FDFAF5] pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <ServicesSelection />
            </div>
        </div>
    );
}

export default function ServicesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FDFAF5]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D35400]"></div>
            </div>
        }>
            <ServicesContent />
        </Suspense>
    );
}
