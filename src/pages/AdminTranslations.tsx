import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Languages, Crown, LogOut, Sparkles, Eye, EyeOff, Bug } from 'lucide-react';
import { translationsApi, TranslationKey, Language } from '../lib/translations';
import { getCurrentUser, signOut } from '../lib/auth';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminTranslations() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [allLanguages, setAllLanguages] = useState<Language[]>([]);
  const [keys, setKeys] = useState<TranslationKey[]>([]);
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [editedValues, setEditedValues] = useState<Record<string, Record<string, string>>>({});
  const [newKey, setNewKey] = useState('');
  const [newContext, setNewContext] = useState('');
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [translating, setTranslating] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser && currentUser.user_metadata?.role === 'admin') {
        setUser(currentUser);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [langs, allLangs, data] = await Promise.all([
        translationsApi.getLanguages(),
        translationsApi.getAllLanguagesForAdmin(),
        translationsApi.getAllTranslationsForAdmin(),
      ]);

      setLanguages(langs);
      setAllLanguages(allLangs);
      setKeys(data.keys);
      setTranslations(data.translations);
      setEditedValues({});
    } catch (err) {
      console.error('Failed to load translations:', err);
      setError('Échec du chargement des traductions');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleValueChange = (keyStr: string, languageCode: string, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [keyStr]: {
        ...prev[keyStr],
        [languageCode]: value,
      },
    }));
  };

  const handleSave = async (keyStr: string) => {
    const keyObj = keys.find(k => k.key === keyStr);
    if (!keyObj) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const edits = editedValues[keyStr] || {};

      for (const [langCode, value] of Object.entries(edits)) {
        await translationsApi.updateTranslation(keyObj.id, langCode, value);
      }

      setTranslations(prev => ({
        ...prev,
        [keyStr]: {
          ...prev[keyStr],
          ...edits,
        },
      }));

      setEditedValues(prev => {
        const newEdited = { ...prev };
        delete newEdited[keyStr];
        return newEdited;
      });

      setSuccess('Traduction enregistrée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save translation:', err);
      setError('Échec de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKey.trim()) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await translationsApi.createTranslationKey(newKey, newContext || undefined);
      await loadData();
      setNewKey('');
      setNewContext('');
      setShowNewKeyForm(false);
      setSuccess('Clé créée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to create key:', err);
      setError('Échec de la création de la clé');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette clé et toutes ses traductions ?')) {
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await translationsApi.deleteTranslationKey(keyId);
      await loadData();
      setSuccess('Clé supprimée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to delete key:', err);
      setError('Échec de la suppression');
    } finally {
      setSaving(false);
    }
  };

  const getCurrentValue = (keyStr: string, languageCode: string): string => {
    return editedValues[keyStr]?.[languageCode] ?? translations[keyStr]?.[languageCode] ?? '';
  };

  const hasEdits = (keyStr: string): boolean => {
    return !!editedValues[keyStr] && Object.keys(editedValues[keyStr]).length > 0;
  };

  const handleAutoTranslate = async () => {
    if (!confirm('Voulez-vous lancer la traduction automatique pour toutes les clés manquantes en anglais ?')) {
      return;
    }

    setTranslating(true);
    setError('');
    setSuccess('');
    setDebugLogs([]);
    setShowDebug(true);

    try {
      addDebugLog('Début de la traduction automatique');

      const frLang = allLanguages.find(l => l.code === 'fr');
      const enLang = allLanguages.find(l => l.code === 'en');

      if (!frLang || !enLang) {
        throw new Error('Langues française et anglaise requises');
      }

      addDebugLog(`Langues trouvées: FR (${frLang.name}), EN (${enLang.name})`);

      const missingTranslations: { key: TranslationKey; frText: string }[] = [];

      for (const key of keys) {
        const frText = translations[key.key]?.['fr'];
        const enText = translations[key.key]?.['en'];

        if (frText && !enText) {
          missingTranslations.push({ key, frText });
        }
      }

      addDebugLog(`${missingTranslations.length} traduction(s) manquante(s) détectée(s)`);

      if (missingTranslations.length === 0) {
        setSuccess('Toutes les traductions sont déjà présentes');
        setTimeout(() => setSuccess(''), 3000);
        return;
      }

      const textsToTranslate = missingTranslations.map(m => m.frText);
      const batchSize = 20;
      let translatedCount = 0;

      addDebugLog(`Traitement par lots de ${batchSize} textes`);

      for (let i = 0; i < textsToTranslate.length; i += batchSize) {
        const batch = textsToTranslate.slice(i, i + batchSize);
        const batchKeys = missingTranslations.slice(i, i + batchSize);

        addDebugLog(`Lot ${Math.floor(i / batchSize) + 1}: ${batch.length} texte(s)`);
        addDebugLog(`Appel de la fonction Edge 'auto-translate'...`);

        const { data, error: functionError } = await supabase.functions.invoke('auto-translate', {
          body: {
            sourceLang: 'fr',
            targetLang: 'en',
            texts: batch,
          },
        });

        addDebugLog(`Réponse reçue: ${JSON.stringify({ data, error: functionError }, null, 2)}`);

        if (functionError) {
          addDebugLog(`ERREUR: ${JSON.stringify(functionError, null, 2)}`);
          throw functionError;
        }

        if (data?.translations) {
          addDebugLog(`${data.translations.length} traduction(s) reçue(s)`);

          for (let j = 0; j < data.translations.length; j++) {
            const translation = data.translations[j];
            const keyObj = batchKeys[j].key;

            addDebugLog(`Sauvegarde: ${keyObj.key} = "${translation.translated}"`);
            await translationsApi.updateTranslation(keyObj.id, 'en', translation.translated);
            translatedCount++;
          }
        } else {
          addDebugLog('ATTENTION: Aucune traduction dans la réponse');
        }
      }

      addDebugLog(`Rechargement des données...`);
      await loadData();
      addDebugLog(`Terminé! ${translatedCount} traduction(s) générée(s)`);
      setSuccess(`${translatedCount} traduction(s) générée(s) avec succès`);
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      addDebugLog(`ERREUR FATALE: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
      setError(err instanceof Error ? err.message : 'Échec de la traduction automatique');
    } finally {
      setTranslating(false);
    }
  };

  const handleToggleLanguage = async (languageCode: string, currentStatus: boolean) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await translationsApi.toggleLanguageActive(languageCode, !currentStatus);
      await loadData();
      setSuccess(`Langue ${!currentStatus ? 'publiée' : 'dépubliée'} avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to toggle language:', err);
      setError('Échec de la modification du statut de la langue');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <div className="text-gold text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="text-2xl text-white mb-4">Accès refusé</h1>
          <p className="text-white/70">Vous devez être administrateur pour accéder à cette page.</p>
          <a href="/" className="text-gold hover:text-gold-light mt-4 inline-block">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-rich-black overflow-hidden">
      <Header currentPath="/admin/translations" />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Languages className="w-8 h-8 text-gold" />
              <h1 className="text-3xl font-serif text-white">Gestion des traductions</h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/admin"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Retour admin
              </a>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500 text-green-200 rounded-lg">
              {success}
            </div>
          )}

          <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-4">
            <h2 className="text-white text-lg mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Langues disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allLanguages.map((lang) => (
                <div
                  key={lang.code}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${lang.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <div className="text-white font-medium">
                        {lang.name} ({lang.code.toUpperCase()})
                      </div>
                      <div className="text-white/50 text-sm">
                        {lang.is_default && 'Langue par défaut • '}
                        {lang.is_active ? 'Publiée' : 'Non publiée'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleLanguage(lang.code, lang.is_active)}
                    disabled={saving || lang.is_default}
                    className={`flex items-center gap-2 px-3 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      lang.is_active
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
                        : 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
                    }`}
                    title={lang.is_default ? 'La langue par défaut ne peut pas être dépubliée' : ''}
                  >
                    {lang.is_active ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Dépublier
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Publier
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {showDebug && debugLogs.length > 0 && (
            <div className="mb-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-green-400">
                  <Bug className="w-5 h-5" />
                  <h3 className="font-mono font-semibold">Console de debug</h3>
                </div>
                <button
                  onClick={() => setShowDebug(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Fermer
                </button>
              </div>
              <div className="bg-black/50 rounded p-3 max-h-96 overflow-y-auto">
                {debugLogs.map((log, index) => (
                  <div key={index} className="text-sm text-green-300 font-mono mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 flex gap-4">
            {!showNewKeyForm ? (
              <>
                <button
                  onClick={() => setShowNewKeyForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-rich-black rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une clé de traduction
                </button>
                <button
                  onClick={handleAutoTranslate}
                  disabled={translating}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  {translating ? 'Traduction en cours...' : 'Auto-traduire FR → EN'}
                </button>
              </>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white text-lg mb-4">Nouvelle clé de traduction</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 mb-2">Clé (ex: home.title)</label>
                    <input
                      type="text"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-gold"
                      placeholder="section.subsection.key"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2">Contexte (optionnel)</label>
                    <input
                      type="text"
                      value={newContext}
                      onChange={(e) => setNewContext(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-gold"
                      placeholder="Description pour les traducteurs"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateKey}
                      disabled={saving || !newKey.trim()}
                      className="px-4 py-2 bg-gold hover:bg-gold-light text-rich-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Créer
                    </button>
                    <button
                      onClick={() => {
                        setShowNewKeyForm(false);
                        setNewKey('');
                        setNewContext('');
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {keys.map((key) => (
              <div key={key.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-mono text-sm mb-1">{key.key}</h3>
                    {key.context && (
                      <p className="text-white/50 text-xs">{key.context}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {hasEdits(key.key) && (
                      <button
                        onClick={() => handleSave(key.key)}
                        disabled={saving}
                        className="flex items-center gap-1 px-3 py-1 bg-gold hover:bg-gold-light text-rich-black rounded transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        Enregistrer
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      disabled={saving}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allLanguages.map((lang) => (
                    <div key={lang.code}>
                      <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
                        {lang.name} ({lang.code.toUpperCase()})
                        {lang.is_default && (
                          <span className="text-gold text-xs">(par défaut)</span>
                        )}
                        {!lang.is_active && (
                          <span className="text-red-400 text-xs">(non publiée)</span>
                        )}
                      </label>
                      <textarea
                        value={getCurrentValue(key.key, lang.code)}
                        onChange={(e) => handleValueChange(key.key, lang.code, e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded focus:outline-none focus:border-gold resize-none"
                        rows={3}
                        placeholder={`Traduction en ${lang.name.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {keys.length === 0 && (
            <div className="text-center py-12">
              <Languages className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">Aucune clé de traduction pour le moment</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
