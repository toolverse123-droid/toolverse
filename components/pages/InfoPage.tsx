import React from 'react';
import { useLocalization } from '../../i18n';

interface InfoPageProps {
  translationKey: 'about' | 'termsofservice' | 'privacypolicy';
}

const InfoPage: React.FC<InfoPageProps> = ({ translationKey }) => {
  const { t } = useLocalization();

  // Tailwind's JIT compiler might not see dynamic classes,
  // so we ensure prose styles are available by including them in a known file or config.
  // The classes used in the i18n strings (like text-cyan-400) should be recognized.
  const content = t(`${translationKey}.content`);

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl text-gray-300">
      <div
        className="prose prose-sm sm:prose-base max-w-none prose-invert prose-headings:text-cyan-400 prose-a:text-cyan-400 prose-strong:text-gray-100"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default InfoPage;
