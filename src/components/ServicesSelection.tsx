"use client";

import React, { useState, useEffect } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import PujaModal from "./PujaModal";

interface Pricing {
    name: string;
    price: number;
    features: string[];
    recommended?: boolean;
}

interface Location {
    _id: string;
    name: string;
    state: string;
    services: {
        service: string | { _id: string, name: string };
        pricing: Pricing[];
    }[];
}

interface Service {
    _id: string;
    name: string;
    details: string;
}

interface ServicesSelectionProps {
    showHeader?: boolean;
    title?: string;
    subtitle?: string;
}

export default function ServicesSelection({
    showHeader = true,
    title = "Our Services",
    subtitle = "Select a service and location to view our comprehensive packages designed for your spiritual needs."
}: ServicesSelectionProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialServiceId = searchParams.get('serviceId');
    const [services, setServices] = useState<Service[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState<string>("");
    const [selectedLocationId, setSelectedLocationId] = useState<string>("");
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
    const [displayPricing, setDisplayPricing] = useState<Pricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPujaModalOpen, setIsPujaModalOpen] = useState(false);

    const handleBookNow = (pkg: Pricing) => {
        const hasAuthCookie = document.cookie.split(';').some((item) => item.trim().startsWith('client_auth_status='));

        if (hasAuthCookie) {
            const queryParams = new URLSearchParams({
                serviceId: selectedServiceId,
                locationId: selectedLocationId,
                packageName: pkg.name
            }).toString();
            router.push(`/checkout?${queryParams}`);
        } else {
            setIsPujaModalOpen(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, locationsRes] = await Promise.all([
                    fetch("/api/services"),
                    fetch("/api/locations"),
                ]);

                if (servicesRes.ok && locationsRes.ok) {
                    const servicesData = await servicesRes.json();
                    const locationsData = await locationsRes.json();
                    setServices(servicesData);
                    setLocations(locationsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Effect to auto-select service from URL or default to first
    useEffect(() => {
        if (!loading && services.length > 0) {
            if (initialServiceId && services.some(s => s._id === initialServiceId)) {
                setSelectedServiceId(initialServiceId);
            } else if (!selectedServiceId) {
                // Default to first service
                setSelectedServiceId(services[0]._id);
            }
        }
    }, [loading, initialServiceId, services]);

    // Effect to filter locations when a service is selected
    useEffect(() => {
        if (selectedServiceId) {
            const filtered = locations.filter((loc) =>
                loc.services.some(s => {
                    const sId = typeof s.service === 'string' ? s.service : s.service._id;
                    return sId === selectedServiceId;
                })
            );
            setFilteredLocations(filtered);

            // Auto-select first location if current selection is invalid
            if (filtered.length > 0 && !filtered.find(l => l._id === selectedLocationId)) {
                setSelectedLocationId(filtered[0]._id);
            } else if (filtered.length === 0) {
                setSelectedLocationId("");
            }
        } else {
            setFilteredLocations([]);
            setSelectedLocationId("");
        }
    }, [selectedServiceId, locations]);


    // Effect to update pricing when service or location changes
    useEffect(() => {
        if (selectedServiceId && selectedLocationId) {
            const location = locations.find((l) => l._id === selectedLocationId);
            if (location) {
                // Find the specific service entry in the location to get its pricing
                const serviceEntry = location.services.find(s => {
                    const sId = typeof s.service === 'string' ? s.service : s.service._id;
                    return sId === selectedServiceId;
                });

                if (serviceEntry) {
                    setDisplayPricing(serviceEntry.pricing);
                } else {
                    setDisplayPricing([]);
                }
            }
        } else {
            setDisplayPricing([]);
        }
    }, [selectedServiceId, selectedLocationId, locations]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D35400]"></div>
            </div>
        );
    }

    const selectedService = services.find(s => s._id === selectedServiceId);

    return (
        <div className="w-full">
            {showHeader && (
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#922B21] mb-4 font-serif">
                        {title}
                    </h1>
                    <p className="text-[#566573] max-w-2xl mx-auto text-lg">
                        {subtitle}
                    </p>
                </div>
            )}

            {/* Selection Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 max-w-5xl mx-auto mb-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D35400] to-[#F1C40F]"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Step 1: Select Service */}
                    <div>
                        <label className="block text-[#922B21] text-sm font-bold uppercase tracking-widest mb-3 font-serif">
                            1. Choose Service
                        </label>
                        <div className="relative group">
                            <select
                                value={selectedServiceId}
                                onChange={(e) => setSelectedServiceId(e.target.value)}
                                className="w-full p-4 bg-[#FDFAF5] border-2 border-orange-100 rounded-xl appearance-none focus:outline-none focus:border-[#D35400] focus:ring-4 focus:ring-orange-100/50 text-[#2C3E50] text-lg font-medium cursor-pointer transition-all hover:border-[#F1C40F]"
                            >
                                <option value="" disabled>Select a spiritual service...</option>
                                {services.map((service) => (
                                    <option key={service._id} value={service._id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D35400] transition-transform group-hover:translate-x-1">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                        {selectedService && (
                            <p className="mt-3 text-gray-500 text-sm italic leading-relaxed pl-1 border-l-2 border-[#F1C40F]">
                                &quot;{selectedService.details}&quot;
                            </p>
                        )}
                    </div>

                    {/* Step 2: Select Location */}
                    <div className={`transition-all duration-500 ${!selectedServiceId ? 'opacity-40 pointer-events-none blur-sm' : 'opacity-100 blur-0'}`}>
                        <label className="block text-[#922B21] text-sm font-bold uppercase tracking-widest mb-3 font-serif">
                            2. Select Location
                        </label>

                        {filteredLocations.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {filteredLocations.map((location) => (
                                    <button
                                        key={location._id}
                                        onClick={() => setSelectedLocationId(location._id)}
                                        className={`
                                            relative px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 border-2
                                            ${selectedLocationId === location._id
                                                ? 'bg-[#D35400] text-white border-[#D35400] shadow-lg shadow-orange-200 transform scale-105'
                                                : 'bg-white text-gray-600 border-gray-100 hover:border-[#F1C40F] hover:text-[#D35400] hover:shadow-md'
                                            }
                                        `}
                                    >
                                        {location.name}
                                        {selectedLocationId === location._id && <Check size={16} className="text-white" />}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 bg-gray-50 rounded-xl text-gray-400 text-sm text-center border-2 border-dashed border-gray-200">
                                {selectedServiceId ? "No locations available for this service." : "Please select a service above first."}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Step 3: Pricing Display */}
            {selectedServiceId && selectedLocationId && displayPricing.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold text-center text-[#922B21] mb-10 font-serif">
                        Available Packages
                    </h2>
                    <div className="flex flex-wrap justify-center items-stretch gap-8">
                        {displayPricing.map((pkg, index) => (
                            <div
                                key={index}
                                className={`flex-1 min-w-[300px] max-w-[380px] bg-white rounded-xl p-8 text-center border transition-all duration-300 relative flex flex-col group
                                    ${pkg.recommended
                                        ? 'border-2 border-[#DAA520] shadow-xl z-10 scale-105'
                                        : 'border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1'
                                    }
                                `}
                            >
                                {(pkg.recommended || pkg.name.toLowerCase().includes('special') || pkg.name.toLowerCase().includes('premium')) && (
                                    <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 bg-[#DAA520] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-[#922B21] mb-2 text-xl font-bold">{pkg.name}</h3>
                                <div className="text-4xl font-bold text-[#2C3E50] mb-8 font-serif">
                                    ₹ {pkg.price.toLocaleString('en-IN')}
                                </div>
                                <ul className="list-none text-left mb-8 flex-grow space-y-3">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <Check size={16} className="text-[#D35400] min-w-[16px] mt-1" />
                                            <span className="leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleBookNow(pkg)}
                                    className="w-full py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-300 bg-[#D35400] text-white hover:bg-[#E67E22] shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <PujaModal
                isOpen={isPujaModalOpen}
                onClose={() => setIsPujaModalOpen(false)}
            />
        </div>
    );
}
