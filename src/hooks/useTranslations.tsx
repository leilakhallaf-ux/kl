import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { translationsApi, Language } from '../lib/translations';

interface TranslationContextType {
  currentLanguage: string;
  languages: Language[];
  translations: Record<string, string>;
  t: (key: string, params?: Record<string, any>, fallback?: string) => string;
  setLanguage: (code: string) => void;
  refreshTranslations: () => Promise<void>;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  console.log('🎬 [DEBUG] TranslationProvider mounted!');
  const [currentLanguage, setCurrentLanguage] = useState<string>('fr');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguages();
  }, []);

  useEffect(() => {
    if (currentLanguage) {
      loadTranslations(currentLanguage);
    }
  }, [currentLanguage]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && currentLanguage) {
        console.log('🔄 Page became visible, refreshing translations...');
        loadTranslations(currentLanguage, true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [currentLanguage]);

  const loadLanguages = async () => {
    try {
      console.log('🚀 [DEBUG] Starting to load languages...');
      const langs = await translationsApi.getLanguages();
      console.log('✅ [DEBUG] Languages loaded:', langs);
      setLanguages(langs);

      const savedLang = localStorage.getItem('language');
      console.log('💾 [DEBUG] Saved language from localStorage:', savedLang);

      if (savedLang && langs.some(l => l.code === savedLang)) {
        console.log('✅ [DEBUG] Using saved language:', savedLang);
        setCurrentLanguage(savedLang);
      } else {
        const defaultLang = langs.find(l => l.is_default);
        console.log('🌍 [DEBUG] Using default language:', defaultLang);
        if (defaultLang) {
          setCurrentLanguage(defaultLang.code);
        }
      }
    } catch (error) {
      console.error('❌ [DEBUG] Failed to load languages:', error);
    }
  };

  const loadTranslations = async (languageCode: string, skipCache: boolean = false) => {
    try {
      setIsLoading(true);
      console.log('🌍 Loading translations for language:', languageCode, skipCache ? '(FORCE REFRESH)' : '');
      const trans = await translationsApi.getTranslations(languageCode, skipCache);
      console.log('✅ Loaded translations count:', Object.keys(trans).length);
      console.log('📝 First 5 translations:', Object.entries(trans).slice(0, 5));
      console.log('🔑 All keys:', Object.keys(trans));
      setTranslations(trans);
    } catch (error) {
      console.error('❌ Failed to load translations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTranslations = async () => {
    console.log('🔄 Force refreshing translations...');
    await loadTranslations(currentLanguage, true);
  };

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('language', code);
    loadTranslations(code, true);
  };

  const t = (key: string, params?: Record<string, any>, fallback?: string): string => {
    let value = translations[key] || fallback || key;

    if (params) {
      Object.keys(params).forEach((paramKey) => {
        const regex = new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g');
        value = value.replace(regex, String(params[paramKey]));
      });

      value = value.replace(/{{[^}]+}}/g, (match) => {
        try {
          const expression = match.slice(2, -2).trim();
          const func = new Function(...Object.keys(params), `return ${expression}`);
          return String(func(...Object.values(params)));
        } catch {
          return match;
        }
      });
    }

    return value;
  };

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        languages,
        translations,
        t,
        setLanguage,
        refreshTranslations,
        isLoading,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within TranslationProvider');
  }
  return context;
}
