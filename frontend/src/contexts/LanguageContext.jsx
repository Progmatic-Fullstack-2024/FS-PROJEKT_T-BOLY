import { createContext } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const value = { t, currentLanguage };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export default LanguageContext;
