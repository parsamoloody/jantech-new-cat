"use client";

import React, { useState } from "react";
import Image from "next/image";
import bg_1 from "@/images/bg-0-1.webp";
import bg_2 from "@/images/bg-0-2.webp";
import text_2 from "@/images/text-0.webp";
import text_1 from "@/images/text-1.webp";

type ImageSet = {
  topRight: typeof text_1;
};

const imageSets: ImageSet[] = [
  { topRight: text_1 },
  { topRight: text_2 },
];

const FullScreenPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Backgrounds stacked */}
      <div className="absolute inset-0">
        <Image
          src={bg_1}
          alt="Background 1"
          fill
          className={`object-cover transition-opacity duration-1000 ${activeIndex === 0 ? "opacity-100" : "opacity-0"
            }`}
          priority
        />
        <Image
          src={bg_2}
          alt="Background 2"
          fill
          className={`object-cover transition-opacity duration-1000 ${activeIndex === 1 ? "opacity-100" : "opacity-0"
            }`}
          priority
        />
      </div>

      {/* Top-right image */}
      <div className="absolute top-12 xl:top-41 right-10 xl:right-8 w-47 h-40 sm:w-99 sm:h-88 sm:right-8 xl:w-170 xl:h-90">
        <Image
          src={imageSets[activeIndex].topRight}
          alt="Top Right Image"
          fill
          className="object-cover rounded-lg transition-opacity duration-700"
          priority
        />
      </div>

      {/* Buttons */}
      <div className="absolute right-7 xl:right-20 top-[82%] flex gap-4">
        <button
          onClick={() => handleImageChange(0)}
          className="w-10 h-10 sm:w-16 sm:h-16 xl:w-10 xl:h-10 bg-[#8d7663] cursor-pointer border border-gray-800 rounded-full transition"
        ></button>
        <button
          onClick={() => handleImageChange(1)}
          className="w-10 h-10 sm:w-16 sm:h-16 xl:w-10 xl:h-10 bg-[#8a8684] cursor-pointer border border-gray-800 rounded-full transition"
        ></button>
      </div>
    </div>
  );
};

export default FullScreenPage;
