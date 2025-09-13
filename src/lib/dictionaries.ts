// import 'server-only';
import { Locale } from './i18n.config';
 
const dictionaries = {
  ar: () => import('./../dictionaries/ar.json').then((module) => module.default),
  en: () => import('./../dictionaries/en.json').then((module) => module.default),
  fa: () => import('./../dictionaries/fa.json').then((module) => module.default),
  ru: () => import('./../dictionaries/ru.json').then((module) => module.default),
  tr: () => import('./../dictionaries/tr.json').then((module) => module.default),
};
 
export const getDictionary = async (locale: Locale) => dictionaries[locale]();