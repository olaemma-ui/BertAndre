"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { FAQ } from "@/lib/db";

interface FAQFormProps {
    initialData?: FAQ | null;
    isEdit?: boolean;
}

export function FAQForm({ initialData, isEdit = false }: FAQFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        question: initialData?.question || "",
        answer: initialData?.answer || "",
        category: initialData?.category || "General",
        display_order: initialData?.display_order || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.question || !formData.answer) {
            toast.error("Please fill in question and answer.");
            return;
        }

        setLoading(true);

        try {
            const url = isEdit ? `/api/faqs/${initialData?.id}` : "/api/faqs";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(isEdit ? "FAQ updated successfully!" : "FAQ created successfully!");
                router.push("/admin/faqs");
                router.refresh();
            } else {
                const error = await res.json();
                throw new Error(error.error || "Failed to save FAQ");
            }
        } catch (error: any) {
            console.error("Error saving FAQ:", error);
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/faqs"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? "Edit FAQ" : "New FAQ"}
                    </h1>
                    <p className="text-gray-500">
                        {isEdit ? "Update existing question" : "Add a new frequently asked question"}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">FAQ Content</h2>
                    </div>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Question</label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                placeholder="e.g., What is your refund policy?"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1560bd]/20 focus:border-[#1560bd] transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Answer</label>
                            <textarea
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                placeholder="Provide a detailed answer..."
                                rows={5}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1560bd]/20 focus:border-[#1560bd] transition-all resize-y"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1560bd]/20 focus:border-[#1560bd] transition-all appearance-none"
                                >
                                    <option value="General">General</option>
                                    <option value="Services">Services</option>
                                    <option value="Billing">Billing</option>
                                    <option value="Support">Support</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1560bd]/20 focus:border-[#1560bd] transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#1560bd] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-900/10 flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isEdit ? "Update FAQ" : "Create FAQ"}
                    </button>
                </div>
            </form>
        </div>
    );
}
