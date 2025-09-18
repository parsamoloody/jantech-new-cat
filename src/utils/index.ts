import { Locale } from "@/lib/i18n.config";

export const getLangDir = (lang: Locale) => {
    const languagesDirection = {
        "fa": "rtl",
        "en": "ltr",
        "tr": "ltr"
    };

    return languagesDirection[lang];
};