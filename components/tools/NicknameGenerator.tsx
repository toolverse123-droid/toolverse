import React, { useState, useCallback, useEffect } from 'react';
import { useLocalization } from '../../i18n';
import ToolDescription from '../ToolDescription';
import { Tool } from '../../types';

const adjectives: Record<string, string[]> = {
    en: ['Quick', 'Happy', 'Silent', 'Red', 'Cosmic', 'Ancient', 'Mystic', 'Brave', 'Gentle', 'Shadow'],
    ko: ['빠른', '행복한', '조용한', '붉은', '우주적', '고대의', '신비한', '용감한', '온화한', '그림자'],
    zh: ['快速的', '快乐的', '安静的', '红色的', '宇宙的', '古老的', '神秘的', '勇敢的', '温柔的', '影子'],
    ar: ['سريع', 'سعيد', 'صامت', 'أحمر', 'كوني', 'قديم', 'غامض', 'شجاع', 'لطيف', 'ظل'],
};

const nouns: Record<string, string[]> = {
    en: ['Fox', 'Panda', 'Tiger', 'Eagle', 'Robot', 'Wizard', 'Ninja', 'Star', 'River', 'Moon'],
    ko: ['여우', '판다', '호랑이', '독수리', '로봇', '마법사', '닌자', '별', '강', '달'],
    zh: ['狐狸', '熊猫', '老虎', '鹰', '机器人', '巫师', '忍者', '星星', '河流', '月亮'],
    ar: ['ثعلب', 'باندا', 'نمر', 'نسر', 'روبوت', 'ساحر', 'نينجا', 'نجم', 'نهر', 'قمر'],
};

const NicknameGenerator: React.FC = () => {
    const { t, language } = useLocalization();
    const [nickname, setNickname] = useState('');
    const [copied, setCopied] = useState(false);

    const generateNickname = useCallback(() => {
        const lang = language as keyof typeof adjectives;
        const adjList = adjectives[lang] || adjectives.en;
        const nounList = nouns[lang] || nouns.en;

        const randomAdj = adjList[Math.floor(Math.random() * adjList.length)];
        const randomNoun = nounList[Math.floor(Math.random() * nounList.length)];

        setNickname(`${randomAdj} ${randomNoun}`);
        setCopied(false);
    }, [language]);

    useEffect(() => {
        generateNickname();
    }, [generateNickname]);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(nickname);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-auto">
                <div className="flex flex-col gap-6 text-center">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                        <p className="text-3xl font-bold text-cyan-400">{nickname}</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={generateNickname}
                            className="flex-grow bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                        >
                            {t('nicknameGenerator.generateButton')}
                        </button>
                        <button
                            onClick={handleCopy}
                            className="w-28 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                        >
                            {copied ? t('nicknameGenerator.copied') : t('nicknameGenerator.copyButton')}
                        </button>
                    </div>
                </div>
            </div>
            <ToolDescription tool={Tool.NicknameGenerator} />
        </>
    );
};

export default NicknameGenerator;