import { Header } from "@/components/header";
import { PageHero } from "@/components/page-hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { ConsultationSection } from "@/components/consultation-section";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/db";

export const metadata = {
    title: "Our Projects | BertAndre",
    description:
        "Explore our portfolio of successful projects and innovations across various industries.",
};

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="relative -top-21">
                <PageHero
                    title="Our Projects"
                    breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Projects" }]}
                />
                <ProjectsGrid projects={projects} />
            </div>
            <ConsultationSection />
            <Footer />
        </main>
    );
}
