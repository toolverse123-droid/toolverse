import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const QrCodeGenerator: React.FC = () => {
    const { t } = useLocalization();
    const [data, setData] = useState<string>('https://google.com');
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!data.trim()) {
            setError(t('qrCodeGenerator.errorInput'));
            if (canvasRef.current) {
                const context = canvasRef.current.getContext('2d');
                context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            return;
        }
        setError(null);
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, data, { width: 300, errorCorrectionLevel: 'H' }, (err) => {
                if (err) {
                    setError(err.message);
                    console.error(err);
                }
            });
        }
    }, [data, t]);

    const handleDownload = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = `qrcode.png`;
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="data-input" className="block text-sm font-medium text-gray-300 mb-2">
                            {t('qrCodeGenerator.dataLabel')}
                        </label>
                        <input
                            id="data-input"
                            type="text"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                            placeholder={t('qrCodeGenerator.dataPlaceholder')}
                        />
                    </div>

                    <div className="bg-white p-4 rounded-lg flex justify-center items-center min-h-[300px]">
                        <canvas ref={canvasRef} />
                    </div>

                    {error && <div className="bg-red-900 border border-red-700 text-red-200 p-3 rounded-md">{error}</div>}

                    <button
                        onClick={handleDownload}
                        disabled={!data.trim() || !!error}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                        {t('qrCodeGenerator.downloadButton')}
                    </button>
                </div>
            </div>
            <ToolDescription tool={Tool.QrCodeGenerator} />
        </>
    );
};

export default QrCodeGenerator;
