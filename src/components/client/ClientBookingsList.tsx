"use client";

import { useEffect, useState } from "react";
import { Loader2, Calendar, MapPin, ShieldCheck, Clock, User } from "lucide-react";

interface Booking {
    _id: string;
    service: { name: string };
    location: { name: string };
    price: number;
    paymentMethod: string;
    transactionId?: string;
    isPaymentVerified: boolean;
    status: string;
    agent?: { name: string; phone: string };
    createdAt: string;
    bookingDate: string;
}

export default function ClientBookingsList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/client/bookings');
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading your bookings...</div>;

    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">No Bookings Yet</h3>
                <p className="text-gray-500 text-sm mb-6">Book a ritual to get started with your spiritual journey.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif font-bold text-[#2C0E0F] flex items-center gap-3">
                <Calendar className="text-[#DAA520]" size={28} />
                My Bookings
            </h2>

            <div className="grid gap-6">
                {bookings.map((booking) => (
                    <div key={booking._id} className="group bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 relative overflow-hidden">

                        {/* Decorative Gradient Line */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#DAA520] to-[#2C0E0F]"></div>

                        <div className="flex flex-col md:flex-row justify-between gap-6">

                            {/* Left: Service Info */}
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between md:justify-start gap-4">
                                    <h3 className="text-xl font-bold text-gray-900 font-serif leading-tight">
                                        {booking.service?.name}
                                    </h3>
                                    {/* Mobile Status */}
                                    <div className="md:hidden">
                                        {booking.status === "Confirmed" ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                                <ShieldCheck size={12} /> Confirmed
                                            </span>
                                        ) : booking.status === "Pending" ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-100">
                                                <Clock size={12} /> Pending
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-wider border border-gray-100">
                                                {booking.status}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-[#DAA520]" />
                                        <span>{booking.location?.name}</span>
                                    </div>
                                    <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} className="text-[#DAA520]" />
                                        <span>{new Date(booking.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Status & Price (Desktop) */}
                            <div className="hidden md:flex flex-col items-end gap-2">
                                {booking.status === "Confirmed" ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider border border-green-100 shadow-sm">
                                        <ShieldCheck size={14} /> Confirmed
                                    </span>
                                ) : booking.status === "Pending" ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider border border-amber-100 shadow-sm">
                                        <Clock size={14} /> Verification Pending
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider border border-gray-100">
                                        {booking.status}
                                    </span>
                                )}
                                <p className="text-2xl font-bold text-[#2C0E0F]">₹{booking.price}</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-50 my-6"></div>

                        {/* Bottom Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Payment Info */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Details</p>
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <span className="text-sm font-semibold text-gray-700 capitalize">{booking.paymentMethod}</span>
                                    </div>
                                    {booking.transactionId && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono bg-yellow-50/50 px-2 py-1 rounded border border-yellow-100">
                                            <span>ID:</span>
                                            <span className="font-medium text-gray-700">{booking.transactionId}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Agent Info */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assigned Agent</p>
                                {booking.agent ? (
                                    <div className="flex items-center gap-3 group/agent">
                                        <div className="w-10 h-10 rounded-full bg-[#2C0E0F] text-[#DAA520] flex items-center justify-center shadow-md ring-2 ring-white group-hover/agent:scale-105 transition-transform">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{booking.agent.name}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-400 text-sm italic bg-gray-50/50 px-3 py-2 rounded-lg border border-gray-100/50 w-fit">
                                        <Clock size={14} />
                                        <span>Pandit assignment in progress...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Price (shows at bottom instead of top right) */}
                        <div className="md:hidden mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Total Amount</span>
                            <span className="text-xl font-bold text-[#2C0E0F]">₹{booking.price}</span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
