"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function ContactFormSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Lines */}
      <div className="absolute top-20 right-0 w-1/3 h-px bg-gray-200" />
      <div className="absolute top-40 right-20 w-1/4 h-px bg-gray-200" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/professional-businessman-holding-tablet-smiling-of.jpg"
                alt="Business Professional"
                width={500}
                height={600}
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Dot decoration */}
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-[#1a1a1a] rounded-full" />
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-[#1a1a1a] rounded-full" />
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-gray-200 text-sm font-sans text-[#1a1a1a] mb-6">
              <span className="text-[#1560bd]">+</span> Contact Us <span className="text-[#1560bd]">+</span>
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight mb-6">
              Get free business
              <br />
              consultation today
            </h2>

            <p className="text-gray-600 font-sans leading-relaxed mb-8">
              Need help with a project, have a question about our work? have a question about our work? We're here to
              help you.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-[#1560bd] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email*"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-[#1560bd] transition-colors"
                />
              </div>

              <textarea
                placeholder="Write your message*"
                rows={5}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-[#1560bd] transition-colors resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-sans font-medium"
              >
                Request Free Consultation
                <span className="w-8 h-8 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
