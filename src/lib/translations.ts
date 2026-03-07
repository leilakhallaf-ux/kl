import { supabase } from './supabase';

export interface Language {
  code: string;
  name: string;
  is_default: boolean;
  is_active: boolean;
}

export interface TranslationKey {
  id: string;
  key: string;
  context?: string;
}

export interface Translation {
  id: string;
  key_id: string;
  language_code: string;
  value: string;
}

export interface TranslationWithKey extends Translation {
  translation_keys: {
    key: string;
    context?: string;
  };
}

export const translationsApi = {
  async getLanguages(): Promise<Language[]> {
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .eq('is_active', true)
      .order('is_default', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getDefaultLanguage(): Promise<Language | null> {
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .eq('is_default', true)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getTranslations(languageCode: string): Promise<Record<string, string>> {
    const { data, error } = await supabase
      .from('translations')
      .select(`
        *,
        translation_keys (
          key
        )
      `)
      .eq('language_code', languageCode);

    if (error) throw error;

    const translations: Record<string, string> = {};
    (data as TranslationWithKey[])?.forEach((item) => {
      if (item.translation_keys) {
        translations[item.translation_keys.key] = item.value;
      }
    });

    return translations;
  },

  async getAllTranslationKeys(): Promise<TranslationKey[]> {
    const { data, error } = await supabase
      .from('translation_keys')
      .select('*')
      .order('key');

    if (error) throw error;
    return data || [];
  },

  async getAllTranslationsForAdmin(): Promise<{
    keys: TranslationKey[];
    translations: Record<string, Record<string, string>>;
  }> {
    const [keysResult, translationsResult] = await Promise.all([
      supabase.from('translation_keys').select('*').order('key'),
      supabase.from('translations').select(`
        *,
        translation_keys (
          key
        )
      `),
    ]);

    if (keysResult.error) throw keysResult.error;
    if (translationsResult.error) throw translationsResult.error;

    const keys = keysResult.data || [];
    const translations: Record<string, Record<string, string>> = {};

    (translationsResult.data as TranslationWithKey[])?.forEach((item) => {
      if (item.translation_keys) {
        const key = item.translation_keys.key;
        if (!translations[key]) {
          translations[key] = {};
        }
        translations[key][item.language_code] = item.value;
      }
    });

    return { keys, translations };
  },

  async createTranslationKey(key: string, context?: string): Promise<TranslationKey> {
    const { data, error } = await supabase
      .from('translation_keys')
      .insert({ key, context })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTranslation(
    keyId: string,
    languageCode: string,
    value: string
  ): Promise<void> {
    const { data: existing } = await supabase
      .from('translations')
      .select('id')
      .eq('key_id', keyId)
      .eq('language_code', languageCode)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('translations')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('translations')
        .insert({ key_id: keyId, language_code: languageCode, value });

      if (error) throw error;
    }
  },

  async deleteTranslationKey(keyId: string): Promise<void> {
    const { error } = await supabase
      .from('translation_keys')
      .delete()
      .eq('id', keyId);

    if (error) throw error;
  },
};
