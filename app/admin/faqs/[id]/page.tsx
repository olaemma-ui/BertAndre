import { notFound } from "next/navigation";
import { FAQForm } from "@/components/admin/faq-form";
import { getFAQById } from "@/lib/db";

interface EditFAQPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditFAQPage({ params }: EditFAQPageProps) {
    const { id } = await params;
    const faq = await getFAQById(id);

    if (!faq) {
        notFound();
    }

    return <FAQForm initialData={faq} isEdit />;
}
