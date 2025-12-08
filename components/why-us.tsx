"use client";

import Image from "next/image";
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
      "From ambitious intrapreneurs, entrepreneurs, and growing SMEs to large investors and development partners, we work with people who are ready to move forward and do it the smart way.",
  },
  {
    title: "Why We're Different",
    content:
      "Most consulting firms give advice. We give direction. We walk with you. We care about your outcomes. And we’re not just here for Lagos or Abuja — we’re building for a better Nigeria and beyond.",
  },
];

export default function WhyUs() {
  const [open, setOpen] = useState(0);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-scree bg-white">
      {/* LEFT IMAGE */}
      <div className="relative">
        <Image
          src="/images/business-meeting.webp" // replace with your actual image
          alt="BertAndre Consulting"
          //   fill
          width={1000}
          height={1000}
          className="object-cover h-full w-full"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="p-6 md:p-12 lg:p-20 flex flex-col gap-8">
        

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className="border-b pb-4 cursor-pointer"
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                {/* HEADER ROW */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif font-regular">
                    {item.title}
                  </h3>

                  <motion.span
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-xl font-light"
                  >
                    {isOpen ? "−" : "+"}
                  </motion.span>
                </div>

                {/* CONTENT */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 whitespace-pre-line mt-3 leading-relaxed text-sm">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
