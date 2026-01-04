"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Box, Settings } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmationDialog } from "@/components/admin/confirmation-dialog";
import { Button } from "@/components/ui/button";

export default function AdminServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            toast.error("Failed to fetch services");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const res = await fetch(`/api/services/${deleteId}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Service deleted successfully");
                setServices(services.filter(s => s.slug !== deleteId));
            } else {
                throw new Error("Failed to delete service");
            }
        } catch (error) {
            toast.error("Error deleting service");
        } finally {
            setDeleteId(null);
        }
    };

    const columns = [
        {
            header: "Service",
            accessorKey: "title",
            cell: (service: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Settings className="w-5 h-5 text-[#1560bd]" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{service.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{service.description}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Features",
            accessorKey: "features",
            cell: (service: any) => (
                <span className="text-sm font-medium text-gray-500">
                    {service.features?.length || 0} Key Features
                </span>
            )
        },
        {
            header: "Actions",
            accessorKey: "slug",
            cell: (service: any) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/services/${service.slug}`} target="_blank">
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/services/${service.slug}`}>
                            <Pencil className="w-4 h-4 text-gray-400" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(service.slug)}
                        className="hover:text-red-600"
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
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Services</h1>
                    <p className="text-gray-500 mt-1">Define and manage your service offerings</p>
                </div>
                <Button asChild variant="premium" className="rounded-xl shadow-blue-500/20">
                    <Link href="/admin/services/new">
                        <Plus className="w-4 h-4 mr-2" />
                        New Service
                    </Link>
                </Button>
            </div>

            <DataTable
                data={services}
                columns={columns}
                loading={loading}
                totalCount={services.length}
                currentPage={1}
                onPageChange={() => { }}
                emptyMessage="No services found. Add your core services to showcase your expertise."
            />

            <ConfirmationDialog
                isOpen={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Service?"
                description="This will permanently remove the service description, features, and associated media. This action cannot be undone."
                variant="destructive"
            />
        </div>
    );
}
