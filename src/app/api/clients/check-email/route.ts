import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Client from "@/models/Client";

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
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const client = await Client.findOne({ email });

        if (client) {
            return NextResponse.json({ exists: true, client }, { status: 200 });
        } else {
            return NextResponse.json({ exists: false }, { status: 200 });
        }
    } catch (error) {
        console.error("Error checking client email:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
