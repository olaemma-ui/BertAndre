"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ServiceForm } from "@/components/admin/service-form";

export default function EditServicePage() {
    const router = useRouter();
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        if (slug) {
            fetchService();
        }
    }, [slug]);

    const fetchService = async () => {
        try {
            const res = await fetch(`/api/services/${slug}`);
            if (!res.ok) throw new Error("Service not found");
            const data = await res.json();
            setService(data);
        } catch (error) {
            console.error("Error fetching service:", error);
            toast.error("Failed to load service data.");
            router.push("/admin/services");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#1560bd]" />
            </div>
        );
    }

    return (
        <div className="py-8">
            <ServiceForm service={service} isEdit={true} />
        </div>
    );
}
