"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "./service-card";

const services = [
  {
    title: "Business Consulting",
    description:
      "See how our tailored solutions can boost your business. From planning to support.",
    features: [
      "Strategic Business Guidance",
      "Expert Growth Solutions",
      "Smart Consulting Services",
    ],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-8 h-8 text-[#1560bd]"
        fill="currentColor"
      >
        <path d="M8 12h32v4H8v-4zm0 8h24v4H8v-4zm0 8h32v4H8v-4zm0 8h24v4H8v-4z" />
        <circle cx="38" cy="24" r="4" />
      </svg>
    ),
  },
  {
    title: "Finance strategy",
    description:
      "See how our tailored solutions can boost your business. From planning to support.",
    features: [
      "Strategic Business Guidance",
      "Expert Growth Solutions",
      "Smart Consulting Services",
    ],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-8 h-8 text-[#1560bd]"
        fill="currentColor"
      >
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <rect x="28" y="8" width="12" height="12" rx="2" />
        <rect x="8" y="28" width="12" height="12" rx="2" />
        <rect x="28" y="28" width="12" height="12" rx="2" />
      </svg>
    ),
  },
  {
    title: "Plan development",
    description:
      "See how our tailored solutions can boost your business. From planning to support.",
    features: [
      "Strategic Business Guidance",
      "Expert Growth Solutions",
      "Smart Consulting Services",
    ],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-8 h-8 text-[#1560bd]"
        fill="currentColor"
      >
        <path d="M24 4L4 14v20l20 10 20-10V14L24 4zm0 4.5L38 14l-14 6-14-6 14-5.5zM8 18l14 6v14l-14-7V18zm32 0v13l-14 7V25l14-7z" />
      </svg>
    ),
  },
  {
    title: "Digital Marketing",
    description:
      "See how our tailored solutions can boost your business. From planning to support.",
    features: [
      "Strategic Business Guidance",
      "Expert Growth Solutions",
      "Smart Consulting Services",
    ],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-8 h-8 text-[#1560bd]"
        fill="currentColor"
      >
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 30v-8h-6l10-16v8h6L22 34z" />
      </svg>
    ),
  },
  {
    title: "Web Development",
    description:
      "See how our tailored solutions can boost your business. From planning to support.",
    features: [
      "Strategic Business Guidance",
      "Expert Growth Solutions",
      "Smart Consulting Services",
    ],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-8 h-8 text-[#1560bd]"
        fill="currentColor"
      >
        <path d="M6 10v28h36V10H6zm32 24H10V14h28v20zM18 22l-4 4 4 4 2-2-2-2 2-2-2-2zm12 0l-2 2 2 2-2 2 2 2 4-4-4-4zm-8 0l-2 8h4l2-8h-4z" />
      </svg>
    ),
  },
  {
    title: "Cyber Security",
    description:
      "See how our tailored solutions can boost your business. From planning to support.",
    features: [
      "Strategic Business Guidance",
      "Expert Growth Solutions",
      "Smart Consulting Services",
    ],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-8 h-8 text-[#1560bd]"
        fill="currentColor"
      >
        <path d="M24 4L6 12v12c0 11.1 7.8 21.5 18 24 10.2-2.5 18-12.9 18-24V12L24 4zm0 20h14c-1.1 8.4-6.8 15.9-14 18.4V24H10V14.3l14-6.4v16.1z" />
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-sans text-[#1a1a1a] mb-6">
            <span className="text-[#1560bd]">+</span> Our Services{" "}
            <span className="text-[#1560bd]">+</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a]">
            What We Offer
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
