// toolverse123-droid/toolverse/toolverse-8e21c08f808538925b7d76b20c163902921ced90/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'; // react-router-dom 임포트
import { Tool } from './types';
import Sidebar from './components/Sidebar';
import JsonFormatter from './components/tools/JsonFormatter';
import ColorConverter from './components/tools/ColorConverter';
import PasswordGenerator from './components/tools/PasswordGenerator';
import BmiCalculator from './components/tools/BmiCalculator';
import ExchangeRateCalculator from './components/tools/ExchangeRateCalculator';
import PercentageCalculator from './components/tools/PercentageCalculator';
import AgeCalculator from './components/tools/AgeCalculator';
import BarcodeGenerator from './components/tools/BarcodeGenerator';
import QrCodeGenerator from './components/tools/QrCodeGenerator';
import NicknameGenerator from './components/tools/NicknameGenerator';
import MealPicker from './components/tools/MealPicker';
import DdayCalculator from './components/tools/DdayCalculator';
import CagrCalculator from './components/tools/CagrCalculator';
import UnitConverter from './components/tools/UnitConverter';
import LoanCalculator from './components/tools/LoanCalculator';
import InfoPage from './components/pages/InfoPage';
import { useLocalization } from './i18n';
import { MenuIcon } from './components/icons/Icons';

// 도구 정보를 배열로 관리
const toolComponents = [
  { path: 'json-formatter', component: <JsonFormatter />, tool: Tool.JsonFormatter },
  { path: 'color-converter', component: <ColorConverter />, tool: Tool.ColorConverter },
  { path: 'password-generator', component: <PasswordGenerator />, tool: Tool.PasswordGenerator },
  { path: 'bmi-calculator', component: <BmiCalculator />, tool: Tool.BmiCalculator },
  { path: 'exchange-rate-calculator', component: <ExchangeRateCalculator />, tool: Tool.ExchangeRateCalculator },
  { path: 'percentage-calculator', component: <PercentageCalculator />, tool: Tool.PercentageCalculator },
  { path: 'age-calculator', component: <AgeCalculator />, tool: Tool.AgeCalculator },
  { path: 'barcode-generator', component: <BarcodeGenerator />, tool: Tool.BarcodeGenerator },
  { path: 'qr-code-generator', component: <QrCodeGenerator />, tool: Tool.QrCodeGenerator },
  { path: 'nickname-generator', component: <NicknameGenerator />, tool: Tool.NicknameGenerator },
  { path: 'meal-picker', component: <MealPicker />, tool: Tool.MealPicker },
  { path: 'd-day-calculator', component: <DdayCalculator />, tool: Tool.DdayCalculator },
  { path: 'cagr-calculator', component: <CagrCalculator />, tool: Tool.CagrCalculator },
  { path: 'unit-converter', component: <UnitConverter />, tool: Tool.UnitConverter },
  { path: 'loan-calculator', component: <LoanCalculator />, tool: Tool.LoanCalculator },
  { path: 'about', component: <InfoPage translationKey="about" />, tool: Tool.About },
  { path: 'terms-of-service', component: <InfoPage translationKey="termsofservice" />, tool: Tool.TermsOfService },
  { path: 'privacy-policy', component: <InfoPage translationKey="privacypolicy" />, tool: Tool.PrivacyPolicy },
];

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, language } = useLocalization();
  const location = useLocation(); // 현재 URL 정보를 가져옴

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  // 현재 URL 경로를 기반으로 활성화된 도구와 제목 찾기
  const currentPath = location.pathname.substring(1);
  const currentTool = toolComponents.find(tc => tc.path === currentPath);
  const title = currentTool ? t(`tools.${currentTool.tool}`) : t('toolverse');

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow-md">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition">
            <MenuIcon />
          </button>
          <h1 className="text-xl font-bold text-cyan-400">{title}</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="hidden lg:block text-3xl sm:text-4xl font-bold text-cyan-400 mb-6 pb-2 border-b-2 border-gray-700">{title}</h1>
            <Routes>
              {/* 기본 경로 접속 시 첫 번째 도구로 자동 이동 */}
              <Route path="/" element={<Navigate to={`/${toolComponents[0].path}`} replace />} />
              {toolComponents.map(tc => (
                <Route key={tc.path} path={`/${tc.path}`} element={tc.component} />
              ))}
            </Routes>
          </div>
        </main>
        
        <footer className="w-full p-4 border-t border-gray-800 bg-gray-900 text-center">
          {/* Footer 내용은 생략 (기존과 동일) */}
        </footer>
      </div>
    </div>
  );
};

export default App;