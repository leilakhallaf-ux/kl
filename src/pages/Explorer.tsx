import { useEffect, useState } from 'react';
import { Search, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ECardGrid from '../components/ECardGrid';
import { searchECards, getECardsByTag, getAllTags } from '../lib/ecard-api';
import type { ECard } from '../lib/database.types';

export default function Explorer() {
  const [ecards, setEcards] = useState<ECard[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTags();
        setAllTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const results = await searchECards(searchTerm);
      setEcards(results);
    } catch (error) {
      console.error('Error searching e-cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = async (tag: string) => {
    setLoading(true);
    try {
      const results = await getECardsByTag(tag);
      setEcards(results);
    } catch (error) {
      console.error('Error fetching e-cards by tag:', error);
    } finally {
      setLoading(false);
    }
  };

  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTags = selectedLetter === 'all'
    ? allTags
    : allTags.filter(tag => {
        const firstChar = tag.charAt(0).toUpperCase();
        return selectedLetter === '0-9'
          ? /\d/.test(firstChar)
          : firstChar === selectedLetter;
      });

  return (
    <div className="min-h-screen bg-brand-black">
      <Header currentPath="/explorer" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Explorer
          </h1>
          <p className="text-gray-400 text-lg">
            Recherchez par mot-clé ou explorez par tags
          </p>
        </div>

        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par annonceur, agence, thème..."
                className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-gold px-8"
            >
              Rechercher
            </button>
          </form>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Tag className="w-6 h-6 text-brand-gold" />
            <h2 className="font-display text-2xl font-semibold text-white">
              Explorer par tags
            </h2>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLetter('all')}
                className={`px-4 py-2 rounded-sm transition-all duration-300 ${
                  selectedLetter === 'all'
                    ? 'bg-brand-gold text-brand-black'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-brand-gold'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedLetter('0-9')}
                className={`px-4 py-2 rounded-sm transition-all duration-300 ${
                  selectedLetter === '0-9'
                    ? 'bg-brand-gold text-brand-black'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-brand-gold'
                }`}
              >
                0-9
              </button>
              {alphabet.slice(10).map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-10 h-10 rounded-sm transition-all duration-300 ${
                    selectedLetter === letter
                      ? 'bg-brand-gold text-brand-black'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-brand-gold'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 bg-gray-900/50 border border-gray-700 text-gray-300 rounded-sm hover:bg-brand-gold/20 hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>

          {filteredTags.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              Aucun tag ne commence par cette lettre
            </p>
          )}
        </div>

        {ecards.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-2xl font-semibold text-white mb-6">
              Résultats ({ecards.length})
            </h3>
            <ECardGrid ecards={ecards} loading={loading} />
          </div>
        )}

        {!loading && ecards.length === 0 && searchTerm && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              Aucun résultat pour "{searchTerm}"
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
