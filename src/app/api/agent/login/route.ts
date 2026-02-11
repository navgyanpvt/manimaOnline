
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agent from "@/models/Agent";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        // Find agent by email
        // Explicitly include password since it might be select: false in some setups (though not here)
        const agent = await Agent.findOne({ email });

        if (!agent) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        let isMatch = false;
        try {
            // Attempt to import bcryptjs dynamically to avoid crashing if it's missing
            const bcrypt = require('bcryptjs');
            isMatch = await bcrypt.compare(password, agent.password);
        } catch (e) {
            // Fallback to plain text if bcrypt fails or if passwords aren't hashed yet (legacy/dev data)
            isMatch = password === agent.password;
        }

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create Token using jose (Edge compatible)
        const secret = new TextEncoder().encode(JWT_SECRET);
        const token = await new SignJWT({
            id: agent._id.toString(),
            role: "agent",
            name: agent.name
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(secret);

        // Create response with cookie
        const response = NextResponse.json({
            message: "Login successful",
            agent: {
                _id: agent._id,
                name: agent.name,
                email: agent.email,
                role: "agent"
            }
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", // Better for top-level navigation
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error: any) {
        console.error("Agent login error:", error);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
