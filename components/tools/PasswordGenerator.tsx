
import React, { useState, useCallback, useEffect } from 'react';
import { ClipboardIcon } from '../icons/Icons';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { t } = useLocalization();

  const generatePassword = useCallback(() => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;
    
    if(charPool === '') {
        setPassword('');
        return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);


  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const CheckboxOption: React.FC<{ label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-5 w-5 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"/>
      <span className="text-gray-300">{label}</span>
    </label>
  );

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 ps-4 pe-12 text-gray-200 font-mono text-xl tracking-wider"
              placeholder={t('passwordGenerator.placeholder')}
            />
            <button
              onClick={copyToClipboard}
              className="absolute inset-y-0 end-0 flex items-center px-4 text-gray-400 hover:text-cyan-400 transition"
              title={t('passwordGenerator.copyTitle')}
            >
              {copied ? <span className="text-xs text-cyan-400">{t('passwordGenerator.copied')}</span> : <ClipboardIcon />}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="length" className="text-gray-300">{t('passwordGenerator.length')}</label>
              <span className="text-cyan-400 font-bold text-lg">{length}</span>
            </div>
            <input
              id="length"
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CheckboxOption label={t('passwordGenerator.uppercase')} checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
            <CheckboxOption label={t('passwordGenerator.lowercase')} checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
            <CheckboxOption label={t('passwordGenerator.numbers')} checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
            <CheckboxOption label={t('passwordGenerator.symbols')} checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
          </div>
          
          <button
            onClick={generatePassword}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg"
          >
            {t('passwordGenerator.regenerateButton')}
          </button>
        </div>
      </div>
      <ToolDescription tool={Tool.PasswordGenerator} />
    </>
  );
};

export default PasswordGenerator;
