"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmationDialog } from "@/components/admin/confirmation-dialog";
import { Button } from "@/components/ui/button";

export default function AdminFAQsPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const offset = (currentPage - 1) * 10;
            const params = new URLSearchParams({
                limit: "10",
                offset: offset.toString(),
            });
            if (searchQuery) params.append("search", searchQuery);

            const res = await fetch(`/api/faqs?${params}`);
            const data = await res.json();
            setFaqs(data.faqs);
            setTotalCount(data.count);
        } catch (error) {
            toast.error("Failed to fetch FAQs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFAQs();
    }, [currentPage, searchQuery]);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const res = await fetch(`/api/faqs/${deleteId}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("FAQ deleted successfully");
                fetchFAQs();
            } else {
                throw new Error("Failed to delete FAQ");
            }
        } catch (error) {
            toast.error("Error deleting FAQ");
        } finally {
            setDeleteId(null);
        }
    };

    const columns = [
        {
            header: "Question & Answer",
            accessorKey: "question",
            cell: (faq: any) => (
                <div className="flex flex-col gap-1 max-w-md">
                    <div className="font-bold text-gray-900 line-clamp-1">{faq.question}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">{faq.answer}</div>
                </div>
            )
        },
        {
            header: "Category",
            accessorKey: "category",
            cell: (faq: any) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700">
                    {faq.category || "General"}
                </span>
            )
        },
        {
            header: "Actions",
            accessorKey: "id",
            cell: (faq: any) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Edit FAQ">
                        <Pencil className="w-4 h-4 text-gray-400" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(faq.id)}
                        className="hover:text-red-600"
                        title="Delete FAQ"
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
                    <h1 className="text-3xl font-bold font-serif text-gray-900">FAQs</h1>
                    <p className="text-gray-500 mt-1">Manage common questions and answers</p>
                </div>
                <Button variant="premium" className="rounded-2xl shadow-blue-500/20">
                    <Plus className="w-4 h-4 mr-2" />
                    New FAQ
                </Button>
            </div>

            <DataTable
                data={faqs}
                columns={columns}
                loading={loading}
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSearch={setSearchQuery}
                emptyMessage="No FAQs found. Add helpful questions to guide your customers."
            />

            <ConfirmationDialog
                isOpen={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete FAQ?"
                description="This will permanently remove this question from the site. This action cannot be undone."
                variant="destructive"
            />
        </div>
    );
}
