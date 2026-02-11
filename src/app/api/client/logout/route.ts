
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Get cookie store and delete the cookie
        const cookieStore = await cookies();
        cookieStore.delete("client_token"); // Standard way to delete cookie in Next.js App Router for server actions/routes

        // Also set it in the response to be doubly sure for the client
        response.cookies.set("client_token", "", {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        });

        // Clear the auth status cookie
        response.cookies.set("client_auth_status", "", {
            httpOnly: false,
            expires: new Date(0),
            path: '/',
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
