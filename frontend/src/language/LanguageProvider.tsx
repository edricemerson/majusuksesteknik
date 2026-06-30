import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";
import { LanguageContext, type Language } from "./languageContext";

const LANGUAGE_KEY = "mst_language";

function readStoredLanguage(): Language {
    return localStorage.getItem(LANGUAGE_KEY) === "id" ? "id" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => readStoredLanguage());

    useEffect(() => {
        localStorage.setItem(LANGUAGE_KEY, language);
    }, [language]);

    function toggleLanguage() {
        setLanguage((l) => (l === "en" ? "id" : "en"));
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}
