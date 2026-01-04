"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, FileText, Tag } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmationDialog } from "@/components/admin/confirmation-dialog";
import { Button } from "@/components/ui/button";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const offset = (currentPage - 1) * 10;
            const params = new URLSearchParams({
                limit: "10",
                offset: offset.toString(),
            });
            if (selectedCategory) params.append('category', selectedCategory);
            if (searchQuery) params.append("search", searchQuery);

            const res = await fetch(`/api/blogs?${params}`);
            const data = await res.json();
            setBlogs(data.blogs);
            setTotalCount(data.count);
        } catch (error) {
            toast.error("Failed to fetch blog posts");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/blog-categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, searchQuery, selectedCategory]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const res = await fetch(`/api/blogs/${deleteId}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Blog post deleted successfully");
                fetchBlogs();
            } else {
                throw new Error("Failed to delete post");
            }
        } catch (error) {
            toast.error("Error deleting post");
        } finally {
            setDeleteId(null);
        }
    };

    const columns = [
        {
            header: "Post Details",
            accessorKey: "title",
            cell: (blog: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=No+Image')}
                        />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 line-clamp-1">{blog.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{blog.excerpt}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Category",
            accessorKey: "category",
            cell: (blog: any) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
                    <Tag className="w-3 h-3 mr-1" />
                    {blog.category || "General"}
                </span>
            )
        },
        {
            header: "Date",
            accessorKey: "date",
            cell: (blog: any) => (
                <span className="text-sm text-gray-500 font-medium">
                    {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
            )
        },
        {
            header: "Actions",
            accessorKey: "slug",
            cell: (blog: any) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild title="View Post">
                        <Link href={`/blogs/${blog.slug}`} target="_blank">
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild title="Edit Post">
                        <Link href={`/admin/blogs/${blog.slug}`}>
                            <Pencil className="w-4 h-4 text-gray-400" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(blog.slug)}
                        className="hover:text-red-600"
                        title="Delete Post"
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
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500 mt-1">Share your insights and updates</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" asChild className="rounded-xl border-gray-200">
                        <Link href="/admin/categories">Manage Categories</Link>
                    </Button>
                    <Button asChild variant="premium" className="rounded-xl shadow-blue-500/20">
                        <Link href="/admin/blogs/new">
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => {
                        setSelectedCategory("");
                        setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === ""
                        ? "bg-[#1560bd] text-white shadow-lg shadow-blue-500/20"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                >
                    All Posts
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setSelectedCategory(cat.name);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat.name
                            ? "bg-[#1560bd] text-white shadow-lg shadow-blue-500/20"
                            : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <DataTable
                data={blogs}
                columns={columns}
                loading={loading}
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSearch={setSearchQuery}
                emptyMessage="No blog posts found. Start sharing your stories with the world."
            />

            <ConfirmationDialog
                isOpen={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Blog Post?"
                description="This will permanently delete the post and remove it from the public site. This action cannot be undone."
                variant="destructive"
            />
        </div>
    );
}
