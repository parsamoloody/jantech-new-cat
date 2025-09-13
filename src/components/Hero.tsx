"use client";

import { Center, Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import SewingMachineModel from "./SewingMachineModel";
import Button from "./Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useAppSelector } from "@/lib/states/hooks";
import { getLangDir } from "@/utils";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n.config";
import Image from "next/image";

type Angle = {
  position: [number, number, number];
  rotation: [number, number, number];
};

export default function Hero() {
  const t = useAppSelector((state) => state.dictionary.content?.components.hero);
  const lang = useParams().lang as Locale;
  const dir = getLangDir(lang);

  const [scale, setScale] = useState(7);
  const [angles, setAngles] = useState<Angle[]>([]);
  const [numAngles, setNumAngles] = useState(0);

  const getAngles = (): Angle[] => {
    const width = window.innerWidth;

    return [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position:
          width < 600 ? [0.13, 0, 0.8] :
            width < 800 ? [0.35, 0, 0.8] :
              width < 925 ? [0.45, 0, 0.8] :
                width < 1300 ? [0.65, 0, 0.8] :
                  [0.7, 0, 0.8],
        rotation: [0, 0.9, 0],
      },
      {
        position: width < 520 ? [-0.5, 0, 4.2] : [-1, 0, 3.8],
        rotation: [0.1, 3.9, 0],
      },
    ];
  };

  const adjustModelForScreenSizes = useCallback(() => {
    const width = window.innerWidth;

    if (width > 1300) setScale(14);
    else if (width > 1024) setScale(11);
    else if (width > 920) setScale(14);
    else if (width > 720) setScale(13);
    else if (width > 520) setScale(9);
    else setScale(7);

    setAngles(getAngles());
  }, []);

  useEffect(() => {
    adjustModelForScreenSizes();
    window.addEventListener("resize", adjustModelForScreenSizes);
    return () => window.removeEventListener("resize", adjustModelForScreenSizes);
  }, [adjustModelForScreenSizes]);

  const handleNextAngle = () => {
    setNumAngles((prev) => (prev + 1) % angles.length);
  };

  const handlePrevAngle = () => {
    setNumAngles((prev) => (prev - 1 + angles.length) % angles.length);
  };

  if (!t || angles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 min-h-fit h-screen">
      <div className="relative col-span-1 lg:col-span-2 xl:col-span-3 lg:order-last">
        <div className="absolute top-[100px] start-10 z-40 hidden lg:block text-red-primary text-5xl">
          {(numAngles + 1).toString().padStart(2, "0")}
        </div>

        <div className="absolute top-32 end-0 -rotate-90">
          <Image
            src="/images/jantechSlogan.webp"
            width={120}
            height={50}
            alt="Jantech slogan"
          />
        </div>

        <div className="min-h-[80vh] lg:min-h-screen h-full">
          <Canvas>
            <Center>
              <ambientLight intensity={0.85} color="white" />
              <directionalLight intensity={0.5} position={[2, 5, 10]} color="white" />
              <spotLight intensity={6} position={[0, -1.2, 0]} color="#b61817" />
              <OrbitControls enablePan={false} enableZoom={false} enableDamping={false} />
              <Environment preset="city" />
              <Suspense fallback={<Html center><Loading /></Html>}>
                <SewingMachineModel
                  position={angles[numAngles].position}
                  rotation={angles[numAngles].rotation}
                  scale={scale}
                />
              </Suspense>
            </Center>
          </Canvas>
        </div>

        <div
          className={`flex justify-center items-center gap-8 md:gap-4 absolute bottom-8 lg:bottom-14 left-1/2 -translate-x-1/2 ${dir === "rtl" ? "flex-row-reverse lg:right-auto lg:left-0 lg:translate-1/2" : "flex-row lg:left-auto lg:right-0 lg:-translate-x-1/2"}`}
        >
          <Button
            icon={<FaArrowLeft className="text-white" />}
            className="bg-red-primary size-12 !rounded-full"
            onClick={handlePrevAngle}
          />
          <Button
            icon={<FaArrowRight className="text-white" />}
            className="bg-red-primary size-12 !rounded-full"
            onClick={handleNextAngle}
          />
        </div>
      </div>
      <div className="grid place-content-center relative min-h-[20vh] h-max lg:min-h-max lg:h-full p-5 lg:p-0 lg:py-24 bg-gradient-to-b from-[#9C1905] from-40% to-[#710B02] text-white lg:order-first">
        <div className="flex flex-col lg:flex-col-reverse items-center text-start justify-center gap-4 w-full h-full lg:text-nowrap lg:writing-lr">
          <div className="flex flex-col-reverse lg:flex-col">
            <p className="font-semibold text-xl xs:text-3xl">{t.description}</p>
            <h1 className="font-bold text-4xl xs:text-5xl lg:text-7xl">{t.title}</h1>
          </div>
        </div>
        <div className="hidden 2xl:block bg-[#9C1905] w-32 h-[84px] absolute z-[30] top-0 start-full" />
      </div>
    </div>
  );
}
