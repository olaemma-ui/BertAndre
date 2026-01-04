import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSetting } from '@/lib/db';

export async function GET() {
    try {
        const settings = await getSettings();
        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Body should be an array of { key, value } or a single object { key, value }
        if (Array.isArray(body)) {
            for (const item of body) {
                if (item.key && item.value !== undefined) {
                    await updateSetting(item.key, item.value);
                }
            }
        } else if (body.key && body.value !== undefined) {
            await updateSetting(body.key, body.value);
        } else {
            // Handle multiple keys in one object: { email: '...', phone: '...' }
            for (const [key, value] of Object.entries(body)) {
                await updateSetting(key, value as string);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
