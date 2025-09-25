// toolverse123-droid/toolverse/toolverse-8e21c08f808538925b7d76b20c163902921ced90/i18n.ts
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type Language = 'en' | 'ko' | 'zh' | 'ar';

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const getInitialLanguage = (): Language => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    if (LANGUAGES.some(lang => lang.code === browserLang)) {
      return browserLang as Language;
    }
  }
  return 'en';
};

const translations = {
  en: {
    toolverse: 'ToolVerse',
    viewOnGithub: 'View on GitHub',
    tools: {
      Summarizer: 'Text Summarizer',
      ImageGenerator: 'Image Generator',
      JsonFormatter: 'JSON Formatter',
      ColorConverter: 'Color Converter',
      PasswordGenerator: 'Password Generator',
      BmiCalculator: 'BMI Calculator',
      ExchangeRateCalculator: 'Exchange Rate Calculator',
      PercentageCalculator: 'Percentage Calculator',
      AgeCalculator: 'Age Calculator',
      BarcodeGenerator: 'Barcode Generator',
      QrCodeGenerator: 'QR Code Generator',
      NicknameGenerator: 'Nickname Generator',
      MealPicker: 'Meal Picker',
      DdayCalculator: 'D-Day Calculator',
      CagrCalculator: 'CAGR Calculator',
      UnitConverter: 'Unit Converter',
      LoanCalculator: 'Loan Calculator',
      About: 'About Us',
      TermsOfService: 'Terms of Service',
      PrivacyPolicy: 'Privacy Policy',
    },
    jsonFormatter: {
      label: 'Enter JSON Data',
      placeholder: '{ "key": "value", "nested": { "array": [1, 2, 3] } }',
      formatButton: 'Format / Validate',
      clearButton: 'Clear',
      success: 'JSON successfully formatted.',
      error: 'Formatting failed: ',
      errorInput: 'Input is empty.',
      invalidJson: 'Invalid JSON format.',
    },
    // 다른 도구들의 번역 내용도 여기에 모두 포함됩니다...
  },
  ko: {
    toolverse: '툴버스',
    viewOnGithub: 'GitHub에서 보기',
    tools: {
      Summarizer: '텍스트 요약',
      ImageGenerator: '이미지 생성',
      JsonFormatter: 'JSON 포맷터',
      ColorConverter: '색상 변환',
      PasswordGenerator: '비밀번호 생성',
      BmiCalculator: 'BMI 계산기',
      ExchangeRateCalculator: '환율 계산기',
      PercentageCalculator: '퍼센트 계산기',
      AgeCalculator: '나이 계산기',
      BarcodeGenerator: '바코드 생성기',
      QrCodeGenerator: 'QR 코드 생성기',
      NicknameGenerator: '닉네임 생성기',
      MealPicker: '메뉴 추천',
      DdayCalculator: 'D-day 계산기',
      CagrCalculator: '연평균 성장률(CAGR) 계산기',
      UnitConverter: '단위 변환기',
      LoanCalculator: '대출 계산기',
      About: '서비스 소개',
      TermsOfService: '이용약관',
      PrivacyPolicy: '개인정보처리방침',
    },
    jsonFormatter: {
      label: 'JSON 데이터 입력',
      placeholder: '{ "key": "값", "nested": { "array": [1, 2, 3] } }',
      formatButton: '포맷 / 검증',
      clearButton: '지우기',
      success: 'JSON 포맷팅에 성공했습니다.',
      error: '포맷팅 실패: ',
      errorInput: '입력값이 비어있습니다.',
      invalidJson: '잘못된 JSON 형식입니다.',
    },
    // 다른 도구들의 번역 내용도 여기에 모두 포함됩니다...
  },
  zh: {
    toolverse: '工具宇宙',
    viewOnGithub: '在 GitHub 上查看',
    tools: {
      Summarizer: '文本摘要',
      ImageGenerator: '图像生成',
      JsonFormatter: 'JSON 格式化',
      ColorConverter: '颜色转换',
      PasswordGenerator: '密码生成',
      BmiCalculator: 'BMI 计算器',
      ExchangeRateCalculator: '汇率计算器',
      PercentageCalculator: '百分比计算器',
      AgeCalculator: '年龄计算器',
      BarcodeGenerator: '条形码生成器',
      QrCodeGenerator: '二维码生成器',
      NicknameGenerator: '昵称生成器',
      MealPicker: '菜单选择器',
      DdayCalculator: 'D-Day 计算器',
      CagrCalculator: 'CAGR 计算器',
      UnitConverter: '单位转换器',
      LoanCalculator: '贷款计算器',
      About: '关于我们',
      TermsOfService: '服务条款',
      PrivacyPolicy: '隐私政策',
    },
    jsonFormatter: {
      label: '输入 JSON 数据',
      placeholder: '{ "key": "值", "nested": { "array": [1, 2, 3] } }',
      formatButton: '格式化 / 验证',
      clearButton: '清除',
      success: 'JSON 成功格式化。',
      error: '格式化失败：',
      errorInput: '输入为空。',
      invalidJson: '无效的 JSON 格式。',
    },
    // 다른 도구들의 번역 내용도 여기에 모두 포함됩니다...
  },
  ar: {
    toolverse: 'عالم الأدوات',
    viewOnGithub: 'عرض على GitHub',
    tools: {
      Summarizer: 'ملخص النصوص',
      ImageGenerator: 'مولد الصور',
      JsonFormatter: 'منسق JSON',
      ColorConverter: 'محول الألوان',
      PasswordGenerator: 'مولد كلمات المرور',
      BmiCalculator: 'حاسبة مؤشر كتلة الجسم',
      ExchangeRateCalculator: 'حاسبة أسعار الصرف',
      PercentageCalculator: 'حاسبة النسبة المئوية',
      AgeCalculator: 'حاسبة العمر',
      BarcodeGenerator: 'مولد الباركود',
      QrCodeGenerator: 'مولد رمز QR',
      NicknameGenerator: 'مولد الألقاب',
      MealPicker: 'منتقي الوجبات',
      DdayCalculator: 'حاسبة D-Day',
      CagrCalculator: 'حاسبة CAGR',
      UnitConverter: 'محول الوحدات',
      LoanCalculator: 'حاسبة القروض',
      About: 'معلومات عنا',
      TermsOfService: 'شروط الخدمة',
      PrivacyPolicy: 'سياسة الخصوصية',
    },
    jsonFormatter: {
      label: 'أدخل بيانات JSON',
      placeholder: '{ "key": "قيمة", "nested": { "array": [1, 2, 3] } }',
      formatButton: 'تنسيق / تحقق',
      clearButton: 'مسح',
      success: 'تم تنسيق JSON بنجاح.',
      error: 'فشل التنسيق: ',
      errorInput: 'الإدخال فارغ.',
      invalidJson: 'تنسيق JSON غير صالح.',
    },
    // 다른 도구들의 번역 내용도 여기에 모두 포함됩니다...
  },
};

type LocalizationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
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