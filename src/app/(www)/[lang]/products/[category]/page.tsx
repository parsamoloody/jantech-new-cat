"use client";

import FilterForm from "@/components/forms/FilterForm";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Category } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { getLangDir } from "@/utils";
import "swiper/css";
import "swiper/css/pagination";
import { Locale } from "@/lib/i18n.config";
import Button from "@/components/Button";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { getDictionary } from "@/lib/dictionaries";

type Product = {
  _id: string;
  image: string;
  name: string;
  price: string;
  score: string;
};


const slogan: Record<Locale, string> = {
  en: " take your creativity to the next level!",
  fa: "چرخ خیاطی‌های جانتک، خلاقیتتان را به اوج بسونید!",
  ar: "ماكينات جانتِك للخياطة، ارتقِ بإبداعك إلى القمة!",
  ru: "поднимите своё творчество на новый уровень!",
  tr: "yaratıcılığınızı zirveye taşıyın!"
};

export default function ProductsPage() {
  const category = useParams().category as Category;
  const lang = useParams().lang as Locale;
  const dir = getLangDir(lang);

  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [catLoading, setCatLoading] = useState(false);
  const [cat, setCat] = useState<{ _id: string; title: string; description: string; image: string, video: string } | null>({ _id: "", title: "", description: "", image: "", video: "" });
  const [isLatin, setIsLatin] = useState(false);
  // const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (lang && category) {
      async function fetchCategory() {
        const t = (await getDictionary(lang)).categories;
        console.log("catData:", t);
        setCatLoading(true);
        const m = t.find(item => item._id == category) || null;
        setCat(m);
        switch (lang) {
          case "fa":  
            setIsLatin(false);
            break;
          case "ar":
            setIsLatin(false);
            break;
          default:
            setIsLatin(true);
        }
        setCatLoading(false);

      }
      fetchCategory();
    }
  }, [lang, category]); // Added dependencies

  const fetchData = async (pageNumber: number, limit: number = 9) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetch(`/api/products?lang=${lang}&category=${category}`).then(res => res.json());

      setProducts(data);

      if (data.length < limit || pageNumber >= 4) {
        setHasMore(false);
      }

      setPage(pageNumber + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setLoading(false);
  };

  const loaderRef = useInfiniteScroll({
    hasMore,
    onLoadMore: () => fetchData(page),
    threshold: 1,
  });

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchData(1);
  }, [lang, category]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const swiperSlides = [
    { title: "vacuum cleaner", image: "/images/vacuumCleaner-transparent.webp" },
    { title: "steam iron", image: "/images/steamIron-transparent.webp" },
    { title: "sewing machine", image: "/images/sewingMachine-transparent.webp" },
    { title: "pressure iron", image: "/images/pressureIron-transparent.webp" },
  ];

  return (
    <div className="flex flex-col md:gap-12 pt-[90px] xl:pt-20 pb-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-start lg:items-center md:justify-between md:gap-10 px-8  ml-4">
        <div className="md:basis-[40%]">
          <div className="space-y-4 mx-auto">
            <h3 className="text-red-primary text-3xl md:text-5xl font-bold relative inline-block pb-4">
              {
                isLatin
                  ? (<span className="text-7xl">{cat?.title.slice(0, 1).toUpperCase()}</span>)
                  : null
              }
              {
                isLatin
                ? (cat?.title.slice(1).split("-").join(" "))
                : (cat?.title)
              }
              <span className="absolute left-0 bottom-0 w-2/3 md:w-1/3 h-0.5 bg-red-primary"></span>
            </h3>
            {
              catLoading ? (
                "loading..."
              ) : (
                <p className="line-clamp-6 md:line-clamp-[14] max-w-lg text-justify">{cat?.description}</p>
              )
            }
          </div>
        </div>
        <div className="relative md:basis-[56.25%] flex flex-col md:flex-row items-center md:h-[550px]">
          <div className="relative ps-8 w-full h-full md:flex-1 aspect-square xs:aspect-auto">
            {
              catLoading ? (
                "loading..."
              ) : cat?.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                >
                  <source src={cat?.video} type="video/mp4" />
                </video>
              ) : (
                "loading ..."
              )
            }
            <h2
              className={`text-4xl md:text-3xl lg:text-5xl xl:text-7xl text-transparent bg-clip-text absolute z-20 bottom-1/2 translate-y-1/2 bg-gradient-to-r ${dir === "rtl"
                ? "translate-x-1/2 from-black to-red-primary"
                : "-translate-x-1/2 from-red-primary to-black"
                } from-50% to-50% font-bold font-lexend writing-lr`}
            >
              JANTECH
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="writing-lr w-[100px] hidden md:flex md:justify-center md:items-center md:pt-[120px]">
              {
                lang ? (
                  <>{slogan[lang]}</>
                ) : (
                  <>{slogan.en}</>
                )
              }
            </p>
            <div className="w-[150px] md:w-[200px] absolute bottom-0 end-0">
              {isClient && (
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  slidesPerView={2}
                  autoplay={{ delay: 3000 }}
                  loop
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  navigation={{
                    nextEl: ".swiper-button-forward",
                    prevEl: ".swiper-button-backward",
                  }}
                >
                  {swiperSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full aspect-square bg-white/20">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className="hidden md:flex md:justify-end">
                <Button
                  icon={<IoIosArrowBack className={`size-5 ${dir === "rtl" ? "rotate-180" : ""}`} />}
                  className="size-[50px] rounded-none swiper-button-backward"
                />
                <Button
                  icon={<IoIosArrowForward className={`size-5 ${dir === "rtl" ? "rotate-180" : ""}`} />}
                  className="size-[50px] rounded-none swiper-button-forward"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse justify-between gap-4 lg:gap-8 w-full px-4 lg:pe-[calc(16px+100px)] py-4">
        <FilterForm category={category} />
        <div className="grow min-h-screen flex flex-col items-center gap-10">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] grid-flow-dense gap-5 w-full">
            {products.length ? (
              products.map((product, i) => (
                <ProductCard key={i} {...product} />
              ))
            ) : (
              Array.from({ length: 9 }).map((_, index) => (
                <ProductSkeleton key={`loading-skeleton-${index}`} />
              ))
            )}
          </div>
          {hasMore && <div ref={loaderRef} className="h-10" />}
        </div>
      </div>
    </div>
  );
}
