"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  index: number
}

export function ServiceCard({ icon, title, description, features, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-shadow"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mb-6">{icon}</div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#1a1a1a] mb-4">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 font-sans leading-relaxed mb-6">{description}</p>

      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-[#1a1a1a] font-sans">
            <Plus className="w-4 h-4 text-[#1560bd]" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
