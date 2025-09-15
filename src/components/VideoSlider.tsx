'use client';

import { useRef, useState, useEffect } from 'react';
import {SwiperSlide, Swiper } from 'swiper/react';
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import 'swiper/css';
import { Locale } from '@/lib/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

const mock = {
    "title": "Explore our products in action",
    "items": [
        {
            "title": "Sewing Machine",
            "description": "Watch our sewing machine in action, creating beautiful garments with ease.",
                "video": "/videos/sewingMachine.mp4"
            },
            {
                "title": "Customer Support",
                "description": "See how our customer support team assists users with their sewing machines.",
                "video": "/videos/pressureIron.mp4"
            }
        ]
    };

export default function VideoSlider({lang}: {lang: Locale}) {
    const swiperRef = useRef<any>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slides, setSlides] = useState<{ items: { description: string, title: string, video: string }[], title: string }>(mock);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const services = (await getDictionary(lang)).videoSlides;
                setSlides(services);
            } catch (error) {
                console.error('Error fetching slides:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [lang]);

    const handleEnded = () => {
        const swiper = swiperRef.current?.swiper;
        if (!swiper) return;
    
        if (swiper.activeIndex === slides.items.length - 1) {
            swiper.slideTo(0);
        } else {
            swiper.slideNext();
        }
    };

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.duration > 0) {
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percent);
        }
    };

    const handleProgressClick = (index: number) => {
        swiperRef.current?.swiper.slideTo(index);
    };

    const handlePrev = () => {
        const swiper = swiperRef.current?.swiper;
        if (!swiper) return;
    
        if (swiper.activeIndex === 0) {
            swiper.slideTo(slides.items.length - 1);
        } else {
            swiper.slidePrev();
        }
    }

    const handleNext = () => {
        const swiper = swiperRef.current?.swiper;
        if (!swiper) return;

        if (swiper.activeIndex === slides.items.length - 1) {
            swiper.slideTo(0);
        } else {
            swiper.slideNext();
        }
    }

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play();
            setIsPlaying(true);
        }
    }, [activeIndex]);

    if (isLoading || !slides?.items) {
        return <div>Loading...</div>;
    }
    return (
        <div className="relative w-full">
            <Swiper
                ref={swiperRef}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                    setProgress(0);
            
                    const videos = document.querySelectorAll('video');
                    videos.forEach(video => {
                        video.currentTime = 0;
                    });
                }}
            >
                {slides.items.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[500px]">
                            <video
                                key={slide.title}
                                ref={index === activeIndex ? videoRef : null}
                                src={slide.video}
                                controls={false}
                                className="w-full h-full object-cover"
                                onEnded={handleEnded}
                                onTimeUpdate={handleTimeUpdate}
                                autoPlay
                                muted
                                playsInline
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t md:bg-gradient-to-r from-black from-40% md:from-30% to-transparent z-20 pointer-events-none" />

                            <div className='absolute bottom-0 md:bottom-auto md:top-1/2 -translate-y-1/2 z-30 left-1/2 -translate-x-1/2 md:left-30 md:translate-x-0 text-white text-center md:text-start max-w-[400px] space-y-5'>
                                <h3 className='text-red-primary text-3xl md:text-5xl text-nowrap font-bold'>{slide.title}</h3>
                                <p>{slide.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute bottom-4 left-1/2 z-40 -translate-x-1/2 w-full px-4">
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {slides.items.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => handleProgressClick(index)}
                            className="cursor-pointer w-[60px] sm:w-[80px] md:w-[100px] bg-gray-300 h-1 rounded overflow-hidden"
                        >
                            <div
                                className="bg-red-primary h-1 transition-all duration-200"
                                style={{
                                    width: `${index === activeIndex
                                        ? progress
                                        : index < activeIndex
                                            ? 100
                                            : 0
                                        }%`,
                                }}
                            />
                        </div>
                    ))}

                    <div className="flex items-center justify-center">
                        {isPlaying ? (
                            <FaPause
                                className="text-red-primary size-5 cursor-pointer"
                                onClick={handlePause}
                            />
                        ) : (
                            <FaPlay
                                className="text-red-primary size-5 cursor-pointer"
                                onClick={handlePlay}
                            />
                        )}
                    </div>
                </div>
            </div>

            <IoIosArrowBack className='hidden md:block absolute start-8 top-1/2 -translate-y-1/2 z-40 bg-red-primary text-white text-3xl rounded-full p-1 cursor-pointer' onClick={handlePrev}/>
            <IoIosArrowForward className='hidden md:block absolute end-8 top-1/2 -translate-y-1/2 z-40 bg-red-primary text-white text-3xl rounded-full p-1 cursor-pointer' onClick={handleNext}/>
        </div>
    );
}
