import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Client from "@/models/Client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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
        const { token, newPassword, confirmPassword } = await req.json();

        if (!token || !newPassword || !confirmPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        // Hash the incoming token to compare with DB
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        console.log("Reset Password: Received Token:", token);
        console.log("Reset Password: Hashed Token:", resetPasswordToken);

        const client = await Client.findOne({
            resetPasswordToken,
            resetPasswordTokenExpiry: { $gt: new Date() },
        });

        if (!client) {
            console.log("Reset Password: No matching client found or token expired.");
            // Debug: Check if token exists at all without expiry check
            const debugClient = await Client.findOne({ resetPasswordToken });
            if (debugClient) {
                console.log("Reset Password DEBUG: Client found but expired.", debugClient.resetPasswordTokenExpiry);
            } else {
                console.log("Reset Password DEBUG: Token not found in DB.");
            }
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        client.password = hashedPassword;
        client.resetPasswordToken = undefined;
        client.resetPasswordTokenExpiry = undefined;
        await client.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });

    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
