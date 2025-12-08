"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const checkItems = [
  "Integrate a diverse range of ideas",
  "Deliver the highest quality outcomes",
  "Believe in power of implication",
];

const logos = [
  "ogitech",
  "Google",
  "CHASE",
  "factual",
  "Matrixian",
  "logitech",
  "Google",
];

// Marquee component for scrolling logos
function Marquee({
  children,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div
        className={`flex w-max animate-marquee-${direction} ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
      >
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-16 md:gap-24">
            {children}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

export function AboutSection() {
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
                  src="/images/business-meeting.webp"
                  alt="Business professional working"
                  fill
                  className="object-cover"
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
                  src="/images/business-meeting.webp"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-full mb-6"
            >
              <span className="text-[#1560bd]">+</span>
              <span className="text-sm font-sans font-medium text-[#1a1a1a]">
                Our Company
              </span>
              <span className="text-[#1560bd]">+</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight mb-6"
            >
              Redesigning business for solutions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 font-sans leading-relaxed mb-8"
            >
              Our mission is to empowers businesses off all size to thrive in an
              our businesses ever changing marketplace.
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
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#1560bd]" />
                  <span className="font-sans text-[#1a1a1a]">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-[#1a1a1a] text-white px-6 py-4 rounded-full font-sans font-medium hover:bg-[#1a1a1a]/90 transition-colors group"
            >
              More About Us
              <span className="w-8 h-8 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Logo Bar with Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-gray-100"
        >
          <Marquee className="py-4">
            {logos.map((logo, index) => (
              <span
                key={index}
                className="text-gray-400 font-sans font-medium text-lg mx-8 md:mx-12"
              >
                {logo}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
