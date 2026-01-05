"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[#f8f9fa] -z-10" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1560bd]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#fa8128]/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* 404 Text */}
                        <h1 className="text-[120px] md:text-[200px] font-serif font-bold text-[#1560bd] leading-none select-none opacity-20">
                            404
                        </h1>

                        <div className="relative -mt-12 md:-mt-20 z-10">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-6">
                                Page Not Found
                            </h2>
                            <p className="text-gray-600 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                Oops! The page you keep looking for doesn't exist. It might have been moved or deleted.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 bg-[#1560bd] text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#12509e] transition-all group"
                                >
                                    <Home className="w-4 h-4" />
                                    Back to Home
                                </Link>
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2 bg-white text-[#1a1a1a] border border-gray-200 px-8 py-4 rounded-full font-sans font-medium hover:bg-gray-50 transition-all group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
