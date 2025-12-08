"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ConsultationSection } from "@/components/consultation-section";
import { FAQSection } from "@/components/faq-section";

export default function AboutPage() {
  const coreValues = [
    {
      title: "Impact Over Hype",
      description: "We don’t chase trends. We create value that lasts.",
    },
    {
      title: "People First",
      description:
        "Behind every business goal is a human need, and that’s where we focus.",
    },
    {
      title: "Precision & Clarity",
      description:
        "We don’t do vague. Every solution is sharp, strategic, and rooted in data.",
    },
    {
      title: "Innovation with Purpose",
      description:
        "We embrace technology and new thinking, only when it serves your long-term goals.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative -top-21">
        <PageHero
          title="About Us"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />

        <section className="pb-20 bg-white">
          <div className="container mx-auto md:px-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mt-12 mb-6">
                About Us
              </h2>
              <p className="text-gray-600 mb-6">
                At BertAndre Consulting, we believe consulting should do more
                than give advice, it should move people, shift perspectives, and
                create lasting change. That’s why we exist: to help you unlock
                smarter opportunities through strategic guidance, personalized
                solutions, and a commitment to real, measurable growth.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mt-12 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                BertAndre was born from the desire to make expert consulting
                accessible, actionable, and impact-driven, especially in
                environments where innovation is often stifled by complexity. We
                saw a gap in how businesses and individuals were navigating
                financial decisions, strategic growth, tech solutions, and
                Property investments.
              </p>
              <p className="text-gray-600 mb-4">
                So, we stepped in with a clear mission: to bridge the knowledge
                gap, empower clients with clarity, and become trusted partners
                in their journey toward success. Today, we serve startups,
                established businesses, investors, and changemakers who want
                more than surface-level solutions. They want Transformation. And
                we deliver just that.
              </p>

              <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mt-12 mb-6">
                Our Core Values
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-l-4 border-[#1560bd] pl-6 py-2"
                  >
                    <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-12 mt-16">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">
                    Our Mission
                  </h2>
                  <p className="text-gray-600">
                    To empower clients through expert guidance, innovative
                    strategies, and tailored solutions, while promoting
                    sustainable growth and community prosperity.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">
                    Our Vision
                  </h2>
                  <p className="text-gray-600">
                    To become a leading force in Africa’s transformation story —
                    one business, one investment, one strategy at a time.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mt-12">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">
                    Who we Serve
                  </h2>
                  <p className="text-gray-600">
                    From ambitious intrapreneurs, entrepreneurs and growing SMEs
                    to large investors and development partners, we work with
                    people who are ready to move forward and do it the smart
                    way.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">
                    Why we're different
                  </h2>
                  <p className="text-gray-600">
                    Most consulting firms give advice. We give direction. We
                    walk with you. We care about your outcomes. And we’re not
                    just here for Lagos or Abuja — we’re building for a better
                    Nigeria and beyond.
                  </p>
                </div>
              </div>
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
