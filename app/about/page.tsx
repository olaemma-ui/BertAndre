"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ConsultationSection } from "@/components/consultation-section";
import { FAQSection } from "@/components/faq-section";
import WhyUs from "@/components/why-us";

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative -top-21">
        <PageHero
          title="About Us"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />

        <section className="pt-20 md:pt-28 bg-white">
          <div className="container mx-auto md:px-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <WhyUs />
            </motion.div>
          </div>
        </section>
      </main>
      <FAQSection />
      <ConsultationSection />
      <Footer />
    </div>
  );
}
