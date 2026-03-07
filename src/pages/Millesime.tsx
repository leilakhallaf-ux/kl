import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ECardGrid from '../components/ECardGrid';
import { getECards } from '../lib/ecard-api';
import type { ECard } from '../lib/database.types';

interface MillesimeProps {
  year: number;
}

export default function Millesime({ year }: MillesimeProps) {
  const [ecards, setEcards] = useState<ECard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchECards = async () => {
      try {
        const data = await getECards({
          vintage: year,
          orderBy: 'created_at',
          orderDirection: 'desc',
        });
        setEcards(data);
      } catch (error) {
        console.error('Error fetching e-cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchECards();
  }, [year]);

  return (
    <div className="min-h-screen bg-brand-black">
      <Header />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Millésime <span className="text-brand-gold">{year}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {ecards.length} e-card{ecards.length > 1 ? 's' : ''} de l'année {year}
          </p>
        </div>

        <ECardGrid ecards={ecards} loading={loading} />

        {!loading && ecards.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              Aucune e-card pour cette année
            </p>
            <a href="/s-inspirer" className="text-brand-gold hover:underline">
              Retour au catalogue
            </a>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
