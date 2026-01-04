"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "./service-card";
import { Service } from "@/lib/services";

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
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
              // Pass a default icon if not defined in data, or handle it in the card
              icon={
                <svg
                  viewBox="0 0 48 48"
                  className="w-8 h-8 text-[#1560bd]"
                  fill="currentColor"
                >
                  <path d="M8 12h32v4H8v-4zm0 8h24v4H8v-4zm0 8h32v4H8v-4zm0 8h24v4H8v-4z" />
                  <circle cx="38" cy="24" r="4" />
                </svg>
              }
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
              slug={service.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
