
import React, { useState, useCallback } from 'react';
import { summarizeText } from '../../services/geminiService';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const Summarizer: React.FC = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocalization();

  const handleSummarize = useCallback(async () => {
    if (!text.trim()) {
      setError(t('summarizer.errorInput'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary('');
    try {
      const apiPrompt = t('summarizer.apiPrompt');
      const apiSystemInstruction = t('summarizer.apiSystemInstruction');
      const result = await summarizeText(text, apiPrompt, apiSystemInstruction);
      setSummary(result);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Gemini API key is not configured")) {
        setError(t('summarizer.apiKeyMissing'));
      } else {
        setError(t('summarizer.error'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [text, t]);

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">
              {t('summarizer.label')}
            </label>
            <textarea
              id="text-input"
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder={t('summarizer.placeholder')}
            />
          </div>

          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className="w-full sm:w-auto self-start bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('summarizer.loading')}
              </>
            ) : (
              t('summarizer.button')
            )}
          </button>
          
          {error && <div className="bg-red-900 border border-red-700 text-red-200 p-3 rounded-md">{error}</div>}
          
          {(summary || isLoading) && (
              <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">{t('summarizer.summaryTitle')}</h3>
              <div className="w-full bg-gray-900 border border-gray-700 rounded-md p-4 text-gray-300 min-h-[150px] whitespace-pre-wrap">
                {isLoading && !summary && <div className="text-gray-400">{t('summarizer.summaryPlaceholder')}</div>}
                {summary}
              </div>
            </div>
          )}

        </div>
      </div>
      <ToolDescription tool={Tool.Summarizer} />
    </>
  );
};

export default Summarizer;
