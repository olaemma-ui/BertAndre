"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function ContactInfoSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-gray-200 text-sm font-sans text-[#1a1a1a] mb-6">
              <span className="text-[#1560bd]">+</span> Contact Us <span className="text-[#1560bd]">+</span>
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight mb-6">
              Let's Build an Awesome
              <br />
              Project Together
            </h2>

            <p className="text-gray-600 font-sans leading-relaxed mb-8 max-w-md">
              Each demo built with Teba will look different. You can customize almost anything in the appearance of your
              website with only a few clicks. Each demo built with Teba will look different.
            </p>
          </motion.div>

          {/* Right Column - Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1a1a1a] rounded-3xl p-8 lg:p-10"
          >
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Make an Appointment</h3>
            <p className="text-white/60 font-sans text-sm mb-8">
              Feel free to contact with us, we don't spam your email
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name*"
                className="w-full px-5 py-4 rounded-xl bg-white font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd]"
              />
              <input
                type="email"
                placeholder="Email Here*"
                className="w-full px-5 py-4 rounded-xl bg-white font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd]"
              />
              <select className="w-full px-5 py-4 rounded-xl bg-white font-sans text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd] appearance-none">
                <option value="">Service Type</option>
                <option value="consulting">Business Consulting</option>
                <option value="finance">Finance Strategy</option>
                <option value="development">Plan Development</option>
                <option value="marketing">Digital Marketing</option>
              </select>
              <textarea
                placeholder="Write your message*"
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd] resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-white text-[#1a1a1a] px-8 py-4 rounded-full font-sans font-medium mt-4"
              >
                Send Message
                <span className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
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
