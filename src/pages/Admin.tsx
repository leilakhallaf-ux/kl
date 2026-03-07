import { useEffect, useState } from 'react';
import { Crown, LogOut, Plus, BarChart3, CreditCard as Edit2, Trash2, Save, X, Upload, Link as LinkIcon } from 'lucide-react';
import { signIn, signOut, getCurrentUser } from '../lib/auth';
import { getAllECardsAdmin, createECard, updateECard, deleteECard } from '../lib/ecard-api';
import { supabase } from '../lib/supabase';
import type { ECard } from '../lib/database.types';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalEcards: 0,
    totalViews: 0,
    totalLikes: 0,
    avgScore: 0,
  });
  const [ecards, setEcards] = useState<ECard[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEcard, setEditingEcard] = useState<ECard | null>(null);
  const [formData, setFormData] = useState({
    thumbnail_url: '',
    advertiser_name: '',
    advertiser_logo_url: '',
    business_sector: '',
    vintage: new Date().getFullYear(),
    language: 'FR',
    card_type: '',
    topic: '',
    technology: '',
    url: '',
    description: '',
    tags: '',
  });
  const [useUrlInput, setUseUrlInput] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [useLogoUrlInput, setUseLogoUrlInput] = useState(false);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        await fetchStats();
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getAllECardsAdmin();
      setEcards(data);

      const totalViews = data.reduce((sum, card) => sum + card.views, 0);
      const totalLikes = data.reduce((sum, card) => sum + card.likes, 0);
      const avgScore = data.reduce((sum, card) => sum + card.score_avg, 0) / (data.length || 1);

      setStats({
        totalEcards: data.length,
        totalViews,
        totalLikes,
        avgScore: avgScore || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

      const ecardData = {
        thumbnail_url: formData.thumbnail_url || null,
        advertiser_name: formData.advertiser_name,
        advertiser_logo_url: formData.advertiser_logo_url,
        business_sector: formData.business_sector || null,
        vintage: formData.vintage,
        language: formData.language,
        card_type: formData.card_type,
        topic: formData.topic || null,
        technology: formData.technology || null,
        url: formData.url || null,
        description: formData.description || null,
        tags,
        submitted_by: 'Leïla Khallaf',
        submitted_capacity: 'Founder',
      };

      if (editingEcard) {
        await updateECard(editingEcard.id, ecardData);
      } else {
        await createECard(ecardData as any);
      }

      setShowForm(false);
      setEditingEcard(null);
      resetForm();
      await fetchStats();
    } catch (error) {
      console.error('Error saving e-card:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (ecard: ECard) => {
    setEditingEcard(ecard);
    setFormData({
      thumbnail_url: ecard.thumbnail_url || '',
      advertiser_name: ecard.advertiser_name,
      advertiser_logo_url: ecard.advertiser_logo_url,
      business_sector: ecard.business_sector || '',
      vintage: ecard.vintage,
      language: ecard.language,
      card_type: ecard.card_type,
      topic: ecard.topic || '',
      technology: ecard.technology || '',
      url: ecard.url || '',
      description: ecard.description || '',
      tags: ecard.tags.join(', '),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette e-card ?')) return;

    try {
      await deleteECard(id);
      await fetchStats();
    } catch (error) {
      console.error('Error deleting e-card:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      thumbnail_url: '',
      advertiser_name: '',
      advertiser_logo_url: '',
      business_sector: '',
      vintage: new Date().getFullYear(),
      language: 'FR',
      card_type: '',
      topic: '',
      technology: '',
      url: '',
      description: '',
      tags: '',
    });
    setUseUrlInput(false);
    setUploadProgress(0);
    setIsUploading(false);
    setUseLogoUrlInput(false);
    setLogoUploadProgress(0);
    setIsUploadingLogo(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5 MB');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(data.path);

      setFormData({ ...formData, thumbnail_url: urlData.publicUrl });
      setUploadProgress(100);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert('Erreur lors de l\'upload : ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5 MB');
      return;
    }

    try {
      setIsUploadingLogo(true);
      setLogoUploadProgress(0);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { data, error } = await supabase.storage
        .from('logos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from('logos')
        .getPublicUrl(data.path);

      setFormData({ ...formData, advertiser_logo_url: urlData.publicUrl });
      setLogoUploadProgress(100);
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      alert('Erreur lors de l\'upload : ' + error.message);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      await checkUser();
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="animate-pulse text-brand-gold">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-sm mb-4">
              <Crown className="w-10 h-10 text-brand-black" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Administration
            </h1>
            <p className="text-gray-400">E-Cards Corporate</p>
          </div>

          <div className="bg-gray-900 rounded-sm p-8 border border-gray-800">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-sm text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-gold py-3"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-brand-black overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-sm flex items-center justify-center">
              <Crown className="w-6 h-6 text-brand-black" />
            </div>
            <div>
              <h1 className="text-xl font-display font-semibold text-brand-gold">
                Administration
              </h1>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 text-gray-300 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-all"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-sm p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Total E-Cards</h3>
              <BarChart3 className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="text-3xl font-display font-bold text-white">
              {stats.totalEcards}
            </p>
          </div>

          <div className="bg-gray-900 rounded-sm p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Total Vues</h3>
              <BarChart3 className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="text-3xl font-display font-bold text-white">
              {stats.totalViews.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 rounded-sm p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Total Likes</h3>
              <BarChart3 className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="text-3xl font-display font-bold text-white">
              {stats.totalLikes.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 rounded-sm p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Note Moyenne</h3>
              <BarChart3 className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="text-3xl font-display font-bold text-white">
              {stats.avgScore.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-sm p-6 border border-gray-800 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold text-white">
              Gestion des E-Cards
            </h2>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingEcard(null);
                resetForm();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-black rounded-sm hover:bg-brand-gold/90 transition-all"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Annuler' : 'Nouvelle E-Card'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleCreateOrUpdate} className="bg-gray-800 p-6 rounded-sm mb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm text-gray-400">Image de preview</label>
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setUseUrlInput(false)}
                        className={`px-3 py-1 rounded-sm transition-all ${
                          !useUrlInput
                            ? 'bg-brand-gold text-brand-black'
                            : 'bg-gray-700 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Upload className="w-3 h-3 inline mr-1" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setUseUrlInput(true)}
                        className={`px-3 py-1 rounded-sm transition-all ${
                          useUrlInput
                            ? 'bg-brand-gold text-brand-black'
                            : 'bg-gray-700 text-gray-400 hover:text-white'
                        }`}
                      >
                        <LinkIcon className="w-3 h-3 inline mr-1" />
                        URL externe
                      </button>
                    </div>
                  </div>

                  {useUrlInput ? (
                    <input
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className={`flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-700 border-2 border-dashed border-gray-600 rounded-sm text-gray-300 cursor-pointer hover:border-brand-gold hover:text-brand-gold transition-all ${
                          isUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Upload className="w-5 h-5" />
                        {isUploading ? 'Upload en cours...' : 'Choisir une image'}
                      </label>

                      {isUploading && uploadProgress > 0 && (
                        <div className="mt-2 bg-gray-700 rounded-sm overflow-hidden">
                          <div
                            className="h-2 bg-brand-gold transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {formData.thumbnail_url && (
                    <div className="mt-3">
                      <img
                        src={formData.thumbnail_url}
                        alt="Preview"
                        className="w-full max-w-md h-auto rounded-sm border border-gray-600"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Annonceur *</label>
                  <input
                    type="text"
                    value={formData.advertiser_name}
                    onChange={(e) => setFormData({ ...formData, advertiser_name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm text-gray-400">Logo de l'annonceur *</label>
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setUseLogoUrlInput(false)}
                        className={`px-3 py-1 rounded-sm transition-all ${
                          !useLogoUrlInput
                            ? 'bg-brand-gold text-brand-black'
                            : 'bg-gray-700 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Upload className="w-3 h-3 inline mr-1" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setUseLogoUrlInput(true)}
                        className={`px-3 py-1 rounded-sm transition-all ${
                          useLogoUrlInput
                            ? 'bg-brand-gold text-brand-black'
                            : 'bg-gray-700 text-gray-400 hover:text-white'
                        }`}
                      >
                        <LinkIcon className="w-3 h-3 inline mr-1" />
                        URL externe
                      </button>
                    </div>
                  </div>

                  {useLogoUrlInput ? (
                    <input
                      type="url"
                      value={formData.advertiser_logo_url}
                      onChange={(e) => setFormData({ ...formData, advertiser_logo_url: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                      placeholder="https://example.com/logo.png"
                    />
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={isUploadingLogo}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className={`flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-700 border-2 border-dashed border-gray-600 rounded-sm text-gray-300 cursor-pointer hover:border-brand-gold hover:text-brand-gold transition-all ${
                          isUploadingLogo ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Upload className="w-5 h-5" />
                        {isUploadingLogo ? 'Upload en cours...' : 'Choisir un logo'}
                      </label>

                      {isUploadingLogo && logoUploadProgress > 0 && (
                        <div className="mt-2 bg-gray-700 rounded-sm overflow-hidden">
                          <div
                            className="h-2 bg-brand-gold transition-all duration-300"
                            style={{ width: `${logoUploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {formData.advertiser_logo_url && (
                    <div className="mt-3 flex items-center gap-3 p-3 bg-gray-700 rounded-sm border border-gray-600">
                      <img
                        src={formData.advertiser_logo_url}
                        alt="Logo preview"
                        className="w-16 h-16 object-contain bg-white rounded-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="text-sm text-gray-300 flex-1">Logo chargé</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, advertiser_logo_url: '' })}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-sm transition-all"
                      >
                        <X className="w-3 h-3" />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Secteur d'activité</label>
                  <input
                    type="text"
                    value={formData.business_sector}
                    onChange={(e) => setFormData({ ...formData, business_sector: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Millésime *</label>
                  <input
                    type="number"
                    value={formData.vintage}
                    onChange={(e) => setFormData({ ...formData, vintage: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Type de carte *</label>
                  <input
                    type="text"
                    value={formData.card_type}
                    onChange={(e) => setFormData({ ...formData, card_type: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    placeholder="Voeux, Anniversaire, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Langue</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                  >
                    <option value="FR">Français</option>
                    <option value="EN">Anglais</option>
                    <option value="ES">Espagnol</option>
                    <option value="DE">Allemand</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Thème</label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Technologie</label>
                  <input
                    type="text"
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    placeholder="HTML5, Flash, Video, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">URL de la e-card</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Tags (séparés par des virgules)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    placeholder="voeux, luxe, digital, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-brand-gold text-brand-black rounded-sm hover:bg-brand-gold/90 transition-all"
                >
                  <Save className="w-4 h-4" />
                  {editingEcard ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEcard(null);
                    resetForm();
                  }}
                  className="px-6 py-2 bg-gray-700 text-gray-300 rounded-sm hover:bg-gray-600 transition-all"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {ecards.map((ecard) => (
              <div key={ecard.id} className="bg-gray-800 p-4 rounded-sm flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{ecard.advertiser_name}</h3>
                  <p className="text-gray-400 text-sm">
                    {ecard.card_type} - {ecard.vintage} - {ecard.views} vues - {ecard.likes} likes
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(ecard)}
                    className="p-2 bg-gray-700 text-brand-gold rounded-sm hover:bg-gray-600 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ecard.id)}
                    className="p-2 bg-gray-700 text-red-400 rounded-sm hover:bg-gray-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {ecards.length === 0 && (
              <p className="text-gray-400 text-center py-8">Aucune e-card dans la base de données</p>
            )}
          </div>
        </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
