"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Box } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmationDialog } from "@/components/admin/confirmation-dialog";
import { Button } from "@/components/ui/button";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const offset = (currentPage - 1) * 10;
            const params = new URLSearchParams({
                limit: "10",
                offset: offset.toString(),
            });
            if (searchQuery) params.append("search", searchQuery);

            const res = await fetch(`/api/projects?${params}`);
            const data = await res.json();
            setProjects(data.projects);
            setTotalCount(data.count);
        } catch (error) {
            toast.error("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [currentPage, searchQuery]);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const res = await fetch(`/api/projects/${deleteId}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Project deleted successfully");
                fetchProjects(); // Refresh to update count and list
            } else {
                throw new Error("Failed to delete project");
            }
        } catch (error) {
            toast.error("Error deleting project");
        } finally {
            setDeleteId(null);
        }
    };

    const columns = [
        {
            header: "Project",
            accessorKey: "title",
            cell: (project: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=No+Image')}
                        />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{project.title}</div>
                        <div className="text-xs text-gray-500 font-mono">{project.slug}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Category",
            accessorKey: "category",
            cell: (project: any) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#1560bd]">
                    {project.category}
                </span>
            )
        },
        {
            header: "Actions",
            accessorKey: "slug",
            cell: (project: any) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild title="View Project">
                        <Link href={`/projects/${project.slug}`} target="_blank">
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild title="Edit Project">
                        <Link href={`/admin/projects/${project.slug}`}>
                            <Pencil className="w-4 h-4 text-gray-400" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(project.slug)}
                        className="hover:text-red-600"
                        title="Delete Project"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Projects</h1>
                    <p className="text-gray-500 mt-1">Manage and organize your portfolio</p>
                </div>
                <Button asChild variant="premium" className="rounded-2xl shadow-blue-500/20">
                    <Link href="/admin/projects/new">
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                    </Link>
                </Button>
            </div>

            <DataTable
                data={projects}
                columns={columns}
                loading={loading}
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSearch={setSearchQuery}
                emptyMessage="No projects found. Start by creating your first showcase project."
            />

            <ConfirmationDialog
                isOpen={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Project?"
                description="This will permanently remove the project and its media. This action cannot be undone."
                variant="destructive"
            />
        </div>
    );
}
