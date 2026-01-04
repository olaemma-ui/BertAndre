import { Header } from "@/components/header";
import { PageHero } from "@/components/page-hero";
import { ServicesGrid } from "@/components/services-grid";
import { FAQSection } from "@/components/faq-section";
import { ConsultationSection } from "@/components/consultation-section";
import { Footer } from "@/components/footer";
import { getServices, getFAQs } from "@/lib/db";

export const metadata = {
  title: "Our Services | BertAndre",
  description:
    "Explore our comprehensive business consulting and development services.",
};

export default async function ServicesPage() {
  const [{ services }, { faqs }] = await Promise.all([
    getServices(),
    getFAQs()
  ]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="relative -top-21">
        <PageHero
          title="Our Service"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Service" }]}
        />
        <ServicesGrid services={services} />
      </div>
      <FAQSection faqs={faqs} />
      <ConsultationSection />
      <Footer />
    </main>
  );
}
