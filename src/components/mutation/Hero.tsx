'use client'
import React, { JSX, memo } from 'react'
import Image from 'next/image'

// Updated types to match your actual data structure
interface IntroSection {
    subTitle: string;
    title: string;
    description: string;
    images: string[];
}

interface HeroContent {
    id: string;
    images: {
        bg: string;
        intro: string;
    };
    title: string;
    description: string[]; // Changed from [string, string] to string[]
    linear: string;
    subTitle: string;
    intro: IntroSection[];
}

// Memoized Image component to prevent unnecessary re-renders
const OptimizedImage = memo(({ src, alt, width, height, className, priority = false }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
}) => (
    <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
    />
));

OptimizedImage.displayName = 'OptimizedImage';

// Memoized section component
const HeroSection = memo(({ section, index }: {
    section: IntroSection;
    index: number;
}) => {
    const isReversed = index % 2 === 1;
    
    const imageElements = React.useMemo(() => 
        section.images.map((image: string, imgIndex: number) => (
            <OptimizedImage
                key={`${section.title}-${imgIndex}`}
                src={image}
                alt={`${section.title} image ${imgIndex + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority={false}
            />
        )), [section.images, section.title]
    );

    return (
        <div className={`flex flex-col lg:flex-row gap-8 items-center ${
            isReversed ? 'lg:flex-row-reverse' : ''
        }`}>
            <div className="flex-1 space-y-6 text-lg">
                <p className='text-lg text-gray-600 dark:text-gray-600 border-b border-red-700 p-1 inline'>
                    {section.subTitle}
                </p>
                <h1 className="text-4xl font-bold mt-6 text-gray-900">
                    {section.title}
                </h1>
                <p className="text-gray-700">
                    {section.description}
                </p>
            </div>

            <div className="w-full lg:w-1/2 aspect-[16/9]">
                {imageElements}
            </div>
        </div>
    );
});

HeroSection.displayName = 'HeroSection';

const Hero = ({ content }: { content: HeroContent }): JSX.Element => {
    const introSections = React.useMemo(() => content.intro || [], [content.intro]);
    const hasSections = introSections.length > 0;

    // Early return for null/undefined content (AFTER all hooks)
    if (!content) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto mb-4 rounded"></div>
                    <div className="text-gray-500">Content not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-16">
            {/* Main Hero Section */}
            <section className="flex flex-col lg:flex-row gap-8 items-center" aria-labelledby="main-hero-title">
                <div className="flex-1 space-y-6 text-lg text-gray-600">
                    <p 
                        className='text-lg text-gray-600 dark:text-gray-600 border-b border-red-700 p-1 inline'
                        aria-label="Subtitle"
                    >
                        {content.subTitle}
                    </p>
                    <h1 
                        id="main-hero-title"
                        className="text-4xl font-bold mt-6 text-gray-900"
                    >
                        {content.title}
                    </h1>
                    
                    {/* Handle variable length description array */}
                    {content.description?.map((desc, index) => (
                        <p 
                            key={index}
                            className="text-gray-600"
                            aria-label={`Description part ${index + 1}`}
                        >
                            {desc}
                        </p>
                    ))}
                </div>

                <div className="w-full lg:w-1/2 aspect-[16/9]">
                    <OptimizedImage
                        src={content.images.intro}
                        alt="About our shop"
                        width={1100}
                        height={900}
                        className="w-full h-auto object-cover"
                        priority={true}
                    />
                </div>
            </section>

            {/* Linear Divider */}
            {content.linear && (
                <div className='w-full text-center my-14 lg:px-40 lg:my-40' role="separator">
                    <div className='text-2xl text-center h-full lg:mx-auto text-gray-900 p-1 inline'>
                        {content.linear}
                    </div>
                </div>
            )}

            {/* Intro Sections */}
            {hasSections && (
                <div className="space-y-16">
                    {introSections.map((section: IntroSection, index: number) => (
                        <HeroSection
                            key={`${section.title}-${index}`}
                            section={section}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

Hero.displayName = 'Hero';

export default memo(Hero);