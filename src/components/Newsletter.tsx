"use client";

import { useAppSelector } from "@/lib/states/hooks";
import Button from "./Button";

export default function Newsletter() {
    const t = useAppSelector(state => state.dictionary.content?.components.newsletter);

    if (!t) return null;

    return (
        <div className="flex flex-col grow gap-5 max-w-[600px] bg-slate-100 p-4">
            <div>
                <p className="font-bold text-lg">{t.title}</p>
                <span className="text-sm">{t.subTitle}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-4 bg-white text-black rounded-md sm:rounded-full p-2 sm:p-0" dir="ltr">
                <input type="text" placeholder="example@gmail.com" className="grow sm:ps-4 placeholder:text-sm placeholder:sm:text-base placeholder:font-serif" />
                <Button 
                    title={t.button}
                    className="py-1 sm:py-2 sm:px-4 bg-red-primary text-sm text-white rounded-sm sm:!rounded-full"
                />
            </div>
        </div>
    )
}
