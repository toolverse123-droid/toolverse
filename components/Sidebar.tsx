import React from 'react';
import { Tool } from '../types';
import { 
  TextIcon, ImageIcon, JsonIcon, ColorIcon, PasswordIcon, GithubIcon,
  BmiIcon, ExchangeRateIcon, PercentageIcon, AgeCalculatorIcon, XIcon,
  BarcodeIcon, QrCodeIcon, NicknameIcon, MealIcon, DdayIcon, CagrIcon, UnitConverterIcon, LoanCalculatorIcon
} from './icons/Icons';
import { useLocalization } from '../i18n';
import LanguageSelector from './LanguageSelector';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
        isActive
          ? 'bg-cyan-500 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ms-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool, isOpen, setIsOpen }) => {
  const { t } = useLocalization();
  const handleClose = () => setIsOpen(false);
  
  const tools: { label: Tool; icon: React.ReactNode }[] = [
    { label: Tool.Summarizer, icon: <TextIcon /> },
    { label: Tool.ImageGenerator, icon: <ImageIcon /> },
    { label: Tool.JsonFormatter, icon: <JsonIcon /> },
    { label: Tool.ColorConverter, icon: <ColorIcon /> },
    { label: Tool.PasswordGenerator, icon: <PasswordIcon /> },
    { label: Tool.BmiCalculator, icon: <BmiIcon /> },
    { label: Tool.ExchangeRateCalculator, icon: <ExchangeRateIcon /> },
    { label: Tool.PercentageCalculator, icon: <PercentageIcon /> },
    { label: Tool.AgeCalculator, icon: <AgeCalculatorIcon /> },
    { label: Tool.BarcodeGenerator, icon: <BarcodeIcon /> },
    { label: Tool.QrCodeGenerator, icon: <QrCodeIcon /> },
    { label: Tool.NicknameGenerator, icon: <NicknameIcon /> },
    { label: Tool.MealPicker, icon: <MealIcon /> },
    { label: Tool.DdayCalculator, icon: <DdayIcon /> },
    { label: Tool.CagrCalculator, icon: <CagrIcon /> },
    { label: Tool.UnitConverter, icon: <UnitConverterIcon /> },
    { label: Tool.LoanCalculator, icon: <LoanCalculatorIcon /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
    
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 start-0 z-30 w-64 bg-gray-800 p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                  <div className="p-2 bg-cyan-500 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                  </div>
                  <h2 className="text-2xl font-bold ms-3 text-white">{t('toolverse')}</h2>
              </div>
              <button onClick={handleClose} className="lg:hidden text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-700 transition">
                <XIcon />
              </button>
          </div>
          <LanguageSelector />
          <nav className="mt-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            <ul>
              {tools.map((tool) => (
                <NavItem
                  key={tool.label}
                  icon={tool.icon}
                  label={t(`tools.${tool.label}`)}
                  isActive={activeTool === tool.label}
                  onClick={() => setActiveTool(tool.label)}
                />
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