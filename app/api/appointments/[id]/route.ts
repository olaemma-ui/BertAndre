import { NextRequest, NextResponse } from 'next/server';
import { updateAppointmentStatus, deleteAppointment } from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const msgId = parseInt(id);
        const { status } = await request.json();
        const updated = await updateAppointmentStatus(msgId, status);
        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const msgId = parseInt(id);
        const success = await deleteAppointment(msgId);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
