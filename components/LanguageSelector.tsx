
import React, { useState, useRef, useEffect } from 'react';
import { useLocalization, LANGUAGES } from '../i18n';
import { GlobeIcon, ChevronDownIcon } from './icons/Icons';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = LANGUAGES.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
            <GlobeIcon />
            <span className="ms-3">{selectedLanguage?.name}</span>
        </div>
        <ChevronDownIcon className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full bg-gray-700 rounded-lg shadow-lg border border-gray-600">
          <ul className="py-1">
            {LANGUAGES.map(lang => (
              <li key={lang.code}>
                <button
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className="w-full text-start px-4 py-2 text-sm text-gray-200 hover:bg-cyan-600 hover:text-white flex items-center"
                >
                  <span className="me-3">{lang.flag}</span>
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
