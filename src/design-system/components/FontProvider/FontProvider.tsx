import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface FontContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  fontFamily: string;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children, defaultLanguage = "en" }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const fontFamily = language === "ar" ? "font-arabic" : "font-sans";

  const value: FontContextType = {
    language,
    setLanguage,
    fontFamily,
  };

  return (
    <FontContext.Provider value={value}>
      <div className={`${fontFamily} ${language === "ar" ? "rtl" : "ltr"}`}>{children}</div>
    </FontContext.Provider>
  );
};

export const useFont = (): FontContextType => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};

// Language switcher component
export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useFont();

  return (
    <div className="flex items-center space-x-2 p-2 bg-neutral-100 rounded-lg">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === "en"
            ? "bg-neutral-900 text-white"
            : "bg-transparent text-neutral-600 hover:text-neutral-900"
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage("ar")}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === "ar"
            ? "bg-neutral-900 text-white"
            : "bg-transparent text-neutral-600 hover:text-neutral-900"
        }`}
      >
        العربية
      </button>
    </div>
  );
};

// Pre-built components for different languages
export const EnglishText: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <span className={`font-sans ${className}`}>{children}</span>;

export const ArabicText: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <span className={`font-arabic ${className}`}>{children}</span>;
