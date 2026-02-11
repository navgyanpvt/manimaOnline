"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, ArrowLeft, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const [step, setStep] = useState<1 | 2>(1); // 1: Reset Form, 2: Success
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: "Passwords do not match" });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/client/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStep(2);
            } else {
                setMessage({ type: 'error', text: data.error || "Failed to reset password. Link might be expired." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "An error occurred. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFAF0] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#DAA520] blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#D35400] blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-6 mx-4">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#DAA520]/20 p-8">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="mx-auto w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center mb-4 text-[#D35400]">
                            {step === 1 && <Lock size={24} />}
                            {step === 2 && <CheckCircle size={24} className="text-green-600" />}
                        </div>
                        <h1 className="font-serif text-2xl text-[#2C0E0F] font-bold">
                            {step === 1 && "Set New Password"}
                            {step === 2 && "Password Reset!"}
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">
                            {step === 1 && "Create a new secure password for your account."}
                            {step === 2 && "Your password has been successfully reset. You can now login."}
                        </p>
                    </div>

                    {/* Message Box */}
                    {message && (
                        <div className={`p-3 rounded-lg mb-6 text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {message.text}
                        </div>
                    )}

                    {/* Step 1: Form */}
                    {step === 1 && (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-[#5D4037] mb-1 uppercase tracking-wider">New Password</label>
                                <input
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-[#FDFAF0] border border-[#E0E0E0] focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] outline-none transition-all"
                                    placeholder="Enter new password"
                                    minLength={6}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#5D4037] mb-1 uppercase tracking-wider">Confirm Password</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-[#FDFAF0] border border-[#E0E0E0] focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] outline-none transition-all"
                                    placeholder="Confirm new password"
                                    minLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#2C3E50] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#34495E] transition-colors flex items-center justify-center disabled:opacity-70"
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : "Reset Password"}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Success Actions */}
                    {step === 2 && (
                        <div className="text-center">
                            <Link
                                href="/client/login"
                                className="block w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                            >
                                Proceed to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
