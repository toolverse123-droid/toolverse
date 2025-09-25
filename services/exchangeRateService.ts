// This service now uses a live API from https://www.exchangerate-api.com/
// The API key must be set as an environment variable named EXCHANGE_RATE_API_KEY.
const API_KEY = process.env.VITE_EXCHANGE_RATE_API_KEY;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface RatesCache {
    data: { [key: string]: number } | null;
    timestamp: number;
}

let ratesCache: RatesCache = {
    data: null,
    timestamp: 0,
};

const getRates = async (): Promise<{ [key: string]: number }> => {
    if (!API_KEY) {
        console.error("EXCHANGE_RATE_API_KEY environment variable not set.");
        throw new Error("API key is not configured.");
    }

    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    const now = Date.now();
    if (ratesCache.data && now - ratesCache.timestamp < CACHE_DURATION) {
        return ratesCache.data;
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates.');
        }
        const data = await response.json();
        if (data.result === 'error') {
            throw new Error(`API Error: ${data['error-type']}`);
        }
        
        ratesCache = {
            data: data.conversion_rates,
            timestamp: now,
        };
        return data.conversion_rates;

    } catch (error) {
        console.error("Error fetching rates:", error);
        // If fetching fails, clear cache and re-throw
        ratesCache.data = null; 
        throw error;
    }
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

    // Amount is converted to USD (base currency) first, then to the target currency
    const amountInUsd = amount / fromRate;
    const convertedAmount = amountInUsd * toRate;

    return convertedAmount;
};