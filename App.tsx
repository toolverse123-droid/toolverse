import React, { useState, useEffect } from 'react';
import { Tool } from './types';
import Sidebar from './components/Sidebar';
import Summarizer from './components/tools/Summarizer';
import ImageGenerator from './components/tools/ImageGenerator';
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

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.JsonFormatter);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, language } = useLocalization();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const renderTool = () => {
    switch (activeTool) {
      //case Tool.Summarizer:
      //  return <Summarizer />;
      //case Tool.ImageGenerator:
      //  return <ImageGenerator />;
      case Tool.JsonFormatter:
        return <JsonFormatter />;
      case Tool.ColorConverter:
        return <ColorConverter />;
      case Tool.PasswordGenerator:
        return <PasswordGenerator />;
      case Tool.BmiCalculator:
        return <BmiCalculator />;
      case Tool.ExchangeRateCalculator:
        return <ExchangeRateCalculator />;
      case Tool.PercentageCalculator:
        return <PercentageCalculator />;
      case Tool.AgeCalculator:
        return <AgeCalculator />;
      case Tool.BarcodeGenerator:
        return <BarcodeGenerator />;
      case Tool.QrCodeGenerator:
        return <QrCodeGenerator />;
      case Tool.NicknameGenerator:
        return <NicknameGenerator />;
      case Tool.MealPicker:
        return <MealPicker />;
      case Tool.DdayCalculator:
        return <DdayCalculator />;
      case Tool.CagrCalculator:
        return <CagrCalculator />;
      case Tool.UnitConverter:
        return <UnitConverter />;
      case Tool.LoanCalculator:
        return <LoanCalculator />;
      case Tool.About:
        return <InfoPage translationKey="about" />;
      case Tool.TermsOfService:
        return <InfoPage translationKey="termsofservice" />;
      case Tool.PrivacyPolicy:
        return <InfoPage translationKey="privacypolicy" />;
      default:
        return <JsonFormatter />;
    }
  };

  const isInfoPage = [Tool.About, Tool.TermsOfService, Tool.PrivacyPolicy].includes(activeTool);
  const title = isInfoPage ? t(`${activeTool.toLowerCase()}.title`) : t(`tools.${activeTool}`);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar 
        activeTool={activeTool} 
        setActiveTool={(tool) => {
          setActiveTool(tool);
          setIsSidebarOpen(false); // Close sidebar on navigation
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow-md">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition">
            <MenuIcon />
          </button>
          <h1 className="text-xl font-bold text-cyan-400">{title}</h1>
          <div className="w-8"></div> {/* Spacer to balance the title */}
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="hidden lg:block text-3xl sm:text-4xl font-bold text-cyan-400 mb-6 pb-2 border-b-2 border-gray-700">{title}</h1>
            {renderTool()}
          </div>
        </main>
        <footer className="w-full p-4 border-t border-gray-800 bg-gray-900 text-center">
          <div className="max-w-4xl mx-auto flex justify-center items-center gap-x-4 sm:gap-x-6 text-sm text-gray-400" dir="ltr">
            <button onClick={() => setActiveTool(Tool.About)} className="hover:text-cyan-400 transition-colors">{t('tools.About')}</button>
            <div className="border-l h-4 border-gray-600"></div>
            <button onClick={() => setActiveTool(Tool.TermsOfService)} className="hover:text-cyan-400 transition-colors">{t('tools.TermsOfService')}</button>
            <div className="border-l h-4 border-gray-600"></div>
            <button onClick={() => setActiveTool(Tool.PrivacyPolicy)} className="hover:text-cyan-400 transition-colors">{t('tools.PrivacyPolicy')}</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;