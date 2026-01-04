import { ProjectForm } from "@/components/admin/project-form";
import { getProjectBySlug } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <h1 className="text-2xl font-bold font-serif text-gray-900">Edit Project: {project.title}</h1>
            </div>

            <ProjectForm project={project} />
        </div>
    );
}
