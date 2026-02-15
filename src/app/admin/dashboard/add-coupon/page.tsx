"use client";

import { useState } from "react";
import { Save, Loader2, Tag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddCoupon() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        code: "",
        discountType: "PERCENTAGE", // 'PERCENTAGE' | 'FLAT'
        discountValue: "",
        minOrderValue: "",
        isActive: true,
        adImage: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            // @ts-ignore
            setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const payload = {
                ...formData,
                discountValue: Number(formData.discountValue),
                minOrderValue: formData.minOrderValue ? Number(formData.minOrderValue) : 0
            };

            const response = await fetch("/api/coupons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create coupon");
            }

            setSuccess(true);
            setFormData({
                code: "",
                discountType: "PERCENTAGE",
                discountValue: "",
                minOrderValue: "",
                isActive: true,
                adImage: ""
            });
            // Redirect to coupons list after short delay 
            setTimeout(() => router.push('/admin/dashboard/coupons'), 1500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-xl font-heading text-gray-800 mb-6 border-b pb-4 flex items-center gap-2">
                <Tag size={20} className="text-manima-red" />
                Create New Coupon
            </h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm">
                    Coupon created successfully! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors uppercase"
                        placeholder="e.g. SAVE10"
                    />
                    <p className="text-xs text-gray-500 mt-1">Code will be saved in uppercase.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${formData.discountType === 'PERCENTAGE'
                                ? 'border-manima-red bg-red-50 text-manima-red font-bold'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}>
                                <input
                                    type="radio"
                                    name="discountType"
                                    value="PERCENTAGE"
                                    checked={formData.discountType === 'PERCENTAGE'}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                % Percentage
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${formData.discountType === 'FLAT'
                                ? 'border-manima-red bg-red-50 text-manima-red font-bold'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}>
                                <input
                                    type="radio"
                                    name="discountType"
                                    value="FLAT"
                                    checked={formData.discountType === 'FLAT'}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                ₹ Flat Amount
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {formData.discountType === 'PERCENTAGE' ? 'Discount Percentage (%)' : 'Discount Amount (₹)'}
                        </label>
                        <input
                            type="number"
                            name="discountValue"
                            value={formData.discountValue}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                            placeholder={formData.discountType === 'PERCENTAGE' ? "e.g. 10" : "e.g. 500"}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Value (₹)</label>
                    <input
                        type="number"
                        name="minOrderValue"
                        value={formData.minOrderValue}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                        placeholder="Leave empty for no minimum (0)"
                    />
                    <p className="text-xs text-gray-500 mt-1">If left empty, it will default to 0 (no minimum required).</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Image URL (Optional)</label>
                    <input
                        type="text"
                        name="adImage"
                        // @ts-ignore
                        value={formData.adImage}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                        placeholder="e.g. /assets/coupon_ad.png"
                    />
                    <p className="text-xs text-gray-500 mt-1">Provide a URL for the coupon advertisement image.</p>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isActive"
                        id="isActive"
                        checked={formData.isActive}
                        // @ts-ignore
                        onChange={handleChange}
                        className="w-4 h-4 text-manima-red border-gray-300 rounded focus:ring-manima-red"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-manima-red text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {loading ? "Creating..." : "Create Coupon"}
                    </button>
                </div>
            </form>
        </div>
    );
}
