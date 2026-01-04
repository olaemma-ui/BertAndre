import { NextRequest, NextResponse } from 'next/server';
import { getFAQs, createFAQ } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || undefined;
        const category = searchParams.get('category') || undefined;
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');

        const data = await getFAQs({
            search,
            category,
            limit,
            offset
        });

        return NextResponse.json(data);
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

        if (!body.question || !body.answer) {
            return NextResponse.json(
                { error: 'Question and answer are required' },
                { status: 400 }
            );
        }

        const faq = await createFAQ(body);
        return NextResponse.json(faq);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
