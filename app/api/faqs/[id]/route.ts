import { NextRequest, NextResponse } from 'next/server';
import { updateFAQ, deleteFAQ } from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const faq = await updateFAQ(id, body);
        return NextResponse.json(faq);
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
        const success = await deleteFAQ(id);
        if (!success) {
            return NextResponse.json(
                { error: 'Failed to delete FAQ' },
                { status: 500 }
            );
        }
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
