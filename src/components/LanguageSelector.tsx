import { Globe } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

export default function LanguageSelector() {
  const { currentLanguage, languages, setLanguage } = useTranslations();

  if (languages.length <= 1) return null;

  return (
    <div className="relative inline-block">
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
