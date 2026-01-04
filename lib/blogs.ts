// Blog Post interface
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    imageUrl?: string;
    date: string;
    author: string;
    category?: string;
    seo_title?: string;
    seo_description?: string;
}

// Export empty array - data now comes from database via lib/db.ts
// WARNING: Do not add content here. This file is kept for interface compatibility and type definitions only.
export const blogs: BlogPost[] = [];
