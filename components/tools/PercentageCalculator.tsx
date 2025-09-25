import React, { useState, useMemo } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const PercentageCalculator: React.FC = () => {
    const { t } = useLocalization();
    const [percentage, setPercentage] = useState<string>('10');
    const [baseValue, setBaseValue] = useState<string>('50');

    const result = useMemo(() => {
        const p = parseFloat(percentage);
        const bv = parseFloat(baseValue);
        if (isNaN(p) || isNaN(bv)) {
            return null;
        }
        return (p / 100) * bv;
    }, [percentage, baseValue]);

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-xl mx-auto">
                <div className="flex flex-col gap-6">

                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-white">{t('percentageCalculator.title')}</h2>
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
                        <div className="relative">
                            <input
                                type="number"
                                value={percentage}
                                onChange={e => setPercentage(e.target.value)}
                                className="w-32 bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 text-center focus:ring-2 focus:ring-cyan-500"
                            />
                            <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400">%</span>
                        </div>
                        <span className="text-gray-400">{t('percentageCalculator.of')}</span>
                        <input
                            type="number"
                            value={baseValue}
                            onChange={e => setBaseValue(e.target.value)}
                            className="w-32 bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 text-center focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    {/* Result Display */}
                    {result !== null && (
                        <div className="text-center bg-gray-900 p-4 rounded-lg mt-4">
                            <h3 className="text-lg font-medium text-gray-400">{t('percentageCalculator.result')}</h3>
                            <p className="text-5xl font-bold text-cyan-400 my-2">
                                {result.toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <ToolDescription tool={Tool.PercentageCalculator} />
        </>
    );
};

export default PercentageCalculator;
