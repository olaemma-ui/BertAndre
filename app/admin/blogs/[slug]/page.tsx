"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BlogForm } from "@/components/admin/blog-form";

export default function EditBlogPage() {
    const router = useRouter();
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, [slug]);

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/blogs/${slug}`);
            if (!res.ok) throw new Error("Blog not found");
            const data = await res.json();
            setBlog(data);
        } catch (error) {
            console.error('Error fetching blog:', error);
            toast.error("Failed to load blog post.");
            router.push("/admin/blogs");
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
            <BlogForm blog={blog} isEdit={true} />
        </div>
    );
}
