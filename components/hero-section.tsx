"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "Welcome to BertAndre Consulting",
    heading: "Business Growth Made Simple",
    description:
      "Transform your business with expert consultancy from a team of seasoned professionals.",
    image: "/images/vintage-style-people-working-office-with-computers.jpg",
  },
  {
    id: 2,
    badge: "Expert solutions",
    heading: "Strategic Planning Excellence",
    description:
      "Unlock your company's potential with data-driven strategies and innovative solutions tailored to your unique challenges.",
    image: "/images/business-colleagues-studying-reports.jpg",
  },
  {
    id: 3,
    badge: "Trusted partner",
    heading: "Results That Matter",
    description:
      "Partner with industry leaders who understand your vision and deliver measurable outcomes for sustainable success.",
    image: "/images/man-sitting-down-office-job-interview-desk-with-his-employers.jpg",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const current = slides[currentSlide];

  return (
    <section className="relative -top-[82.5px] min-h-screen flex flex-col">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={current.image || "/placeholder.svg"}
            alt="Business professionals in meeting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a1a1a]/60 " />
          <div className="absolute inset-0 bg-linear-to-b from-[#1560bd]/10 via-[#1560bd]/5 to-[#1560bd]/50" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide}>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full mb-8"
                >
                  <span className="text-[#fa8128]">+</span>
                  <span className="text-sm font-sans font-medium">
                    {current.badge}
                  </span>
                  <span className="text-[#fa8128]">+</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  // exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 text-balance"
                >
                  {current.heading}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-white/80 text-base md:text-lg font-sans max-w-xl mb-10 leading-relaxed"
                >
                  {current.description}
                </motion.p>

                {/* CTA Button */}
                <Link href="/book-consultation">
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-3 bg-white text-[#1a1a1a] px-6 py-4 rounded-full font-sans font-medium hover:bg-gray-100 transition-colors group"
                  >
                    Book Consultation
                    <span className="w-8 h-8 rounded-full bg-[#1560bd] text-white flex items-center justify-center group-hover:bg-[#1560bd]/90 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Arrows */}
      <div className="relative z-10 border-t border-white/20 backdrop-blur-sm-">
        <div className="mx-auto">
          <div className="flex items-center justify-around">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="text-white/70 w-full h-[100px] rounded-none cursor-pointer"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-6 h-6 mx-auto" />
            </motion.button>

            {/* Slide indicators */}
            <div className="flex items-center h-[100px] w-0.5 bg-white/20 gap-2">
              {/* {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-[#fa8128] w-6"
                      : "bg-white/40 hover:bg-white/60 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))} */}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="text-white/70 text-center w-full h-[100px] cursor-pointer"
              aria-label="Next slide"
            >
              <ArrowRight className="w-6 h-6 mx-auto" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
