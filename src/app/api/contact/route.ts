import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, pujaType, message } = body;

        if (!name || !phone || !pujaType) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Call Google Apps Script using environment variable
        const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

        if (scriptUrl) {
            await fetch(scriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    pujaType,
                    message,
                    timestamp: new Date().toISOString()
                })
            });
        } else {
            console.warn("GOOGLE_APPS_SCRIPT_URL is not defined in environment variables. Data not saved to sheet.");
        }

        return NextResponse.json(
            { message: 'Saved to Google Sheet', success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
