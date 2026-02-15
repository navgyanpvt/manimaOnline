import React, { useState, useEffect } from "react";
import { X, User, Phone, ScrollText, Calendar, Loader2, Mail } from "lucide-react";
import SuccessModal from "./SuccessModal";
import Image from "next/image";

interface PujaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormState {
    name: string;
    phone: string;
    email: string;
    pujaType: string;
    message: string;
}

interface Errors {
    name?: string;
    phone?: string;
    email?: string;
    pujaType?: string;
}

const PujaModal: React.FC<PujaModalProps> = ({ isOpen, onClose }) => {
    const [form, setForm] = useState<FormState>({
        name: "",
        phone: "",
        email: "",
        pujaType: "",
        message: ""
    });

    const [errors, setErrors] = useState<Errors>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [services, setServices] = useState<{ _id: string; name: string }[]>([]);
    const [pujas, setPujas] = useState<{ _id: string; name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                if (res.ok) {
                    const data = await res.json();
                    setServices(data);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            }
        };

        const fetchPujas = async () => {
            try {
                const res = await fetch('/api/puja');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setPujas(data.data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch pujas", error);
            }
        };

        fetchServices();
        fetchPujas();
    }, []);

    // Check if user has already booked in this session
    React.useEffect(() => {
        if (isOpen) {
            const booked = sessionStorage.getItem('isFilled');
            if (booked === 'true') {
                setIsBooked(true);
            }
        }
    }, [isOpen]);

    if (!isOpen && !showSuccess) return null;

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setSelectedCategory(category);

        // If category is NOT "Puja", use the category as the pujaType (unless it's empty)
        if (category !== "Puja") {
            setForm(prev => ({ ...prev, pujaType: category }));
        } else {
            // If "Puja" is selected, clear the pujaType so user is forced to select a specific temple
            setForm(prev => ({ ...prev, pujaType: "" }));
        }

        if (errors.pujaType) {
            setErrors({ ...errors, pujaType: undefined });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name as keyof Errors]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    };

    const validate = () => {
        const newErrors: Errors = {};
        if (!form.name || form.name.length < 3) newErrors.name = "Please enter your full name";
        if (!/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit mobile number";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address";

        if (!selectedCategory) {
            newErrors.pujaType = "Please select a service type";
        } else if (selectedCategory === "Puja" && !form.pujaType) {
            newErrors.pujaType = "Please select a temple";
        } else if (!form.pujaType) {
            newErrors.pujaType = "Please select a service";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                // Set session storage on success
                sessionStorage.setItem('isFilled', 'true');

                setErrors({});
                setShowSuccess(true);
                onClose();
                setForm({ name: "", phone: "", email: "", pujaType: "", message: "" });
                setSelectedCategory("");
            } else {
                setErrors({ name: "Failed to submit request. Please try again." });
            }
        } catch (error) {
            setErrors({ name: "Network error. Please check your connection." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="z-[1000] fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300 ">
                    <div
                        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row border border-[#e6d0a8] animate-in fade-in zoom-in duration-300 max-h-[90vh] md:h-auto"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Close Button Mobile/Desktop */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 z-10 bg-white/50 hover:bg-white text-gray-800 rounded-full p-2 transition-all shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side - Image */}
                        <div className="hidden md:block w-2/5 relative overflow-hidden">
                            <Image
                                src="/assets/puja-side.png"
                                alt="Peaceful Diya"
                                fill
                                className="object-cover scale-115"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">Sacred Rituals</h3>
                                <p className="text-sm opacity-90 font-light">
                                    "Honor your roots with authentic traditions performed by Vedic pandits."
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto custom-scrollbar min-h-[550px] flex flex-col">
                            {isBooked ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-[family-name:var(--font-heading)]">Already Booked!</h2>
                                    <p className="text-gray-600 max-w-sm">
                                        You have already submitted a request. Our team will contact you shortly on your provided number.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-4 px-6 py-2 bg-[#D35400] text-white rounded-full text-sm font-semibold hover:bg-[#b04600] transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-[#D35400] font-[family-name:var(--font-heading)] tracking-wide mb-1">
                                            Request Assistance
                                        </h2>
                                        <p className="text-gray-500 text-sm">
                                            Fill in your details to book a puja or get a consultation.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Name Input */}
                                            <div className="space-y-1">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <User size={16} />
                                                    </div>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-[#D35400] focus:ring-1 focus:ring-[#D35400]'} rounded-lg outline-none transition-all placeholder:text-gray-400 text-sm text-gray-900`}
                                                    />
                                                </div>
                                                {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                                            </div>

                                            {/* Phone Input */}
                                            <div className="space-y-1">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <Phone size={16} />
                                                    </div>
                                                    <input
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="Mobile Number"
                                                        value={form.phone}
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                        className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-[#D35400] focus:ring-1 focus:ring-[#D35400]'} rounded-lg outline-none transition-all placeholder:text-gray-400 text-sm text-gray-900`}
                                                    />
                                                </div>
                                                {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        {/* Email Input */}
                                        <div className="space-y-1">
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Email (Optional)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <Mail size={16} />
                                                </div>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#D35400] focus:ring-1 focus:ring-[#D35400]'} rounded-lg outline-none transition-all placeholder:text-gray-400 text-sm text-gray-900`}
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Service Type Select */}
                                        <div className="space-y-1">
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Type</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <ScrollText size={16} />
                                                </div>
                                                <select
                                                    name="category"
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    className={`w-full pl-9 pr-8 py-2.5 bg-gray-50 border ${errors.pujaType ? 'border-red-500' : 'border-gray-200 focus:border-[#D35400] focus:ring-1 focus:ring-[#D35400]'} rounded-lg outline-none appearance-none transition-all text-gray-900 text-sm`}
                                                >
                                                    <option value="">Select Service...</option>
                                                    {services.map(service => (
                                                        <option key={service._id} value={service.name}>{service.name}</option>
                                                    ))}
                                                    <option value="Puja">Puja</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Temple Selection - Shows only if 'Puja' is selected */}
                                        {selectedCategory === 'Puja' && (
                                            <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Temple</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <ScrollText size={16} />
                                                    </div>
                                                    <select
                                                        name="pujaType"
                                                        value={form.pujaType}
                                                        onChange={handleChange}
                                                        className={`w-full pl-9 pr-8 py-2.5 bg-gray-50 border ${errors.pujaType ? 'border-red-500' : 'border-gray-200 focus:border-[#D35400] focus:ring-1 focus:ring-[#D35400]'} rounded-lg outline-none appearance-none transition-all text-gray-900 text-sm`}
                                                    >
                                                        <option value="">Select Temple...</option>
                                                        {pujas.map(puja => (
                                                            <option key={puja._id} value={puja.name}>{puja.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                                    </div>
                                                </div>
                                                {errors.pujaType && <p className="text-red-500 text-[10px] mt-1">{errors.pujaType}</p>}
                                            </div>
                                        )}

                                        {/* Error message for Service Type if needed */}
                                        {errors.pujaType && selectedCategory !== 'Puja' && <p className="text-red-500 text-[10px] mt-1">{errors.pujaType}</p>}

                                        {/* Message Textarea */}
                                        <div className="space-y-1">
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</label>
                                            <div className="relative">
                                                <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                                                    <Calendar size={16} />
                                                </div>
                                                <textarea
                                                    rows={2}
                                                    name="message"
                                                    placeholder="Preferred date, location..."
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D35400] focus:ring-1 focus:ring-[#D35400] transition-all placeholder:text-gray-400 resize-none text-sm text-gray-900"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-2 bg-[#D35400] hover:bg-[#b04600] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" /> Processing...
                                                </>
                                            ) : (
                                                <>Submit Request</>
                                            )}
                                        </button>

                                        <p className="text-[10px] text-center text-gray-400 mt-2">
                                            By submitting, you agree to be contacted for the selected service.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <SuccessModal
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
            />
        </>
    );
};

export default PujaModal;
