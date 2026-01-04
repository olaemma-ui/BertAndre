"use server";

import { getProjects, getBlogs, getServices, getFAQs, Project, BlogPost, Service, FAQ } from "@/lib/db";

export type SearchResult = {
    type: "project" | "blog";
    title: string;
    description: string;
    url: string;
    image: string;
    category: string;
};

export async function searchSite(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length === 0) return [];

    // Parallel fetching for performance
    const [{ projects }, { blogs }, { services }, { faqs }] = await Promise.all([
        getProjects({ search: query, limit: 5 }),
        getBlogs({ search: query, limit: 5 }),
        getServices({ search: query, limit: 5 }),
        getFAQs({ search: query, limit: 5 })
    ]);

    const projectResults: SearchResult[] = projects.map((p) => ({
        type: "project",
        title: p.title,
        description: p.description,
        url: `/projects/${p.slug}`,
        image: p.image,
        category: p.category,
    }));

    const blogResults: SearchResult[] = blogs.map((b) => ({
        type: "blog",
        title: b.title,
        description: b.excerpt,
        url: `/blogs/${b.slug}`,
        image: b.imageUrl || "/placeholder.svg",
        category: b.category || "Blog",
    }));

    const serviceResults: SearchResult[] = services.map((s) => ({
        type: "project", // Using 'project' type for consistent UI look in search modal
        title: s.title,
        description: s.description,
        url: `/services/${s.slug}`,
        image: s.image,
        category: "Service",
    }));

    const faqResults: SearchResult[] = faqs.map((f) => ({
        type: "blog", // Using 'blog' type for consistent UI look in search modal
        title: f.question,
        description: f.answer,
        url: `/faq`,
        image: "/images/logo.png", // Generic image for FAQs
        category: "FAQ",
    }));

    return [...projectResults, ...blogResults, ...serviceResults, ...faqResults];
}
