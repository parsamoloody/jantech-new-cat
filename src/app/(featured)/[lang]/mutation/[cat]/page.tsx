import React, { JSX } from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/lib/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import Hero from '@/components/mutation/Hero';
import BgCover from '@/components/mutation/BgCover';

type PageProps = {
  params: Promise<{
    lang: Locale;
    cat: string;
  }>;
};
interface IntroSection {
    subTitle: string;
    title: string;
    description: string;
    images: string[];
}
// Import the HeroContent type
interface HeroContent {
    id: string;
    images: {
        bg: string;
        intro: string;
    };
    title: string;
    description: string[] | [string, string]; // Union type
    linear: string;
    subTitle: string;
    intro: IntroSection[];
}

export const metadata: Metadata = {
  title: 'Product Categories | JanTech',
  description:
    'Explore our comprehensive range of industrial machinery and equipment. Discover innovative solutions for your manufacturing needs.',
  keywords: [
    'industrial machinery',
    'manufacturing equipment',
    'production solutions',
    'industrial technology',
    'JanTech categories',
    'industrial solutions',
  ],
  openGraph: {
    title: 'Product Categories | JanTech',
    description:
      'Discover our range of industrial machinery and manufacturing solutions.',
    images: [
      {
        url: '/images/category-og.jpg',
        width: 1200,
        height: 630,
        alt: 'JanTech Product Categories',
      },
    ],
  },
};

const About = async ({ params }: PageProps): Promise<JSX.Element> => {
  const resolvedParams = await params;
  const { lang, cat } = resolvedParams;

  const dictionary = await getDictionary(lang);
  const content = dictionary.mutation.find((item) => item.id === cat) as HeroContent | undefined;

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600">The content you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BgCover bgVideo={content.images.bg} />
      <Hero content={content} />
    </>
  );
};

export default About;