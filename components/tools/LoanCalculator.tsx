import React, { useState } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const LoanCalculator: React.FC = () => {
    const { t } = useLocalization();
    const [amount, setAmount] = useState<string>('100000');
    const [rate, setRate] = useState<string>('5');
    const [term, setTerm] = useState<string>('30');
    const [results, setResults] = useState<{ monthly: number; totalInterest: number; totalRepayment: number } | null>(null);

    const calculateLoan = () => {
        const principal = parseFloat(amount);
        const annualRate = parseFloat(rate);
        const years = parseFloat(term);

        if (principal > 0 && annualRate > 0 && years > 0) {
            const monthlyRate = annualRate / 100 / 12;
            const numberOfPayments = years * 12;
            
            const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            const totalRepayment = monthlyPayment * numberOfPayments;
            const totalInterest = totalRepayment - principal;
            
            setResults({
                monthly: monthlyPayment,
                totalInterest: totalInterest,
                totalRepayment: totalRepayment,
            });
        } else {
            setResults(null);
        }
    };

    const InputField: React.FC<{ label: string; value: string; onChange: (val: string) => void; symbol?: string }> = ({ label, value, onChange, symbol }) => (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <div className="relative">
                <input
                    type="number"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                />
                {symbol && <span className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400">{symbol}</span>}
            </div>
        </div>
    );
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <InputField label={t('loanCalculator.amountLabel')} value={amount} onChange={setAmount} symbol="$" />
                    <InputField label={t('loanCalculator.rateLabel')} value={rate} onChange={setRate} symbol="%" />
                    <InputField label={t('loanCalculator.termLabel')} value={term} onChange={setTerm} symbol={t('ageCalculator.years')} />
                    
                    <button
                        onClick={calculateLoan}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg"
                    >
                        {t('loanCalculator.calculateButton')}
                    </button>

                    {results && (
                        <div className="bg-gray-900 p-4 rounded-lg space-y-4">
                            <h3 className="text-center text-xl font-semibold text-white mb-4">{t('loanCalculator.resultsTitle')}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">{t('loanCalculator.monthlyPayment')}</span>
                                <span className="text-2xl font-bold text-cyan-400">${formatCurrency(results.monthly)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                                <span className="text-gray-400">{t('loanCalculator.totalInterest')}</span>
                                <span className="font-semibold text-white">${formatCurrency(results.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">{t('loanCalculator.totalRepayment')}</span>
                                <span className="font-semibold text-white">${formatCurrency(results.totalRepayment)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToolDescription tool={Tool.LoanCalculator} />
        </>
    );
};

export default LoanCalculator;