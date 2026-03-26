import { useEffect, useState } from 'react';
import { Heart, Star, Eye, Share2, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getECardById, incrementViews, likeECard, unlikeECard, hasLiked, rateECard, getUserRating } from '../lib/ecard-api';
import { getLanguageName } from '../lib/utils';
import type { ECard } from '../lib/database.types';

interface ECardDetailProps {
  id: string;
}

export default function ECardDetail({ id }: ECardDetailProps) {
  const [ecard, setEcard] = useState<ECard | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showCredits, setShowCredits] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchECard = async () => {
      try {
        const data = await getECardById(id);
        if (data) {
          setEcard(data);
          await incrementViews(id);
          const isLiked = await hasLiked(id);
          setLiked(isLiked);
          const rating = await getUserRating(id);
          setUserRating(rating);
        }
      } catch (error) {
        console.error('Error fetching e-card:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchECard();
  }, [id]);

  const handleLike = async () => {
    if (!ecard) return;
    try {
      if (liked) {
        await unlikeECard(ecard.id);
        setLiked(false);
        setEcard({ ...ecard, likes: ecard.likes - 1 });
      } else {
        await likeECard(ecard.id);
        setLiked(true);
        setEcard({ ...ecard, likes: ecard.likes + 1 });
      }
    } catch (error) {
      console.error('Error liking e-card:', error);
    }
  };

  const handleRate = async (score: number) => {
    if (!ecard) return;
    try {
      await rateECard(ecard.id, score);
      setUserRating(score);
      const newScoreCount = ecard.score_count + (userRating ? 0 : 1);
      const totalScore = ecard.score_avg * ecard.score_count - (userRating || 0) + score;
      const newScoreAvg = totalScore / newScoreCount;
      setEcard({
        ...ecard,
        score_avg: newScoreAvg,
        score_count: newScoreCount,
      });
    } catch (error) {
      console.error('Error rating e-card:', error);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: ecard?.advertiser_name,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    setTimeout(() => {
      const video = document.querySelector('.ecard-video-player') as HTMLVideoElement;
      if (video) {
        video.play().catch(console.error);
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="site-wrapper h-screen flex flex-col bg-white overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pt-20">
          <div className="container mx-auto px-4 pt-4 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-gray-200 aspect-video rounded"></div>
                <div className="lg:col-span-2 bg-gray-200 h-96 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!ecard) {
    return (
      <div className="site-wrapper h-screen flex flex-col bg-white overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pt-20">
          <div className="container mx-auto px-4 pt-4 text-center">
            <h1 className="font-display text-3xl text-[#3D2B1F] mb-4">E-card introuvable</h1>
            <a href="/s-inspirer" className="text-brand-gold hover:underline">
              Retour au catalogue
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-rich-black overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto pt-20">
        <section className="container mx-auto px-4 pt-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">

              {/* === VIDEO PLAYER (si video_url existe) === */}
              {ecard.video_url ? (
                <div className="bg-black rounded-sm overflow-hidden border border-gray-700">
                  {!isVideoPlaying ? (
                    <div
                      className="relative w-full aspect-video cursor-pointer group"
                      onClick={handlePlayVideo}
                    >
                      {ecard.thumbnail_url ? (
                        <img
                          src={ecard.thumbnail_url}
                          alt={ecard.advertiser_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          {ecard.advertiser_logo_url ? (
                            <img
                              src={ecard.advertiser_logo_url}
                              alt={ecard.advertiser_name}
                              className="max-w-sm opacity-50"
                            />
                          ) : (
                            <h2 className="font-display text-3xl font-bold text-white/30 text-center">
                              {ecard.advertiser_name}
                            </h2>
                          )}
                        </div>
                      )}
                      {/* Overlay Play */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                        <div className="w-20 h-20 rounded-full bg-brand-gold/90 flex items-center justify-center group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <Play className="w-10 h-10 text-rich-black ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Vidéo de la e-card
                      </div>
                    </div>
                  ) : (
                    <video
                      className="ecard-video-player w-full aspect-video"
                      controls
                      autoPlay
                      poster={ecard.thumbnail_url || undefined}
                    >
                      <source src={ecard.video_url} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  )}
                </div>
              ) : (
                /* === THUMBNAIL (si pas de vidéo) === */
                <a
                  href={ecard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-100 rounded-sm overflow-hidden border border-gray-300 hover:border-brand-gold/50 transition-all duration-300 cursor-pointer group"
                >
                  {ecard.thumbnail_url ? (
                    <img
                      src={ecard.thumbnail_url}
                      alt={ecard.advertiser_name}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                      {ecard.advertiser_logo_url ? (
                        <img
                          src={ecard.advertiser_logo_url}
                          alt={ecard.advertiser_name}
                          className="max-w-sm opacity-50"
                        />
                      ) : (
                        <h2 className="font-display text-3xl font-bold text-[#3D2B1F]/30 text-center">
                          {ecard.advertiser_name}
                        </h2>
                      )}
                    </div>
                  )}
                </a>
              )}

              {ecard.url && !ecard.video_url && (
                <div className="flex justify-center">
                  <a
                    href={ecard.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-gold via-gold-light to-gold text-rich-black hover:shadow-lg hover:shadow-gold/50 transform hover:scale-105 transition-all duration-300"
                  >
                    Voir la e-card originale
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-100 rounded-sm p-6 border border-gray-300">
                {ecard.advertiser_logo_url ? (
                  <img
                    src={ecard.advertiser_logo_url}
                    alt={ecard.advertiser_name}
                    className="max-h-20 mx-auto"
                  />
                ) : (
                  <h2 className="font-display text-2xl font-bold text-[#3D2B1F] text-center">
                    {ecard.advertiser_name}
                  </h2>
                )}
              </div>

              <div className="bg-gray-100 rounded-sm p-6 border border-gray-300">
                {ecard.advertiser_logo_url && (
                  <h1 className="font-display text-3xl font-bold text-[#3D2B1F] mb-4">
                    {ecard.advertiser_name}
                  </h1>
                )}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Millésime</span>
                    <span className="text-brand-gold font-semibold">{ecard.vintage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Langue</span>
                    <span className="text-[#3D2B1F]">{getLanguageName(ecard.language)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="text-[#3D2B1F] capitalize">{ecard.card_type}</span>
                  </div>
                  {ecard.technology && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technologie</span>
                      <span className="text-[#3D2B1F]">{ecard.technology}</span>
                    </div>
                  )}
                  {ecard.agency && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Agence</span>
                      <span className="text-[#3D2B1F]">{ecard.agency}</span>
                    </div>
                  )}
                  {ecard.distributor && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diffuseur</span>
                      <span className="text-[#3D2B1F]">{ecard.distributor}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-100 rounded-sm p-6 border border-gray-300">
                <div className="flex items-center justify-around text-center">
                  <button
                    onClick={handleLike}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <Heart
                      className={`w-6 h-6 transition-all duration-300 ${
                        liked
                          ? 'text-brand-gold fill-brand-gold'
                          : 'text-gray-600 group-hover:text-brand-gold'
                      }`}
                    />
                    <span className="text-sm text-gray-600">{ecard.likes}</span>
                  </button>
                  <div className="flex flex-col items-center gap-2">
                    <Eye className="w-6 h-6 text-gray-600" />
                    <span className="text-sm text-gray-600">{ecard.views}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Star className="w-6 h-6 text-brand-gold" fill="currentColor" />
                    <span className="text-sm text-gray-600">
                      {ecard.score_avg > 0 ? ecard.score_avg.toFixed(1) : '-'}
                    </span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <Share2 className="w-6 h-6 text-gray-600 group-hover:text-brand-gold transition-colors duration-300" />
                    <span className="text-xs text-gray-600">Partager</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-300">
                  <p className="text-sm text-gray-600 mb-3 text-center">Votre note</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button key={score} onClick={() => handleRate(score)} className="group">
                        <Star
                          className={`w-6 h-6 transition-all duration-300 ${
                            userRating && score <= userRating
                              ? 'text-brand-gold fill-brand-gold'
                              : 'text-gray-400 group-hover:text-brand-gold'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {ecard.tags && ecard.tags.length > 0 && (
            <div className="mt-8 bg-gray-100 rounded-sm p-6 border border-gray-300">
              <h3 className="text-lg font-display text-[#3D2B1F] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {ecard.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/explorer?tag=${tag}`}
                    className="px-3 py-1 bg-brand-gold/20 border border-brand-gold/50 text-brand-gold rounded-sm hover:bg-brand-gold/30 transition-colors duration-300 text-sm"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          )}

          {ecard.credits && Object.keys(ecard.credits).length > 0 && (
            <div className="mt-4 bg-gray-100 rounded-sm border border-gray-300">
              <button
                onClick={() => setShowCredits(!showCredits)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-200/50 transition-colors"
              >
                <h3 className="text-lg font-display text-[#3D2B1F]">Crédits</h3>
                {showCredits ? (
                  <ChevronUp className="w-5 h-5 text-brand-gold" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-brand-gold" />
                )}
              </button>
              {showCredits && (
                <div className="px-6 pb-6 space-y-2 text-sm">
                  {Object.entries(ecard.credits).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="text-gray-600 min-w-[120px]">{key}:</span>
                      <span className="text-[#3D2B1F]">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {ecard.description && (
            <div className="mt-4 bg-gray-100 rounded-sm p-6 border border-gray-300">
              <h3 className="text-lg font-display text-[#3D2B1F] mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{ecard.description}</p>
            </div>
          )}
        </section>
        <Footer />
      </main>
    </div>
  );
}
