import { Header } from "@/components/header";
import { PageHero } from "@/components/page-hero";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { getFAQs } from "@/lib/db";

export const metadata = {
    title: "FAQ | BertAndre",
    description: "Frequently asked questions about our strategic consulting services.",
};

export default async function FAQPage() {
    const { faqs } = await getFAQs();

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="relative -top-21">
                <PageHero
                    title="FAQ"
                    description="Everything you need to know about partnering with BertAndre."
                    backgroundImage="/images/FAQ.png"
                    breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
                />
                <div className="bg-white py-20">
                    <FAQSection faqs={faqs} showHeader={false} />
                </div>
            </div>
            <Footer />
        </main>
    );
}
