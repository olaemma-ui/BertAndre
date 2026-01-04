"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const items = [
  {
    title: "About Us",
    content:
      "At BertAndre Consulting, we believe consulting should do more than give advice, it should move people, shift perspectives, and create lasting change. That’s why we exist: to help you unlock smarter opportunities through strategic guidance, personalized solutions, and a commitment to real, measurable growth.",
  },
  {
    title: "Our Story",
    content:
      "BertAndre was born from the desire to make expert consulting accessible, actionable, and impact-driven, especially in environments where innovation is often stifled by complexity. We saw a gap in how businesses and individuals were navigating financial decisions, strategic growth, tech solutions, and property investments.\n\nSo, we stepped in with a clear mission: to bridge the knowledge gap, empower clients with clarity, and become trusted partners in their journey toward success. Today, we serve startups, established businesses, investors, and changemakers who want more than surface-level solutions. They want transformation. And we deliver just that.",
  },
  {
    title: "Our Core Values",
    content:
      "Impact Over Hype – We don’t chase trends. We create value that lasts.\n\nPeople First – Behind every business goal is a human need, and that’s where we focus.\n\nPrecision & Clarity – We don’t do vague. Every solution is sharp, strategic, and rooted in data.\n\nInnovation with Purpose – We embrace technology and new thinking, only when it serves your long-term goals.",
  },
  {
    title: "Our Mission",
    content:
      "To empower clients through expert guidance, innovative strategies, and tailored solutions, while promoting sustainable growth and community prosperity.",
  },
  {
    title: "Our Vision",
    content:
      "To become a leading force in Africa’s transformation story — one business, one investment, one strategy at a time.",
  },
  {
    title: "Who We Serve",
    content:
      "From ambitious intrapreneurs, entrepreneurs and growing SMEs to large investors and development partners, we work with people who are ready to move forward and do it the smart way.",
  },
  {
    title: "Why We're Different",
    content:
      "Most consulting firms give advice. We give direction. We walk with you. We care about your outcomes. And we’re not just here for Lagos or Abuja — we’re building for a better Nigeria and beyond.",
  },
];

export default function AboutTabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-10 border-b pb-6 mb-14 text-sm">
        {items.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActiveIndex(index)}
            className={`relative font-medium transition ${
              activeIndex === index
                ? "text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {item.title}

            {activeIndex === index && (
              <motion.span
                layoutId="about-tab-indicator"
                className="absolute -bottom-6 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            {activeItem.title}
          </h2>

          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {activeItem.content}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
