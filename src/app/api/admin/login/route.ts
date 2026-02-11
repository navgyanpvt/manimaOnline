import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        await dbConnect();

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create JWT
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || "your-secret-key"
        );
        const alg = "HS256";

        const token = await new SignJWT({
            username: user.username,
            role: user.role
        })
            .setProtectedHeader({ alg })
            .setExpirationTime("24h")
            .sign(secret);

        // Create response
        const response = NextResponse.json(
            { message: "Login successful", success: true },
            { status: 200 }
        );

        // Set cookie
        response.cookies.set({
            name: "admin_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
