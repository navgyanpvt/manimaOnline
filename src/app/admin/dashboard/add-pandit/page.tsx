"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function AddPandit() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        location: "",
        specialization: "",
        experience: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Functionality to add pandit coming soon!");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-xl font-heading text-gray-800 mb-6 border-b pb-4">Add New Pandit</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pandit Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                        placeholder="Enter pandit name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                        >
                            <option value="">Select Location</option>
                            <option value="gaya">Gaya</option>
                            <option value="kashi">Kashi</option>
                            <option value="prayagraj">Prayagraj</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                        <input
                            type="text"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                            placeholder="e.g. Pinda Daan, Rudrabhishek"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-manima-gold/20 focus:border-manima-gold outline-none transition-colors"
                            placeholder="e.g. 15"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-manima-red text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium"
                    >
                        <Save size={18} />
                        Save Pandit
                    </button>
                </div>
            </form>
        </div>
    );
}
