import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ECardGrid from '../components/ECardGrid';
import { getECards } from '../lib/ecard-api';
import type { ECard } from '../lib/database.types';

export default function Home() {
  const [latestECards, setLatestECards] = useState<ECard[]>([]);
  const [bestOfECards, setBestOfECards] = useState<ECard[]>([]);
  const [vintageECards, setVintageECards] = useState<ECard[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latest, bestOf, vintage] = await Promise.all([
          getECards({ limit: 6, orderBy: 'created_at', orderDirection: 'desc' }),
          getECards({ is_featured: true, limit: 6 }),
          getECards({ vintage: currentYear, limit: 6 }),
        ]);

        setLatestECards(latest);
        setBestOfECards(bestOf);
        setVintageECards(vintage);
      } catch (error) {
        console.error('Error fetching e-cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentYear]);

  return (
    <div className="min-h-screen bg-rich-black">
      <Header currentPath="/" />

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
              Le Pinterest de la{' '}
              <span className="gold-text-gradient italic">
                carte de vœux électronique
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 font-light mb-8 leading-relaxed">
              La plateforme inspirationnelle qui donne une seconde vie aux e-cards
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="/s-inspirer"
                className="px-8 py-4 text-lg border border-gold text-gold hover:bg-gold/10 transition-all duration-300"
              >
                Explorer les archives
              </a>
              <a
                href="/explorer"
                className="px-8 py-4 bg-transparent border border-gold/50 text-white hover:border-gold hover:text-gold transition-all duration-300"
              >
                Rechercher
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold" />
                <span>Archives depuis 2007</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>CAC40, ETI, Institutions</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold" />
                <span>18 ans d'expertise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              Derniers ajouts
            </h2>
            <a
              href="/s-inspirer"
              className="text-gold hover:text-gold-light text-sm flex items-center gap-2 transition-colors duration-300"
            >
              Voir tout
              <span>→</span>
            </a>
          </div>
          <ECardGrid ecards={latestECards} loading={loading} />
        </div>
      </section>

      {vintageECards.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
                Millésime <span className="text-gold italic">{currentYear}</span>
              </h2>
              <a
                href={`/millesime/${currentYear}`}
                className="text-gold hover:text-gold-light text-sm flex items-center gap-2 transition-colors duration-300"
              >
                Voir tout
                <span>→</span>
              </a>
            </div>
            <ECardGrid ecards={vintageECards} loading={loading} />
          </div>
        </section>
      )}

      {bestOfECards.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
                <span className="text-gold italic">Best-of</span> - Les plus appréciées
              </h2>
              <a
                href="/best-of"
                className="text-gold hover:text-gold-light text-sm flex items-center gap-2 transition-colors duration-300"
              >
                Voir tout
                <span>→</span>
              </a>
            </div>
            <ECardGrid ecards={bestOfECards} loading={loading} />
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gold/5 to-transparent border border-gold/30 p-12">
          <h3 className="font-serif text-3xl font-semibold text-white mb-4">
            Fondé par <span className="text-gold italic">Leïla Khallaf</span>
          </h3>
          <p className="text-white/70 leading-relaxed mb-6">
            Avec 18 ans d'expérience dans la création et la diffusion d'e-cards corporate,
            Leïla Khallaf a construit les plateformes Manufactur-e et WishesFactor-e,
            référence pour les annonceurs majeurs.
          </p>
          <p className="text-white/50 text-sm">
            Cette archive valorise l'histoire et l'évolution des e-cards depuis 2007
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
