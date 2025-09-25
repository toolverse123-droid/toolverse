import React from 'react';
import { useLocalization } from '../i18n';
import { Tool } from '../types';

interface ToolDescriptionProps {
  tool: Tool;
}

const ToolDescription: React.FC<ToolDescriptionProps> = ({ tool }) => {
  const { t } = useLocalization();
  
  // Converts PascalCase enum member to camelCase key, e.g., 'ImageGenerator' -> 'imageGenerator'
  const translationKey = tool.charAt(0).toLowerCase() + tool.slice(1);
  const descriptionHtml = t(`${translationKey}.description`);

  // Avoid rendering an empty div if the description is missing from i18n
  if (!descriptionHtml || descriptionHtml === `${translationKey}.description`) {
    return null;
  }

  return (
    <div className="mt-10 pt-6 border-t border-gray-700">
       <div
        className="prose prose-sm sm:prose-base max-w-none prose-invert prose-headings:text-cyan-400 prose-a:text-cyan-400 prose-strong:text-gray-100 prose-ul:list-disc prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
    </div>
  );
};

export default ToolDescription;
