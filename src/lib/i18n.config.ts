export const i18n = {
    defaultLocale: "fa",
    locales: [ "en", "fa", "tr"]
} as const;

export type Locale = (typeof i18n)['locales'][number];