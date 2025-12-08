"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function ConsultationSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-lg mx-auto">
              <Image
                src="/smiling-businessman-in-gray-suit-holding-tablet.jpg"
                alt="Business consultant"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-full mb-6"
            >
              <span className="text-[#1560bd]">+</span>
              <span className="text-sm font-sans font-medium text-[#1a1a1a]">Contact Us</span>
              <span className="text-[#1560bd]">+</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight mb-4"
            >
              Get free business consultation today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 font-sans mb-8"
            >
              Need help with a project, have a question about our work? have a question about our work? We're here to
              help you.
            </motion.p>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white font-sans focus:outline-none focus:border-[#1560bd] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email*"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white font-sans focus:outline-none focus:border-[#1560bd] transition-colors"
                />
              </div>
              <textarea
                placeholder="Write your message*"
                rows={5}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white font-sans focus:outline-none focus:border-[#1560bd] transition-colors resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#1a1a1a]/90 transition-colors"
              >
                Request Free Consultation
                <span className="w-8 h-8 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
