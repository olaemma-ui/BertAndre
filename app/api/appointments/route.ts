import { NextRequest, NextResponse } from 'next/server';
import { getAppointments, createAppointment, updateAppointmentStatus, deleteAppointment } from '@/lib/db';
import { sendAppointmentNotification } from '@/lib/mail';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');
        const search = searchParams.get('search') || undefined;

        const data = await getAppointments({ limit, offset, search });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.full_name || !body.email || !body.appointment_date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const appointment = await createAppointment(body);

        // Send notification email
        try {
            await sendAppointmentNotification(appointment);
        } catch (mailError) {
            console.error('Failed to send notification email:', mailError);
            // Don't fail the whole request if email fails
        }

        return NextResponse.json(appointment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { id, status } = await request.json();
        const data = await updateAppointmentStatus(id, status);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id') || '');

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        const success = await deleteAppointment(id);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
