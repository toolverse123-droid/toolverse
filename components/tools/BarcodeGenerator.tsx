import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

type BarcodeFormat = 'CODE128' | 'EAN13' | 'UPC' | 'CODE39' | 'ITF14' | 'QR';

const BarcodeGenerator: React.FC = () => {
    const { t } = useLocalization();
    const [data, setData] = useState<string>('ToolVerse');
    const [format, setFormat] = useState<BarcodeFormat>('CODE128');
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateBarcode = () => {
        if (!data.trim()) {
            setError(t('barcodeGenerator.errorInput'));
            if(canvasRef.current){
                const context = canvasRef.current.getContext('2d');
                context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            return;
        }
        setError(null);
        if (canvasRef.current) {
            if (format === 'QR') {
                QRCode.toCanvas(canvasRef.current, data, { width: 300, errorCorrectionLevel: 'H' }, (err) => {
                    if (err) {
                        setError(err.message);
                        console.error(err);
                    }
                });
            } else {
                try {
                    JsBarcode(canvasRef.current, data, {
                        format: format,
                        displayValue: true,
                        width: 2,
                        height: 100,
                    });
                } catch (err) {
                    setError((err as Error).message);
                    console.error(err);
                }
            }
        }
    };
    
    useEffect(() => {
       generateBarcode();
    }, [data, format, t]);


    const handleDownload = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = `${data}_${format}.png`;
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    const formats: BarcodeFormat[] = ['QR', 'CODE128', 'EAN13', 'UPC', 'CODE39', 'ITF14'];

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="data-input" className="block text-sm font-medium text-gray-300 mb-2">
                            {t('barcodeGenerator.dataLabel')}
                        </label>
                        <input
                            id="data-input"
                            type="text"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                            placeholder={t('barcodeGenerator.dataPlaceholder')}
                        />
                    </div>
                    <div>
                        <label htmlFor="format-select" className="block text-sm font-medium text-gray-300 mb-2">
                            {t('barcodeGenerator.formatLabel')}
                        </label>
                        <select
                            id="format-select"
                            value={format}
                            onChange={(e) => setFormat(e.target.value as BarcodeFormat)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500"
                        >
                            {formats.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>

                    <div className="bg-white p-4 rounded-lg flex justify-center items-center min-h-[150px]">
                        <canvas ref={canvasRef} />
                    </div>

                    {error && <div className="bg-red-900 border border-red-700 text-red-200 p-3 rounded-md">{error}</div>}

                    <button
                        onClick={handleDownload}
                        disabled={!data.trim() || !!error}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                        {t('barcodeGenerator.downloadButton')}
                    </button>
                </div>
            </div>
            <ToolDescription tool={Tool.BarcodeGenerator} />
        </>
    );
};

export default BarcodeGenerator;