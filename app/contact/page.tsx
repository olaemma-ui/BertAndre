import { Header } from "@/components/header";
import { PageHero } from "@/components/page-hero";
import { ContactInfoSection } from "@/components/contact-info-section";
import { MapSection } from "@/components/map-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Contact Us | BertAndre",
  description: "Get in touch with our team for a free business consultation.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="relative -top-21">
        <PageHero
          title="Contact Us"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        />
        <ContactInfoSection />
      </div>
      <FAQSection />
      <MapSection />
      <Footer />
    </main>
  );
}
