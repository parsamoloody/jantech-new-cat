"use client";

import Image from "next/image";
import { useAppSelector } from "@/lib/states/hooks";
import { useParams } from "next/navigation";
import Link  from "next/link";
import { Locale } from "@/lib/i18n.config";
import { Category } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  _id: string;
  image: string;
  name: string;
  price: string;
  score: string;
}

export default function ProductCard({ _id, name, price, image }: Props) {
  const t = useAppSelector((state) => state.dictionary.content?.components.productCard);
  const lang = useParams().lang as Locale;
  const category = useParams().category as Category;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(`/${lang}/products/${category}/${_id}`);
  }

  if (!t) return null;

  return (
    <Link
      href={`/${lang}/products/${category}/${_id}`}
      onClick={handleClick}
      className="block group border-b-2 border-red-primary shadow-xl"
    >
      <h3 className="border-s-2 border-red-primary duration-200 font-semibold group-hover:text-black mx-4 mt-4 ps-2 text-base text-gray-800 transition-colors line-clamp-1">
        {name}
      </h3>

      <div className="relative aspect-square flex items-center justify-center overflow-hidden">
        <Image
          alt="product"
          width={300}
          height={300}
          className="text-transparent group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
          src={image}
          loading="lazy"
          priority={false}
        />
      </div>

      <div className="font-bold font-lg text-xl text-gray-700 p-4 pt-0 space-y-2">
        {Number(price).toLocaleString(lang)} {t.currency}
      </div>
    </Link>
  );
}


{/* <a class="block group" href="/en/products/sewing-machine/6804bb576dd0a5af26a6e854"><h3 class="duration-200 font-semibold group-hover:text-black line-clamp-2 mx-4 text-base text-gray-800 transition-colors" style="
    margin-top: 1rem;
    border-left: 2px solid var(--color-red-primary);
    margin-inline: 1rem;
    padding-left: .5rem;
">Jantech Sewing Machine Model VERSACE GOLD</h3><div class="aspect-square flex items-center justify-center overflow-hidden relative"><img alt="product" loading="lazy" decoding="async" data-nimg="fill" class="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" srcset="/_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fjantech.ir%2Fwp-content%2Fuploads%2F2024%2F11%2Fjantech-website-template-VERSACE-GOLD-600x600.webp&amp;w=3840&amp;q=75" style="position: absolute;height: 100%;width: 100%;inset: 0px;color: transparent;position: relative;top: 12px;width: 80%;height: 80%;"><div class="absolute bottom-0 w-full" style="
    height: 32px;
    background: white;
"></div></div><div class="p-4 space-y-2"><div class="flex items-center text-gray-700 text-sm"><span class="font-bold font-lg text-xl">166,000,000 Rial</span></div></div></a> */}