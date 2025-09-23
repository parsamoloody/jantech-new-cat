"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCount = 129;

  const getFrame = (index: number) =>
    `/images/frames/sewingMachine/${index.toString().padStart(4, "0")}.webp`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 50; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFrame(i);
      img.onload = () => {
        loaded++;
        console.log(i)
        if (loaded === 1) {
          drawImage(img);
        }
      };
      images.push(img);
    }

    function drawImage(image: HTMLImageElement) {
      if (!context || !canvas) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    function onScroll() {
      const section = document.getElementById("scroll-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();

      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const start = windowHeight;

      const end = sectionHeight + windowHeight;

      const progress = Math.min(
        Math.max((start - rect.top) / (end - start), 0),
        1
      );

      const frameIndex = Math.floor(progress * (frameCount - 1));
      requestAnimationFrame(() => drawImage(images[frameIndex]));
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  return (
    <div>
      <div className="h-[120vh] bg-gray-200 flex items-center justify-center">
        <h1 className="text-3xl">Scroll down ⬇️</h1>
      </div>

      <section
        id="scroll-section"
        className="relative flex justify-center h-[300vh] bg-black"
      >
        <canvas
          ref={canvasRef}
          className="sticky top-0 max-w-[1200px] h-[1200px] mx-auto border border-white"
        />
      </section>


    </div>
  );
}
