import { useEffect, useState } from 'react';
import { Crown, LogOut, Plus, BarChart3 } from 'lucide-react';
import { signIn, signOut, getCurrentUser } from '../lib/auth';
import { supabase } from '../lib/supabase';
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
      const { data } = await supabase
        .from('e_cards')
        .select('views, likes, score_avg');

      if (data) {
        const totalViews = data.reduce((sum, card) => sum + card.views, 0);
        const totalLikes = data.reduce((sum, card) => sum + card.likes, 0);
        const avgScore = data.reduce((sum, card) => sum + card.score_avg, 0) / data.length;

        setStats({
          totalEcards: data.length,
          totalViews,
          totalLikes,
          avgScore: avgScore || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
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

        <div className="bg-gray-900 rounded-sm p-8 border border-gray-800 text-center">
          <Plus className="w-12 h-12 text-brand-gold mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold text-white mb-4">
            Gestion des E-Cards
          </h2>
          <p className="text-gray-400 mb-6">
            Les fonctionnalités complètes d'administration (ajout, modification, suppression) seront disponibles prochainement.
          </p>
          <p className="text-sm text-gray-500">
            Dashboard avec formulaire d'ajout, gestion des tags, upload vers Supabase Storage, etc.
          </p>
        </div>

        <div className="mt-6 bg-gray-900 rounded-sm p-6 border border-gray-800">
          <h3 className="font-display text-xl font-semibold text-white mb-4">
            Actions rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/"
              className="px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-all text-center"
            >
              Voir le site
            </a>
            <a
              href="/s-inspirer"
              className="px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-all text-center"
            >
              Catalogue
            </a>
            <a
              href="/best-of"
              className="px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-all text-center"
            >
              Best-of
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
