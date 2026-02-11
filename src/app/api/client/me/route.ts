
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import mongoose from "mongoose";
import Client from "@/models/Client";
import { cookies } from "next/headers";

const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
};

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("client_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
        const { payload } = await jwtVerify(token, secret);

        await connectToDB();
        const client = await Client.findById(payload.id).select("-password");

        if (!client) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        return NextResponse.json(client);

    } catch (error) {
        console.error("Error fetching client details:", error);
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
