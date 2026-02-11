"use client";
import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
// import './Packages.css'; // Removed custom CSS
import servicePackageData from '@/data/service-package.json';
import Link from 'next/link';

// Define types for the data if possible, but for migration speed we use any or infer
// Ideally I'd define interfaces.
interface Package {
    id: string;
    title: string;
    price: number;
    recommended?: boolean;
    features: string[];
}
interface Place {
    placeId: number;
    placeName: string;
    state: string;
    packages: Package[];
}
interface Service {
    id: number;
    title: string;
    description: string;
    places: Place[];
}

interface ServicePackageDetailProps {
    serviceId: string | number;
}

const ServicePackageDetail: React.FC<ServicePackageDetailProps> = ({ serviceId }) => {
    const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
    const [packages, setPackages] = useState<Package[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        // Find the service from the data
        const foundService = (servicePackageData as any).services.find((s: Service) => s.id === parseInt(serviceId.toString()));
        if (foundService) {
            setService(foundService);
            setPlaces(foundService.places);
            // Set the first place as default
            if (foundService.places.length > 0) {
                setSelectedPlace(foundService.places[0].placeId);
                setPackages(foundService.places[0].packages);
            }
        }
    }, [serviceId]);

    const handlePlaceChange = (placeId: number) => {
        setSelectedPlace(placeId);
        const selectedPlaceData = places.find(p => p.placeId === placeId);
        if (selectedPlaceData) {
            setPackages(selectedPlaceData.packages);
        }
    };

    if (!service) {
        return <div className="container mx-auto px-6 py-20 text-center">Loading or Service Not Found...</div>;
    }

    return (
        <section id="service-packages" className="py-16 bg-[#FDFAF5] pt-[100px]">
            <div className="container mx-auto px-6">
                {/* Header with Back Button */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 relative">
                    <Link
                        href="/#Services"
                        className="flex items-center gap-2 bg-[#DAA520] text-white border-0 px-6 py-3 rounded-lg cursor-pointer text-[0.95rem] font-semibold transition-all hover:bg-[#C0392B] hover:-translate-x-1 whitespace-nowrap"
                    >
                        <ChevronLeft size={24} />
                        Back to Services
                    </Link>
                    <div className="text-left">
                        <h2 className="text-[2.5rem] font-bold text-[#922B21] leading-[1.2] mb-1 font-serif">{service.title}</h2>
                        <p className="text-[#566573] text-sm mt-1 max-w-xl text-left leading-relaxed">{service.description}</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-[#D35400] mb-4 font-serif">Select Sacred Place:</h3>
                    <div className="flex flex-wrap gap-3">
                        {places.map(place => (
                            <div
                                key={place.placeId}
                                onClick={() => handlePlaceChange(place.placeId)}
                                className={`cursor-pointer border-2 rounded-lg p-3 transition-all duration-300 flex items-center gap-3 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-0.75rem)] lg:max-w-[300px]
                                    ${selectedPlace === place.placeId
                                        ? 'border-[#D35400] bg-[#FFF5E6] shadow-md scale-105'
                                        : 'border-gray-200 hover:border-[#F1C40F] bg-white hover:scale-[1.02]'
                                    }
                                `}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center min-w-[1.25rem]
                                     ${selectedPlace === place.placeId ? 'border-[#D35400]' : 'border-gray-300'}`}>
                                    {selectedPlace === place.placeId && <div className="w-2.5 h-2.5 rounded-full bg-[#D35400]" />}
                                </div>
                                <div>
                                    <div className={`font-bold text-sm ${selectedPlace === place.placeId ? 'text-[#D35400]' : 'text-gray-700'}`}>
                                        {place.placeName}
                                    </div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">{place.state}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="flex flex-wrap justify-center items-stretch gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`flex-1 min-w-[300px] max-w-[380px] bg-white rounded-lg p-10 text-center border transition-all duration-300 relative flex flex-col group
                                ${pkg.recommended
                                    ? 'border-2 border-[#DAA520] scale-105 shadow-lg z-10 hover:scale-[1.05] hover:-translate-y-1'
                                    : 'border-[#eee] hover:shadow-md hover:-translate-y-1'
                                }
                            `}
                        >
                            {pkg.recommended && (
                                <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 bg-[#DAA520] text-white px-3 py-1 rounded-[20px] text-[0.8rem] font-bold uppercase">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-[#922B21] mb-2 text-2xl font-bold">{pkg.title}</h3>
                            <div className="text-[2.5rem] font-bold text-[#2C3E50] mb-8 font-serif">₹ {pkg.price.toLocaleString('en-IN')}</div>
                            <ul className="list-none text-left mb-8 flex-grow">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="mb-2.5 flex items-start gap-2.5 text-[0.95rem] text-[#566573]">
                                        <Check size={16} className="text-[#D35400] min-w-[16px] mt-1" /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`inline-flex items-center justify-center px-6 py-3 rounded-[4px] font-semibold transition-all duration-300 uppercase tracking-[0.05em] shadow-sm hover:shadow-md hover:-translate-y-0.5
                                    ${pkg.recommended
                                        ? 'bg-[#D35400] text-white hover:bg-[#E67E22]'
                                        : 'bg-transparent border-2 border-[#D35400] text-[#D35400] hover:bg-[#D35400] hover:text-white'
                                    }
                                `}
                            >
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicePackageDetail;
