import { useEffect, useState } from 'react';
import { Heart, Star, Eye, Share2, ChevronDown, ChevronUp, Play, Zap, Video, Globe, Smartphone, Mail, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShareModal from '../components/ShareModal';
import { getECardById, incrementViews, likeECard, unlikeECard, hasLiked, rateECard, getUserRating, getECardVariants } from '../lib/ecard-api';
import { getLanguageName } from '../lib/utils';
import type { ECard, ECardVariant } from '../lib/database.types';

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
  const [variants, setVariants] = useState<ECardVariant[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchECard = async () => {
      try {
        const data = await getECardById(id);
        if (data) {
          setEcard({ ...data, views: data.views + 1 });
          await incrementViews(id);
          const isLiked = await hasLiked(id);
          setLiked(isLiked);
          const rating = await getUserRating(id);
          setUserRating(rating);
          const variantsData = await getECardVariants(id);
          setVariants(variantsData);

          // Mise à jour dynamique des meta tags OG pour le partage
          const ogTitle = `${data.advertiser_name} — E-Cards Corporate`;
          const ogDesc = data.description || `Découvrez la e-card de ${data.advertiser_name} sur E-Cards Corporate`;
          const ogImage = data.thumbnail_url || '';

          document.title = ogTitle;
          const setMeta = (property: string, content: string) => {
            let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
            if (el) {
              el.setAttribute('content', content);
            } else {
              el = document.createElement('meta');
              el.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
              el.setAttribute('content', content);
              document.head.appendChild(el);
            }
          };
          setMeta('og:title', ogTitle);
          setMeta('og:description', ogDesc);
          setMeta('og:image', ogImage);
          setMeta('og:url', window.location.href);
          setMeta('og:type', 'article');
          setMeta('twitter:card', 'summary_large_image');
          setMeta('twitter:title', ogTitle);
          setMeta('twitter:description', ogDesc);
          setMeta('twitter:image', ogImage);
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
    if (!ecard || liked) return;
    try {
      await likeECard(ecard.id);
      setLiked(true);
      setEcard({ ...ecard, likes: ecard.likes + 1 });
    } catch (error) {
      console.error('Error liking e-card:', error);
    }
  };
  const handleRate = async (score: number) => {
     if (!ecard || userRating) return;
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

  const handleShare = () => {
    setShowShareModal(true);
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
                      {/* Overlay Play doré */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                        <div className="w-[72px] h-[72px] rounded-full bg-gold/90 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300 shadow-lg shadow-gold/40">
                          <Play className="w-7 h-7 text-rich-black ml-1" fill="currentColor" />
                        </div>
                      </div>
                      {/* Badge Flash en bas à gauche (toutes les vidéos sont Flash pour l'instant) */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-[2px] px-3 py-1.5 bg-gold/90">
                        <Video className="w-4 h-4 text-rich-black" />
                        <Zap className="w-3.5 h-3.5 text-rich-black" />
                        <span className="text-xs font-bold text-rich-black ml-[3px]">Flash</span>
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
                  <div className="relative">
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
                    {/* Bouton Play doré centré */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[72px] h-[72px] rounded-full bg-gold/90 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300 shadow-lg shadow-gold/40">
                        <Play className="w-7 h-7 text-rich-black ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
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

              {/* === VARIANTES === */}
              {variants.length > 0 && (
                <div className="bg-gray-100 rounded-sm p-5 border border-gray-300">
                  <h3 className="text-sm font-display text-[#3D2B1F] mb-3 uppercase tracking-wider">
                    Autres versions
                  </h3>
                  <div className="space-y-2">
                    {variants.map((variant) => {
                      const icon = variant.variant_type === 'anglaise' ? <Globe className="w-4 h-4" />
                        : variant.variant_type === 'mobile' ? <Smartphone className="w-4 h-4" />
                        : variant.variant_type === 'email' ? <Mail className="w-4 h-4" />
                        : <ExternalLink className="w-4 h-4" />;
                      return (
                        <a
                          key={variant.id}
                          href={variant.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-sm hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all duration-300 group"
                        >
                          <span className="text-gray-400 group-hover:text-brand-gold transition-colors duration-300">
                            {icon}
                          </span>
                          <span className="text-sm text-[#3D2B1F] font-medium flex-1">
                            {variant.label}
                          </span>
                          <span className="text-xs text-gray-400 uppercase">{variant.language}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-gold transition-colors duration-300" />
                        </a>
                      );
                    })}
                  </div>
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

          {ecard.credits && (Array.isArray(ecard.credits) ? ecard.credits.length > 0 : Object.keys(ecard.credits).length > 0) && (
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
                  {(Array.isArray(ecard.credits)
                    ? ecard.credits
                    : Object.entries(ecard.credits).map(([role, name]) => ({ role, name: String(name) }))
                  ).map((credit, index) => (
                    <div key={index} className="flex">
                      <span className="text-gray-600 min-w-[120px]">{credit.role}:</span>
                      <span className="text-[#3D2B1F]">{credit.name}</span>
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

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={window.location.href}
        title={`${ecard.advertiser_name} — E-Cards Corporate`}
        thumbnailUrl={ecard.thumbnail_url || undefined}
        advertiserName={ecard.advertiser_name}
      />
    </div>
  );
}
