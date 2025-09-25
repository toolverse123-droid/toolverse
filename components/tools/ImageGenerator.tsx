
import React, { useState, useCallback } from 'react';
import { generateImage } from '../../services/geminiService';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocalization();

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError(t('imageGenerator.errorInput'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const result = await generateImage(prompt);
      setImageUrl(result);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Gemini API key is not configured")) {
        setError(t('imageGenerator.apiKeyMissing'));
      } else {
        setError(t('imageGenerator.error'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, t]);

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-2">
              {t('imageGenerator.label')}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="prompt-input"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-grow bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                placeholder={t('imageGenerator.placeholder')}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleGenerate()}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('imageGenerator.loading')}
                  </>
                ) : (
                  t('imageGenerator.button')
                )}
              </button>
            </div>
          </div>
          
          {error && <div className="bg-red-900 border border-red-700 text-red-200 p-3 rounded-md">{error}</div>}

          <div className="w-full aspect-square bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            {isLoading && <div className="text-gray-400">{t('imageGenerator.imagePlaceholder')}</div>}
            {imageUrl && !isLoading && <img src={imageUrl} alt={prompt} className="w-full h-full object-contain" />}
            {!imageUrl && !isLoading && <div className="text-gray-500 text-center p-4">{t('imageGenerator.imageDefault')}</div>}
          </div>
        </div>
      </div>
      <ToolDescription tool={Tool.ImageGenerator} />
    </>
  );
};

export default ImageGenerator;
