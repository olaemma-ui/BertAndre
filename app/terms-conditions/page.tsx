import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <PageHero
                title="Terms & Conditions"
                description="Please read these terms and conditions carefully before using our service."
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Terms & Conditions", href: "/terms-conditions" },
                ]}
            />

            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="prose prose-lg max-w-none font-sans">
                        <h3>1. Introduction</h3>
                        <p>
                            Welcome to BertAndre Consulting. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
                        </p>

                        <h3>2. Intellectual Property</h3>
                        <p>
                            The content, design, fees, and graphics on this website are owned by BertAndre Consulting and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
                        </p>

                        <h3>3. Services</h3>
                        <p>
                            We provide business consulting, strategy development, and related services. The specific terms of our engagement will be outlined in a separate agreement or contract with each client.
                        </p>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            To the fullest extent permitted by law, BertAndre Consulting shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                        </p>

                        <h3>5. Governing Law</h3>
                        <p>
                            These Terms and Conditions generally are governed by the laws of Nigeria. Any disputes arising from these terms shall be resolved in the courts of Nigeria.
                        </p>

                        <h3>6. Changes to Terms</h3>
                        <p>
                            We reserve the right to modify these terms at any time. We will notify users of any significant changes by posting the new terms on this page.
                        </p>

                        <h3>7. Contact Us</h3>
                        <p>
                            If you have any questions about these Terms and Conditions, please contact us at info@bertandreconsulting.com.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
