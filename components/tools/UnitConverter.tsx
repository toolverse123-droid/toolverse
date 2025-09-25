import React, { useState, useMemo, useEffect } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

type Category = 'length' | 'weight' | 'temperature';

const unitsConfig = {
    length: {
        m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254,
    },
    weight: {
        kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495,
    },
    temperature: {
        c: (v: number) => v,
        f: (v: number) => (v * 9/5) + 32,
        k: (v: number) => v + 273.15,
    }
};

const tempFromBase = { // To Celsius
    f: (v: number) => (v - 32) * 5/9,
    k: (v: number) => v - 273.15,
};

const UnitConverter: React.FC = () => {
    const { t } = useLocalization();
    const [category, setCategory] = useState<Category>('length');
    const [fromUnit, setFromUnit] = useState<string>('m');
    const [toUnit, setToUnit] = useState<string>('ft');
    const [inputValue, setInputValue] = useState<string>('1');

    const unitOptions = useMemo(() => Object.keys(unitsConfig[category]), [category]);

    useEffect(() => {
        const newUnits = Object.keys(unitsConfig[category]);
        setFromUnit(newUnits[0]);
        setToUnit(newUnits[1] || newUnits[0]);
    }, [category]);
    
    const outputValue = useMemo(() => {
        const input = parseFloat(inputValue);
        if (isNaN(input)) return '';

        if (category === 'temperature') {
            let baseValue = input;
            if (fromUnit !== 'c') {
                baseValue = tempFromBase[fromUnit as keyof typeof tempFromBase](input);
            }
            if(toUnit === 'c') return baseValue.toFixed(4);

            const result = unitsConfig.temperature[toUnit as keyof typeof unitsConfig.temperature](baseValue);
            return result.toFixed(4);

        } else {
            const baseValue = input * unitsConfig[category][fromUnit as keyof typeof unitsConfig.length];
            const result = baseValue / unitsConfig[category][toUnit as keyof typeof unitsConfig.length];
            return result.toFixed(4);
        }
    }, [inputValue, fromUnit, toUnit, category]);
    
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value as Category;
        setCategory(newCategory);
    };

    const Select = ({ label, value, onChange, options, id }: any) => (
         <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <select id={id} value={value} onChange={onChange} className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500">
                {options.map((opt: string) => <option key={opt} value={opt}>{t(`unitConverter.units.${opt}`)}</option>)}
            </select>
        </div>
    );

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
                <div className="flex flex-col gap-6">
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">{t('unitConverter.categoryLabel')}</label>
                        <select id="category" value={category} onChange={handleCategoryChange} className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500">
                           <option value="length">{t('unitConverter.categories.length')}</option>
                           <option value="weight">{t('unitConverter.categories.weight')}</option>
                           <option value="temperature">{t('unitConverter.categories.temperature')}</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                       <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 text-xl focus:ring-2 focus:ring-cyan-500"
                        />
                         <Select value={fromUnit} onChange={(e:any) => setFromUnit(e.target.value)} options={unitOptions} id="from-unit" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <input
                            type="text"
                            value={outputValue}
                            readOnly
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-cyan-400 text-xl font-bold"
                        />
                         <Select value={toUnit} onChange={(e:any) => setToUnit(e.target.value)} options={unitOptions} id="to-unit" />
                    </div>
                </div>
            </div>
            <ToolDescription tool={Tool.UnitConverter} />
        </>
    );
};

export default UnitConverter;