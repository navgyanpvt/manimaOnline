import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/Booking";
import Client from "@/models/Client";
import Service from "@/models/Service";
import LocationModel from "@/models/Location";

const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
};

export async function POST(req: Request) {
    try {
        await connectToDB();
        const body = await req.json();

        // Basic validation
        if (!body.client || !body.location || !body.service || !body.priceCategory || !body.price) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const bookingData = {
            ...body,
            isPaymentVerified: false,
            status: "Pending"
        };

        const newBooking = await Booking.create(bookingData);

        // --- GOOGLE SHEETS INTEGRATION ---
        try {
            // 1. Fetch full details for the sheet
            const [clientDetails, serviceDetails, locationDetails] = await Promise.all([
                Client.findById(body.client),
                Service.findById(body.service),
                LocationModel.findById(body.location)
            ]);

            // Use a specific env var for Bookings to avoid conflict with other scripts
            const scriptUrl = process.env.GOOGLE_SHEETS_BOOKINGS_URL;

            if (clientDetails && serviceDetails && locationDetails && scriptUrl) {
                const sheetData = {
                    name: clientDetails.name,
                    email: clientDetails.email,
                    phone: clientDetails.phone,
                    address: clientDetails.address || "N/A",
                    service: serviceDetails.name,
                    location: locationDetails.name,
                    package: body.package,
                    price: body.price,
                    paymentMethod: body.paymentMethod,
                    transactionId: body.transactionId
                };

                // 2. Send to Google Apps Script
                fetch(scriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sheetData)
                }).then(res => res.text())
                    .catch(err => console.error("Google Sheet Error:", err));
            } else {
                console.warn("Skipping Google Sheet Sync: Missing details or Env Var.");
            }
        } catch (sheetError) {
            console.error("Error sending to Google Sheet:", sheetError);
            // Don't fail the booking if sheet sync fails
        }
        // ---------------------------------

        return NextResponse.json({ message: "Booking created successfully", booking: newBooking }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
