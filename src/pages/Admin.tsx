import { useEffect, useState } from 'react';
import { Crown, LogOut, Plus, BarChart3, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { signIn, signOut, getCurrentUser } from '../lib/auth';
import { getAllECardsAdmin, createECard, updateECard, deleteECard } from '../lib/ecard-api';
import type { ECard } from '../lib/database.types';

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
    <div className="min-h-screen bg-brand-black">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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
                  <label className="block text-sm text-gray-400 mb-2">Image de preview (URL)</label>
                  <input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    placeholder="https://example.com/image.jpg"
                  />
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
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Logo URL *</label>
                  <input
                    type="url"
                    value={formData.advertiser_logo_url}
                    onChange={(e) => setFormData({ ...formData, advertiser_logo_url: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white"
                    required
                  />
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
    </div>
  );
}
