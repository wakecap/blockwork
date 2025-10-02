import React from "react";
import { Button } from "./button";
import { useLanguage } from "./language-provider";
import { Languages } from "lucide-react";

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === "en" ? "العربية" : "English"}
    </Button>
  );
};

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Language:</span>
      <div className="flex rounded-md border border-input">
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="rounded-r-none border-r"
        >
          English
        </Button>
        <Button
          variant={language === "ar" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("ar")}
          className="rounded-l-none"
        >
          العربية
        </Button>
      </div>
    </div>
  );
};
