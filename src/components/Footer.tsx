"use client";

import { useAppSelector } from "@/lib/states/hooks";
import Link from "next/link";
import { LuPhoneCall } from "react-icons/lu";
import { LuMails } from "react-icons/lu";
import Newsletter from "./Newsletter";
import { FaInstagram } from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";
import { AiOutlineWhatsApp } from "react-icons/ai";

export default function Footer() {
  const t = useAppSelector(state => state.dictionary.content?.components.footer);

  if (!t) return null;

  return (
    <div className="border-t">
      <div className="flex flex-col sm:flex-row-reverse sm:justify-between gap-3 w-full p-4 max-w-[1600px] mx-auto">
        <Newsletter />
        <div className="flex flex-col justify-between gap-3 text-sm lg:text-lg">
          <h2 className="text-lg font-bold">{t.title}</h2>
          <p>{t.description}</p>
          <div className="flex items-center justify-between font-sans font-medium">
            <div className="flex items-center gap-1.5">
              <LuMails className="size-5" />
              <span>{t.postalcode}</span>
            </div>
            <Link href="tel:02166974235" className="flex items-center gap-1.5">
              <LuPhoneCall className="size-5" />
              {t.telephone}
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 *:size-10 *:rounded-full *:bg-red-primary *:text-white *:grid *:place-content-center">
            <Link href="https://t.me/JANTECH">
              <RiTelegram2Line className="size-5"/>
            </Link>
            <Link href="https://www.instagram.com/jantech.ir">
              <FaInstagram className="size-5"/>
            </Link>
            <Link href="https://wa.me/989052905054">
              <AiOutlineWhatsApp className="size-5"/>
            </Link>
          </div>
        </div>
      </div>
      <p className="border-t py-2 text-xs text-center">{t.copyright}</p>
    </div>
  )
}
