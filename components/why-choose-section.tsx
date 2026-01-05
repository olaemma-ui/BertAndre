"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Trophy, Headphones } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const stats: { number: string; label: string }[] = [
  // { number: "20k+", label: "Project completed" },
  // { number: "12k+", label: "Happy customers" },
  // { number: "25+", label: "Years experiences" },
];



export function WhyChooseSection() {
  const router = useRouter();

  const handleAbout = () => {
    router.push('/project')
  }
  return (
    <section className="py-20 lg:py-32 bg-[#1560bd] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`grid gap-12 items-center ${stats.length > 0 ? "lg:grid-cols-12" : "lg:grid-cols-2 max-w-6xl mx-auto"}`}>
          {/* Left Content */}
          <div className={stats.length > 0 ? "lg:col-span-5" : ""}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6"
            >
              <span className="text-[#fa8128]">+</span>
              <span className="text-sm font-sans font-medium text-white">
                Why Choose Us
              </span>
              <span className="text-[#fa8128]">+</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6"
            >
              Impact Over Hype. Value That Lasts.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 font-sans leading-relaxed mb-10"
            >
              At BertAndre Consulting, we don’t just give advice—we give direction. We bridge the knowledge gap, empower clients with clarity, and become trusted partners in your journey toward success.
            </motion.p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-xs- rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-full bg-[#fa8128]/20 flex items-center justify-center mb-4">
                  <Trophy className="w-5 h-5 text-[#fa8128]" />
                </div>
                <h3 className="font-serif font-bold text-white mb-2">
                  Precision & Clarity
                </h3>
                <p className="text-sm text-white/60 font-sans">
                  We don’t do vague. Every solution is sharp, strategic, and rooted in data.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-xs- rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-full bg-[#fa8128]/20 flex items-center justify-center mb-4">
                  <Headphones className="w-5 h-5 text-[#fa8128]" />
                </div>
                <h3 className="font-serif font-bold text-white mb-2">
                  Innovation with Purpose
                </h3>
                <p className="text-sm text-white/60 font-sans">
                  We embrace technology and new thinking, only when it serves your long-term goals.
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAbout}
              className="flex items-center gap-3 bg-white text-[#1a1a1a] px-6 py-4 rounded-full font-sans font-medium hover:bg-gray-100 transition-colors group"
            >
              Discover More
              <span className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>
          </div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={stats.length > 0 ? "lg:col-span-4" : ""}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/tech-consulting-office.png"
                alt="Business meeting"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Stats */}
          {stats.length > 0 && (
            <div className="lg:col-span-3 flex flex-col gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className={`w-40 h-40 rounded-full flex flex-col items-center justify-center ${index === 1
                    ? "bg-white text-[#1a1a1a] ml-auto lg:ml-8"
                    : "bg-[#1a1a1a] border-2 border-white/20 text-white"
                    }`}
                >
                  <span
                    className={`text-3xl font-serif font-bold ${index === 1 ? "text-[#1560bd]" : ""
                      }`}
                  >
                    {stat.number}
                  </span>
                  <span className="text-sm font-sans mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
