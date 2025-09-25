
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#14b8a6'); // Default to a nice teal
  const [rgb, setRgb] = useState('rgb(20, 184, 166)');
  const [hsl, setHsl] = useState('hsl(172, 80%, 40%)');
  const { t } = useLocalization();

  const hexToRgb = (h: string): string => {
    let r = '0', g = '0', b = '0';
    if (h.length === 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    } else if (h.length === 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return `rgb(${+r}, ${+g}, ${+b})`;
  };

  const rgbToHsl = (r: number, g: number, b: number): string => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  useEffect(() => {
    if (/^#[0-9A-F]{6}$/i.test(hex) || /^#[0-9A-F]{3}$/i.test(hex)) {
      const rgbValue = hexToRgb(hex);
      setRgb(rgbValue);
      const [r, g, b] = rgbValue.replace(/[rgb() ]/g, '').split(',').map(Number);
      setHsl(rgbToHsl(r, g, b));
    }
  }, [hex]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const ColorDisplay: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="bg-gray-900 p-4 rounded-lg">
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      <div className="flex items-center justify-between mt-1">
        <p className="text-lg font-mono text-gray-200">{value}</p>
        <button onClick={() => copyToClipboard(value)} className="text-gray-400 hover:text-cyan-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center justify-center gap-4">
              <div
                  className="w-48 h-48 rounded-full border-8 border-gray-700"
                  style={{ backgroundColor: hex, transition: 'background-color 0.3s' }}
              />
              <input
                  type="color"
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                  className="w-24 h-12 p-1 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer"
              />
          </div>
          <div className="flex flex-col gap-4">
              <ColorDisplay label={t('colorConverter.hex')} value={hex} />
              <ColorDisplay label={t('colorConverter.rgb')} value={rgb} />
              <ColorDisplay label={t('colorConverter.hsl')} value={hsl} />
          </div>
        </div>
      </div>
      <ToolDescription tool={Tool.ColorConverter} />
    </>
  );
};

export default ColorConverter;
