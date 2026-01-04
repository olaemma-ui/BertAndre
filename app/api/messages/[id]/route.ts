import { NextRequest, NextResponse } from 'next/server';
import { deleteContactMessage } from '@/lib/db';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const messageId = parseInt(id);

        if (isNaN(messageId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const success = await deleteContactMessage(messageId);
        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to delete message' }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
