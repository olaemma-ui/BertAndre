"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { GalleryItem } from "@/lib/projects";
import cloudinaryLoader from "@/lib/cloudinary";

interface ProjectGalleryProps {
    items: GalleryItem[];
}

export function ProjectGallery({ items }: ProjectGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    if (!items || items.length === 0) return null;

    return (
        <div className="relative group">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex -ml-4 touch-pan-y">
                    {items.map((item, index) => (
                        <div className="flex-[0_0_100%] min-w-0 pl-4 relative md:flex-[0_0_80%] lg:flex-[0_0_60%]" key={index}>
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/5 border border-black/5">
                                {item.type === "image" ? (
                                    <Image
                                        loader={cloudinaryLoader}
                                        src={item.url}
                                        alt={item.caption || "Gallery image"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="relative w-full h-full bg-black">
                                        <video
                                            src={item.url}
                                            controls
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                {item.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white text-sm font-sans">
                                        {item.caption}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#1a1a1a] hover:bg-white transition-all disabled:opacity-0"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#1a1a1a] hover:bg-white transition-all disabled:opacity-0"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}
