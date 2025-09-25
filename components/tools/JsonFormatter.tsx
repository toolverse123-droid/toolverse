
import React, { useState, useCallback } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const JsonFormatter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'idle'; message: string }>({ type: 'idle', message: '' });
  const { t } = useLocalization();

  const handleFormat = useCallback(() => {
    try {
      if (!jsonInput.trim()) {
        setStatus({ type: 'error', message: t('jsonFormatter.errorInput') });
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setStatus({ type: 'success', message: t('jsonFormatter.success') });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : t('jsonFormatter.invalidJson');
      setStatus({ type: 'error', message: `${t('jsonFormatter.error')}${errorMessage}` });
    }
  }, [jsonInput, t]);

  const handleClear = () => {
    setJsonInput('');
    setStatus({type: 'idle', message: ''});
  }

  const statusColor = {
    success: 'text-green-400 bg-green-900/50 border-green-700',
    error: 'text-red-400 bg-red-900/50 border-red-700',
    idle: 'text-gray-400 bg-gray-900/50 border-gray-700',
  }

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="json-input" className="block text-sm font-medium text-gray-300 mb-2">
              {t('jsonFormatter.label')}
            </label>
            <textarea
              id="json-input"
              rows={15}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 font-mono text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder={t('jsonFormatter.placeholder')}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleFormat}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {t('jsonFormatter.formatButton')}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {t('jsonFormatter.clearButton')}
            </button>
          </div>
          
          {status.message && (
            <div className={`p-3 rounded-md border text-sm ${statusColor[status.type]}`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
      <ToolDescription tool={Tool.JsonFormatter} />
    </>
  );
};

export default JsonFormatter;
