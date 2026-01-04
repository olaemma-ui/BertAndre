import { NextRequest, NextResponse } from 'next/server';
import { updateBlogCategory, deleteBlogCategory } from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const category = await updateBlogCategory(slug, body);

        return NextResponse.json(category);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const success = await deleteBlogCategory(slug);

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to delete category' },
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
