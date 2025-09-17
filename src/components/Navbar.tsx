"use client";

import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale } from "@/lib/i18n.config";
import jantechLogo from "../../public/images/jantechLogo.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/states/hooks";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { getLangDir } from "@/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const t = useAppSelector((state) => state.dictionary.content?.components.navbar);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropHov, setDropHov] = useState(false);
  const lang = (useParams().lang as Locale) || "en"; // Fallback to 'en'
  const pathname = usePathname();
  const isMutationPage = pathname.startsWith(`/${lang}/mutation/`);
  const isHome = pathname === `/${lang}` || isMutationPage;
  const dir = getLangDir(lang);
  const scrollValue = !isMutationPage ? 70 : 600;

  const scrollHandler = () => {
    setIsScrolled(window.scrollY > scrollValue);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    scrollHandler();
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  if (!t || !t.items) return null;

  return (
    <header
      className={`fixed top-0 start-0 z-50 w-full transition-[background-color] duration-300 ease-linear ${
        dropHov || isScrolled || !isHome ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex max-w-[1655px] mx-auto items-center justify-between px-4 md:px-12 xl:px-16 py-5.5">
        <Image src={jantechLogo} alt="Logo" width={135} height={24} priority className="" />
        <div
          className="flex flex-col gap-[5px] *:w-7 *:h-[3px] *:bg-red-primary *:rounded-md cursor-pointer 2xl:hidden ms-auto"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className={isOpen ? "-rotate-z-45 translate-y-[4px]" : "rotate-z-0"}></div>
          <div className={isOpen ? "hidden" : "block"}></div>
          <div className={isOpen ? "rotate-z-45 -translate-y-[4px]" : "rotate-z-0"}></div>
        </div>
        <div className="flex items-center gap-6">
          <ul
            className={`hidden 2xl:flex ${isMutationPage && !dropHov && !isScrolled ? "text-white" : "text-black"} gap-6`}
            dir={dir}
          >
            {t.items.map((item) => (
              <li key={item.title} className="relative group">
                <div
                  className="flex items-center gap-1.5 cursor-pointer"
                  onMouseEnter={() => item.children && setDropHov(true)}
                  onMouseLeave={() => item.children && setDropHov(false)}
                >
                  <Link
                    href={`/${lang}/${item.href}`}
                  
                  >{item.title}</Link>
                  {item.children && (
                    <FaAngleDown className="group-hover:-rotate-180 transition-all duration-300" />
                  )}
                </div>
                {item.children && (
                  <div
                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 fixed left-0 right-0 transition-all duration-300 ease-out scale-95 group-hover:scale-100 origin-top"
                    onMouseEnter={() => setDropHov(true)}
                    onMouseLeave={() => setDropHov(false)}
                  >
                    <div className="bg-white shadow-lg w-full">
                      <div className="max-w-[700px] mx-auto">
                        <div className="grid grid-cols-4 gap-y-7 p-8 justify-center">
                          {item.children.map((child, i) => (
                            <Link
                              key={i}
                              href={`/${lang}/${child.href}`}
                              className="group/item"
                            >
                              <div className="relative overflow-hidden rounded-lg justify-center items-center flex">
                                <Image
                                  src={child.image || ""}
                                  alt={child.title}
                                  width={90}
                                  height={60}
                                  className="transition-transform w-[100px] duration-300 group-hover/item:scale-105"
                                />
                              </div>
                              <h3 className="text-center font-medium text-gray-800">{child.title}</h3>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden 2xl:block">
            <LanguageSwitcher lang={lang} isDark={isMutationPage && !dropHov && !isScrolled} />
          </div>
        </div>
      </div>
      <div
        className={`absolute bg-white min-h-screen min-w-56 px-2 py-5 z-50 top-0 overflow-y-auto h-screen transition-[inset-inline-start] duration-300 ease-out 2xl:hidden ${
          isOpen ? "start-0" : "-start-full"
        }`}
      >
        <Image src={jantechLogo} width={150} height={150} alt="logo" className="mx-auto" />
        <ul className="mt-8 space-y-6 relative z-10">
          {t.items.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <>
                  <div
                    className="flex justify-between items-center text-sm cursor-pointer"
                    onClick={() => setActive((prev) => (prev === item.title ? "" : item.title))}
                  >
                    <span>{item.title}</span>
                    <FaAngleRight
                      className={`text-sm transition-all duration-300 ease-out ${
                        active === item.title ? "-rotate-90" : "rotate-0"
                      } ${dir === "rtl" && "rotate-180"}`}
                    />
                  </div>
                  <div
                    className={`max-h-0 overflow-hidden transition-all duration-300 ease-out ${
                      item.title === active && "max-h-52"
                    }`}
                  >
                    {item.children.map((child, i) => (
                      <Link
                        href={`/${lang}/${child.href.replace(/^\//, "")}`}
                        key={i}
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
                  href={`/${lang}/${item.href?.replace(/^\//, "") || ""}`}
                  className="flex items-center justify-between gap-3 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.title}</span>
                  <FaAngleRight className={`text-sm ${dir === "rtl" && "rotate-180"}`} />
                </Link>
              )}
            </li>
          ))}
        </ul>
        <LanguageSwitcher lang={lang} isDark={false} />
      </div>
      {isOpen && (
        <div
          className="fixed z-40 backdrop-blur-md bg-black/15 inset-0 2xl:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}