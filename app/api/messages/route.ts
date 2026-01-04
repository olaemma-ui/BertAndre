import { NextRequest, NextResponse } from 'next/server';
import { getContactMessages, createContactMessage } from '@/lib/db';
import { sendContactNotification } from '@/lib/mail';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');
        const search = searchParams.get('search') || undefined;

        const data = await getContactMessages({ limit, offset, search });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const message = await createContactMessage(body);

        // Send email notification
        try {
            await sendContactNotification(message);
        } catch (mailError) {
            console.error('Failed to send notification email:', mailError);
        }

        return NextResponse.json(message);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
