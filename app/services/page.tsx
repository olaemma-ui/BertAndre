import { Header } from "@/components/header";
import { PageHero } from "@/components/page-hero";
import { ServicesGrid } from "@/components/services-grid";
import { FAQSection } from "@/components/faq-section";
import { ConsultationSection } from "@/components/consultation-section";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Our Services | BertAndre",
  description:
    "Explore our comprehensive business consulting and development services.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="relative -top-21">
        <PageHero
          title="Our Service"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Service" }]}
        />
        <ServicesGrid />
      </div>
      <FAQSection />
      <ConsultationSection />
      <Footer />
    </main>
  );
}
