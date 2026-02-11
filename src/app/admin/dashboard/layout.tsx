"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case "/admin/dashboard":
                return "Dashboard";
            case "/admin/dashboard/add-client":
                return "Add Client";
            case "/admin/dashboard/add-location":
                return "Add Location";
            case "/admin/dashboard/add-agent":
                return "Add Agent";
            case "/admin/dashboard/add-booking":
                return "Add Booking";
            case "/admin/dashboard/add-pandit":
                return "Add Pandit";
            case "/admin/dashboard/add-service":
                return "Add Service";
            default:
                return "Admin";
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 md:ml-64 flex flex-col">
                <AdminHeader title={getTitle()} />
                <main className="p-6 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
