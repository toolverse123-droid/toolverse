import React, { useState, useMemo } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const AgeCalculator: React.FC = () => {
    const { t } = useLocalization();
    const [birthDate, setBirthDate] = useState<string>('');

    const age = useMemo(() => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        if (isNaN(birth.getTime())) return null;

        const today = new Date();
        
        if (birth > today) return { years: 0, months: 0, days: 0 };

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += prevMonthLastDay;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }, [birthDate]);

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="flex flex-col gap-6">

                    {/* Input */}
                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-2">
                            {t('ageCalculator.label')}
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            value={birthDate}
                            onChange={e => setBirthDate(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 text-lg focus:ring-2 focus:ring-cyan-500"
                            // Set max date to today
                            max={new Date().toISOString().split("T")[0]}
                        />
                    </div>

                    {/* Result Display */}
                    {age && (
                        <div className="bg-gray-900 p-4 rounded-lg">
                            <h3 className="text-center text-lg font-medium text-gray-300 mb-4">{t('ageCalculator.yourAge')}</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-4xl font-bold text-cyan-400">{age.years}</p>
                                    <p className="text-sm text-gray-400">{t('ageCalculator.years')}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-cyan-400">{age.months}</p>
                                    <p className="text-sm text-gray-400">{t('ageCalculator.months')}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-cyan-400">{age.days}</p>
                                    <p className="text-sm text-gray-400">{t('ageCalculator.days')}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToolDescription tool={Tool.AgeCalculator} />
        </>
    );
};

export default AgeCalculator;
