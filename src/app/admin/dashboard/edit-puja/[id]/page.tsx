"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, Plus, Trash2, IndianRupee, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Package {
    categoryName: "Standard" | "Premium";
    features: string[];
    priceAmount: number | string;
}

export default function EditPujaPage() {
    const router = useRouter();
    const params = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        templeType: "",
        description: "",
    });

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [packages, setPackages] = useState<Package[]>([
        { categoryName: "Standard", features: [""], priceAmount: "" },
        { categoryName: "Premium", features: [""], priceAmount: "" },
    ]);

    useEffect(() => {
        const fetchPuja = async () => {
            try {
                const response = await fetch("/api/puja");
                const data = await response.json();
                if (data.success) {
                    const puja = data.data.find((p: any) => p._id === params.id);
                    if (puja) {
                        setFormData({
                            name: puja.name,
                            location: puja.location,
                            templeType: puja.templeType,
                            description: "", // If description is added to model later
                        });
                        setPreviewUrl(puja.imageUrl);
                        setPackages(puja.packages.map((p: any) => ({
                            ...p,
                            priceAmount: p.priceAmount.toString()
                        })));
                    } else {
                        // Handle not found
                        alert("Puja not found");
                        router.push("/admin/dashboard/pujas");
                    }
                }
            } catch (error) {
                console.error("Error fetching puja details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchPuja();
        }
    }, [params.id, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handlePackageChange = (index: number, field: keyof Package, value: any) => {
        const newPackages = [...packages];
        // @ts-ignore
        newPackages[index][field] = value;
        setPackages(newPackages);
    };

    const handleFeatureChange = (pkgIndex: number, featureIndex: number, value: string) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features[featureIndex] = value;
        setPackages(newPackages);
    };

    const addFeature = (pkgIndex: number) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features.push("");
        setPackages(newPackages);
    };

    const removeFeature = (pkgIndex: number, featureIndex: number) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features = newPackages[pkgIndex].features.filter((_, i) => i !== featureIndex);
        setPackages(newPackages);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append("id", params.id as string);
            data.append("name", formData.name);
            data.append("location", formData.location);
            data.append("templeType", formData.templeType);

            // Filter out empty features and ensure price is number
            const cleanedPackages = packages.map(pkg => ({
                ...pkg,
                features: pkg.features.filter(f => f.trim() !== ""),
                priceAmount: pkg.priceAmount === "" ? 0 : Number(pkg.priceAmount)
            }));

            data.append("packages", JSON.stringify(cleanedPackages));

            if (file) {
                data.append("file", file);
            }

            const response = await fetch("/api/puja", {
                method: "PATCH",
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update puja");
            }

            router.push("/admin/dashboard/pujas");
            router.refresh();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to update Puja. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-manima-red" size={40} />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Link href="/admin/dashboard/pujas" className="flex items-center gap-2 text-gray-500 hover:text-manima-red transition-colors mb-2 text-sm font-medium">
                        <ArrowLeft size={16} /> Back to All Pujas
                    </Link>
                    <h1 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">Edit Puja</h1>
                    <p className="text-gray-500 mt-1 text-sm">Update puja service details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Basic Details */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Basic Info Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-manima-red rounded-full"></span>
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Temple Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-manima-red/20 focus:border-manima-red outline-none transition-all placeholder-gray-400 text-sm"
                                        placeholder="e.g. Sri Kashi Vishwanath Temple"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-manima-red/20 focus:border-manima-red outline-none transition-all placeholder-gray-400 text-sm"
                                        placeholder="e.g. Varanasi, Uttar Pradesh"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deity / Temple Type</label>
                                    <input
                                        type="text"
                                        name="templeType"
                                        value={formData.templeType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-manima-red/20 focus:border-manima-red outline-none transition-all placeholder-gray-400 text-sm"
                                        placeholder="e.g. Shiva"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Packages Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-manima-gold rounded-full"></span>
                                Packages
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {packages.map((pkg, listIndex) => (
                                    <div
                                        key={pkg.categoryName}
                                        className={`relative border rounded-2xl p-6 transition-all duration-300 hover:shadow-md ${pkg.categoryName === 'Premium'
                                            ? 'bg-gradient-to-br from-amber-50 to-white border-amber-200/60'
                                            : 'bg-white border-gray-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className={`font-bold text-lg ${pkg.categoryName === 'Premium' ? 'text-amber-700' : 'text-gray-800'}`}>
                                                    {pkg.categoryName}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-1">Configure {pkg.categoryName.toLowerCase()} tier options</p>
                                            </div>
                                            {pkg.categoryName === 'Premium' && (
                                                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                                                    Recommended
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Price (₹)</label>
                                                <div className="relative group">
                                                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-manima-red transition-colors" size={14} />
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={pkg.priceAmount}
                                                        onChange={(e) => handlePackageChange(listIndex, "priceAmount", e.target.value)}
                                                        className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-manima-red/20 focus:border-manima-red outline-none text-gray-900 font-medium transition-all text-sm"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Features</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => addFeature(listIndex)}
                                                        className="text-xs flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium transition-colors"
                                                    >
                                                        <Plus size={14} /> Add Feature
                                                    </button>
                                                </div>
                                                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                                                    {pkg.features.map((feature, featureIndex) => (
                                                        <div key={featureIndex} className="flex gap-2 group">
                                                            <input
                                                                type="text"
                                                                value={feature}
                                                                onChange={(e) => handleFeatureChange(listIndex, featureIndex, e.target.value)}
                                                                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-manima-red focus:ring-1 focus:ring-manima-red outline-none transition-all placeholder-gray-400"
                                                                placeholder="e.g. Live Streaming"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFeature(listIndex, featureIndex)}
                                                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-2 rounded-md hover:bg-red-50 transition-all"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {pkg.features.length === 0 && (
                                                        <div className="text-center py-4 border-2 border-dashed border-gray-100 rounded-lg">
                                                            <p className="text-xs text-gray-400">No features added yet</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image & Actions */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Image Upload Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-base font-heading font-semibold text-gray-800 mb-3">Puja Image</h2>
                            <div className="w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden hover:border-manima-red/50 transition-colors group relative">
                                {previewUrl ? (
                                    <>
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFile(null);
                                                    setPreviewUrl(null); // This might not be right if we want to keep original until changed
                                                }}
                                                className="bg-red-500/90 text-white p-3 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg backdrop-blur-sm"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                        <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                            <Plus className="h-8 w-8 text-manima-red" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">Upload New Photo</p>
                                        <p className="text-xs text-gray-500 mt-1">supports PNG, JPG</p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </label>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 mt-2 text-center">Uploading a new photo will replace the current one.</p>
                        </div>

                        {/* Actions Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-8">
                            <h2 className="text-base font-heading font-semibold text-gray-800 mb-3">Update</h2>
                            <p className="text-xs text-gray-500 mb-4">Review your details before updating.</p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-manima-red to-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-red-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Update Puja Service
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
