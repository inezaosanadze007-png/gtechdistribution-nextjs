// Loaded only from server components (layouts/pages), so dictionaries never
// ship to the client bundle.

export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";

const dictionaries = {
  ka: () => import("../../locales/ka.json").then((m) => m.default),
  en: () => import("../../locales/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  const load = dictionaries[locale] ?? dictionaries[defaultLocale];
  return load();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
