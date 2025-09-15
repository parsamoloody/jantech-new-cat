import Image from "next/image";
import Hero from "@/components/Hero";
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n.config";
import Link from "next/link";
import { FaGem, FaShippingFast, FaHeadset } from "react-icons/fa";
// import Dropdown from "@/components/Dropdown";
// import { getLangDir } from "@/utils";

import HomeSlider from "@/components/HomeSlider";
import VideoSlider from "@/components/VideoSlider";
import GrowRoad from "@/components/GrowRoad";

interface Props {
    params: Promise<{ lang: Locale }>;
}

export default async function HomePage({ params }: Props) {
    const { lang } = await params;
    const t = (await getDictionary(lang)).homePage;
    const services = (await getDictionary(lang)).services;
    if (!t) return null;
    return (
        <div className="overflow-x-hidden">
            <div className="min-h-fit h-screen">
                <Hero />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] grid-flow-dense">
                {t.products.map((product) => (
                    <Link
                        href={`/products/${product.href}`}
                        key={product.title}
                        className="group relative text-white cursor-pointer"
                    >
                        <div className="relative w-full aspect-square overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tl from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <h3 className="absolute bottom-8 start-8 text-2xl font-bold opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-10 max-w-[calc(100%-4rem)]">
                                {product.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

            <HomeSlider lang={lang} />

            <VideoSlider lang={lang} />

            <section className="px-4 py-14 *:text-gray-800 max-w-[1600px] mx-auto">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">{services.title}</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {services.items.map((item, index) => {
                            const icons = [FaGem, FaShippingFast, FaHeadset];
                            const Icon = icons[index];
                            
                            return (
                                <div key={item.title} className="p-6 grid gap-4 bg-white shadow hover:shadow-lg transition duration-300">
                                    <div className="text-gray-600 text-4xl mb-4 flex justify-center">
                                        <Icon />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

          <GrowRoad lang={lang}/>
        </div>
    );
}
