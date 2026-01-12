"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import cloudinaryLoader from "@/lib/cloudinary";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    slug: string;
    index: number;
}

export function ProjectCard({ title, category, image, slug, index }: ProjectCardProps) {
    return (
        <Link href={`/projects/${slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
            >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <Image
                        loader={cloudinaryLoader}
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <ArrowUpRight className="w-6 h-6 text-[#1a1a1a]" />
                        </div>
                    </div>
                </div>

                <div>
                    <span className="text-[#1560bd] font-sans text-sm font-bold tracking-wider uppercase mb-2 block">{category}</span>
                    <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] group-hover:text-[#1560bd] transition-colors">{title}</h3>
                </div>
            </motion.div>
        </Link>
    );
}
