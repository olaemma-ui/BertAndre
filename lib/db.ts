import { createClient, createAdminClient } from './supabase/server';
import { BlogPost } from './blogs';
import { Service } from './services';

export type { BlogPost, Service };

// ==================== PROJECTS ====================

export interface ProjectModule {
    id?: number;
    project_slug: string;
    title: string;
    description: string;
    image: string;
    display_order?: number;
}

export interface GalleryItem {
    id?: number;
    project_slug: string;
    type: 'image' | 'video';
    url: string;
    caption?: string;
    display_order?: number;
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

export interface Appointment {
    id?: number;
    name: string;
    email: string;
    company?: string;
    service_type: string;
    message: string;
    preferred_timing: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    created_at?: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    service_type?: string;
    message: string;
    status: 'unread' | 'read' | 'replied' | 'archived';
    created_at?: string;
    updated_at?: string;
}

// Projects
export async function getProjects(options?: {
    search?: string;
    category?: string;
    limit?: number;
    offset?: number;
}): Promise<{ projects: Project[], count: number }> {
    const supabase = createAdminClient();
    let query = supabase
        .from('projects')
        .select(`
      *,
      modules:project_modules(*),
      gallery:project_gallery(*)
    `, { count: 'exact' })
        .order('created_at', { ascending: false });

    if (options?.search) {
        query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options?.category) {
        query = query.eq('category', options.category);
    }

    if (options?.limit) {
        const offset = options.offset || 0;
        query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching projects:', error);
        return { projects: [], count: 0 };
    }

    const projects = (data || []).map((p: any) => ({
        ...p,
        detailedDescription: p.detailed_description,
        externalLink: p.external_link,
        iosLink: p.ios_link,
        androidLink: p.android_link,
        modules: p.modules?.map((m: any) => ({
            ...m,
            projectSlug: m.project_slug,
            displayOrder: m.display_order
        })),
        gallery: p.gallery?.map((g: any) => ({
            ...g,
            projectSlug: g.project_slug,
            displayOrder: g.display_order
        }))
    }));

    return { projects, count: count || 0 };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('projects')
        .select(`
      *,
      modules:project_modules(*),
      gallery:project_gallery(*)
    `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching project:', error);
        return null;
    }

    return {
        ...data,
        detailedDescription: data.detailed_description,
        externalLink: data.external_link,
        iosLink: data.ios_link,
        androidLink: data.android_link,
        modules: data.modules?.map((m: any) => ({
            ...m,
            projectSlug: m.project_slug,
            displayOrder: m.display_order
        })),
        gallery: data.gallery?.map((g: any) => ({
            ...g,
            projectSlug: g.project_slug,
            displayOrder: g.display_order
        }))
    };
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
    const supabaseAdmin = createAdminClient();
    let { data, error } = await supabaseAdmin
        .from('projects')
        .insert([{
            title: project.title,
            slug: project.slug,
            category: project.category,
            image: project.image,
            description: project.description,
            detailed_description: project.detailedDescription || project.detailed_description,
            external_link: project.externalLink || project.external_link,
            ios_link: project.iosLink || project.ios_link,
            android_link: project.androidLink || project.android_link,
            icon_url: project.icon_url,
            seo_title: project.seo_title,
            seo_description: project.seo_description,
        }])
        .select()
        .single();

    if (error) {
        // Fallback: If columns are missing, retry with core fields only
        if (error.code === 'PGRST204' && (error.message.includes('seo_') || error.message.includes('icon_url'))) {
            console.warn('  ⚠️ Schema mismatch, retrying create with core fields only...');
            const { data: retryData, error: retryError } = await supabaseAdmin
                .from('projects')
                .insert([{
                    title: project.title,
                    slug: project.slug,
                    category: project.category,
                    image: project.image,
                    description: project.description,
                    detailed_description: project.detailedDescription || project.detailed_description,
                    external_link: project.externalLink || project.external_link,
                    ios_link: project.iosLink || project.ios_link,
                    android_link: project.androidLink || project.android_link,
                }])
                .select()
                .single();

            if (retryError) throw retryError;
            // Use retryData for subsequent ops
            data = retryData;
        } else {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    // Insert modules if provided
    if (project.modules && project.modules.length > 0) {
        const modules = project.modules.map((module, index) => ({
            project_slug: project.slug,
            title: module.title,
            description: module.description,
            image: module.image,
            display_order: index,
        }));

        const { error: insertError } = await supabaseAdmin.from('project_modules').insert(modules);
        if (insertError) {
            console.error('Error inserting project modules:', insertError);
            throw insertError;
        }
    }

    // Insert gallery items if provided
    if (project.gallery && project.gallery.length > 0) {
        const gallery = project.gallery.map((item, index) => ({
            project_slug: project.slug,
            type: item.type,
            url: item.url,
            caption: item.caption,
            display_order: index,
        }));

        const { error: galleryError } = await supabaseAdmin.from('project_gallery').insert(gallery);
        if (galleryError) {
            console.error('Error inserting project gallery:', galleryError);
            throw galleryError;
        }
    }

    return getProjectBySlug(project.slug);
}

export async function updateProject(slug: string, project: Partial<Project>): Promise<Project | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('projects')
        .update({
            title: project.title,
            category: project.category,
            image: project.image,
            description: project.description,
            detailed_description: project.detailedDescription || project.detailed_description,
            external_link: project.externalLink || project.external_link,
            ios_link: project.iosLink || project.ios_link,
            android_link: project.androidLink || project.android_link,
            icon_url: project.icon_url,
            seo_title: project.seo_title,
            seo_description: project.seo_description,
            updated_at: new Date().toISOString(),
        })
        .eq('slug', slug)
        .select()
        .single();

    if (error) {
        // Fallback: If columns are missing, retry with core fields only
        // if (error.code === 'PGRST204' && (error.message.includes('seo_') || error.message.includes('icon_url'))) {
        //     console.warn('  ⚠️ Schema mismatch, retrying update with core fields only...');
        //     const { data: retryData, error: retryError } = await supabaseAdmin
        //         .from('projects')
        //         .update({
        //             title: project.title,
        //             category: project.category,
        //             image: project.image,
        //             description: project.description,
        //             detailed_description: project.detailedDescription || project.detailed_description,
        //             external_link: project.externalLink || project.external_link,
        //             ios_link: project.iosLink || project.ios_link,
        //             android_link: project.androidLink || project.android_link,
        //             updated_at: new Date().toISOString(),
        //         })
        //         .eq('slug', slug)
        //         .select()
        //         .single();

        //     if (retryError) throw retryError;
        //     // If manual map required, assign it here but data will be from DB
        //     return { ...retryData, detailedDescription: retryData.detailed_description /* etc */ };
        // }

        console.error('Error updating project:', error);
        throw error;
    }

    // Use the confirmed slug from the database (in case it was updated or normalized)
    const currentSlug = data.slug;

    // Update modules if provided
    if (project.modules) {
        // Delete existing modules using the NEW slug (if cascade didn't handle it, or just to be safe/clear)
        // If ON UPDATE CASCADE is on, they have currentSlug. If not, this logic depends on DB constraints.
        // Assuming we want to replace them entirely:
        const { error: deleteError } = await supabaseAdmin.from('project_modules').delete().eq('project_slug', currentSlug);
        if (deleteError) {
            console.error('Error deleting project modules:', deleteError);
            throw deleteError;
        }

        // Insert new modules
        if (project.modules.length > 0) {
            const modules = project.modules.map((module, index) => ({
                project_slug: currentSlug,
                title: module.title,
                description: module.description,
                image: module.image,
                display_order: index,
            }));

            const { error: insertError } = await supabaseAdmin.from('project_modules').insert(modules);
            if (insertError) {
                console.error('Error inserting project modules:', insertError);
                throw insertError;
            }
        }
    }

    // Update gallery if provided
    if (project.gallery) {
        // Delete existing gallery items
        const { error: deleteError } = await supabaseAdmin.from('project_gallery').delete().eq('project_slug', currentSlug);
        if (deleteError) {
            console.error('Error deleting project gallery:', deleteError);
            throw deleteError;
        }

        // Insert new gallery items
        if (project.gallery.length > 0) {
            const gallery = project.gallery.map((item, index) => ({
                project_slug: currentSlug,
                type: item.type,
                url: item.url,
                caption: item.caption,
                display_order: index,
            }));

            const { error: insertError } = await supabaseAdmin.from('project_gallery').insert(gallery);
            if (insertError) {
                console.error('Error inserting project gallery:', insertError);
                throw insertError;
            }
        }
    }

    return getProjectBySlug(currentSlug);
}

export async function deleteProject(slug: string): Promise<boolean> {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('projects')
        .delete()
        .eq('slug', slug);

    if (error) {
        console.error('Error deleting project:', error);
        return false;
    }

    return true;
}

// ==================== BLOGS ====================

export async function getBlogs(options?: {
    search?: string;
    category?: string;
    limit?: number;
    offset?: number;
}): Promise<{ blogs: BlogPost[], count: number }> {
    const supabase = createAdminClient();
    let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

    if (options?.search) {
        query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%,content.ilike.%${options.search}%`);
    }

    if (options?.category) {
        query = query.eq('category', options.category);
    }

    if (options?.limit) {
        const offset = options.offset || 0;
        query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching blogs:', error);
        return { blogs: [], count: 0 };
    }

    const blogs = (data || []).map((blog: any) => ({
        id: blog.id.toString(),
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        imageUrl: blog.image_url,
        date: blog.published_date || blog.created_at,
        author: blog.author,
        category: blog.category,
        seo_title: blog.seo_title,
        seo_description: blog.seo_description,
    }));

    return { blogs, count: count || 0 };
}

export async function getBlogsCount(category?: string): Promise<number> {
    const supabase = createAdminClient();
    let query = supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });

    if (category) {
        query = query.eq('category', category);
    }

    const { count, error } = await query;

    if (error) {
        console.error('Error fetching blogs count:', error);
        return 0;
    }

    return count || 0;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching blog:', error);
        return null;
    }

    return {
        id: data.id.toString(),
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        imageUrl: data.image_url,
        date: data.published_date || data.created_at,
        author: data.author,
        category: data.category,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
    };
}

export async function createBlog(blog: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('blogs')
        .insert([{
            title: blog.title,
            slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            excerpt: blog.excerpt,
            content: blog.content,
            image_url: blog.imageUrl,
            author: blog.author,
            category: blog.category,
            published_date: blog.date,
            seo_title: blog.seo_title,
            seo_description: blog.seo_description,
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating blog:', error);
        throw error;
    }

    return {
        id: data.id.toString(),
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        imageUrl: data.image_url,
        date: data.published_date || data.created_at,
        author: data.author,
        category: data.category,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
    };
}

export async function updateBlog(slug: string, blog: Partial<BlogPost>): Promise<BlogPost | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('blogs')
        .update({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            image_url: blog.imageUrl,
            author: blog.author,
            category: blog.category,
            published_date: blog.date,
            seo_title: blog.seo_title,
            seo_description: blog.seo_description,
        })
        .eq('slug', slug)
        .select()
        .single();

    if (error) {
        console.error('Error updating blog:', error);
        throw error;
    }

    return {
        id: data.id.toString(),
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        imageUrl: data.image_url,
        date: data.published_date || data.created_at,
        author: data.author,
        category: data.category,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
    };
}

export async function deleteBlog(slug: string): Promise<boolean> {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('blogs')
        .delete()
        .eq('slug', slug);

    if (error) {
        console.error('Error deleting blog:', error);
        return false;
    }

    return true;
}

// ==================== SERVICES ====================

export async function getServices(options?: {
    search?: string;
    category?: string;
    limit?: number;
    offset?: number;
}): Promise<{ services: Service[], count: number }> {
    const supabase = createAdminClient();
    let query = supabase
        .from('services')
        .select(`
      *,
      features:service_features(*)
    `, { count: 'exact' })
        .order('created_at', { ascending: false });

    if (options?.search) {
        query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options?.limit) {
        const offset = options.offset || 0;
        query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching services:', error);
        return { services: [], count: 0 };
    }

    const services = (data || []).map((service: any) => ({
        title: service.title,
        slug: service.slug,
        icon: service.icon,
        description: service.description,
        detailedDescription: service.detailed_description,
        image: service.image,
        features: service.features?.map((f: any) => f.feature) || [],
    }));

    return { services, count: count || 0 };
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('services')
        .select(`
      *,
      features:service_features(*)
    `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching service:', error);
        return null;
    }

    return {
        title: data.title,
        slug: data.slug,
        icon: data.icon,
        description: data.description,
        detailedDescription: data.detailed_description,
        image: data.image,
        features: data.features?.map((f: any) => f.feature) || [],
    };
}

export async function createService(service: Service): Promise<Service | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('services')
        .insert([{
            title: service.title,
            slug: service.slug,
            icon: service.icon,
            description: service.description,
            detailed_description: service.detailedDescription,
            image: service.image,
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating service:', error);
        throw error;
    }

    // Insert features
    if (service.features && service.features.length > 0) {
        const features = service.features.map((feature, index) => ({
            service_slug: service.slug,
            feature,
            display_order: index,
        }));

        await supabaseAdmin.from('service_features').insert(features);
    }

    return service;
}

export async function updateService(slug: string, service: Partial<Service>): Promise<Service | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('services')
        .update({
            title: service.title,
            description: service.description,
            detailed_description: service.detailedDescription,
            image: service.image,
            icon: service.icon,
        })
        .eq('slug', slug)
        .select()
        .single();

    if (error) {
        console.error('Error updating service:', error);
        throw error;
    }

    // Update features if provided
    if (service.features) {
        // Delete existing features
        await supabaseAdmin.from('service_features').delete().eq('service_slug', slug);

        // Insert new features
        const features = service.features.map((feature, index) => ({
            service_slug: slug,
            feature,
            display_order: index,
        }));

        await supabaseAdmin.from('service_features').insert(features);
    }

    // Return updated service with features
    const updatedService = await getServiceBySlug(slug);
    return updatedService;
}

// ==================== BLOG CATEGORIES ====================

export interface BlogCategory {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    created_at?: string;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching blog categories:', error);
        return [];
    }

    return data || [];
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching blog category:', error);
        return null;
    }

    return data;
}

// ==================== FAQS ====================

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category?: string;
    display_order?: number;
    created_at?: string;
}

export async function getFAQs(options?: {
    search?: string;
    category?: string;
    limit?: number;
    offset?: number;
}): Promise<{ faqs: FAQ[], count: number }> {
    const supabase = createAdminClient();
    let query = supabase
        .from('faqs')
        .select('*', { count: 'exact' })
        .order('display_order', { ascending: true });

    if (options?.search) {
        query = query.or(`question.ilike.%${options.search}%,answer.ilike.%${options.search}%`);
    }

    if (options?.category) {
        query = query.eq('category', options.category);
    }

    if (options?.limit) {
        const offset = options.offset || 0;
        query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching FAQs:', error);
        return { faqs: [], count: 0 };
    }

    const faqs = (data || []).map((faq: any) => ({
        id: faq.id.toString(),
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        display_order: faq.display_order,
        created_at: faq.created_at,
    }));

    return { faqs, count: count || 0 };
}

export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at'>): Promise<FAQ | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('faqs')
        .insert([{
            question: faq.question,
            answer: faq.answer,
            category: faq.category || 'General',
            display_order: faq.display_order || 0,
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating FAQ:', error);
        throw error;
    }

    return {
        id: data.id.toString(),
        question: data.question,
        answer: data.answer,
        category: data.category,
        display_order: data.display_order,
        created_at: data.created_at,
    };
}

export async function updateFAQ(id: string, faq: Partial<FAQ>): Promise<FAQ | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('faqs')
        .update({
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            display_order: faq.display_order,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating FAQ:', error);
        throw error;
    }

    return {
        id: data.id.toString(),
        question: data.question,
        answer: data.answer,
        category: data.category,
        display_order: data.display_order,
        created_at: data.created_at,
    };
}

export async function deleteFAQ(id: string): Promise<boolean> {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('faqs')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting FAQ:', error);
        return false;
    }

    return true;
}

export async function getFAQById(id: string): Promise<FAQ | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching FAQ:', error);
        return null;
    }

    return {
        id: data.id.toString(),
        question: data.question,
        answer: data.answer,
        category: data.category,
        display_order: data.display_order,
        created_at: data.created_at,
    };
}

export async function createBlogCategory(category: Omit<BlogCategory, 'id' | 'created_at'>): Promise<BlogCategory | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('blog_categories')
        .insert([category])
        .select()
        .single();

    if (error) {
        console.error('Error creating blog category:', error);
        throw error;
    }

    return data;
}

export async function updateBlogCategory(slug: string, category: Partial<BlogCategory>): Promise<BlogCategory | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('blog_categories')
        .update({
            name: category.name,
            description: category.description,
        })
        .eq('slug', slug)
        .select()
        .single();

    if (error) {
        console.error('Error updating blog category:', error);
        throw error;
    }

    return data;
}

export async function deleteBlogCategory(slug: string): Promise<boolean> {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('blog_categories')
        .delete()
        .eq('slug', slug);

    if (error) {
        console.error('Error deleting blog category:', error);
        return false;
    }

    return true;
}

// ==================== SERVICES (continued) ====================

export async function deleteService(slug: string): Promise<boolean> {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('services')
        .delete()
        .eq('slug', slug);

    if (error) {
        console.error('Error deleting service:', error);
        return false;
    }

    return true;
}

// ==================== APPOINTMENTS ====================

export async function getAppointments(options?: {
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
}): Promise<{ appointments: Appointment[], count: number }> {
    const supabase = await createClient();
    let query = supabase
        .from('appointments')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

    if (options?.search) {
        query = query.ilike('name', `%${options.search}%`);
    }

    if (options?.status) {
        query = query.eq('status', options.status);
    }

    if (options?.startDate) {
        query = query.gte('created_at', options.startDate);
    }

    if (options?.endDate) {
        query = query.lte('created_at', options.endDate);
    }

    if (options?.limit) {
        const offset = options.offset || 0;
        query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching appointments:', error);
        return { appointments: [], count: 0 };
    }

    return { appointments: data || [], count: count || 0 };
}

export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'status'>): Promise<Appointment | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('appointments')
        .insert([{
            ...appointment,
            status: 'pending'
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }

    return data;
}

export async function updateAppointmentStatus(id: number, status: Appointment['status']): Promise<Appointment | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('appointments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating appointment status:', error);
        throw error;
    }

    return data;
}

export async function deleteAppointment(id: number): Promise<boolean> {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('appointments')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting appointment:', error);
        return false;
    }

    return true;
}

// ==================== CONTACT MESSAGES ====================

export async function getContactMessages(options?: {
    search?: string;
    status?: string;
    limit?: number;
    offset?: number;
}): Promise<{ messages: ContactMessage[], count: number }> {
    const supabase = await createClient();
    let query = supabase
        .from('contact_messages')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

    if (options?.search) {
        query = query.or(`name.ilike.%${options.search}%,email.ilike.%${options.search}%,message.ilike.%${options.search}%`);
    }

    if (options?.status) {
        query = query.eq('status', options.status);
    }

    if (options?.limit) {
        const offset = options.offset || 0;
        query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching contact messages:', error);
        return { messages: [], count: 0 };
    }

    return { messages: data || [], count: count || 0 };
}

export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'status' | 'updated_at'>): Promise<ContactMessage | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .insert([{
            ...message,
            status: 'unread'
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating contact message:', error);
        throw error;
    }

    return data;
}

export async function updateContactMessageStatus(id: number, status: ContactMessage['status']): Promise<ContactMessage | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating contact message status:', error);
        throw error;
    }

    return data;
}

export async function deleteContactMessage(id: number): Promise<boolean> {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('contact_messages')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting contact message:', error);
        return false;
    }

    return true;
}

// ==================== SETTINGS ====================

export interface SiteSetting {
    id?: number;
    key: string;
    value: string;
    description?: string;
    updated_at?: string;
}

export async function getSettings(): Promise<Record<string, string>> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('site_settings')
        .select('*');

    if (error) {
        console.error('Error fetching settings:', error);
        return {};
    }

    const settings: Record<string, string> = {};
    (data || []).forEach((s: any) => {
        settings[s.key] = s.value;
    });
    return settings;
}

export async function updateSetting(key: string, value: string): Promise<boolean> {
    const supabase = createAdminClient();
    const { error } = await supabase
        .from('site_settings')
        .upsert({
            key,
            value,
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

    if (error) {
        console.error('Error updating setting:', error);
        return false;
    }

    return true;
}
