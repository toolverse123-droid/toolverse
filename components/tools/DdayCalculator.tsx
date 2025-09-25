import React, { useState, useMemo } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const DdayCalculator: React.FC = () => {
    const { t } = useLocalization();
    const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [title, setTitle] = useState<string>('');

    const diff = useMemo(() => {
        if (!targetDate) return null;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date
        
        const target = new Date(targetDate);
        target.setHours(0, 0, 0, 0); // Normalize target date
        
        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }, [targetDate]);

    const getResultText = () => {
        if (diff === null) return '';
        if (diff === 0) return `${title || t('ddayCalculator.dateLabel')} ${t('ddayCalculator.today')}`;
        if (diff > 0) return `D-${diff} (${diff} ${t('ddayCalculator.daysLeft')})`;
        return `D+${-diff} (${-diff} ${t('ddayCalculator.daysPassed')})`;
    };
    
    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="event-title" className="block text-sm font-medium text-gray-300 mb-2">
                            {t('ddayCalculator.eventTitleLabel')}
                        </label>
                        <input
                            type="text"
                            id="event-title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                            placeholder={t('ddayCalculator.eventTitlePlaceholder')}
                        />
                    </div>
                    <div>
                        <label htmlFor="target-date" className="block text-sm font-medium text-gray-300 mb-2">
                            {t('ddayCalculator.dateLabel')}
                        </label>
                        <input
                            type="date"
                            id="target-date"
                            value={targetDate}
                            onChange={e => setTargetDate(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 text-lg focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    {diff !== null && (
                         <div className="text-center bg-gray-900 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-400">{title || t('ddayCalculator.result')}</h3>
                            <p className="text-5xl font-bold text-cyan-400 my-2">{getResultText()}</p>
                        </div>
                    )}
                </div>
            </div>
            <ToolDescription tool={Tool.DdayCalculator} />
        </>
    );
};

export default DdayCalculator;