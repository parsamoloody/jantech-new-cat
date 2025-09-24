'use client';
import { useState, useEffect, useRef } from 'react';
import { Locale } from '@/lib/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ElementSkeleton from './skeletons/ElementSkeleton';

const mock = {
    "title": "Explore our products in action",
    "description": "<b>Jantech</b>, a leading Iranian brand in the production of sewing machines, irons, and home appliances, leverages modern technology and high-quality materials to deliver products with durability, precise performance, and modern design, providing users with a reliable, comfortable, and professional experience.",
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

export default function VideoSlider({ lang }: { lang: Locale }) {
    const [slides, setSlides] = useState<{ items: { description: string, title: string, video: string }[], title: string, description: string }>(mock);
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasPlayedRef = useRef(false); // Track if video has played

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

    useEffect(() => {
        if (!videoRef.current || hasPlayedRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasPlayedRef.current) {
                    if (videoRef.current) {
                        videoRef.current.play()
                    }
                    hasPlayedRef.current = true;
                    observer.disconnect(); 
                }
            },
            {
                root: null, // Use viewport as root
                rootMargin: '100px 0px 0px 0px', // Trigger 100px before visible
                threshold: 0.1,
            }
        );

        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, [isLoading, slides]);

    if (isLoading || !slides?.items) {
        return (
            <div>
                <ElementSkeleton type="picture" className="relative w-full h-[1060px] my-2 rounded-lg mx-auto" />
            </div>
        );
    }

    return (
        <>
            <div className="relative w-full bg-black">
                <div className="relative w-full h-[900px] max-w-[1440px] mx-auto">
                    <video
                        ref={videoRef}
                        src={slides.items[0].video}
                        controls={false}
                        className="w-full h-full object-cover"
                        muted
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t md:bg-gradient-to-t from-[#0000007a] from-5% md:from-2% to-transparent z-20 pointer-events-none"></div>
                </div>
            </div>
            <div className="w-full bg-black pb-10 xl:26">
                <p className="text-[#dadada] text-center px-4 py-6 max-w-[988px] mx-auto" dangerouslySetInnerHTML={{ __html: slides.description }} />
            </div>
        </>
    );
}