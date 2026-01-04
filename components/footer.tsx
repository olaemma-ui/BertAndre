"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Instagram, Music as Tiktok } from "lucide-react";
import Image from "next/image";



import { Service } from "@/lib/services";

const information = [
  "Privacy Policy",
  "Terms & Conditions",
  "FAQ",
];

const socialLinks = [
  // { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/bertandre-consulting/" },
  { icon: Tiktok, href: "https://www.tiktok.com/@bertandreconsulting?_r=1&_t=ZS-91feNqOsNyK" },
  { icon: Instagram, href: "https://www.instagram.com/bertandreconsulting?igsh=azNxcDhsYmE0MXFt" },
];

export function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({
    contact_email: "info@bertandreconsulting.com",
    contact_phone: "0201 330 0667",
    contact_address_ng: "20 Awudu epheka, Lekki Phase 1, Lagos, Nigeria",
    office_hours: "Mon–Fri | 8AM – 4PM (WAT)",
  });
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings and services in parallel
        const [settingsRes, servicesRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/services?limit=10")
        ]);

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          if (Object.keys(data).length > 0) {
            setSettings(prev => ({ ...prev, ...data }));
          }
        }

        if (servicesRes.ok) {
          const data = await servicesRes.json();
          setServices(data.services || []);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-[#1560bd] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src={"/images/logo.png"}
                alt="Logo"
                width={120}
                height={32}
                className="object-fit"
              />
            </Link>
            <p className="text-white/70 font-sans leading-relaxed mb-8">
              At BertAndre Consulting, we believe consulting should do more than
              give advice, it should move people, shift perspectives, and create
              lasting change. That’s why we exist: to help you unlock smarter
              opportunities through strategic guidance, personalized solutions,
              and a commitment to real, measurable growth.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-serif font-bold text-lg mb-6">Quick Link</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-white/70 font-sans hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 font-sans hover:text-white transition-colors">Our Team</Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/70 font-sans hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/blogs" className="text-white/70 font-sans hover:text-white transition-colors">Blogs</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 font-sans hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-serif font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/70 font-sans hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-serif font-bold text-lg mb-6">Information</h4>
            <ul className="space-y-4">
              {information.map((info, index) => (
                <li key={index}>
                  <Link
                    href={`/${info.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="text-white/70 font-sans hover:text-white transition-colors"
                  >
                    {info}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-[#1560bd] border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/80 leading-relaxed mb-0">
              {settings.contact_address_ng} <br />
              {settings.contact_address_us}
            </p>
            <div className="space-y-2 text-right">
              <a
                href={`mailto:${settings.contact_email}`}
                className="block text-white hover:text-[#fa8128] transition-colors"
              >
                {settings.contact_email}
              </a>
              <a
                href={`tel:${settings.contact_phone.replace(/\s/g, '')}`}
                className="block text-white hover:text-[#fa8128] transition-colors"
              >
                {settings.contact_phone}
              </a>
              <span className="block text-sm text-white/60 mt-2">
                {settings.office_hours}
              </span>
            </div>  <Link
              href="/contact"
              className="text-white font-sans text-sm hover:text-white/60 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
