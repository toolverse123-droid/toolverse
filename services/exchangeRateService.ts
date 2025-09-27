// services/exchangeRateService.ts
let ratesCache: { [key: string]: number } | null = null;

const getRates = async (): Promise<{ [key: string]: number }> => {
    if (ratesCache) {
        return ratesCache;
    }

    const response = await fetch('/.netlify/functions/exchange');
    if (!response.ok) {
        throw new Error('Failed to fetch exchange rates from backend.');
    }
    const data = await response.json();
    ratesCache = data;
    return data;
};

export interface Currency {
    code: string;
    name: string;
}

export const CURRENCIES: Currency[] = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "KRW", name: "South Korean Won" },
];

export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
    if (fromCurrency === toCurrency) {
        return amount;
    }
    const rates = await getRates();
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    if (!fromRate || !toRate) {
        throw new Error("Currency not supported");
    }
    const amountInUsd = amount / fromRate;
    return amountInUsd * toRate;
};