"use client";

import {  useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Locale } from "@/lib/i18n.config";
import { IoIosArrowDown } from "react-icons/io";
import { useAppSelector } from "./../lib/states/hooks";
import { getLangDir } from "@/utils";

interface Props {
  lang: Locale;
}

export default function LanguageSwitcher({ lang }: Props) {
  const t = useAppSelector((state) => state.dictionary.content?.components.languageSwitcher);
  const pathname = usePathname();
  const router = useRouter();
  const newPathname = pathname.slice(3);

  const [isOpen, setIsOpen] = useState(false);

  const select = useMemo(() => {
    return t?.items.find((item) => item.language === lang) || null;
  }, [lang, t?.items]);

  const dir = getLangDir(lang);

  if (!t || !select) {
    return (
      <div className="w-full mt-6 xl:min-w-[145px] h-10 bg-gray-200 rounded-md animate-pulse" />
    );
  }

  return (
    <button
      className="relative w-full mt-6 text-sm xl:min-w-[145px] 2xl:mt-0"
      onBlur={() => setIsOpen(false)}
    >
      <div
        className="flex items-center justify-between border border-slate-300 rounded-md py-1.5 px-1 md:p-0 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="md:hidden">{select.title}</span>
        <div className="flex items-center md:justify-between md:w-full gap-1 p-0.5 md:px-2 md:py-1 rounded-md">
          <div className="flex items-center gap-1 rounded-md md:py-0.5 md:px-1">
            <Image
              src={select.src}
              width={24}
              height={24}
              alt={select.title}
              className="rounded-full object-cover border border-black/10 w-[26px] h-[26px]"
            />
            <span className="hidden md:block font-sans uppercase">
              {select.language}
            </span>
          </div>
          <IoIosArrowDown className={`text-black transition-transform duration-300 ease-out ${isOpen ? "-rotate-180" : "rotate-0"}`} />
        </div>
      </div>

      <div className={`md:absolute md:z-50 w-full lg:bg-white mt-1 transition-[max-height] duration-300 ease-out overflow-hidden ${isOpen ? "max-h-60" : "max-h-0"}`} dir={dir}>
        <ul className="border border-slate-300 rounded-md">
          {t.items.map((item) => (
            <li
              key={item.title}
              className="flex items-center justify-between [&:not(:last-of-type)]:border-b border-slate-300 p-1 md:px-3 md:py-1.5 cursor-pointer"
              onClick={() => router.push(`/${item.language}${newPathname}`)}
            >
              <Image
                src={item.src}
                width={24}
                height={24}
                alt={item.title}
                className="rounded-full object-cover border border-black/10 w-[26px] h-[26px]"
              />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
