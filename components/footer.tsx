"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  "About Us",
  "Our Team",
  "Pricing Plans",
  "Blogs",
  "Contact Us",
];

const services = [
  "UI/UX Design",
  "App Development",
  "Digital Marketing",
  "Web Development",
  "Cyber Security",
];

const information = [
  "Working Process",
  "Privacy Policy",
  "Terms & Conditions",
  "FAQ",
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
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
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-white/70 font-sans hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
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
                    href="#"
                    className="text-white/70 font-sans hover:text-white transition-colors"
                  >
                    {service}
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
                    href="#"
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
      <div className="border-t bg-[#fa8128] border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white font-sans md:text-left text-center text-sm">
              Copyright ©2025 BertAndre Consulting. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-white font-sans text-sm hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white font-sans text-sm hover:text-white/60 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-white font-sans text-sm hover:text-white/60 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
