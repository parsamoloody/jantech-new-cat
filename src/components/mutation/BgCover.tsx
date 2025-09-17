'use client'
import React, { JSX } from 'react'
import Image from 'next/image'

const BgCover = ({ bgImage }: { bgImage: string }): JSX.Element => {
    return (
        <div className="">
            <Image
                src={bgImage}
                alt="Background"
                width={1920}
                height={1080}
                priority
                quality={100}
                className='lg:h-screen object-cover w-full h-[60vh] lg:w-full lg:object-cover'
            />
        </div>
    );
};

export default BgCover;