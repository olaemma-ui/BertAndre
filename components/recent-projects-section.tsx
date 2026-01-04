"use client";

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowRight, Loader2, Link as LinkIcon, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Project {
    title: string;
    slug: string;
    category: string;
    image: string;
    description: string;
    icon_url?: string;
}

export function RecentProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects")
                const data = await res.json()
                // Take specific number of projects for the homepage layout
                setProjects(data.projects.slice(0, 3))
            } catch (error) {
                console.error("Error fetching projects:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    if (loading) {
        return (
            <div className="py-20 lg:py-32 bg-white flex items-center justify-center min-h-[500px]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#1560bd]" />
                    <p className="text-gray-400 font-sans">Showcasing recent excellence...</p>
                </div>
            </div>
        )
    }

    if (!loading && projects.length === 0) {
        return null // Hide if no projects
    }

    return (
        <section className="py-20 lg:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 bg-blue-50/50 border border-blue-100 px-5 py-2 rounded-full mb-8"
                        >
                            <Plus className="w-3 h-3 text-[#1560bd]" />
                            <span className="text-xs font-black tracking-[0.2em] uppercase text-[#1560bd]">Recent Projects</span>
                            <Plus className="w-3 h-3 text-[#1560bd]" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-[#1a1a1a] leading-[1.1] tracking-tight"
                        >
                            Excellence <br /><span className="text-[#1560bd]">In Action.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-md"
                    >
                        <p className="text-gray-500 font-sans leading-relaxed text-lg mb-8">
                            A curated selection of our most impactful collaborations, showcasing our commitment to strategic excellence and sustainable growth.
                        </p>
                        <Link href="/projects">
                            <Button variant="outline" className="rounded-full px-8 border-2 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
                                View Portfolio <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Large Project */}
                    {projects[0] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7 relative group"
                        >
                            <Link href={`/projects/${projects[0].slug}`} className="block">
                                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/10">
                                    <Image
                                        src={projects[0].image || "/placeholder.svg"}
                                        alt={projects[0].title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    {/* Brand Icon Overlay */}
                                    {projects[0].icon_url && (
                                        <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center p-3 animate-in fade-in zoom-in duration-700">
                                            <img src={projects[0].icon_url} alt="Logo" className="w-full h-full object-contain" />
                                        </div>
                                    )}

                                    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between text-white">
                                        <div>
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-[0.2em] uppercase mb-4">
                                                {projects[0].category}
                                            </span>
                                            <h3 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                                                {projects[0].title}
                                            </h3>
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 45 }}
                                            className="w-16 h-16 rounded-3xl bg-white text-[#1a1a1a] flex items-center justify-center shadow-2xl"
                                        >
                                            <ArrowUpRight className="w-6 h-6" />
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Right Column */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {/* Smaller Projects */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                            {projects.slice(1).map((project, index) => (
                                <motion.div
                                    key={project.slug}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.2 }}
                                    className="group"
                                >
                                    <Link href={`/projects/${project.slug}`} className="flex flex-col sm:flex-row lg:flex-col gap-6">
                                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl shadow-gray-200 w-full sm:w-1/2 lg:w-full">
                                            <Image
                                                src={project.image || "/placeholder.svg"}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                                            {/* Brand Icon Overlay Mini */}
                                            {project.icon_url && (
                                                <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl flex items-center justify-center p-2">
                                                    <img src={project.icon_url} alt="Logo" className="w-full h-full object-contain" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#1560bd]">{project.category}</span>
                                            </div>
                                            <h4 className="text-xl md:text-2xl font-serif font-bold text-[#1a1a1a] group-hover:text-[#1560bd] transition-colors leading-tight">
                                                {project.title}
                                            </h4>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA / Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#1a1a1a] rounded-[2.5rem] p-10 flex-1 flex flex-col justify-center gap-6 shadow-2xl shadow-blue-900/10 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1560bd]/10 rounded-bl-full transition-transform group-hover:scale-150" />

                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight z-10">
                                Start Your Journey To Strategic <span className="text-[#1560bd]">Growth.</span>
                            </h3>
                            <div className="z-10">
                                <Link href="/contact">
                                    <Button variant="premium" className="rounded-full px-8 h-14 shadow-xl">
                                        Partner With Us
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
