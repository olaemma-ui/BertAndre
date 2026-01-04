import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ConsultationSection } from "@/components/consultation-section";
import { FAQSection } from "@/components/faq-section";
import WhyUs from "@/components/why-us";
import { getFAQs } from "@/lib/db";
import { motion } from "framer-motion";

export default async function AboutPage() {
  const { faqs } = await getFAQs();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="relative -top-21">
        <PageHero
          title="About Us"
          backgroundImage="/images/business-colleagues-studying-reports.jpg"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />
        <WhyUs />
      </div>

      <FAQSection faqs={faqs} />
      <ConsultationSection />
      <Footer />
    </div>
  );
}
