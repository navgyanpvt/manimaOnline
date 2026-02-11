"use client";

import { LogOut, Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminHeader({ title }: { title: string }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
            <h2 className="text-xl font-heading text-gray-800">{title}</h2>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-manima-red transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-manima-red">
                        <User size={16} />
                    </div>
                    <div className="hidden sm:block text-sm">
                        <p className="font-medium text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="ml-4 p-2 text-gray-400 hover:text-manima-red transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}
