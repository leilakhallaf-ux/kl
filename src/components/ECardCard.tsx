import { Heart, Play, Zap, Eye, Star } from 'lucide-react';
import type { ECard } from '../lib/database.types';

interface ECardCardProps {
  ecard: ECard;
}

export default function ECardCard({ ecard }: ECardCardProps) {
  const isFlash = ecard.technology?.toLowerCase().includes('flash') || ecard.swf_url;
  const isAnimated = ecard.technology?.toLowerCase().includes('html5') ||
                     ecard.technology?.toLowerCase().includes('video') ||
                     isFlash;

  return (
    <a
      href={`/ecard/${ecard.id}`}
      className="group block bg-black/30 overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-500"
    >
      <div className="relative aspect-[16/10] bg-black/50 overflow-hidden">
        {ecard.thumbnail_url ? (
          <img
            src={ecard.thumbnail_url}
            alt={ecard.advertiser_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : ecard.advertiser_logo_url ? (
          <img
            src={ecard.advertiser_logo_url}
            alt={ecard.advertiser_name}
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <h3 className="font-serif text-xl text-white/80 text-center">
              {ecard.advertiser_name}
            </h3>
          </div>
        )}

        {isAnimated && (
          <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-rich-black/80 border border-gold/50 flex items-center justify-center">
            <Play className="w-5 h-5 text-gold" fill="currentColor" />
          </div>
        )}

        {isFlash && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-gold/90 flex items-center gap-1">
            <Zap className="w-3 h-3 text-rich-black" />
            <span className="text-xs font-medium text-rich-black">Flash</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-xs text-gold">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {ecard.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {ecard.views}
            </span>
            {ecard.score_avg > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-gold" fill="currentColor" />
                {ecard.score_avg.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-black/20">
        <h3 className="font-serif text-lg text-white mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-300">
          {ecard.advertiser_name}
        </h3>

        <div className="flex items-center justify-between text-sm text-white/60">
          <span className="capitalize font-light">{ecard.card_type}</span>
          <span className="text-gold font-serif font-medium">{ecard.vintage}</span>
        </div>

        {ecard.topic && (
          <p className="text-xs text-white/40 mt-2 line-clamp-1">{ecard.topic}</p>
        )}
      </div>
    </a>
  );
}
