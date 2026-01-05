import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, CheckCircle } from "lucide-react";

import { getProjectBySlug, getProjects } from "@/lib/db";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConsultationSection } from "@/components/consultation-section";
import { ProjectGallery } from "@/components/project-gallery";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found | BertAndre",
        };
    }

    return {
        title: project.seo_title || `${project.title} | BertAndre Projects`,
        description: project.seo_description || project.description,
    };
}

export async function generateStaticParams() {
    const { projects } = await getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    console.log({ project });

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] -top-22 min-h-[700px] flex items-center pb-20 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={1920}
                    height={1080}
                    className="object-cover absolute top-0 left-0 w-full h-full max-h-[820px]"
                    priority
                />
                <div className="absolute bg-linear-to-b from-black/80 via-black/40 to-black/20 -top-20 z-10 min-h-[800px] h-full w-full" />

                <div className="container mx-auto px-6 relative z-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Projects
                    </Link>

                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-sans text-white mb-6">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-white/90 font-sans max-w-2xl leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 lg:py-32 pt-0!">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Left Column: Description */}
                        <div className="lg:col-span-7">
                            <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-8">
                                Project Overview
                            </h2>
                            <div
                                className="prose prose-lg text-gray-600 font-sans leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: project.detailedDescription || "" }}
                            />

                            <div className="mt-12">
                                <Link
                                    href={project.externalLink || "#"}
                                    target="_blank"
                                    className="inline-flex items-center gap-3 bg-[#fa8128] text-white px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-[#e6731f] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                                >
                                    Check it Out
                                    <ArrowUpRight className="w-5 h-5" />
                                </Link>
                            </div>

                            {/* Mobile App Links */}
                            {(project.iosLink || project.androidLink) && (
                                <div className="mt-8 flex flex-wrap gap-4">
                                    {project.iosLink && (
                                        <Link href={project.iosLink} target="_blank" className="hover:opacity-80 transition-opacity">
                                            <Image
                                                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                                alt="Download on the App Store"
                                                width={120}
                                                height={40}
                                                className="h-[40px] w-auto"
                                            />
                                        </Link>
                                    )}
                                    {project.androidLink && (
                                        <Link href={project.androidLink} target="_blank" className="hover:opacity-80 transition-opacity">
                                            <Image
                                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                                alt="Get it on Google Play"
                                                width={135}
                                                height={40}
                                                className="h-[40px] w-auto"
                                            />
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Gallery Section */}
                            {project.gallery && project.gallery.length > 0 && (
                                <div className="mt-20">
                                    <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-8">
                                        Project Gallery
                                    </h3>
                                    <ProjectGallery items={project.gallery} />
                                </div>
                            )}
                        </div>

                        {/* Right Column: Key Stats or Info (Optional) */}
                        <div className="lg:col-span-5">
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-6">At a Glance</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-[#1560bd] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block text-[#1a1a1a]">Client Focused</strong>
                                            <span className="text-gray-600 text-sm">Tailored specifically to client needs.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-[#1560bd] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block text-[#1a1a1a]">Sustainable</strong>
                                            <span className="text-gray-600 text-sm">Built with long-term impact in mind.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-[#1560bd] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block text-[#1a1a1a]">Innovative</strong>
                                            <span className="text-gray-600 text-sm">Utilizing the latest industry standards.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="py-20 bg-[#1a1a1a] text-white">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-[#fa8128] font-bold tracking-wider uppercase text-sm">Process Breakdown</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mt-3">Key Modules & Features</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {project.modules?.map((module, idx) => (
                            <div key={idx} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors">
                                <div className="relative aspect-video w-full overflow-hidden">
                                    <Image
                                        src={module.image}
                                        alt={module.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-serif font-bold mb-3">{module.title}</h3>
                                    <div
                                        className="text-white/70 font-sans leading-relaxed prose prose-invert prose-sm"
                                        dangerouslySetInnerHTML={{ __html: module.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ConsultationSection />
            <Footer />
        </main>
    );
}
