'use client'
import React, { JSX } from 'react'
import Image from 'next/image'
const Hero = ({ content }: { content: any }): JSX.Element => {
    if (!content) {
        return <div>Content not found</div>;
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8 space-y-16">
                <div className="flex flex-col lg:flex-row gap-8 items-center">

                    <div className="flex-1 space-y-6 text-lg text-gray-600">
                        <p className='text-lg text-gray-600 dark:text-gray-600 border-b border-red-700 p-1 inline'>
                            {content.subTitle}
                        </p>
                        <h1 className="text-4xl font-bold mt-6 text-gray-900">
                            {content.title}
                        </h1>
                        <p className="">
                           {content.description[0]}
                        </p>
                        <p className="">
                           {content.description[1]}
                        </p>

                    </div>

                    <div className="w-full lg:w-1/2">
                        <Image
                            src={content.images.intro}
                            alt="About our shop"
                            width={1100}
                            height={900}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </div>
                 {/* Line */}
                <div className='w-full text-center my-14 lg:px-40 lg:my-40'>
                    <div className='text-2xl text-center h-full lg:mx-auto text-gray-900 p-1 inline'>
                       {content.linear}
                    </div>
                </div>
                {content.intro.map((section: any, index: number) => (
                    <div 
                        key={index} 
                        className={`flex flex-col lg:flex-row gap-8 items-center ${
                            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                        }`}
                    >
                        <div className="flex-1 space-y-6 text-lg">
                            <p className='text-lg text-gray-600 border-b border-red-700 p-1 inline'>
                                {section.subTitle}
                            </p>
                            <h1 className="text-4xl font-bold mt-6 text-gray-900">
                                {section.title}
                            </h1>
                            <p className="text-gray-700">
                                {section.description}
                            </p>
                        </div>

                        <div className="w-full lg:w-1/2">
                            {section.images.map((image: string, imgIndex: number) => (
                                <Image
                                    key={imgIndex}
                                    src={image}
                                    alt={`${section.title} image`}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover"
                                    placeholder='blur'
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Hero;