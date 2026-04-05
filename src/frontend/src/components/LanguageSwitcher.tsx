import { useEffect } from "react";

export default function LanguageSwitcher() {
  useEffect(() => {
    // Google Translate inject
    const existing = document.getElementById("google_translate_element");
    if (existing) return;

    const div = document.createElement("div");
    div.id = "google_translate_element";
    div.style.display = "none";
    document.body.appendChild(div);

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);

    (
      window as typeof window & { googleTranslateElementInit: () => void }
    ).googleTranslateElementInit = () => {
      new (
        window as typeof window & {
          google: {
            translate: {
              TranslateElement: new (opts: unknown, id: string) => undefined;
            };
          };
        }
      ).google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,hi,mr,or,pa,bn" },
        "google_translate_element",
      );
    };
  }, []);

  return null;
}
