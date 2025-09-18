"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // Import Variants type
import Image from "next/image";

import fixedImage from "@/images/AMR_2780-5050.jpg";
import contentImage1 from "@/images/about-1.webp";
import contentImage2 from "@/images/about-2.webp";
import contentImage3 from "@/images/about-3.webp";

// Define content item type
type ContentItem = {
  image: string;
  title: string;
  description: string;
};

// Content data
const contentItems: ContentItem[] = [
  {
    image: contentImage1.src,
    title: "Our Mission",
    description:
      "We strive to innovate and deliver exceptional solutions that empower our users to achieve their goals with cutting-edge technology.",
  },
  {
    image: contentImage2.src,
    title: "Our Team",
    description:
      "A diverse group of passionate professionals dedicated to pushing boundaries and fostering collaboration.",
  },
  {
    image: contentImage3.src,
    title: "Our Values",
    description:
      "Integrity, creativity, and excellence drive everything we do, ensuring trust and quality in all our endeavors.",
  },
];

// Define variants with explicit type
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }, // Use 'as const' to narrow the type
  },
};

const AboutUs: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-14">
      <div className="hidden md:block fixed top-0 left-0 w-1/2 h-screen">
        <Image
          src={fixedImage}
          alt="About Us Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 ml-auto py-16 px-6 sm:px-12">
        {/* Title and Description Section */}
        <motion.div
          className="mb-20 max-w-lg mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 mb-8">
            Welcome to our story! We are a passionate team dedicated to creating
            innovative solutions that make a difference. Learn more about our
            mission, team, and values below.
          </p>  
        </motion.div>

        {/* Content Items */}
        {contentItems.map((item, index) => (
          <motion.div
            key={index}
            className="mb-20 max-w-lg mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <div className="relative w-full h-64 mb-4">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {item.title}
            </h2>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;