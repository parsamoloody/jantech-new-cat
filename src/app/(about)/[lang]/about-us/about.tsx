"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // Import Variants type
import Image from "next/image";
import fixedImage from "@/images/AMR_2780-5050.jpg";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};
type Props = {
    title: string,
    description: string,
    items: Array<{
        description: string[],
        image: string
    }>
}

const AboutUs = ({ props }: { props: Props }) => {
    const data = props
    return (
        <div
            className="flex min-h-screen bg-gray-100 mt-22">
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
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {data.title}
                    </h1>
                    <p className="text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: data.description }} />
                </motion.div>

                {/* Content Items */}
                {data.items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="mb-20 max-w-lg mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={itemVariants}
                    >
                        <div className="relative w-full h-70 md:h-120 sm:h-110 mb-4">
                            <Image
                                src={item.image}
                                alt="jantch history"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {
                            item.description.map((desc, i) => (
                                <p className="text-gray-600" key={i}
                                    dangerouslySetInnerHTML={{ __html: desc }} />
                            ))
                        }
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;