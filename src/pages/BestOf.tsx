import { useEffect, useState } from 'react';
import { Award, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ECardGrid from '../components/ECardGrid';
import { getECards } from '../lib/ecard-api';
import type { ECard } from '../lib/database.types';

export default function BestOf() {
  const [featuredEcards, setFeaturedEcards] = useState<ECard[]>([]);
  const [topLiked, setTopLiked] = useState<ECard[]>([]);
  const [topRated, setTopRated] = useState<ECard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchECards = async () => {
      try {
        const [featured, liked, rated] = await Promise.all([
          getECards({ is_featured: true, orderBy: 'created_at', orderDirection: 'desc' }),
          getECards({ orderBy: 'likes', orderDirection: 'desc', limit: 12 }),
          getECards({ orderBy: 'score_avg', orderDirection: 'desc', limit: 12 }),
        ]);

        setFeaturedEcards(featured);
        setTopLiked(liked);
        setTopRated(rated);
      } catch (error) {
        console.error('Error fetching e-cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchECards();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-brand-black overflow-hidden">
      <Header currentPath="/best-of" />

      <main className="flex-1 overflow-y-auto">
        <section className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10 text-brand-gold" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Best-of
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sélection premium des e-cards les plus remarquables. Une curation éditoriale des meilleures créations de la plateforme.
          </p>
        </div>

        {featuredEcards.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-gold"></div>
              <h2 className="font-display text-3xl font-semibold text-white">
                Sélection éditoriale
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              Nos coups de cœur, choisis pour leur créativité, innovation et impact
            </p>
            <ECardGrid ecards={featuredEcards} loading={loading} />
          </div>
        )}

        {topLiked.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-gold"></div>
              <h2 className="font-display text-3xl font-semibold text-white">
                Les plus appréciées
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              Les e-cards qui ont reçu le plus de likes de la communauté
            </p>
            <ECardGrid ecards={topLiked} loading={loading} />
          </div>
        )}

        {topRated.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-brand-gold" />
              <h2 className="font-display text-3xl font-semibold text-white">
                Les mieux notées
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              Les e-cards ayant obtenu les meilleures notes moyennes
            </p>
            <ECardGrid ecards={topRated} loading={loading} />
          </div>
        )}

        {!loading && featuredEcards.length === 0 && topLiked.length === 0 && topRated.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              Aucune e-card dans le Best-of pour le moment
            </p>
          </div>
        )}
      </section>

        <Footer />
      </main>
    </div>
  );
}
