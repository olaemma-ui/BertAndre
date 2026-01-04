"use client"

import { motion } from "framer-motion"

export function MapSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="h-[400px] lg:h-[500px] w-full"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.646545229237!2d3.471617774992167!3d6.439401793551785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5bd76839353%3A0xc0039546263595eb!2s20%20Awudu%20Ekpegha%20Blvd%2C%20Lekki%20Phase%20I%20106104%2C%20Lekki%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1703851000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location"
      />
    </motion.section>
  )
}
