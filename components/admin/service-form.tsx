"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft as ArrowLeftIcon, Check, ArrowRight, User, FileText, ImageIcon, Plus, X, Laptop } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/upload";

interface Service {
    title: string;
    slug: string;
    icon: string;
    description: string;
    detailedDescription: string;
    image: string;
    features: string[];
}

interface ServiceFormProps {
    service?: Service;
    isEdit?: boolean;
}

export function ServiceForm({ service: initialService, isEdit = false }: ServiceFormProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<Service>({
        title: initialService?.title || "",
        slug: initialService?.slug || "",
        icon: initialService?.icon || "Layout",
        description: initialService?.description || "",
        detailedDescription: initialService?.detailedDescription || "",
        image: initialService?.image || "",
        features: initialService?.features || [],
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [newFeature, setNewFeature] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.detailedDescription || (!formData.image && !imageFile)) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = formData.image;
            if (imageFile) {
                finalImageUrl = await uploadToCloudinary(imageFile);
            }

            const finalData = {
                ...formData,
                image: finalImageUrl,
                slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            };

            const url = isEdit ? `/api/services/${formData.slug}` : "/api/services";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            if (res.ok) {
                toast.success(isEdit ? 'Service updated successfully!' : 'Service created successfully!');
                router.push("/admin/services");
            } else {
                const error = await res.json();
                throw new Error(error.error || "Failed to save service");
            }
        } catch (error: any) {
            console.error("Error saving service:", error);
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData({
                ...formData,
                features: [...formData.features, newFeature.trim()],
            });
            setNewFeature("");
        }
    };

    const removeFeature = (index: number) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index),
        });
    };

    const steps = [
        { id: 1, name: "Basics", icon: User },
        { id: 2, name: "Features", icon: Laptop },
        { id: 3, name: "Content", icon: FileText },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header / Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href="/admin/services"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-2 transition-colors text-sm font-medium"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Services
                    </Link>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 tracking-tight">
                        {isEdit ? "Edit Service" : "Create New Service"}
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
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Service Identity</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all text-xl font-bold text-gray-900"
                                        placeholder="e.g. Business Strategy"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Icon (Lucide Name)</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all"
                                            placeholder="Layout, Globe, Smartphone..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <ImageUpload
                                        label="Featured Cover Image"
                                        value={formData.image}
                                        deferred={true}
                                        onFileChange={setImageFile}
                                        onChange={(url) => setFormData({ ...formData, image: url })}
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
                                <h2 className="text-2xl font-bold text-gray-900 font-serif">Description & Value</h2>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Short Tagline</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all resize-none"
                                        placeholder="A one-sentence impact statement..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Core Features</label>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={newFeature}
                                            onChange={(e) => setNewFeature(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                            className="flex-1 px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1560bd] outline-none transition-all"
                                            placeholder="Add a key benefit..."
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addFeature}
                                            className="h-14 px-6 rounded-2xl border-2"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {formData.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 bg-blue-50 text-[#1560bd] px-4 py-2 rounded-xl text-sm font-bold animate-in fade-in zoom-in-95"
                                            >
                                                {feature}
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="hover:text-red-500 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
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
                            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 font-serif">Service Methodology</h2>
                            <RichTextEditor
                                content={formData.detailedDescription}
                                onChange={(content) => setFormData({ ...formData, detailedDescription: content })}
                                placeholder="Explain your process and approach in detail..."
                            />
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
                                type="button"
                                variant="premium"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                className="rounded-2xl px-10 h-14"
                            >
                                Next Step <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={loading}
                                variant="premium"
                                className="rounded-2xl px-12 h-14 shadow-2xl"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <Save className="w-6 h-6 mr-2" />}
                                {isEdit ? "Update Service" : "Launch Service"}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
