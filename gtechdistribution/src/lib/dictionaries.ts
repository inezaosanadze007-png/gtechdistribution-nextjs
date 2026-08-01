// Loaded only from server components (layouts/pages), so dictionaries never
// ship to the client bundle.

export const locales = ["en", "ka"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries = {
  en: () => import("../../locales/en.json").then((m) => m.default),
  ka: () => import("../../locales/ka.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  const load = dictionaries[locale] ?? dictionaries[defaultLocale];
  return load();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
