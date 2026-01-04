"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function ContactInfoSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service_type: "",
    message: "",
  });

  const [settings, setSettings] = useState<Record<string, string>>({
    contact_email: "info@bertandreconsulting.com",
    contact_phone: "0201 330 0667",
    contact_address_ng: "20 Awudu epheka, Lekki Phase 1, Lagos, Nigeria",
    contact_address_us: "US: 8 The Green Suite 4000 Dover, DE 19901",
    office_hours: "Mon-Fri 8am-4pm",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (Object.keys(data).length > 0) {
            setSettings(prev => ({ ...prev, ...data }));
          }
        }
      } catch (error) {
        console.error("Error fetching settings for contact info:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", service_type: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <section className="py-20 pt-0">
              <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                  <div className="bg-[#1560bd]/5 col-span-2 gap-4 flex items-center p-8 py-6 rounded-3xl transition-all">
                    <div className="w-18 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-[#1560bd]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="w-full flex-col items-start justify-start">
                      <h3 className="text-xl font-bold text-[#1a1a1a]">Visit Us</h3>
                      <p className="text-gray-600">
                        {settings.contact_address_ng}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {settings.contact_address_us}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#1560bd]/5 flex gap-4 items-center p-8 py-6 rounded-3xl transition-all">
                    <div className="w-20 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-[#1560bd]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="w-full flex-col items-start justify-start">
                      <h3 className="text-xl font-bold text-[#1a1a1a]">Call Us</h3>
                      <p className="text-gray-600">{settings.contact_phone}</p>
                      <p className="text-gray-500 text-sm">{settings.office_hours}</p>
                    </div>
                  </div>
                  <div className="bg-[#1560bd]/5 flex gap-4 items-center justify-center p-8 py-6 rounded-3xl transition-all">
                    <div className="w-20 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-[#1560bd]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="w-full flex-col items-start justify-start">
                      <h3 className="text-xl font-bold text-[#1a1a1a]">Email Us</h3>
                      <p className="text-gray-600">{settings.contact_email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Right Column - Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#fa8128] rounded-3xl p-8 lg:p-10"
          >
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Make an Appointment
            </h3>
            <p className="text-white/60 font-sans text-sm mb-8">
              Feel free to contact with us, we don't spam your email
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Your Name*"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd]"
              />
              <input
                type="email"
                required
                placeholder="Email Here*"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd]"
              />
              <select
                value={formData.service_type}
                onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white font-sans text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd] appearance-none"
              >
                <option value="">Service Type</option>
                <option value="Consulting">Business Consulting</option>
                <option value="Finance">Finance Strategy</option>
                <option value="Development">Plan Development</option>
                <option value="Marketing">Digital Marketing</option>
              </select>
              <textarea
                required
                placeholder="Write your message*"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white font-sans text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1560bd] resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white text-[#1a1a1a] px-8 py-4 rounded-full font-sans font-medium mt-4 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
                <span className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" />}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
