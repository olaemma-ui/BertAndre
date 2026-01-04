"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ArrowUpRight } from "lucide-react";
import { FAQ } from "@/lib/db";

interface FAQSectionProps {
  faqs: FAQ[];
  showHeader?: boolean;
}

export function FAQSection({ faqs, showHeader = true }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className={showHeader ? "grid lg:grid-cols-2 gap-12 lg:gap-20" : "max-w-3xl mx-auto"}>
          {/* Left Column */}
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-gray-200 text-sm font-sans text-[#1560bd] mb-6">
                <span className="text-[#1560bd]">+</span> Questions{" "}
                <span className="text-[#1560bd]">+</span>
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight mb-6">
                Have any questions?
                <br />
                here some answers.
              </h2>

              <p className="text-gray-600 font-sans leading-relaxed mb-8 max-w-md">
                In relation to websites and apps, UI design considers the look,
                interactivity of the making product. It's all about making sure
                that the user interface.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 cursor-pointer bg-[#fa8128] text-white px-6 py-3 rounded-full font-sans font-medium"
              >
                Ask Your Question
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.button>

              {/* Question Mark Decoration */}
              <div className="hidden lg:block mt-12">
                <span className="text-[120px] font-serif text-gray-100 select-none">
                  ?
                </span>
              </div>
            </motion.div>
          )}

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: showHeader ? 30 : 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: showHeader ? 0.2 : 0 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden transition-colors ${openIndex === index ? "bg-[#1560bd]" : "bg-gray-100"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3
                    className={`font-serif font-bold text-lg pr-4 ${openIndex === index ? "text-white" : "text-[#1a1a1a]"
                      }`}
                  >
                    {faq.question}
                  </h3>
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${openIndex === index
                      ? "bg-[#fa8128] text-white"
                      : "bg-[#fa8128] text-white"
                      }`}
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 text-white/70 font-sans leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
