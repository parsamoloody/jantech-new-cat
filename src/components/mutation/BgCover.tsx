'use client'
import React, { JSX, useCallback, useRef } from 'react'

const BgCover = ({ bgVideo }: { bgVideo: string }): JSX.Element => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideoError = useCallback(() => {
        console.error('Video failed to load:', bgVideo);
        // Fallback: pause and hide video, or you could swap src to a fallback video
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.style.opacity = '0';
            videoRef.current.style.display = 'none';
        }
    }, [bgVideo]);

    const handleVideoLoad = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.style.opacity = '1';
            videoRef.current.style.display = 'block';
        }
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            preload="metadata"
            src={bgVideo}
            playsInline
            poster={bgVideo.replace(/\.mp4$/, '.jpg')}
            className="lg:h-screen object-cover w-full h-[60vh] lg:w-full lg:object-cover transition-opacity duration-300 ease-in-out opacity-100"
            onError={handleVideoError}
            onCanPlay={handleVideoLoad}
            onLoadStart={() => {
                if (videoRef.current) {
                    videoRef.current.style.opacity = '0';
                }
            }}
            onLoadedData={() => {
                if (videoRef.current) {
                    videoRef.current.style.opacity = '1';
                }
            }}
            style={{
                ...(videoRef.current?.style.display === 'none' && {
                    backgroundColor: '#1f2937'
                }),
            }}
        >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default BgCover