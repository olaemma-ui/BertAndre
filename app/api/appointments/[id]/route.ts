import { NextRequest, NextResponse } from 'next/server';
import { updateAppointmentStatus, deleteAppointment } from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const { status } = await request.json();
        const updated = await updateAppointmentStatus(id, status);
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
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const success = await deleteAppointment(id);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
