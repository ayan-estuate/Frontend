import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "@carbon/react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "nl", name: "Nederlands" },
    { code: "pl", name: "Polski" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
  ];

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLang);
    }
  };

  return (
    <Select
      id="language-select"
      labelText=""
      value={i18n.language}
      onChange={handleLanguageChange}
    >
      {languages.map((lang) => (
        <SelectItem key={lang.code} value={lang.code} text={lang.name} />
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
