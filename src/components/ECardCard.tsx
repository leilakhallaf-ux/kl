import { Heart, Zap, Eye, Star, Video } from 'lucide-react';
import type { ECard } from '../lib/database.types';

interface ECardCardProps {
  ecard: ECard;
}

export default function ECardCard({ ecard }: ECardCardProps) {
  // Discriminant unique : video_url présent = Flash (pour l'instant, toutes les vidéos sont Flash)
  // La distinction Flash vs Vidéo viendra avec le radio button admin
  const isVideo = !!ecard.video_url;

  return (
    <a
      href={`/ecard/${ecard.id}`}
      className="group block bg-white overflow-hidden border border-[#3D2B1F]/10 hover:border-gold/50 transition-all duration-500 shadow-sm"
    >
      <div className="relative aspect-[16/11] bg-gray-100 overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 p-8">
            <h3 className="font-serif text-xl text-[#3D2B1F]/80 text-center">
              {ecard.advertiser_name}
            </h3>
          </div>
        )}

        {isVideo && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-gold/90 flex items-center gap-[2px]">
            <Video className="w-4 h-4 text-rich-black" />
            <Zap className="w-3.5 h-3.5 text-rich-black" />
            <span className="text-xs font-bold text-rich-black ml-[3px]">Flash</span>
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

      <div className="p-2 bg-white">
        <h3 className="font-serif text-sm text-[#3D2B1F] mb-1 line-clamp-1 group-hover:text-gold transition-colors duration-300">
          {ecard.advertiser_name}
        </h3>

        <div className="flex items-center justify-between text-xs text-[#3D2B1F]/60">
          <span className="capitalize font-light text-[10px]">{ecard.card_type}</span>
          <span className="text-gold font-serif font-medium text-[10px]">{ecard.vintage}</span>
        </div>
      </div>
    </a>
  );
}
