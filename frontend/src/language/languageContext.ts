import { createContext } from "react";
import { translations } from "./translations";

export type Language = "en" | "id";

export type LanguageContextValue = {
    language: Language;
    toggleLanguage: () => void;
    t: typeof translations.en;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
