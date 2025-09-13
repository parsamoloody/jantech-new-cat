"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n.config';

export default function HomeSlider({lang}: {lang: Locale}) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slides, setSlides] = useState<{ items: { image: string; description: string, title: string }[], title: string }>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const services = (await getDictionary(lang)).someProducts;
                setSlides(services);
            } catch (error) {
                console.error('Error fetching slides:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    if (isLoading || !slides?.items) {
        return <div>Loading...</div>;
    }

    return (
        <div className='py-14 space-y-10 max-w-[1600px] mx-auto'>
            <h4 className='text-center text-2xl md:text-3xl font-bold flex flex-col md:flex-row gap-1 md:justify-center md:items-center w-full'>{slides.title}<span> Jantech</span></h4>
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
                    {slides.items.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative basis-full aspect-square">
                                <Image
                                    src={`/images/${slide.image}`}
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
                        src={`/images/${slides.items[activeIndex].image}`}
                        alt={slides.items[activeIndex].description}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className='py-28 flex flex-col justify-between basis-1/2'>
                    {slides.items.map((slide, index) => (
                        <div
                            key={index}
                            className={`flex items-start pt-6 font-bold border-t-2 ${index == activeIndex ? "border-black" : "border-white"}`}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <span className='text-lg px-6'>{(index + 1).toString().padStart(2, "0")}</span>
                            <div className='space-y-3'>
                                <p className='text-xl'>{slides.items[activeIndex].description}</p>
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