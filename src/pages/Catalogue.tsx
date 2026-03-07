import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterBar, { type Filters } from '../components/FilterBar';
import ECardGrid from '../components/ECardGrid';
import { getECards, getFilterOptions, getVintages } from '../lib/ecard-api';
import type { ECard } from '../lib/database.types';

export default function Catalogue() {
  const [ecards, setEcards] = useState<ECard[]>([]);
  const [filteredEcards, setFilteredEcards] = useState<ECard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    advertisers: [],
    vintages: [],
    agencies: [],
    distributors: [],
    technologies: [],
    topics: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ecardsData, options, vintages] = await Promise.all([
          getECards({ orderBy: 'created_at', orderDirection: 'desc' }),
          getFilterOptions(),
          getVintages(),
        ]);

        setEcards(ecardsData);
        setFilteredEcards(ecardsData);
        setFilterOptions({
          advertisers: options.advertisers,
          vintages: vintages,
          agencies: options.agencies,
          distributors: options.distributors,
          technologies: options.technologies,
          topics: options.topics,
        });
      } catch (error) {
        console.error('Error fetching e-cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters: Filters) => {
    let filtered = [...ecards];

    if (filters.advertisers.length > 0) {
      filtered = filtered.filter((ecard) =>
        filters.advertisers.some((adv) =>
          ecard.advertiser_name.toLowerCase().includes(adv.toLowerCase())
        )
      );
    }

    if (filters.vintages.length > 0) {
      filtered = filtered.filter((ecard) =>
        filters.vintages.includes(ecard.vintage)
      );
    }

    if (filters.agencies.length > 0) {
      filtered = filtered.filter((ecard) =>
        ecard.agency &&
        filters.agencies.some((agency) =>
          ecard.agency!.toLowerCase().includes(agency.toLowerCase())
        )
      );
    }

    if (filters.distributors.length > 0) {
      filtered = filtered.filter((ecard) =>
        ecard.distributor &&
        filters.distributors.some((dist) =>
          ecard.distributor!.toLowerCase().includes(dist.toLowerCase())
        )
      );
    }

    if (filters.technologies.length > 0) {
      filtered = filtered.filter((ecard) =>
        ecard.technology &&
        filters.technologies.some((tech) =>
          ecard.technology!.toLowerCase().includes(tech.toLowerCase())
        )
      );
    }

    if (filters.topics.length > 0) {
      filtered = filtered.filter((ecard) =>
        ecard.topic &&
        filters.topics.some((topic) =>
          ecard.topic!.toLowerCase().includes(topic.toLowerCase())
        )
      );
    }

    setFilteredEcards(filtered);
  };

  return (
    <div className="h-screen flex flex-col bg-brand-black overflow-hidden">
      <Header currentPath="/s-inspirer" />

      <FilterBar onFilterChange={handleFilterChange} options={filterOptions} />

      <main className="flex-1 overflow-y-auto">
        <section className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            S'inspirer
          </h1>
          <p className="text-gray-400 text-lg">
            Explorez {filteredEcards.length} e-card{filteredEcards.length > 1 ? 's' : ''} dans notre collection
          </p>
        </div>

        <ECardGrid ecards={filteredEcards} loading={loading} />

        {!loading && filteredEcards.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              Aucune e-card ne correspond à vos critères de recherche
            </p>
            <p className="text-gray-500">
              Essayez de modifier ou supprimer certains filtres
            </p>
          </div>
        )}
      </section>

        <Footer />
      </main>
    </div>
  );
}
