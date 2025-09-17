'use client'
import React, { JSX } from 'react'

const BgCover = ({ bgVideo }: { bgVideo: string }): JSX.Element => {
    console.log("bg video",bgVideo)
    return (
            <video
                
                autoPlay
                muted
                loop
                playsInline
                className="lg:h-screen object-cover w-full h-[60vh] lg:w-full lg:object-cover"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>
    )
}

export default BgCover
