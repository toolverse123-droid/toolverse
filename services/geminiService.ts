// services/geminiService.ts
export const summarizeText = async (text: string, prompt: string, systemInstruction: string): Promise<string> => {
  const response = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, prompt, systemInstruction }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to get summary from backend.");
  }

  const data = await response.json();
  return data.result;
};

// ImageGenerator 기능은 현재 백엔드 함수에 구현되지 않았으므로 주석 처리하거나 삭제합니다.
/*
export const generateImage = async (prompt: string): Promise<string> => {
  // 이 기능도 gemini.ts 백엔드 함수에 로직을 추가해야 합니다.
};
*/