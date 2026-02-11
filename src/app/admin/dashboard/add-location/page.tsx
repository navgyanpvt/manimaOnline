"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Plus, Trash2, MapPin, Tag, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Service {
    _id: string;
    name: string;
}

interface Pricing {
    name: string;
    price: string;
    features: string[];
}

interface ServicePricing {
    serviceId: string;
    serviceName: string; // for display
    pricing: Pricing[];
}

export default function AddLocation() {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingServices, setFetchingServices] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        city: "",
        state: "",
        // Instead of separate selectedServices and pricing, we map them
        servicePackages: [] as ServicePricing[],
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("/api/services");
                if (!res.ok) throw new Error("Failed to fetch services");
                const data = await res.json();
                setServices(data);
            } catch (err) {
                console.error("Error fetching services:", err);
            } finally {
                setFetchingServices(false);
            }
        };
        fetchServices();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleServiceToggle = (service: Service) => {
        setFormData((prev) => {
            const exists = prev.servicePackages.find(sp => sp.serviceId === service._id);
            if (exists) {
                return {
                    ...prev,
                    servicePackages: prev.servicePackages.filter(sp => sp.serviceId !== service._id)
                };
            } else {
                return {
                    ...prev,
                    servicePackages: [
                        ...prev.servicePackages,
                        {
                            serviceId: service._id,
                            serviceName: service.name,
                            pricing: [{ name: "", price: "", features: [] }] // Initialize with one empty package
                        }
                    ]
                };
            }
        });
    };

    const handleAddPricing = (serviceIndex: number) => {
        const newServicePackages = [...formData.servicePackages];
        if (newServicePackages[serviceIndex].pricing.length >= 3) return;

        newServicePackages[serviceIndex].pricing.push({ name: "", price: "", features: [] });
        setFormData(prev => ({ ...prev, servicePackages: newServicePackages }));
    };

    const handleFeatureAdd = (serviceIndex: number, pricingIndex: number, feature: string) => {
        if (!feature.trim()) return;
        const newServicePackages = [...formData.servicePackages];
        const pricing = newServicePackages[serviceIndex].pricing[pricingIndex];

        if (!pricing.features) pricing.features = [];
        pricing.features.push(feature.trim());

        setFormData(prev => ({ ...prev, servicePackages: newServicePackages }));
    };

    const handleFeatureRemove = (serviceIndex: number, pricingIndex: number, featureIndex: number) => {
        const newServicePackages = [...formData.servicePackages];
        const pricing = newServicePackages[serviceIndex].pricing[pricingIndex];

        pricing.features = pricing.features.filter((_, i) => i !== featureIndex);
        setFormData(prev => ({ ...prev, servicePackages: newServicePackages }));
    };

    const handlePricingChange = (serviceIndex: number, pricingIndex: number, field: 'name' | 'price', value: string) => {
        const newServicePackages = [...formData.servicePackages];
        newServicePackages[serviceIndex].pricing[pricingIndex][field] = value;
        setFormData(prev => ({ ...prev, servicePackages: newServicePackages }));
    };

    const handleRemovePricing = (serviceIndex: number, pricingIndex: number) => {
        const newServicePackages = [...formData.servicePackages];
        newServicePackages[serviceIndex].pricing = newServicePackages[serviceIndex].pricing.filter((_, i) => i !== pricingIndex);
        setFormData(prev => ({ ...prev, servicePackages: newServicePackages }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const payload = {
                name: formData.name,
                city: formData.city,
                state: formData.state,
                services: formData.servicePackages.map(sp => ({
                    service: sp.serviceId,
                    pricing: sp.pricing.map(p => ({ ...p, price: Number(p.price) }))
                }))
            };

            const response = await fetch("/api/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to create location");

            setSuccess(true);
            setFormData({
                name: "",
                city: "",
                state: "",
                servicePackages: [],
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading text-gray-800 mb-8 flex items-center gap-3">
                <MapPin className="text-manima-red" />
                Add New Location
            </h2>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-sm">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm">
                    <p className="font-medium">Success</p>
                    <p>Location created successfully!</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Basic Info & Pricing */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-heading text-gray-700 mb-4 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Location Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-all placeholder:text-gray-400"
                                    placeholder="e.g. Gaya"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-all placeholder:text-gray-400"
                                        placeholder="City Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-all placeholder:text-gray-400"
                                        placeholder="State Name"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Config Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-heading text-gray-700 border-b pb-2 flex items-center justify-between">
                            <span>Service Pricing Configuration</span>
                            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {formData.servicePackages.length} Services Selected
                            </span>
                        </h3>

                        {formData.servicePackages.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <Tag className="mx-auto h-10 w-10 text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">No services selected.</p>
                                <p className="text-sm text-gray-400">Select services from the right panel to configure pricing.</p>
                            </div>
                        ) : (
                            formData.servicePackages.map((sp, sIndex) => (
                                <div key={sp.serviceId} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-manima-gold"></div>

                                    <div className="flex justify-between items-center mb-6 border-b border-dashed pb-3">
                                        <h4 className="text-lg font-bold text-gray-800">{sp.serviceName}</h4>
                                        <button
                                            type="button"
                                            onClick={() => handleAddPricing(sIndex)}
                                            disabled={sp.pricing.length >= 3}
                                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${sp.pricing.length >= 3
                                                ? "text-gray-400 border border-gray-200 cursor-not-allowed"
                                                : "text-manima-red hover:text-white hover:bg-manima-red border border-manima-red"
                                                }`}
                                        >
                                            <Plus size={14} /> ADD PACKAGE {sp.pricing.length}/3
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {sp.pricing.map((price, pIndex) => (
                                            <div key={pIndex} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                                <div className="absolute -left-1 top-4 w-10 h-6 bg-gray-200 rounded-r text-[10px] flex items-center justify-center font-bold text-gray-500 rotate-90 -translate-x-full group-hover:translate-x-0 transition-transform">
                                                    #{pIndex + 1}
                                                </div>

                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 mb-1 block">Package Name</label>
                                                    <input
                                                        type="text"
                                                        value={price.name}
                                                        onChange={(e) => handlePricingChange(sIndex, pIndex, 'name', e.target.value)}
                                                        placeholder="e.g. Basic"
                                                        required
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded focus:border-manima-gold outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 mb-1 block">Price (₹)</label>
                                                    <input
                                                        type="number"
                                                        value={price.price}
                                                        onChange={(e) => handlePricingChange(sIndex, pIndex, 'price', e.target.value)}
                                                        placeholder="e.g. 1500"
                                                        required
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded focus:border-manima-gold outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="flex-[2]">
                                                    <label className="text-xs text-gray-500 mb-1 block">Features (Press Enter to add)</label>
                                                    <div className="space-y-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Add feature..."
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleFeatureAdd(sIndex, pIndex, e.currentTarget.value);
                                                                    e.currentTarget.value = '';
                                                                }
                                                            }}
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded focus:border-manima-gold outline-none text-sm"
                                                        />
                                                        <div className="flex flex-wrap gap-2">
                                                            {price.features?.map((feature, fIndex) => (
                                                                <span key={fIndex} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs text-gray-700">
                                                                    {feature}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleFeatureRemove(sIndex, pIndex, fIndex)}
                                                                        className="ml-1 text-gray-400 hover:text-red-500"
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-end pb-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemovePricing(sIndex, pIndex)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                        title="Remove"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {sp.pricing.length === 0 && (
                                            <p className="text-sm text-center py-2 text-gray-400 italic">Click &quot;ADD PACKAGE&quot; to set pricing.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column - Services & Submit */}
                <div className="space-y-8">
                    {/* Services Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-heading text-gray-700 mb-4 border-b pb-2">Available Services</h3>

                        {fetchingServices ? (
                            <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
                                <Loader2 size={24} className="animate-spin text-manima-gold" />
                                <span className="text-sm">Loading services...</span>
                            </div>
                        ) : services.length === 0 ? (
                            <p className="text-sm text-center py-6 text-gray-500 italic bg-gray-50 rounded">No services found in database.</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {services.map((service) => {
                                    const isSelected = formData.servicePackages.some(sp => sp.serviceId === service._id);
                                    return (
                                        <label
                                            key={service._id}
                                            className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${isSelected
                                                ? "bg-red-50 border-manima-red/30 shadow-sm"
                                                : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-manima-red border-manima-red text-white" : "border-gray-300 bg-white"
                                                }`}>
                                                {isSelected && <CheckCircle2 size={14} />}
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleServiceToggle(service)}
                                                    className="hidden"
                                                />
                                            </div>
                                            <div>
                                                <span className={`block text-sm font-medium ${isSelected ? "text-manima-red" : "text-gray-700"}`}>
                                                    {service.name}
                                                </span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="sticky top-24">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-manima-red to-red-600 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            {loading ? "Saving Location..." : "Save Location"}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Ensure all details are correct before saving.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
