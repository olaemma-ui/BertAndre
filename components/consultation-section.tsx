"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
                src="/images/contact-support-team.png"
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
              <span className="text-sm font-sans font-medium text-[#1a1a1a]">
                Contact Us
              </span>
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
              Need help with a project, have a question about our work? have a
              question about our work? We're here to help you.
            </motion.p>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-600 font-sans mb-8">
                Ready to transform your business? detailed consultation to discuss your specific needs and how we can help you achieve your goals.
              </p>
              <Link href="/book-consultation">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 cursor-pointer bg-[#fa8128] text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#1a1a1a]/90 transition-colors"
                >
                  Book Your Consultation Now
                  <span className="w-8 h-8 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
