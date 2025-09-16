"use client";

import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale } from "@/lib/i18n.config";
import jantechLogo from "../../public/images/jantechLogo.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/states/hooks";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { getLangDir } from "@/utils";
import { useParams, usePathname } from "next/navigation";
import { FaAngleDown } from "react-icons/fa6";

export default function Navbar() {
  const t = useAppSelector(state => state.dictionary.content?.components.navbar);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const lang = useParams().lang as Locale;
  const pathname = usePathname();
  console.log(pathname);
  const isHome = pathname === `/${lang}`;
  const dir = getLangDir(lang);
  const scrollHandler = () => {
    if (window.scrollY > 70) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      scrollHandler();
    });

    scrollHandler();
    return () => window.removeEventListener('scroll', () => { });
  }, []);

  if (!t) return null;

  return (
    <header className={`fixed top-0 start-0 z-50 w-full transition-[background-color] duration-300 ease-linear ${isScrolled || !isHome ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="flex max-w-[1655px] mx-auto items-center justify-between px-4 md:px-12 xl:px-16 py-5.5">
        <Image
          src={jantechLogo}
          alt="Logo"
          width={135}
          height={24}
          priority
          className={`filter transition-[filter] duration-300 ease-linear ${isScrolled || !isHome ? "brightness-100 invert-0" : "lg:brightness-0 lg:invert"}`}
        />
        <div
          className="flex flex-col gap-[5px] *:w-7 *:h-[3px] *:bg-red-primary *:rounded-md cursor-pointer 2xl:hidden ms-auto"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <div className={isOpen ? "-rotate-z-45 translate-y-[4px]" : "rotate-z-0"}></div>
          <div className={isOpen ? "hidden" : "block"}></div>
          <div className={isOpen ? "rotate-z-45 -translate-y-[4px]" : "rotate-z-0"}></div>
        </div>
        <div className="flex items-center gap-6">
          <ul className="hidden 2xl:flex gap-6" dir={dir}>
            {t.items.map(item => (
              <li
                key={item.title}
              >
                {item.children ? (
                  <div
                    className="relative group cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      {item.title}
                      <FaAngleDown className="group-hover:-rotate-180 transition-all duration-300" />
                    </div>
                    <div className="absolute transition-[max-height] duration-300 ease-out max-h-0 overflow-hidden group-hover:max-h-64">
                      <ul className="bg-white min-w-52 border border-slate-300 rounded-md mt-8 *:border-b *:border-slate-300 *:last:border-none">
                        {item.children.map(child => (
                          <li key={child.title}>
                            <Link href={`/${lang + child.href}`} className="text-nowrap block p-2">
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/${lang + item.href}`}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden 2xl:block">
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </div>
      <div className={`bg-white min-h-screen min-w-56 px-2 py-5 fixed z-50 top-0 overflow-y-auto h-screen transition-[inset-inline-start] duration-300 ease-out 2xl:hidden ${isOpen ? "start-0" : "-start-full"}`}>
        <Image
          src={jantechLogo}
          width={150}
          height={150}
          alt="logo"
          className="mx-auto"
        />
        <ul className="mt-8 space-y-6 relative z-10">
          {t.items.map(item => (
            <li
              key={item.title}
            >
              {item.children ? (
                <>
                  <div className="flex justify-between items-center text-sm cursor-pointer" onClick={() => setActive(prev => prev === item.title ? "" : item.title)}>
                    <span>{item.title}</span>
                    <FaAngleRight className={`text-sm transition-all duration-300 ease-out ${active === item.title ? "-rotate-90" : "rotate-0"} ${dir === "rtl" && "rotate-180"} `} />
                  </div>
                  <div className={`max-h-0 overflow-hidden transition-all duration-300 ease-out ${item.title === active && "max-h-52"}`}>
                    {item.children.map(child => (
                      <Link
                        href={`/${lang + child.href}`}
                        key={child.title}
                        className="block text-sm py-2 px-3 hover:bg-gray-200 rounded-sm overflow-hidden transition-all duration-300 ease-out"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={`/${lang + item.href}`}
                  className="flex items-center justify-between gap-3 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.title}</span>
                  <FaAngleRight className={`text-sm ${dir === "rtl" && "rotate-180"} `} />
                </Link>
              )}
            </li>
          ))}
        </ul>
        <LanguageSwitcher lang={lang} />
      </div>
      {
        isOpen && (
          <div className="fixed z-40 backdrop-blur-md bg-black/15 inset-0 2xl:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )
      }
    </header >
  )
}
