// toolverse123-droid/toolverse/toolverse-8e21c08f808538925b7d76b20c163902921ced90/i18n.ts
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type Language = 'en' | 'ko' | 'zh' | 'ar';

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

// --- 이 아래부터가 수정된 부분입니다 ---

// 브라우저 언어를 기반으로 초기 언어를 결정하는 함수
const getInitialLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0]; // 'ko-KR' -> 'ko'
  // 지원하는 언어 목록에 브라우저 언어가 있는지 확인
  if (LANGUAGES.some(lang => lang.code === browserLang)) {
    return browserLang as Language;
  }
  // 지원하지 않는 언어일 경우 기본값 'en'을 반환
  return 'en';
};


const translations = {
// ... (기존 번역 내용은 그대로 유지됩니다. 수정할 필요 없습니다.)
// ...
};

type LocalizationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // useState의 초기값을 위에서 만든 함수로 변경합니다.
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
          if (fallbackResult === undefined) {
            return key;
          }
        }
        return fallbackResult;
      }
    }
    return result;
  }, [language]);

  return React.createElement(
    LocalizationContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};