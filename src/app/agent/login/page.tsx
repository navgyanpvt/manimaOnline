
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AgentLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/agent/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Redirect to agent dashboard
            window.dispatchEvent(new Event("auth-change"));
            router.refresh();
            setTimeout(() => {
                router.push("/agent/dashboard");
            }, 100);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2C0E0F] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#DAA520] blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#5D4037] blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Header Strip */}
                    <div className="bg-[#DAA520] h-2 w-full"></div>

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2C0E0F] text-[#DAA520] mb-4 shadow-lg">
                                <ShieldCheck size={32} />
                            </div>
                            <h1 className="font-serif text-3xl text-[#2C0E0F] font-bold tracking-wide mb-2">Agent Portal</h1>
                            <p className="text-gray-500 text-sm">Authorized Personnel Only</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#DAA520] focus:bg-white focus:ring-2 focus:ring-[#DAA520]/20 outline-none transition-all text-gray-800"
                                    placeholder="agent@manima.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#DAA520] focus:bg-white focus:ring-2 focus:ring-[#DAA520]/20 outline-none transition-all text-gray-800 pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2C0E0F] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#2C0E0F] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#3E1415] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : "Access Dashboard"}
                            </button>
                        </form>

                        <div className="mt-8 text-center pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Having trouble logging in? <br />
                                <a href="mailto:admin@manima.com" className="text-[#DAA520] font-semibold hover:underline">Contact Administrator</a>
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-center text-white/30 text-xs mt-8">
                    &copy; 2025 Manima Services. Internal System.
                </p>
            </div>
        </div>
    );
}
