import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Service from "@/models/Service";

// Helper function to connect to DB
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
        const { name, details } = await req.json();

        if (!name || !details) {
            return NextResponse.json({ error: "Name and details are required" }, { status: 400 });
        }

        const newService = await Service.create({ name, details });

        return NextResponse.json({ message: "Service created successfully", service: newService }, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Service with this name already exists" }, { status: 400 });
        }
        console.error("Error creating service:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDB();
        const services = await Service.find({}).sort({ createdAt: -1 });
        return NextResponse.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}
