"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES, type Language } from "@/lib/i18n";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({
  className,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale() as Language;
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setIsOpen(false);
    if (lang === currentLocale) return;

    // Remove current locale prefix if present
    let pathWithoutLocale = pathname;
    if (pathname.startsWith("/he")) {
      pathWithoutLocale = pathname.slice(3) || "/";
    }

    // Navigate to the new locale path
    const newPath = lang === "en" ? pathWithoutLocale : `/he${pathWithoutLocale}`;
    router.push(newPath);
  };

  const currentConfig = LANGUAGES[currentLocale];

  if (variant === "mobile") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <span className="text-sm text-foreground/60 font-medium">
          {LANGUAGES.en.name} / {LANGUAGES.he.nativeName}
        </span>
        <div className="flex gap-2">
          {Object.values(LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg border transition-colors font-medium",
                currentLocale === lang.code
                  ? "bg-gold border-gold text-foreground"
                  : "bg-background border-border text-foreground/70 hover:border-gold/50"
              )}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors py-1 px-2 rounded-lg hover:bg-sand/50"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentConfig.code.toUpperCase()}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden min-w-[140px] z-50">
          {Object.values(LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors",
                currentLocale === lang.code
                  ? "bg-gold/10 text-foreground"
                  : "hover:bg-sand text-foreground/70 hover:text-foreground"
              )}
            >
              <span className="font-medium">{lang.nativeName}</span>
              {currentLocale === lang.code && (
                <Check className="h-4 w-4 text-gold" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
