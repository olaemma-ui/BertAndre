import { ProjectForm } from "@/components/admin/project-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
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
                <h1 className="text-2xl font-bold font-serif text-gray-900">Create New Project</h1>
            </div>

            <ProjectForm />
        </div>
    );
}
