
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agent from "@/models/Agent";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: Request) {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        try {
            const secret = new TextEncoder().encode(JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            const decoded = payload as any;

            if (decoded.role !== "agent") {
                return NextResponse.json(
                    { error: "Unauthorized role" },
                    { status: 403 }
                );
            }

            // User requested to NOT use location population to avoid schema errors
            // Just fetching agent details
            const agent = await Agent.findById(decoded.id).select("-password");

            if (!agent) {
                return NextResponse.json(
                    { error: "Agent not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ agent });

        } catch (err: any) {
            console.error("JWT Verify Error:", err.message);
            return NextResponse.json(
                {
                    error: `Token verification failed: ${err.message}`,
                    debug_token_length: token.length
                },
                { status: 401 }
            );
        }

    } catch (error: any) {
        console.error("Agent fetch error:", error);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
