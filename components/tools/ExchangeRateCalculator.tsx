import React, { useState, useEffect, useCallback } from 'react';
import { useLocalization } from '../../i18n';
import { CURRENCIES, convertCurrency, Currency } from '../../services/exchangeRateService';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const ExchangeRateCalculator: React.FC = () => {
    const { t } = useLocalization();
    const [amount, setAmount] = useState<string>('100');
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const performConversion = useCallback(async () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount < 0) {
            setConvertedAmount(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await convertCurrency(numAmount, fromCurrency, toCurrency);
            setConvertedAmount(result);
        } catch (err) {
            if (err instanceof Error && err.message === "API key is not configured.") {
                setError(t('exchangeRateCalculator.apiKeyMissing'));
            } else {
                setError(t('exchangeRateCalculator.error'));
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [amount, fromCurrency, toCurrency, t]);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            performConversion();
        }, 500); // Debounce API call

        return () => {
            clearTimeout(handler);
        };
    }, [performConversion]);

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const CurrencySelector: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, id: string }> = ({ value, onChange, id }) => (
        <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={isLoading}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
        >
            {CURRENCIES.map((currency: Currency) => (
                <option key={currency.code} value={currency.code}>
                    {currency.code} - {t(`exchangeRateCalculator.currencies.${currency.code}`)}
                </option>
            ))}
        </select>
    );

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
                <div className="flex flex-col gap-6">
                    
                    {/* Amount Input */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">{t('exchangeRateCalculator.amount')}</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            disabled={isLoading}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 text-lg focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                            placeholder="100.00"
                        />
                    </div>

                    {/* Currency Selectors */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-300 mb-2">{t('exchangeRateCalculator.from')}</label>
                            <CurrencySelector value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} id="fromCurrency" />
                        </div>

                        <div className="mt-7">
                            <button onClick={handleSwapCurrencies} disabled={isLoading} className="p-2 bg-gray-700 rounded-full text-gray-300 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title={t('exchangeRateCalculator.swap')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                            </button>
                        </div>

                        <div className="flex-1">
                            <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-300 mb-2">{t('exchangeRateCalculator.to')}</label>
                            <CurrencySelector value={toCurrency} onChange={e => setToCurrency(e.target.value)} id="toCurrency" />
                        </div>
                    </div>

                    {/* Result Display */}
                    <div className="text-center bg-gray-900 p-4 rounded-lg min-h-[110px] flex flex-col justify-center">
                        {isLoading ? (
                            <div className="flex items-center justify-center text-gray-400">
                               <svg className="animate-spin -ms-1 me-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                               </svg>
                               <span>Calculating...</span>
                            </div>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : convertedAmount !== null ? (
                            <>
                                <p className="text-lg text-gray-300">
                                    {parseFloat(amount) || 0} {t(`exchangeRateCalculator.currencies.${fromCurrency}`)} =
                                </p>
                                <p className="text-4xl font-bold text-cyan-400 my-1">
                                    {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {t(`exchangeRateCalculator.currencies.${toCurrency}`)}
                                </p>
                            </>
                        ) : null}
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">{t('exchangeRateCalculator.disclaimer')}</p>
                </div>
            </div>
            <ToolDescription tool={Tool.ExchangeRateCalculator} />
        </>
    );
};

export default ExchangeRateCalculator;
