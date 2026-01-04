import { NextRequest, NextResponse } from 'next/server';
import { getBlogsCount } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category') || undefined;

        const count = await getBlogsCount(category);

        return NextResponse.json({ count });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
