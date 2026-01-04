import { NextRequest, NextResponse } from 'next/server';
import { updateContactMessageStatus } from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const messageId = parseInt(id);
        const { status } = await request.json();

        if (isNaN(messageId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const data = await updateContactMessageStatus(messageId, status);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
