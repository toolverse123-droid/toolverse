import React, { useState } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const CagrCalculator: React.FC = () => {
    const { t } = useLocalization();
    const [startValue, setStartValue] = useState<string>('10000');
    const [endValue, setEndValue] = useState<string>('19000');
    const [years, setYears] = useState<string>('5');
    const [cagr, setCagr] = useState<number | null>(null);

    const calculateCagr = () => {
        const sv = parseFloat(startValue);
        const ev = parseFloat(endValue);
        const y = parseFloat(years);

        if (sv > 0 && ev > 0 && y > 0) {
            const result = (Math.pow(ev / sv, 1 / y) - 1) * 100;
            setCagr(result);
        } else {
            setCagr(null);
        }
    };
    
    const InputField: React.FC<{ label: string; value: string; onChange: (val: string) => void; }> = ({ label, value, onChange }) => (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <input
                type="number"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
            />
        </div>
    );

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <InputField label={t('cagrCalculator.startValueLabel')} value={startValue} onChange={setStartValue} />
                    <InputField label={t('cagrCalculator.endValueLabel')} value={endValue} onChange={setEndValue} />
                    <InputField label={t('cagrCalculator.yearsLabel')} value={years} onChange={setYears} />
                    
                    <button
                        onClick={calculateCagr}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg"
                    >
                        {t('cagrCalculator.calculateButton')}
                    </button>

                    {cagr !== null && (
                        <div className="text-center bg-gray-900 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-400">{t('cagrCalculator.resultTitle')}</h3>
                            <p className="text-5xl font-bold text-cyan-400 my-2">{cagr.toFixed(2)}%</p>
                        </div>
                    )}
                </div>
            </div>
            <ToolDescription tool={Tool.CagrCalculator} />
        </>
    );
};

export default CagrCalculator;