import React, { JSX } from 'react'
import type { Metadata } from 'next'
import { Locale } from '@/lib/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import Hero from '@/components/mutation/Hero'
import BgCover from '@/components/mutation/BgCover'

export const metadata: Metadata = {
    title: 'Product Categories | JanTech',
    description: 'Explore our comprehensive range of industrial machinery and equipment. Discover innovative solutions for your manufacturing needs.',
    keywords: [
        'industrial machinery', 
        'manufacturing equipment', 
        'production solutions', 
        'industrial technology', 
        'JanTech categories',
        'industrial solutions'
    ],
    openGraph: {
        title: 'Product Categories | JanTech',
        description: 'Discover our range of industrial machinery and manufacturing solutions.',
        images: [
            {
                url: '/images/category-og.jpg',
                width: 1200,
                height: 630,
                alt: 'JanTech Product Categories'
            }
        ]
    }
}

type PageProps = {
    params: { 
        lang: Locale;
        cat: string;
    };
}

const About = async ({ params: { lang, cat } }: PageProps): Promise<JSX.Element> => {
    console.log(await lang)
    console.log(await cat)
    const dictionary = await getDictionary(lang);
    const content = dictionary.mutation.find(item => item.id === cat);
    console.log("content", content)
    console.log("content", content)
    if (!content) {
        return <div>Content not found</div>;
    }

    return (
        <>
            <BgCover bgImage={content.images.bg} />
            <Hero content={content} />
        </>
    );
};

export default About;

