"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Project } from "@/lib/projects";


interface ProjectsGridProps {
    projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-sans text-[#1a1a1a] mb-6">
                        <span className="text-[#1560bd]">+</span> Our Portfolio{" "}
                        <span className="text-[#1560bd]">+</span>
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] max-w-3xl mx-auto">
                        Showcasing Our Success Stories & Innovations
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            category={project.category}
                            image={project.image}
                            slug={project.slug}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
