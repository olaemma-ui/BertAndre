// Project interfaces
export interface ProjectModule {
    id?: number;
    project_slug: string;
    projectSlug?: string;
    title: string;
    description: string;
    image: string;
    display_order?: number;
    displayOrder?: number;
}

export interface GalleryItem {
    id?: number;
    project_slug: string;
    projectSlug?: string;
    type: 'image' | 'video';
    url: string;
    caption?: string;
    display_order?: number;
    displayOrder?: number;
}

export interface Project {
    id?: number;
    title: string;
    slug: string;
    category: string;
    image: string;
    description: string;
    detailed_description: string;
    detailedDescription?: string;
    external_link?: string;
    externalLink?: string;
    ios_link?: string;
    iosLink?: string;
    android_link?: string;
    androidLink?: string;
    icon_url?: string;
    seo_title?: string;
    seo_description?: string;
    created_at?: string;
    updated_at?: string;
    modules?: ProjectModule[];
    gallery?: GalleryItem[];
}

// Export empty array - data now comes from database via lib/db.ts
// WARNING: Do not add content here. This file is kept for interface compatibility and type definitions only.
export const projects: Project[] = [];
