"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft as ArrowLeftIcon, Check, ArrowRight, User, FileText, ImageIcon, Layout, Plus, Trash2, Globe } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/upload";

interface BlogCategory {
    id: number;
    name: string;
    slug: string;
}

interface BlogPost {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    imageUrl: string;
    date: string;
    slug?: string;
    seo_title?: string;
    seo_description?: string;
}

interface BlogFormProps {
    blog?: BlogPost;
    isEdit?: boolean;
}

export function BlogForm({ blog: initialBlog, isEdit = false }: BlogFormProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<BlogCategory[]>([]);

    const [formData, setFormData] = useState<BlogPost>({
        title: initialBlog?.title || "",
        excerpt: initialBlog?.excerpt || "",
        content: initialBlog?.content || "",
        category: initialBlog?.category || "",
        author: initialBlog?.author || "Bert Andre",
        imageUrl: initialBlog?.imageUrl || "",
        date: initialBlog?.date ? new Date(initialBlog.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        slug: initialBlog?.slug || "",
        seo_title: initialBlog?.seo_title || "",
        seo_description: initialBlog?.seo_description || "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/blog-categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.content || (!formData.imageUrl && !imageFile)) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = formData.imageUrl;
            if (imageFile) {
                finalImageUrl = await uploadToCloudinary(imageFile);
            }

            const finalData = {
                ...formData,
                imageUrl: finalImageUrl,
            };

            const url = isEdit ? `/api/blogs/${formData.slug}` : "/api/blogs";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            if (res.ok) {
                toast.success(isEdit ? 'Post updated successfully!' : 'Post published successfully!');
                router.push("/admin/blogs");
            } else {
                const error = await res.json();
                throw new Error(error.error || "Failed to save blog post");
            }
        } catch (error: any) {
            console.error("Error saving blog:", error);
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { id: 1, name: "Basics", icon: User },
        { id: 2, name: "Media", icon: ImageIcon },
        { id: 3, name: "Content", icon: FileText },
        { id: 4, name: "SEO", icon: Globe },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header / Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href="/admin/blogs"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-2 transition-colors text-sm font-medium"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Blogs
                    </Link>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 tracking-tight">
                        {isEdit ? "Edit Post" : "Create New Post"}
                    </h1>
                </div>
            </div>

            {/* Stepper */}
            <div className="mb-12 px-6">
                <div className="flex items-center justify-between relative">
                    {/* Background Line */}
                    <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-100/80 -translate-y-1/2 z-0" />

                    {/* Active Progress Line */}
                    <div
                        className="absolute top-6 left-6 right-6 h-0.5 bg-[#1560bd] -translate-y-1/2 z-0 transition-all duration-500 origin-left"
                        style={{
                            transform: `scaleX(${(currentStep - 1) / (steps.length - 1)})`,
                            width: "calc(100% - 48px)" // 100% - left(24) - right(24) = 48
                        }}
                    />

                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isCompleted = currentStep > step.id;
                        const isActive = currentStep === step.id;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                    className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                                        ${isActive ? "bg-[#1560bd] text-white shadow-xl shadow-blue-500/20 scale-110" :
                                            isCompleted ? "bg-[#1560bd] text-white" : "bg-white border-2 border-gray-100 text-gray-400"}
                                    `}
                                >
                                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                                </button>
                                <span className={`absolute -bottom-8 text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap ${isActive ? "text-[#1560bd]" : "text-gray-300"}`}>
                                    {step.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.section
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Post Identity</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all text-xl font-bold text-gray-900"
                                        placeholder="Enter an engaging title..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.name}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Publish Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Author</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {currentStep === 2 && (
                        <motion.section
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900 font-serif">Visuals & Short Description</h2>

                                <div>
                                    <ImageUpload
                                        label="Featured Image"
                                        value={formData.imageUrl}
                                        deferred={true}
                                        onFileChange={setImageFile}
                                        onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Excerpt</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all resize-none"
                                        placeholder="A brief summary for cards..."
                                    />
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {currentStep === 3 && (
                        <motion.section
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">The Main Article</h2>
                            <RichTextEditor
                                content={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                                placeholder="Write your masterpiece..."
                            />
                        </motion.section>
                    )}

                    {currentStep === 4 && (
                        <motion.section
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">SEO Optimization</h2>
                            <p className="text-gray-500 text-sm">Fine-tune how this post appears in search results and social sharing.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">SEO Title</label>
                                    <input
                                        type="text"
                                        value={formData.seo_title || ""}
                                        onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all"
                                        placeholder="SEO title for search engines..."
                                    />
                                    <p className="mt-2 text-xs text-gray-400">If left empty, the post title will be used.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">SEO Description</label>
                                    <textarea
                                        rows={4}
                                        value={formData.seo_description || ""}
                                        onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all resize-none"
                                        placeholder="Brief description for search results..."
                                    />
                                    <p className="mt-2 text-xs text-gray-400">If left empty, the post excerpt will be used.</p>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="pt-10 flex items-center justify-between border-t border-gray-100">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => currentStep > 1 && setCurrentStep(prev => prev - 1)}
                        className={`rounded-2xl px-8 h-12 ${currentStep === 1 ? "invisible" : ""}`}
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
                    </Button>

                    <div className="flex items-center gap-4">
                        {currentStep < steps.length ? (
                            <Button
                                key="next-button"
                                type="button"
                                variant="premium"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentStep < steps.length) {
                                        setCurrentStep(prev => prev + 1);
                                    }
                                }}
                                className="rounded-2xl px-10 h-14"
                            >
                                Next Step <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                key="submit-button"
                                type="submit"
                                disabled={loading}
                                variant="premium"
                                className="rounded-2xl px-12 h-14 shadow-2xl"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <Save className="w-6 h-6 mr-2" />}
                                {isEdit ? "Publish Changes" : "Publish Post"}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
