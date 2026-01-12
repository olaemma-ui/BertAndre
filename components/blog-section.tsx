"use client";

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, User, Calendar, Loader2, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import cloudinaryLoader from "@/lib/cloudinary"

interface BlogPost {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    imageUrl: string;
    date: string;
    slug: string;
}

export function BlogSection() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blogs")
                const data = await res.json()
                // Take only first 4 blogs for the homepage
                setBlogs(data.blogs.slice(0, 4))
            } catch (error) {
                console.error("Error fetching blogs:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    if (loading) {
        return (
            <section className="py-20 lg:py-32 bg-gray-50 flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#1560bd]" />
                    <p className="text-gray-400 font-sans">Curating latest insights...</p>
                </div>
            </section>
        )
    }

    if (!loading && blogs.length === 0) {
        return null // Hide section if no blogs
    }

    const featuredBlog = blogs[0]
    const secondaryBlogs = blogs.slice(1)

    return (
        <section className="py-20 lg:py-32 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-4">Latest Insights</h2>
                    <p className="text-gray-600 max-w-xl">Thought leadership and updates from the world of business, finance, and technology.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Featured Blog */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <Link href={`/blogs/${featuredBlog.slug}`} className="block">
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-blue-500/5">
                                <Image
                                    loader={cloudinaryLoader}
                                    src={featuredBlog.imageUrl || "/placeholder.svg"}
                                    alt={featuredBlog.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#1560bd] uppercase tracking-widest shadow-lg">
                                        {featuredBlog.category}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-400 font-sans mb-4">
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#1560bd]" />
                                    {featuredBlog.author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#fa8128]" />
                                    {new Date(featuredBlog.date).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#1a1a1a] leading-tight group-hover:text-[#1560bd] transition-colors mb-4">
                                {featuredBlog.title}
                            </h3>
                            <p className="text-gray-600 line-clamp-2 mb-6 leading-relaxed">
                                {featuredBlog.excerpt}
                            </p>
                            <span className="inline-flex items-center gap-2 text-[#1560bd] font-bold tracking-wide group/btn">
                                READ STORY
                                <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </span>
                        </Link>
                    </motion.div>

                    {/* Blog List */}
                    <div className="flex flex-col gap-10">
                        {secondaryBlogs.map((blog, index) => (
                            <motion.div
                                key={blog.slug}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/blogs/${blog.slug}`} className="flex gap-6 group">
                                    <div className="relative w-32 h-32 md:w-48 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-gray-200">
                                        <Image
                                            loader={cloudinaryLoader}
                                            src={blog.imageUrl || "/placeholder.svg"}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center gap-3">
                                        <div className="flex items-center gap-4 text-[10px] md:text-xs text-gray-400 font-sans font-bold uppercase tracking-wider">
                                            <span className="text-[#1560bd]">{blog.category}</span>
                                            <span>{new Date(blog.date).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="font-serif font-bold text-lg md:text-xl text-[#1a1a1a] leading-tight group-hover:text-[#1560bd] transition-colors line-clamp-2">
                                            {blog.title}
                                        </h4>
                                        <span className="flex items-center gap-2 text-xs font-bold text-gray-900 group-hover:text-[#fa8128] transition-colors">
                                            CONTINUE READING
                                            <ArrowUpRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center mt-20"
                >
                    <Link href="/blogs">
                        <Button variant="premium" className="h-16 px-10 rounded-full text-lg shadow-2xl shadow-blue-500/20">
                            Explore the Newsroom
                            <ArrowUpRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
