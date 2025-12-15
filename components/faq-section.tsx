"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "What warranties do I have for installation?",
    answer:
      "Nor is there anyone who loves or pursues or desires to obtain pain of itself, because which toil and pain can procuresteady steady. The point of using is that it has a mores normal fact that a reader will be distracted by the readable content.",
  },
  {
    question: "How long does it take to build a new website?",
    answer:
      "The timeline depends on the complexity of your project. A simple website can take 2-4 weeks, while more complex projects with custom features may take 6-12 weeks. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "What do you need to start making me a website?",
    answer:
      "We'll need your brand assets (logo, colors, fonts), content (text, images), a clear understanding of your goals, and examples of websites you admire. We'll guide you through our onboarding process to gather everything needed.",
  },
  {
    question: "How to soft launch your business?",
    answer:
      "A soft launch involves releasing your product to a limited audience first. This allows you to gather feedback, identify issues, and make improvements before a full public launch. We can help you strategize the best approach.",
  },
  {
    question: "How does the trial work?",
    answer:
      "Our trial period gives you full access to our services for 14 days. You can explore all features, work with our team, and see the quality of our deliverables before making any commitment.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
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

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden transition-colors ${
                  openIndex === index ? "bg-[#1560bd]" : "bg-gray-100"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3
                    className={`font-serif font-bold text-lg pr-4 ${
                      openIndex === index ? "text-white" : "text-[#1a1a1a]"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      openIndex === index
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
