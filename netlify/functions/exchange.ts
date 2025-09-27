// netlify/functions/exchange.ts
export const handler = async () => {
  const apiKey = process.env.VITE_EXCHANGE_RATE_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key is not configured." }) };
  }

  const API_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates.');
    }
    const data = await response.json();
    if (data.result === 'error') {
      throw new Error(`API Error: ${data['error-type']}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.conversion_rates),
    };
  } catch (error) {
    console.error("Error fetching rates:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch rates." }),
    };
  }
};