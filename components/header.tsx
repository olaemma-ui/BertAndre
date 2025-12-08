"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  ArrowUpRight,
  Menu,
  X,
  ArrowUp,
} from "lucide-react";
import Image from "next/image";

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", hasDropdown: false, href: "/" },
    { name: "About Us", hasDropdown: false, href: "/about" },
    { name: "Services", hasDropdown: true, href: "/services" },
    // { name: "Blog", hasDropdown: true, href: "/blog" },
    { name: "Contact", hasDropdown: false, href: "/contact" },
  ];

  const servicesDropdown = {
    whyUs: [
      {
        title: "Become a Partner",
        description:
          "Links customers with trusted Partners who help them realize greater value—faster—through BertAndre.",
      },
      {
        title: "Case Studies",
        description:
          "Hundreds of emerging brands thrive with BertAndre. Discover their journeys.",
      },
      {
        title: "Product Development",
        description:
          "Speed up innovation to enable quicker, effective team-driven product launches.",
      },
    ],
    featuredCaseStudy: {
      title: "BertAndre Subscriptions",
      description:
        "Hundreds of emerging brands thrive with BertAndre. Discover their journeys.",
      image: "/colorful-sticky-notes-on-wall-brainstorming.jpg",
    },
  };

  const toggleMobileDropdown = (itemName: string) => {
    if (mobileDropdown === itemName) {
      setMobileDropdown(null);
    } else {
      setMobileDropdown(itemName);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 border-b border-white/20 transition-all duration-300 ${
          scrolled ? "bg-[#1560bd]" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 border-r border-white/12 h-full p-4 pl-0"
            >
              <Image
                src={"/images/logo.png"}
                alt="Logo"
                width={150}
                height={40}
                className="object-fit"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 transition-colors text-sm font-sans font-medium 
                      ${
                        activeDropdown === item.name
                          ? "text-[#fa8128]"
                          : "text-white/90 hover:text-secondary"
                      }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Services Mega Menu */}
                  <AnimatePresence>
                    {item.name === "Services" &&
                      activeDropdown === "Services" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-white rounded-xl shadow-2xl overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-0">
                            {/* Why BertAndre Column */}
                            <div className="p-6 border-r border-gray-100">
                              <p className="text-xs font-sans font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                WHY CONSULO
                              </p>
                              <div className="space-y-4">
                                {servicesDropdown.whyUs.map((dropItem, idx) => (
                                  <Link
                                    key={idx}
                                    href="/services"
                                    className="block group"
                                  >
                                    <h4 className="font-serif font-bold text-[#1a1a1a] group-hover:text-[#1560bd] transition-colors">
                                      {dropItem.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-sans leading-relaxed">
                                      {dropItem.description}
                                    </p>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Featured Case Study Column */}
                            <div className="p-6 bg-gray-50">
                              <p className="text-xs font-sans font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                FEATURED CASE STUDY
                              </p>
                              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <Image
                                  src={
                                    servicesDropdown.featuredCaseStudy.image ||
                                    "/placeholder.svg"
                                  }
                                  alt="Case Study"
                                  width={300}
                                  height={200}
                                  className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-serif font-bold text-[#1a1a1a]">
                                        {
                                          servicesDropdown.featuredCaseStudy
                                            .title
                                        }
                                      </h4>
                                      <p className="text-sm text-gray-500 font-sans">
                                        {
                                          servicesDropdown.featuredCaseStudy
                                            .description
                                        }
                                      </p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center flex-shrink-0">
                                      <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center gap-4 border-l border-white/20 h-20 pl-4">
              <button className="w-12 h-12 rounded-full border border-dashed border-white/40 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/contact"
                className="flex items-center gap-2 cursor-pointer bg-[#fa8128] text-white px-6 py-3 rounded-full font-sans font-medium transition-all"
              >
                Let's Talk
                <span className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 text-white" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-dashed border-white/40 flex items-center justify-center text-white/80">
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slides in from left */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 bg-[#1a1a1a] lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/logo.png"}
                      alt="Logo"
                      width={120}
                      height={32}
                      className="object-fit"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="px-6 space-y-2">
                    {navItems.map((item) => (
                      <div key={item.name}>
                        {item.hasDropdown ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => toggleMobileDropdown(item.name)}
                              className="w-full flex items-center justify-between py-4 text-white text-left text-lg font-sans font-medium border-b border-white/10"
                            >
                              {item.name}
                              <ChevronDown
                                className={`w-5 h-5 transition-transform ${
                                  mobileDropdown === item.name
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {mobileDropdown === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-4 space-y-3">
                                    {item.name === "Services" && (
                                      <>
                                        {servicesDropdown.whyUs.map(
                                          (service, idx) => (
                                            <Link
                                              key={idx}
                                              href="/services"
                                              onClick={() =>
                                                setMobileMenuOpen(false)
                                              }
                                              className="block py-2 text-white/80 hover:text-white font-sans pl-4"
                                            >
                                              {service.title}
                                            </Link>
                                          )
                                        )}
                                      </>
                                    )}
                                    {item.name === "Pages" && (
                                      <>
                                        <Link
                                          href="#"
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                          className="block py-2 text-white/80 hover:text-white font-sans pl-4"
                                        >
                                          Page 1
                                        </Link>
                                        <Link
                                          href="#"
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                          className="block py-2 text-white/80 hover:text-white font-sans pl-4"
                                        >
                                          Page 2
                                        </Link>
                                        <Link
                                          href="#"
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                          className="block py-2 text-white/80 hover:text-white font-sans pl-4"
                                        >
                                          Page 3
                                        </Link>
                                      </>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-4 text-white text-lg font-sans font-medium border-b border-white/10"
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Mobile CTA Button */}
                <div className="p-6 border-t border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-white text-[#1a1a1a] px-6 py-4 rounded-full font-sans font-medium"
                  >
                    Let's Talk
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#1560bd] text-white flex items-center justify-center shadow-lg transition-all duration-300 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
