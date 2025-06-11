import ElementSkeleton from "./ElementSkeleton";

export default function ProductSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <ElementSkeleton type="text" className="h-8" />

            <ElementSkeleton type="picture" />
            <ElementSkeleton type="title" className="!w-4/7" />
        </div>
    )
}


// "use client";

// import Image from "next/image";
// import { useAppSelector } from "@/lib/states/hooks";
// import { useParams } from "next/navigation";
// import { FaStar } from "react-icons/fa6";
// import Link, { LinkProps } from "next/link";
// import { Locale } from "@/lib/i18n.config";
// import { Category } from "@/types";
// import { useRouter } from "next/navigation";

// interface Props {
//   _id: string;
//   image: string;
//   name: string;
//   price: string;
//   score: string;
// }

// export default function ProductCard({ _id, name, price, image, score }: Props) {
//   const t = useAppSelector((state) => state.dictionary.content?.components.productCard);
//   const lang = useParams().lang as Locale;
//   const category = useParams().category as Category;
//   const router = useRouter();

//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     router.push(`/${lang}/products/${category}/${_id}`);
//   }

//   if (!t) return null;

//   return (
//     <Link
//       href={`/${lang}/products/${category}/${_id}`}
//       onClick={handleClick}
//       className="block group border-b-2 border-red-primary shadow-xl"
//     >
//       <h3 className="border-s-2 border-red-primary duration-200 font-semibold group-hover:text-black mx-4 mt-4 ps-2 text-base text-gray-800 transition-colors line-clamp-1">
//         {name}
//       </h3>

//       <div className="relative aspect-square flex items-center justify-center overflow-hidden">
//         <Image
//           alt="product"
//           loading="lazy"
//           decoding="async"
//           width={300}
//           height={300}
//           className="text-transparent group-hover:scale-105 transition-transform duration-300"
//           sizes="(max-width: 768px) 100vw, 33vw"
//           src={image}
//         />
//       </div>

//       <div className="font-bold font-lg text-xl text-gray-700 p-4 pt-0 space-y-2">
//         {Number(price).toLocaleString(lang)} {t.currency}
//       </div>
//     </Link>
//   );
// }