"use client";

import NewBookingsTable from "@/components/admin/NewBookingsTable";

export default function AllBookingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 font-heading">All Bookings</h1>
            </div>
            <NewBookingsTable />
        </div>
    );
}
