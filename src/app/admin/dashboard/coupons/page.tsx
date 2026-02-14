"use client";

import { useEffect, useState } from "react";
import { Plus, Tag, Trash2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Coupon {
    _id: string;
    code: string;
    discountType: 'PERCENTAGE' | 'FLAT';
    discountValue: number;
    minOrderValue: number;
    isActive: boolean;
    createdAt: string;
}

export default function CouponsList() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const res = await fetch("/api/coupons");
            if (res.ok) {
                const data = await res.json();
                setCoupons(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch coupons", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this coupon?")) return;

        setDeleting(id);
        try {
            const res = await fetch(`/api/coupons?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setCoupons(prev => prev.filter(c => c._id !== id));
            } else {
                alert("Failed to delete coupon");
            }
        } catch (error) {
            console.error("Delete error", error);
            alert("Error deleting coupon");
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-manima-red" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 font-heading flex items-center gap-2">
                        <Tag className="text-manima-red" />
                        Coupons Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Create and manage discount coupons</p>
                </div>
                <Link
                    href="/admin/dashboard/add-coupon"
                    className="flex items-center gap-2 bg-manima-red text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium"
                >
                    <Plus size={18} />
                    Add New Coupon
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {coupons.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <Tag size={48} className="mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-800 mb-1">No Coupons Found</h3>
                        <p className="mb-6">Start by creating your first coupon code.</p>
                        <Link
                            href="/admin/dashboard/add-coupon"
                            className="text-manima-red font-bold hover:underline"
                        >
                            Create Coupon
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 font-semibold border-b border-gray-100">Code</th>
                                    <th className="p-4 font-semibold border-b border-gray-100">Discount</th>
                                    <th className="p-4 font-semibold border-b border-gray-100">Type</th>
                                    <th className="p-4 font-semibold border-b border-gray-100">Min Order</th>
                                    <th className="p-4 font-semibold border-b border-gray-100">Status</th>
                                    <th className="p-4 font-semibold border-b border-gray-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {coupons.map((coupon) => (
                                    <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-mono font-bold text-gray-800">
                                            {coupon.code}
                                        </td>
                                        <td className="p-4 font-medium text-green-600">
                                            {coupon.discountType === 'PERCENTAGE'
                                                ? `${coupon.discountValue}%`
                                                : `₹${coupon.discountValue}`}
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${coupon.discountType === 'PERCENTAGE'
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {coupon.discountType === 'PERCENTAGE' ? 'Percentage' : 'Flat Amount'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {coupon.minOrderValue > 0 ? `₹${coupon.minOrderValue}` : '-'}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${coupon.isActive
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-red-50 text-red-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${coupon.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {coupon.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDelete(coupon._id)}
                                                disabled={deleting === coupon._id}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                                                title="Delete Coupon"
                                            >
                                                {deleting === coupon._id ? (
                                                    <Loader2 size={18} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={18} />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
