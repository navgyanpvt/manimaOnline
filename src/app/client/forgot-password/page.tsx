"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1); // 1: Email, 2: Success (Link Sent)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [email, setEmail] = useState("");

    const handleSendLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/client/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStep(2);
            } else {
                setMessage({ type: 'error', text: data.error || "Failed to send reset link" });
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

                    {/* Back Link */}
                    <Link href="/client/login" className="flex items-center text-sm text-[#8B4513] hover:text-[#D35400] mb-6 transition-colors font-medium">
                        <ArrowLeft size={16} className="mr-1" /> Back to Login
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="mx-auto w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center mb-4 text-[#D35400]">
                            {step === 1 && <Mail size={24} />}
                            {step === 2 && <CheckCircle size={24} className="text-green-600" />}
                        </div>
                        <h1 className="font-serif text-2xl text-[#2C0E0F] font-bold">
                            {step === 1 && "Forgot Password?"}
                            {step === 2 && "Check Your Email"}
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">
                            {step === 1 && "Enter your email to receive a password reset link."}
                            {step === 2 && `We have sent a password reset link to ${email}. The link is valid for 15 minutes.`}
                        </p>
                    </div>

                    {/* Message Box */}
                    {message && (
                        <div className={`p-3 rounded-lg mb-6 text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {message.text}
                        </div>
                    )}

                    {/* Step 1: Email Form */}
                    {step === 1 && (
                        <form onSubmit={handleSendLink} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-[#5D4037] mb-1 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-[#FDFAF0] border border-[#E0E0E0] focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] outline-none transition-all"
                                    placeholder="Enter your registered email"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#D35400] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#E67E22] transition-colors flex items-center justify-center disabled:opacity-70"
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : "Send Reset Link"}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Confirmation / Resend */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-sm text-green-800 text-center">
                                If you don't see the email, please check your spam folder.
                            </div>
                            <button
                                onClick={() => setStep(1)}
                                className="w-full bg-white border border-[#D35400] text-[#D35400] font-bold py-3 rounded-lg hover:bg-[#FFF3E0] transition-colors flex items-center justify-center"
                            >
                                Resend Link
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Text */}
                <p className="text-center text-[#8B4513]/60 text-xs mt-6 font-serif italic">
                    "Serve your ancestors with devotion"
                </p>
            </div>
        </div>
    );
}
