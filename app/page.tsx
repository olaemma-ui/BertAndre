import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { RecentProjectsSection } from "@/components/recent-projects-section";
import { BlogSection } from "@/components/blog-section";
import { FAQSection } from "@/components/faq-section";
import { ConsultationSection } from "@/components/consultation-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <RecentProjectsSection />
      <BlogSection />
      <FAQSection />
      <ConsultationSection />
      <Footer />
    </main>
  );
}
