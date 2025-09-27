import React, { useState, useCallback } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const meals: Record<string, string[]> = {
    en: ['Pizza', 'Hamburger', 'Sushi', 'Pasta', 'Tacos', 'Salad', 'Steak', 'Fried Chicken', 'Ramen', 'Pho'],
    ko: ['피자', '햄버거', '초밥', '파스타', '타코', '샐러드', '스테이크', '치킨', '라멘', '쌀국수'],
};

const MealPicker: React.FC = () => {
    const { t, language } = useLocalization();
    const [pickedMeal, setPickedMeal] = useState<string | null>(null);

    const pickMeal = useCallback(() => {
        const lang = language as keyof typeof meals;
        const mealList = meals[lang] || meals.en;
        const randomIndex = Math.floor(Math.random() * mealList.length);
        setPickedMeal(mealList[randomIndex]);
    }, [language]);

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-auto text-center">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold text-white">{t('mealPicker.title')}</h2>
                    
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
                        {pickedMeal ? (
                            <p className="text-3xl font-bold text-cyan-400">
                                {`${t('mealPicker.resultPrefix')} ${pickedMeal}${t('mealPicker.resultSuffix')}`}
                            </p>
                        ) : (
                            <p className="text-gray-400">...</p>
                        )}
                    </div>
                    
                    <button
                        onClick={pickMeal}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg"
                    >
                        {t('mealPicker.pickButton')}
                    </button>
                </div>
            </div>
            <ToolDescription tool={Tool.MealPicker} />
        </>
    );
};

export default MealPicker;