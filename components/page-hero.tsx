"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageHeroProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
}

export function PageHero({ title, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute h-full inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/business-meeting.webp')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/70" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-white/80 font-sans"
        >
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
