import React, { useState, useMemo } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

type UnitSystem = 'metric' | 'imperial';

const BmiCalculator: React.FC = () => {
  const { t } = useLocalization();
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');

  const { bmi, category } = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (isNaN(w) || w <= 0) return { bmi: null, category: null };

    let heightInMeters: number;

    if (unitSystem === 'metric') {
      if (isNaN(h) || h <= 0) return { bmi: null, category: null };
      heightInMeters = h / 100;
    } else {
      const hFt = parseFloat(height);
      const hIn = parseFloat(heightIn) || 0;
      if (isNaN(hFt) || hFt < 0 || isNaN(hIn) || hIn < 0 || (hFt === 0 && hIn === 0)) return { bmi: null, category: null };
      const totalInches = hFt * 12 + hIn;
      heightInMeters = totalInches * 0.0254;
    }

    if (heightInMeters <= 0) return { bmi: null, category: null };

    const bmiValue = w / (heightInMeters * heightInMeters);
    let bmiCategory = '';
    
    if (bmiValue < 18.5) bmiCategory = t('bmiCalculator.underweight');
    else if (bmiValue < 25) bmiCategory = t('bmiCalculator.normal');
    else if (bmiValue < 30) bmiCategory = t('bmiCalculator.overweight');
    else bmiCategory = t('bmiCalculator.obese');

    return { bmi: bmiValue.toFixed(1), category: bmiCategory };
  }, [weight, height, heightIn, unitSystem, t]);

  const weightUnit = unitSystem === 'metric' ? 'kg' : 'lbs';
  const heightUnit = unitSystem === 'metric' ? 'cm' : 'ft';

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
        <div className="flex flex-col gap-6">
          
          {/* Unit System Toggle */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button 
              onClick={() => setUnitSystem('metric')}
              className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'metric' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
              {t('bmiCalculator.metric')}
            </button>
            <button 
              onClick={() => setUnitSystem('imperial')}
              className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'imperial' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
              {t('bmiCalculator.imperial')}
            </button>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">{t('bmiCalculator.weight')}</label>
              <div className="relative">
                <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                />
                <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400">{weightUnit}</span>
              </div>
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">{t('bmiCalculator.height')}</label>
              <div className={`grid gap-3 ${unitSystem === 'imperial' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div className="relative">
                  <input type="number" id="height" value={height} onChange={e => setHeight(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400">{heightUnit}</span>
                </div>
                {unitSystem === 'imperial' && (
                  <div className="relative">
                      <input type="number" id="heightIn" value={heightIn} onChange={e => setHeightIn(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                      />
                      <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400">in</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Result Display */}
          {bmi && (
            <div className="text-center bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-400">{t('bmiCalculator.yourBmi')}</h3>
              <p className="text-5xl font-bold text-cyan-400 my-2">{bmi}</p>
              <p className="text-xl font-semibold text-white">{category}</p>
            </div>
          )}
        </div>
      </div>
      <ToolDescription tool={Tool.BmiCalculator} />
    </>
  );
};

export default BmiCalculator;
