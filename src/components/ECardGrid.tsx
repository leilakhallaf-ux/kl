import { useEffect, useState } from 'react';
import type { ECard } from '../lib/database.types';
import ECardCard from './ECardCard';

interface ECardGridProps {
  ecards: ECard[];
  loading?: boolean;
}

export default function ECardGrid({ ecards, loading = false }: ECardGridProps) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColumnEcards = (columnIndex: number) => {
    return ecards.filter((_, index) => index % columns === columnIndex);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-800 aspect-[16/11] rounded-sm mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-3/4 mb-1"></div>
            <div className="h-2 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (ecards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Aucune e-card trouvée</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(columns)].map((_, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {getColumnEcards(columnIndex).map((ecard) => (
            <ECardCard key={ecard.id} ecard={ecard} />
          ))}
        </div>
      ))}
    </div>
  );
}
