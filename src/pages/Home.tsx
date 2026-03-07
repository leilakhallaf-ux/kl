import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ECardGrid from '../components/ECardGrid';
import { getECards, getBestOfECards } from '../lib/ecard-api';
import type { ECard } from '../lib/database.types';
import { useTranslations } from '../hooks/useTranslations';

export default function Home() {
  const [latestECards, setLatestECards] = useState<ECard[]>([]);
  const [bestOfECards, setBestOfECards] = useState<ECard[]>([]);
  const [vintageECards, setVintageECards] = useState<ECard[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const { t, currentLanguage, translations } = useTranslations();

  useEffect(() => {
    console.log('🔥 Home - Current Language:', currentLanguage);
    console.log('🔥 Home - Translations loaded:', Object.keys(translations).length);
    console.log('🔥 Home - Sample translation:', t('home.hero.title', 'FALLBACK'));
  }, [currentLanguage, translations, t]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latest, bestOf, vintage] = await Promise.all([
          getECards({ limit: 6, orderBy: 'created_at', orderDirection: 'desc' }),
          getBestOfECards(3),
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
    <div className="h-screen flex flex-col bg-rich-black overflow-hidden">
      <Header currentPath="/" />

      <main className="flex-1 overflow-y-auto">
        <section className="relative overflow-hidden pt-4 pb-2 md:pt-12 md:pb-3">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {t('home.hero.title', 'La plateforme inspirationnelle qui donne')} <br className="hidden lg:block" /><span className="gold-text-gradient italic font-extrabold tracking-wide">{t('home.hero.subtitle', 'une seconde vie aux e-cards')}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-white/70 font-light mb-2 md:mb-3 leading-relaxed">
              {t('home.hero.tagline', 'Le Pinterest de la carte de vœux électronique')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-white/50 mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                <span>{t('home.hero.feature1', 'Archives depuis 2008')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                <span>{t('home.hero.feature2', 'e-Voeux institutionnels')}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                <span>{t('home.hero.feature3', 'Suivre les évolutions')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-2 md:py-4">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="font-serif text-xl md:text-3xl font-semibold text-white">
              {t('home.latest.title', 'Dernières')} <span className="text-gold italic font-bold">{t('home.latest.gems', 'pépites')}</span> {t('home.latest.added', 'ajoutées')}
            </h2>
            <a
              href="/s-inspirer"
              className="text-gold hover:text-gold-light text-xs md:text-sm flex items-center gap-1 md:gap-2 transition-colors duration-300 whitespace-nowrap"
            >
              {t('home.latest.viewAll', 'Tout')}
              <span>→</span>
            </a>
          </div>
          <ECardGrid ecards={latestECards} loading={loading} />
        </div>
      </section>

      {vintageECards.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-0 md:py-2">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="font-serif text-xl md:text-3xl font-semibold text-white">
                {t('home.vintage.title', 'Millésime')} <span className="text-gold italic font-bold">{currentYear}</span>
              </h2>
              <a
                href={`/millesime/${currentYear}`}
                className="text-gold hover:text-gold-light text-xs md:text-sm flex items-center gap-1 md:gap-2 transition-colors duration-300 whitespace-nowrap"
              >
                {t('home.vintage.viewAll', 'Tout')}
                <span>→</span>
              </a>
            </div>
            <ECardGrid ecards={vintageECards} loading={loading} />
          </div>
        </section>
      )}

      {bestOfECards.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-0 md:py-2">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="font-serif text-xl md:text-3xl font-semibold text-white">
                <span className="text-gold italic font-bold">{t('home.bestof.title', 'Best-of')}</span> - {t('home.bestof.subtitle', 'Les 3 plus appréciées')}
              </h2>
              <a
                href="/best-of"
                className="text-gold hover:text-gold-light text-xs md:text-sm flex items-center gap-1 md:gap-2 transition-colors duration-300 whitespace-nowrap"
              >
                {t('home.bestof.viewAll', 'Tout le classement')}
                <span>→</span>
              </a>
            </div>
            <ECardGrid ecards={bestOfECards} loading={loading} />
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 py-2 md:py-3 mb-4 md:mb-6">
        <div className="text-center bg-gradient-to-br from-gold/5 to-transparent border border-gold/30 p-4 md:p-6">
          <h3 className="font-serif text-xl md:text-3xl font-semibold text-white mb-3 md:mb-4">
            {t('home.founder.title', 'Fondé par')} <span className="text-gold italic">{t('home.founder.name', 'WishesFactor-e by Manufactur-e')}</span>
          </h3>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4 md:mb-6">
            {t('home.founder.bio', 'Avec 18 ans d\'expérience dans la création et la diffusion d\'e-cards corporate, Leïla Khallaf a construit les plateformes Manufactur-e et WishesFactor-e, référence pour les annonceurs majeurs.')}
          </p>
          <p className="text-white/50 text-xs md:text-sm">
            {t('home.founder.mission', 'Cette archive valorise l\'histoire et l\'évolution des e-cards depuis 2008')}
          </p>
        </div>
      </section>

      <Footer />
      </main>
    </div>
  );
}
