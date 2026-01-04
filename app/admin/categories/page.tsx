"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useConfirm } from "@/components/ui/confirm-dialog";

interface BlogCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export default function CategoriesPage() {
    const { confirm } = useConfirm();
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: "", slug: "", description: "" });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("/api/blog-categories");
        const data = await res.json();
        setCategories(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            // Update existing category
            const category = categories.find((c) => c.id === editingId);
            await fetch(`/api/blog-categories/${category?.slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        } else {
            // Create new category
            await fetch("/api/blog-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        }

        setFormData({ name: "", slug: "", description: "" });
        setIsAdding(false);
        setEditingId(null);
        fetchCategories();
    };

    const handleEdit = (category: BlogCategory) => {
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
        });
        setEditingId(category.id);
        setIsAdding(true);
    };

    const handleDelete = async (category: BlogCategory) => {
        if (await confirm(`Delete category "${category.name}"?`, {
            title: "Delete Category",
            description: "This action cannot be undone.",
            variant: "danger",
            confirmText: "Delete",
        })) {
            await fetch(`/api/blog-categories/${category.slug}`, { method: "DELETE" });
            fetchCategories();
        }
    };

    const handleCancel = () => {
        setFormData({ name: "", slug: "", description: "" });
        setIsAdding(false);
        setEditingId(null);
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href="/admin/blogs"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blogs
                    </Link>
                    <h1 className="text-2xl font-bold font-serif text-gray-900">Blog Categories</h1>
                    <p className="text-gray-500 text-sm mt-1">Organize your blog content</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-[#1560bd] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#1560bd]/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Category
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingId ? "Edit Category" : "New Category"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                        slug: generateSlug(e.target.value),
                                    });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1560bd]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug *
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1560bd] font-mono text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1560bd]"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-[#1560bd] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#1560bd]/90 transition-colors"
                            >
                                {editingId ? "Update" : "Create"} Category
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="text-gray-400 hover:text-[#1560bd] transition-colors"
                                    title="Edit"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(category)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm font-mono text-gray-500 mb-2">/{category.slug}</p>
                        {category.description && (
                            <p className="text-sm text-gray-600">{category.description}</p>
                        )}
                    </div>
                ))}
                {categories.length === 0 && !isAdding && (
                    <div className="col-span-full bg-white border border-gray-200 rounded-xl p-12 text-center">
                        <p className="text-gray-500">No categories yet. Create your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
