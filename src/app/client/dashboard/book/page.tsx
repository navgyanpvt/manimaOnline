"use client";

import React, { Suspense } from 'react';
import ServicesSelection from '@/components/ServicesSelection';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function BookServiceContent() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#F5F6F8] p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-500 hover:text-[#D35400] mb-8 font-medium transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </button>

                <ServicesSelection
                    showHeader={true}
                    title="Book a Ritual"
                    subtitle="Select a service below to proceed with your booking."
                />
            </div>
        </div>
    );
}

export default function BookServicePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#F5F6F8]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D35400]"></div>
            </div>
        }>
            <BookServiceContent />
        </Suspense>
    );
}
