import { NextRequest, NextResponse } from 'next/server';
import { getBlogCategories } from '@/lib/db';

export async function GET() {
    try {
        const categories = await getBlogCategories();
        return NextResponse.json(categories);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
