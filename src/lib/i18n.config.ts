export const i18n = {
    defaultLocale: "fa",
    locales: ["ar", "en", "fa", "ru", "tr"]
} as const;

export type Locale = (typeof i18n)['locales'][number];