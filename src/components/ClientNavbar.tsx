
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function ClientNavbar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/client/logout", { method: "POST" });
            router.push("/client/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-[#FDFAF0] border-b border-[#DAA520]/20 px-6 py-4 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image
                        src="/assets/logo.png"
                        alt="Manima Logo"
                        width={40}
                        height={40}
                        className="object-contain transition-transform group-hover:scale-105"
                        unoptimized
                    />
                    <span className="font-serif text-xl font-bold text-[#D35400] tracking-wide">
                        Manima
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <span className="hidden md:flex items-center gap-2 text-[#8B4513] text-sm font-medium">
                        <User size={18} className="text-[#DAA520]" />
                        My Dashboard
                    </span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D35400]/30 text-[#D35400] text-sm font-semibold hover:bg-[#D35400] hover:text-white transition-all duration-300"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Log Out</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
