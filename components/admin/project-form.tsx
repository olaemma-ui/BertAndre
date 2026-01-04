"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2, ArrowRight, Check, ArrowLeft as ArrowLeftIcon, Globe, Smartphone, User, Layers, Images, Video, ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Project, ProjectModule, GalleryItem } from "@/lib/projects";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/upload";

interface ProjectFormProps {
    project?: Project;
}

export function ProjectForm({ project: initialProject }: ProjectFormProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const isEdit = !!initialProject;

    const [formData, setFormData] = useState<Omit<Project, 'id' | 'created_at' | 'updated_at'>>({
        title: initialProject?.title || "",
        slug: initialProject?.slug || "",
        category: initialProject?.category || "",
        image: initialProject?.image || "",
        description: initialProject?.description || "",
        detailed_description: initialProject?.detailed_description || "",
        external_link: initialProject?.external_link || "",
        ios_link: initialProject?.ios_link || "",
        android_link: initialProject?.android_link || "",
        icon_url: initialProject?.icon_url || "",
        seo_title: initialProject?.seo_title || "",
        seo_description: initialProject?.seo_description || "",
        modules: initialProject?.modules || [],
        gallery: initialProject?.gallery || [],
    });

    // Files state for deferred upload
    const [mainImageFile, setMainImageFile] = useState<File | null>(null);
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [moduleImageFiles, setModuleImageFiles] = useState<{ [key: number]: File | null }>({});
    const [galleryImageFiles, setGalleryImageFiles] = useState<{ [key: number]: File | null }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || (!formData.image && !mainImageFile) || !formData.description) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            // 1. Handle deferred uploads
            let mainImageUrl = formData.image;
            if (mainImageFile) {
                mainImageUrl = await uploadToCloudinary(mainImageFile);
            }

            let iconUrl = formData.icon_url;
            if (iconFile) {
                iconUrl = await uploadToCloudinary(iconFile);
            }

            const updatedModules = await Promise.all((formData.modules || []).map(async (m, i) => {
                let mUrl = m.image;
                if (moduleImageFiles[i]) {
                    mUrl = await uploadToCloudinary(moduleImageFiles[i]!);
                }
                return { ...m, image: mUrl };
            }));

            const updatedGallery = await Promise.all((formData.gallery || []).map(async (g, i) => {
                let gUrl = g.url;
                if (galleryImageFiles[i]) {
                    gUrl = await uploadToCloudinary(galleryImageFiles[i]!);
                }
                return { ...g, url: gUrl };
            }));

            const finalData = {
                ...formData,
                image: mainImageUrl,
                icon_url: iconUrl,
                modules: updatedModules,
                gallery: updatedGallery,
                slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            };

            const url = isEdit ? `/api/projects/${formData.slug}` : "/api/projects";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            if (res.ok) {
                toast.success(isEdit ? 'Project updated successfully!' : 'Project created successfully!');
                router.push("/admin/projects");
            } else {
                const error = await res.json();
                throw new Error(error.error || "Failed to save project");
            }
        } catch (error: any) {
            console.error("Error saving project:", error);
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addModule = () => {
        setFormData({
            ...formData,
            modules: [
                ...(formData.modules || []),
                { title: "", description: "", image: "", project_slug: formData.slug }
            ]
        });
    };

    const removeModule = (index: number) => {
        setFormData({
            ...formData,
            modules: formData.modules?.filter((_, i) => i !== index)
        });
        const newFiles = { ...moduleImageFiles };
        delete newFiles[index];
        setModuleImageFiles(newFiles);
    };

    const updateModule = (index: number, updates: Partial<ProjectModule>) => {
        setFormData({
            ...formData,
            modules: formData.modules?.map((m, i) => i === index ? { ...m, ...updates } : m)
        });
    };

    const addGalleryItem = () => {
        setFormData({
            ...formData,
            gallery: [
                ...(formData.gallery || []),
                { type: "image", url: "", caption: "", project_slug: formData.slug }
            ]
        });
    };

    const removeGalleryItem = (index: number) => {
        setFormData({
            ...formData,
            gallery: formData.gallery?.filter((_, i) => i !== index)
        });
        const newFiles = { ...galleryImageFiles };
        delete newFiles[index];
        setGalleryImageFiles(newFiles);
    };

    const updateGalleryItem = (index: number, updates: Partial<GalleryItem>) => {
        setFormData({
            ...formData,
            gallery: formData.gallery?.map((item, i) => i === index ? { ...item, ...updates } : item)
        });
    };

    const steps = [
        { id: 1, name: "Basics", icon: User },
        { id: 2, name: "Detail", icon: Layers },
        { id: 3, name: "Modules", icon: Smartphone },
        { id: 4, name: "Gallery", icon: Images },
        { id: 5, name: "SEO", icon: Globe },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header / Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href="/admin/projects"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-2 transition-colors text-sm font-medium"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Projects
                    </Link>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 tracking-tight">
                        {isEdit ? "Edit Project" : "Create New Project"}
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
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Branding & Identity</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Project Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all text-xl font-bold text-gray-900"
                                        placeholder="e.g. Eco Power Systems"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all"
                                        placeholder="Renewable Energy"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Slug</label>
                                    <input
                                        type="text"
                                        readOnly={isEdit}
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-mono text-sm ${isEdit ? "text-gray-400" : "focus:ring-2 focus:ring-[#1560bd]"}`}
                                        placeholder="auto-generated"
                                    />
                                </div>
                            </div>

                            <div>
                                <ImageUpload
                                    label="Featured Cover Image"
                                    value={formData.image}
                                    deferred={true}
                                    onFileChange={setMainImageFile}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                />
                            </div>

                            <div>
                                <ImageUpload
                                    label="Brand Icon / Logo"
                                    value={formData.icon_url}
                                    deferred={true}
                                    onFileChange={setIconFile}
                                    onChange={(url) => setFormData({ ...formData, icon_url: url })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Short Excerpt</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all resize-none"
                                    placeholder="Brief summary for listings..."
                                />
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
                            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900 font-serif">The Full Story</h2>
                                <RichTextEditor
                                    content={formData.detailed_description}
                                    onChange={(content) => setFormData({ ...formData, detailed_description: content })}
                                    placeholder="Tell the full story of this project..."
                                />
                            </div>

                            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-500" /> Connections
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Live URL</label>
                                        <input
                                            type="url"
                                            value={formData.external_link || ""}
                                            onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1560bd] outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">App Store</label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input
                                                type="url"
                                                value={formData.ios_link || ""}
                                                onChange={(e) => setFormData({ ...formData, ios_link: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1560bd] outline-none"
                                                placeholder="Link"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Google Play</label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input
                                                type="url"
                                                value={formData.android_link || ""}
                                                onChange={(e) => setFormData({ ...formData, android_link: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1560bd] outline-none"
                                                placeholder="Link"
                                            />
                                        </div>
                                    </div>
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
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 font-serif">Technical Modules</h2>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addModule}
                                    className="rounded-2xl border-dashed border-2 hover:border-blue-500 hover:bg-blue-50"
                                >
                                    <Plus className="w-5 h-5 mr-2" /> Add Module
                                </Button>
                            </div>

                            <div className="grid gap-6">
                                {formData.modules?.map((module, idx) => (
                                    <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group">
                                        <button
                                            type="button"
                                            onClick={() => removeModule(idx)}
                                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Module Title</label>
                                                <input
                                                    type="text"
                                                    value={module.title}
                                                    onChange={(e) => updateModule(idx, { title: e.target.value })}
                                                    className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-100 focus:border-[#1560bd] outline-none text-xl font-bold transition-all"
                                                    placeholder="Module Name"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <ImageUpload
                                                    label="Module Visual"
                                                    value={module.image}
                                                    deferred={true}
                                                    onFileChange={(file) => setModuleImageFiles(prev => ({ ...prev, [idx]: file }))}
                                                    onChange={(url) => updateModule(idx, { image: url })}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Inner Description</label>
                                                <RichTextEditor
                                                    content={module.description}
                                                    onChange={(content) => updateModule(idx, { description: content })}
                                                    placeholder="Technical details..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!formData.modules || formData.modules.length === 0) && (
                                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                                        <Layers className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-400 font-medium">No modules configured yet.</p>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    )}

                    {currentStep === 4 && (
                        <motion.section
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 font-serif">Visual Gallery</h2>
                                <Button
                                    type="button"
                                    variant="premium"
                                    onClick={addGalleryItem}
                                    className="rounded-2xl"
                                >
                                    <Plus className="w-5 h-5 mr-2" /> Add Media
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {formData.gallery?.map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-8 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm relative group items-start">
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryItem(idx)}
                                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>

                                        <div className="w-full md:w-48 shrink-0">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Media Type</label>
                                            <div className="flex rounded-xl bg-gray-100 p-1">
                                                <button
                                                    type="button"
                                                    onClick={() => updateGalleryItem(idx, { type: 'image' })}
                                                    className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${item.type === 'image' ? "bg-white shadow-sm text-[#1560bd]" : "text-gray-400"}`}
                                                >
                                                    <ImageIcon className="w-4 h-4 mr-2" /> <span className="text-xs font-bold">IMAGE</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => updateGalleryItem(idx, { type: 'video' })}
                                                    className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${item.type === 'video' ? "bg-white shadow-sm text-blue-500" : "text-gray-400"}`}
                                                >
                                                    <Video className="w-4 h-4 mr-2" /> <span className="text-xs font-bold">VIDEO</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full space-y-6">
                                            <ImageUpload
                                                label={item.type === 'image' ? "Gallery Asset" : "Video Poster"}
                                                value={item.url}
                                                deferred={true}
                                                onFileChange={(file) => setGalleryImageFiles(prev => ({ ...prev, [idx]: file }))}
                                                onChange={(url) => updateGalleryItem(idx, { url })}
                                            />

                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                                    {item.type === 'image' ? "Description" : "YouTube/Vimeo Source URL"}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.caption || ""}
                                                    onChange={(e) => updateGalleryItem(idx, { caption: e.target.value })}
                                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none"
                                                    placeholder={item.type === 'image' ? "Project detail caption..." : "https://vimeo.com/..."}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!formData.gallery || formData.gallery.length === 0) && (
                                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                                        <Images className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-400 font-medium">No media uploaded yet.</p>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    )}
                    {currentStep === 5 && (
                        <motion.section
                            key="step5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">SEO Optimization</h2>
                            <p className="text-gray-500 text-sm">Fine-tune how this project appears in search results and social sharing.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">SEO Title</label>
                                    <input
                                        type="text"
                                        value={formData.seo_title || ""}
                                        onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all"
                                        placeholder="Project title for search engines..."
                                    />
                                    <p className="mt-2 text-xs text-gray-400">If left empty, the project title will be used.</p>
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
                                    <p className="mt-2 text-xs text-gray-400">If left empty, the project short description will be used.</p>
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
                                {isEdit ? "Publish Changes" : "Launch Project"}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
