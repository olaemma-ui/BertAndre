"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Check, ArrowRight, ArrowLeft, Calendar, User, Briefcase, Loader2, Clock } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { DateTimePicker } from "@/components/ui/date-time-picker"

export default function BookConsultationPage() {
    const [step, setStep] = useState(1)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [interval, setInterval] = useState<30 | 60>(30)
    const [formData, setFormData] = useState({
        service: "",
        name: "",
        email: "",
        company: "",
        message: "",
        preferred_timing: "",
    })
    const [loading, setLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const services = [
        "Financial Consulting",
        "Real Estate Advisory",
        "Strategy Development",
        "Strategy Execution",
        "Brand Communication",
        "Tech Solution",
        "Other",
    ]

    const handleNext = () => setStep((prev) => prev + 1)
    const handleBack = () => setStep((prev) => prev - 1)

    const handleSubmit = async () => {
        const timingCode = selectedDate ? format(selectedDate, "PPP 'at' HH:mm") : ""
        if (!formData.name || !formData.email || !formData.service || !timingCode) {
            toast.error("Please fill in all required fields")
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    service_type: formData.service,
                    message: formData.message,
                    preferred_timing: timingCode
                })
            })

            if (res.ok) {
                setIsSubmitted(true)
                toast.success("Consultation requested successfully!")
            } else {
                throw new Error("Failed to submit request")
            }
        } catch (error) {
            console.error("Submission error:", error)
            toast.error("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="relative -top-21">
                <PageHero
                    title="Book Your Consultation"
                    description="Let's discuss how we can help you achieve your business goals."
                    breadcrumb={[
                        { label: "Home", href: "/" },
                        { label: "Book Consultation", href: "/book-consultation" },
                    ]}
                />

                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="bg-white rounded-lg  overflow-hidden">
                            {/* Progress Bar */}
                            <div className="bg-gray-100 h-2 w-full">
                                <motion.div
                                    className="h-full bg-[#1560bd]"
                                    initial={{ width: "33%" }}
                                    animate={{ width: `${(step / 3) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="p-8 md:p-12">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                                <Briefcase className="w-6 h-6 text-[#fa8128]" />
                                                What can we help you with?
                                            </h2>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {services.map((service) => (
                                                    <button
                                                        key={service}
                                                        onClick={() => setFormData({ ...formData, service })}
                                                        className={`p-4 rounded-xl border text-left transition-all ${formData.service === service
                                                            ? "border-[#1560bd] bg-[#1560bd]/5 text-[#1560bd] font-medium"
                                                            : "border-gray-200 hover:border-[#fa8128] text-gray-600"
                                                            }`}
                                                    >
                                                        {service}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="mt-8 flex justify-end">
                                                <button
                                                    onClick={handleNext}
                                                    disabled={!formData.service}
                                                    className="flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a1a1a]/90 transition-colors"
                                                >
                                                    Next Step <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                                <User className="w-6 h-6 text-[#fa8128]" />
                                                Your Details
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1560bd]"
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="Email Address"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1560bd]"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Company Name (Optional)"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1560bd]"
                                                />
                                                <textarea
                                                    placeholder="Tell us a bit about your project or challenge..."
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1560bd] resize-none"
                                                />
                                            </div>
                                            <div className="mt-8 flex justify-between">
                                                <button
                                                    onClick={handleBack}
                                                    className="flex items-center gap-2 text-gray-500 hover:text-[#1a1a1a]"
                                                >
                                                    <ArrowLeft className="w-4 h-4" /> Back
                                                </button>
                                                <button
                                                    onClick={handleNext}
                                                    disabled={!formData.name || !formData.email}
                                                    className="flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3 rounded-full disabled:opacity-50 hover:bg-[#1a1a1a]/90 transition-colors"
                                                >
                                                    Next Step <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && !isSubmitted && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <div className="flex items-center justify-between mb-6">
                                                <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                                                    <Calendar className="w-6 h-6 text-[#fa8128]" />
                                                    Preferred Timing
                                                </h2>
                                                <div className="flex bg-gray-100 p-1 rounded-lg text-[10px] font-bold">
                                                    <button
                                                        onClick={() => setInterval(30)}
                                                        className={cn("px-3 py-1.5 rounded-md transition-all", interval === 30 ? "bg-white text-[#1560bd] shadow-sm" : "text-gray-400")}
                                                    >
                                                        30 MIN
                                                    </button>
                                                    <button
                                                        onClick={() => setInterval(60)}
                                                        className={cn("px-3 py-1.5 rounded-md transition-all", interval === 60 ? "bg-white text-[#1560bd] shadow-sm" : "text-gray-400")}
                                                    >
                                                        60 MIN
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-8 font-sans">
                                                Select a date and your preferred time slot for the consultation.
                                            </p>

                                            <DateTimePicker
                                                date={selectedDate}
                                                setDate={setSelectedDate}
                                                interval={interval}
                                            />

                                            <div className="bg-[#eff6ff] p-6 rounded-2xl mb-8 mt-10 border border-blue-100/50">
                                                <h4 className="font-bold text-[#1560bd] mb-3 text-sm uppercase tracking-wider">Summary</h4>
                                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                                    <div>
                                                        <p className="text-gray-400 text-xs mb-1">Service</p>
                                                        <p className="text-gray-900 font-medium">{formData.service}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 text-xs mb-1">Full Name</p>
                                                        <p className="text-gray-900 font-medium">{formData.name}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-gray-400 text-xs mb-1">Timing</p>
                                                        <p className="text-[#1560bd] font-bold">
                                                            {selectedDate ? format(selectedDate, "PPPP 'at' HH:mm") : "Not selected"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 flex justify-between">
                                                <button
                                                    onClick={handleBack}
                                                    className="flex items-center gap-2 text-gray-500 hover:text-[#1a1a1a]"
                                                >
                                                    <ArrowLeft className="w-4 h-4" /> Back
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={!selectedDate || loading}
                                                    className="flex items-center gap-2 bg-[#fa8128] text-white px-8 py-3 rounded-full hover:bg-[#fa8128]/90 transition-colors shadow-lg shadow-[#fa8128]/20 disabled:opacity-50"
                                                >
                                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                    {loading ? "Submitting..." : "Submit Request"}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {isSubmitted && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Check className="w-10 h-10" />
                                            </div>
                                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Request Sent!</h2>
                                            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                                Thank you for choosing BertAndre. Our team will review your request and reach out via email shortly.
                                            </p>
                                            <button
                                                onClick={() => window.location.href = '/'}
                                                className="px-8 py-3 bg-[#1560bd] text-white rounded-full font-medium hover:bg-[#1560bd]/90 transition-all shadow-lg shadow-[#1560bd]/20"
                                            >
                                                Return to Home
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>

    )
}
