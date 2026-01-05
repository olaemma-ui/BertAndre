"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const checkItems = [
  "Integrating diverse ideas to create well-rounded solutions",
  "Delivering consistently high-quality outcomes",
  "Believing in the power of thoughtful implementation",
];



export function AboutSection() {
  const router = useRouter();

  const handleAbout = () => {
    router.push('/about')
  }
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Creative Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Triangle shape with image 1 */}
              <div
                className="absolute top-0 left-0 w-3/5 h-3/5 overflow-hidden"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              >
                <Image
                  src="/images/business-colleagues-studying-reports.jpg"
                  alt="Business meeting"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Center triangle accent */}
              <div
                className="absolute top-1/4 left-1/3 w-1/4 h-1/3 bg-[#1560bd]"
                style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
              />

              {/* Triangle shape with image 2 */}
              <div
                className="absolute bottom-0 right-0 w-3/5 h-3/5 overflow-hidden"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              >
                <Image
                  src="/images/business-colleagues-studying-reports.jpg"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative triangle */}
              <div
                className="absolute bottom-1/4 right-1/3 w-1/4 h-1/3 bg-[#1a1a1a]"
                style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-[#1560bd]/20 bg-[#eff6ff] text-sm font-sans text-[#1560bd] mb-6 font-semibold">
                About BertAndre
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-8 leading-tight">
                We’re not just consultants. We’re your growth partners.
              </h2>
              <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
                Founded in Lagos and now operating globally, we are deeply rooted in the realities of today’s business landscape. BertAndre Consulting delivers tailored solutions that combine data-driven insight with real-world experience.
                Whether you’re launching a startup, scaling an existing business, or investing for the future, we help you move forward with clarity, confidence, and purpose.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 font-sans leading-relaxed mb-8"
            >
              To empower businesses of all sizes to thrive in an ever-changing marketplace.
            </motion.p>

            {/* Check Items */}
            <div className="space-y-4 mb-10">
              {checkItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="w-5 h-5 text-[#1560bd]" />
                  <span className="font-sans text-[#1a1a1a]">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleAbout}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 cursor-pointer bg-[#fa8128] text-white px-6 py-4 rounded-full font-sans font-medium transition-colors group"
            >
              More About Us
              <span className="w-8 h-8 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section >
  );
}
