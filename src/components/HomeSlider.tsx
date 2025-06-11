"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from 'next/image';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function HomeSlider() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {
            image: "/images/sewingMachine.webp",
            description: "Our sewing machines are designed for home Our sewing machines are beautifull"
        },
        {
            image: "/images/pressureIron.webp",
            description: "Our sewing machines are designed for home Our sewing machines are beautifull"
        },
        {
            image: "/images/steamIron.webp",
            description: "Our sewing machines are designed for home Our sewing machines are beautifull"
        },
        {
            image: "/images/vacuumCleaner.webp",
            description: "Our sewing machines are designed for home Our sewing machines are beautifull"
        }
    ];

    return (
        <div className='py-14 space-y-10 max-w-[1600px] mx-auto'>
            <h4 className='text-center text-2xl md:text-3xl font-bold flex flex-col md:flex-row gap-1 md:justify-center md:items-center w-full'>Lorem ipsum<span>#Jantech</span></h4>
            <div className='lg:hidden'>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    slidesPerView={1.15}
                    centeredSlides
                    spaceBetween={15}
                    autoplay={{ delay: 3000 }}
                    grabCursor
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    wrapperClass='relative pb-7'
                    breakpoints={{
                        768: {
                            slidesPerView: 2.25,
                            centeredSlides: false,
                        },
                    }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative basis-full aspect-square">
                                <Image
                                    src={slide.image}
                                    alt={slide.description}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-center font-medium py-4 px-6 space-y-3">
                                <p>{slide.description}</p>
                                <Link href="#" className='border-b-2 text-sm'>
                                    Learn more
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            <div className='hidden lg:flex lg:gap-16'>
                <div className="relative basis-1/2 aspect-square">
                    <Image
                        src={slides[activeIndex].image}
                        alt={slides[activeIndex].description}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className='py-28 flex flex-col justify-between basis-1/2'>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`flex items-start pt-6 font-bold border-t-2 ${index == activeIndex ? "border-black" : "border-white"}`}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <span className='text-lg px-6'>{(index + 1).toString().padStart(2, "0")}</span>
                            <div className='space-y-3'>
                                <p className='text-xl'>{slides[activeIndex].description}</p>
                                <Link
                                    href="#"
                                    className={`inline-block overflow-hidden ${index === activeIndex ? "max-h-24 border-b-2 pointer-events-auto transition-[max-height] duration-500 ease-out" : "max-h-0 pointer-events-none"}`}
                                >
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}