import Image from "next/image";
import Hero from "@/components/Hero";
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n.config";
import Link from "next/link";
import { FaStar, FaRocket, FaCogs, FaGlobe } from "react-icons/fa";
import { FaGem, FaShippingFast, FaHeadset } from "react-icons/fa";
// import Dropdown from "@/components/Dropdown";
// import { getLangDir } from "@/utils";

import HomeSlider from "@/components/HomeSlider";
import VideoSlider from "@/components/VideoSlider";

interface Props {
    params: Promise<{ lang: Locale }>;
}

export default async function HomePage({ params }: Props) {
    const { lang } = await params;
    const t = (await getDictionary(lang)).homePage;
    const services = (await getDictionary(lang)).services;
    // const dir = getLangDir(lang);
    if (!t) return null;


    const timelineData = [
        {
            year: "2010",
            icon: <FaRocket className="text-white text-xl" />,
            title: "Start of Operations",
            description: "Our brand began with limited production and a local market."
        },
        {
            year: "2015",
            icon: <FaCogs className="text-white text-xl" />,
            title: "Production Line Expansion",
            description: "Expanded our product line and entered the online market."
        },
        {
            year: "2020",
            icon: <FaStar className="text-white text-xl" />,
            title: "Quality Award Winner",
            description: "Our products won the national quality award."
        },
        {
            year: "2024",
            icon: <FaGlobe className="text-white text-xl" />,
            title: "Global Market Entry",
            description: "Began exporting products to Europe and Asia."
        }
    ];


    // const dropdown = [
    //     {
    //         q: "How can I track my order?",
    //         a: "After placing your order, a tracking number will be sent to you and can also be viewed in your user panel."
    //     },
    //     {
    //         q: "Is it possible to return a product?",
    //         a: "Yes, you can return the product within 7 days of delivery if you're not satisfied."
    //     },
    //     {
    //         q: "Do you deliver to other cities?",
    //         a: "Yes, we deliver to all cities across Iran."
    //     },
    // ];

    // const slides = [
    //     {
    //         image: "/images/sewingMachine.webp",
    //         description: "Our sewing machines are designed for both home and professional use."
    //     },
    //     {
    //         image: "/images/pressureIron.webp",
    //         description: "Our sewing machines are designed for both home and professional use."
    //     },
    //     {
    //         image: "/images/steamIron.webp",
    //         description: "Our sewing machines are designed for both home and professional use."
    //     },
    //     {
    //         image: "/images/vacuumCleaner.webp",
    //         description: "Our sewing machines are designed for both home and professional use."
    //     }
    // ];

    // const questions = [
    //     {
    //         title: "What is the return policy?",
    //         content: "We accept returns within 30 days of purchase. Please contact our customer support for further assistance."
    //     },
    //     {
    //         title: "How can I track my order?",
    //         content: "After placing your order, a tracking number will be sent to you and can also be viewed in your user panel."
    //     },
    //     {
    //         title: "Is it possible to return a product?",
    //         content: "Yes, you can return the product within 7 days of delivery if you're not satisfied."
    //     },
    //     {
    //         title: "Do you deliver to other cities?",
    //         content: "Yes, we deliver to all cities across Iran."
    //     },
    //     {
    //         title: "What is the return policy?",
    //         content: "We accept returns within 30 days of purchase. Please contact our customer support for further assistance."
    //     },
    //     {
    //         title: "How can I track my order?",
    //         content: "After placing your order, a tracking number will be sent to you and can also be viewed in your user panel."
    //     }
    // ];

    // const handleSelect = (answer: string) => {
    //     console.log("جواب انتخابی:", answer);
    // };

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

            <VideoSlider />

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

            <section className="px-4">
                <h2 className="text-2xl font-bold text-center mb-16">Our Brand Growth Journey</h2>
                <div className="relative max-w-5xl mx-auto before:content-[''] before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-1 before:h-full before:bg-black">
                    {timelineData.map((event, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className="mb-12 flex flex-col md:grid md:grid-cols-9 md:items-center"
                            >
                                <div className={`relative z-30 bg-white p-4 md:col-span-4 px-4 shadow hover:shadow-lg transition duration-300 ${isLeft ? 'md:order-1' : 'md:order-3'}`}>
                                    <div className="text-center">
                                        <h4 className="sm:text-black text-lg lg:text-[20px] font-bold mb-1">{event.year} - {event.title}</h4>
                                        <p className="sm:text-gray-600 text-sm">{event.description}</p>
                                    </div>
                                </div>

                                <div className="md:col-span-1 flex justify-center relative z-10 order-2 my-4 md:my-0">
                                    <div className="w-10 h-10 rounded-full bg-red-primary text-white flex items-center justify-center shadow-md">
                                        {event.icon}
                                    </div>
                                </div>

                                <div className={`md:col-span-4 px-4 ${isLeft ? 'md:order-3' : 'md:order-1 hidden md:block'}`} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* {questions.map((question, index) => (
                    <Dropdown key={index} {...question} />
                ))} */}


            {/* <section className="px-6 py-20 bg-white">
                <h2 className="text-3xl font-bold mb-8 text-center">سوالات متداول</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    {dropdown.map(item => (
                        <Dropdown
                            label="سوالات متداول"
                            items={dropdown}
                            onSelect={handleSelect}
                        />
                        <h1 key={item.a}>
                            {item.a}
                        </h1>
                    ))}
                </div>
            </section>

            {t.filters && t.filters.length > 0 && (
                <section className="px-6 py-10">
                    <h2 className="text-2xl font-bold mb-4">{t.categoriesTitle || "Categories"}</h2>
                    <div className="flex flex-wrap gap-4">
                        {t.filters.map((filter: any) => (
                            <div key={filter.name}>
                                <h4 className="font-semibold">{filter.name}</h4>
                                <ul className="flex gap-2">
                                    {filter.options.map((option: any) => (
                                        <li key={option.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                                            {option.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )} */}
        </div>
    );
}
