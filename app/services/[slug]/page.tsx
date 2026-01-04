import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { services } from "@/lib/services";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";

import { getServiceBySlug } from "@/lib/db";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    // Only generate params for existing services in DB if needed, 
    // or return empty array to fallback to dynamic rendering
    return [];
}

export async function generateMetadata({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.title} | BertAndre Consulting`,
        description: service.description,
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="relative -top-21">
                <PageHero
                    title={service.title}
                    backgroundImage={service.image}
                    breadcrumb={[
                        { label: "Home", href: "/" },
                        { label: "Services", href: "/services" },
                        { label: service.title }
                    ]}
                />
            </div>

            <section className="py-20 lg:pt-0">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Left Column: Content */}
                        <div className="lg:col-span-8">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1560bd] mb-8 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Services
                            </Link>

                            <div className="prose prose-lg text-gray-600 font-sans leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: service.detailedDescription }} />
                            </div>
                        </div>

                        {/* Right Column: Sidebar / Features */}
                        <div className="lg:col-span-4">
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-32">
                                <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-6">Key Features</h3>
                                <ul className="space-y-4">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-[#fa8128] flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h4 className="font-bold text-[#1a1a1a] mb-2">Need advice?</h4>
                                    <p className="text-sm text-gray-600 mb-4">Let's discuss how we can help you achieve your goals.</p>
                                    <Link
                                        href="/contact"
                                        className="block w-full py-3 bg-[#1560bd] text-white text-center rounded-xl font-bold hover:bg-[#104a9e] transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <ConsultationSection />
            <Footer />
        </main>
    );
}
