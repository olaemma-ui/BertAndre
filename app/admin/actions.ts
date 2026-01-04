"use server";

import { createProject, deleteProject, getProjectBySlug, updateProject } from "@/lib/db";
import { Project } from "@/lib/projects";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function saveProject(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as string;
    const description = formData.get("description") as string;
    const detailedDescription = formData.get("detailedDescription") as string;
    const externalLink = formData.get("externalLink") as string;
    const iosLink = formData.get("iosLink") as string;
    const androidLink = formData.get("androidLink") as string;

    // Modules parsing (simple 3-item limit for demo or robust parsing)
    // For simplicity, we'll just check for module fields like 'module-0-title'
    const modules = [];
    let i = 0;
    while (formData.get(`module-${i}-title`)) {
        modules.push({
            title: formData.get(`module-${i}-title`) as string,
            description: formData.get(`module-${i}-description`) as string,
            image: formData.get(`module-${i}-image`) as string,
        });
        i++;
    }

    // Gallery parsing
    const gallery = [];
    let j = 0;
    while (formData.get(`gallery-${j}-url`)) {
        gallery.push({
            type: formData.get(`gallery-${j}-type`) as "image" | "video",
            url: formData.get(`gallery-${j}-url`) as string,
            caption: formData.get(`gallery-${j}-caption`) as string,
        });
        j++;
    }

    const isEdit = formData.get("isEdit") === "true";
    const existingSlug = formData.get("slug") as string;

    const slug = isEdit ? existingSlug : slugify(title);

    const project: Project = {
        title,
        slug,
        category,
        image,
        description,
        detailedDescription,
        externalLink,
        iosLink,
        androidLink,
        modules,
        gallery,
    };

    try {
        if (isEdit) {
            await updateProject(slug, project);
        } else {
            // Check if slug exists? For now assume unique
            await createProject(project);
        }
    } catch (error) {
        return { message: "Failed to save project" };
    }

    revalidatePath("/projects");
    revalidatePath(`/projects/${slug}`);
    revalidatePath("/admin/projects");

    redirect("/admin/projects");
}

export async function removeProject(slug: string) {
    await deleteProject(slug);
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
}
