"use client"

import type React from "react"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
  slug?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  features,
  index,
  slug,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#fa8128]/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="mb-6 p-4 rounded-2xl bg-[#eff6ff] text-[#1560bd] w-fit group-hover:bg-[#fa8128] group-hover:text-white transition-colors">
        {icon}
      </div>

      <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-4 group-hover:text-[#fa8128] transition-colors">
        {slug ? <Link href={`/services/${slug}`}>{title}</Link> : title}
      </h3>

      <p className="text-gray-600 mb-6 font-sans leading-relaxed">
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1560bd]/40 group-hover:bg-[#fa8128] transition-colors" />
            {feature}
          </li>
        ))}
      </ul>

      {slug && (
        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center gap-2 text-[#1560bd] font-bold text-sm tracking-wide uppercase hover:gap-3 transition-all"
        >
          View Details
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </motion.div>
  );
}
