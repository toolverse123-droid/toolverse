// toolverse123-droid/toolverse/toolverse-8e21c08f808538925b7d76b20c163902921ced90/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Link와 useLocation 임포트
import { Tool } from '../types';
import { 
  JsonIcon, ColorIcon, PasswordIcon, GithubIcon, BmiIcon, ExchangeRateIcon, 
  PercentageIcon, AgeCalculatorIcon, XIcon, BarcodeIcon, QrCodeIcon, 
  NicknameIcon, MealIcon, DdayIcon, CagrIcon, UnitConverterIcon, LoanCalculatorIcon
} from './icons/Icons';
import { useLocalization } from '../i18n';
import LanguageSelector from './LanguageSelector';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}> = ({ icon, label, isActive }) => {
  return (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
        isActive
          ? 'bg-cyan-500 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="ms-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useLocalization();
  const location = useLocation(); // 현재 URL 정보
  const handleClose = () => setIsOpen(false);
  
  const tools = [
    { path: 'json-formatter', tool: Tool.JsonFormatter, icon: <JsonIcon /> },
    { path: 'color-converter', tool: Tool.ColorConverter, icon: <ColorIcon /> },
    { path: 'password-generator', tool: Tool.PasswordGenerator, icon: <PasswordIcon /> },
    { path: 'bmi-calculator', tool: Tool.BmiCalculator, icon: <BmiIcon /> },
    { path: 'exchange-rate-calculator', tool: Tool.ExchangeRateCalculator, icon: <ExchangeRateIcon /> },
    { path: 'percentage-calculator', tool: Tool.PercentageCalculator, icon: <PercentageIcon /> },
    { path: 'age-calculator', tool: Tool.AgeCalculator, icon: <AgeCalculatorIcon /> },
    { path: 'barcode-generator', tool: Tool.BarcodeGenerator, icon: <BarcodeIcon /> },
    { path: 'qr-code-generator', tool: Tool.QrCodeGenerator, icon: <QrCodeIcon /> },
    { path: 'nickname-generator', tool: Tool.NicknameGenerator, icon: <NicknameIcon /> },
    { path: 'meal-picker', tool: Tool.MealPicker, icon: <MealIcon /> },
    { path: 'd-day-calculator', tool: Tool.DdayCalculator, icon: <DdayIcon /> },
    { path: 'cagr-calculator', tool: Tool.CagrCalculator, icon: <CagrIcon /> },
    { path: 'unit-converter', tool: Tool.UnitConverter, icon: <UnitConverterIcon /> },
    { path: 'loan-calculator', tool: Tool.LoanCalculator, icon: <LoanCalculatorIcon /> },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
    
      <aside className={`fixed inset-y-0 start-0 z-30 w-64 bg-gray-800 p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center">
                  <div className="p-2 bg-cyan-500 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                  </div>
                  <h2 className="text-2xl font-bold ms-3 text-white">{t('toolverse')}</h2>
              </Link>
              <button onClick={handleClose} className="lg:hidden text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-700 transition">
                <XIcon />
              </button>
          </div>
          <LanguageSelector />
          <nav className="mt-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            <ul>
              {tools.map((tool) => (
                <Link to={`/${tool.path}`} key={tool.path} onClick={handleClose}>
                  <NavItem
                    icon={tool.icon}
                    label={t(`tools.${tool.tool}`)}
                    isActive={location.pathname === `/${tool.path}`}
                  />
                </Link>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto">
          <a href="https://github.com/google/labs-prototypes" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <GithubIcon />
            <span className="ms-4 font-medium">{t('viewOnGithub')}</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;