"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, User, Calendar } from "lucide-react"
import Image from "next/image"

const blogs = [
  {
    title: "Empowering entrepreneu fueling growth knowledge",
    author: "Bret",
    date: "Sep 10, 2026",
    image: "/two-businessmen-working-at-laptop-in-cafe.jpg",
    featured: true,
  },
  {
    title: "Grow Your Business, Cut Office Costs by 70%",
    author: "Antonette",
    date: "Sep 11, 2026",
    image: "/business-team-meeting.png",
  },
  {
    title: "Powering Business— Always On, Always Ready",
    author: "Samantha",
    date: "Oct 21, 2026",
    image: "/woman-working-on-laptop-in-office.jpg",
  },
  {
    title: "Innovative solutions for business success dynamic from today",
    author: "Samantha",
    date: "Jun 12, 2026",
    image: "/diverse-business-team-collaboration.jpg",
  },
]

export function BlogSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Blog */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
              <Image
                src={blogs[0].image || "/placeholder.svg"}
                alt={blogs[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 font-sans mb-4">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {blogs[0].author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {blogs[0].date}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a] leading-tight group-hover:text-[#1560bd] transition-colors">
              {blogs[0].title}
            </h3>
          </motion.div>

          {/* Blog List */}
          <div className="flex flex-col gap-6">
            {blogs.slice(1).map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="relative w-40 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-sans mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {blog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {blog.date}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-[#1a1a1a] leading-tight mb-2 group-hover:text-[#1560bd] transition-colors">
                    {blog.title}
                  </h4>
                  <button className="flex items-center gap-2 text-sm font-sans font-medium text-[#1a1a1a] hover:text-[#1560bd] transition-colors">
                    Read More
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
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
          className="flex justify-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#1a1a1a]/90 transition-colors"
          >
            Discover More
            <span className="w-8 h-8 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
