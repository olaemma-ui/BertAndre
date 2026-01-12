"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search as SearchIcon, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { searchSite, SearchResult } from "@/app/actions/search";
import cloudinaryLoader from "@/lib/cloudinary";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim()) {
                setIsLoading(true);
                try {
                    const data = await searchSite(query);
                    setResults(data);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
                >
                    <div className="container mx-auto px-6 pt-24 h-full flex flex-col">
                        {/* Header / Input */}
                        <div className="relative mb-12">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type to search projects, blogs..."
                                className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-5xl font-serif text-white placeholder-white/20 py-4 outline-none focus:border-[#fa8128] transition-colors"
                            />
                            <button
                                onClick={onClose}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-8 h-8 md:w-10 md:h-10" />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="flex-1 overflow-y-auto pb-20">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="w-10 h-10 text-[#fa8128] animate-spin" />
                                </div>
                            ) : results.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {results.map((result, idx) => (
                                        <Link
                                            key={idx}
                                            href={result.url}
                                            onClick={onClose}
                                            className="group flex gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                                                <Image
                                                    loader={cloudinaryLoader}
                                                    src={result.image}
                                                    alt={result.title}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-xs font-bold text-[#fa8128] uppercase tracking-wider mb-2">
                                                    {result.category}
                                                </span>
                                                <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#fa8128] transition-colors">
                                                    {result.title}
                                                </h3>
                                                <p className="text-sm text-white/60 line-clamp-2">
                                                    {result.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : query.trim() ? (
                                <div className="text-center text-white/40 py-20">
                                    <p className="text-xl">No results found for "{query}"</p>
                                </div>
                            ) : (
                                <div className="text-center text-white/20 py-20">
                                    <p className="text-lg">Start typing to see results</p>
                                </div>
                            )}
                        </div>

                        <div className="py-8 text-center text-white/30 text-sm border-t border-white/10">
                            Press <span className="border border-white/20 px-2 py-0.5 rounded text-white/50">ESC</span> to close
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
