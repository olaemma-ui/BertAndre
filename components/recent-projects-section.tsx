"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Team Strategy Session",
    image: "/business-team-meeting-at-night-in-modern-office-wi.jpg",
  },
  {
    title: "Collaborative Workshop",
    image: "/diverse-team-having-discussion-with-globe.jpg",
  },
  {
    title: "Client Presentation",
    image: "/business-professionals-in-meeting-room-discussion.jpg",
  },
]

export function RecentProjectsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-full mb-6"
            >
              <span className="text-[#1560bd]">+</span>
              <span className="text-sm font-sans font-medium text-[#1a1a1a]">Recent Projects</span>
              <span className="text-[#1560bd]">+</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight"
            >
              Explore the Recent Works We Have Done!
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-sans leading-relaxed max-w-md"
          >
            The solar solution company specializes in providing innovative, eco-friendly energy systems harness the
            power, reducing carbon footprints and energy for clients worldwide.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Large Project */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 relative group"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={projects[0].image || "/placeholder.svg"}
                alt={projects[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center shadow-lg"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Two Small Projects */}
            <div className="grid grid-cols-2 gap-6">
              {projects.slice(1).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-[#1a1a1a] rounded-2xl p-8 flex-1"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Unlocking New Opportunities for Sustainable Growth
              </h3>
              <p className="text-white/70 font-sans mb-6">
                The solar solution company specializes in providing innovative, eco-friendly energy systems harness the
                power.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-sans font-medium hover:bg-gray-100 transition-colors"
              >
                View All Details
                <span className="w-6 h-6 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
