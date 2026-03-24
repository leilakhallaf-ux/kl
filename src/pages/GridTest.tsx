import ECardGrid from '../components/ECardGrid';
import type { ECard } from '../lib/database.types';

export default function GridTest() {
  const mockECards: ECard[] = [
    {
      id: '1',
      advertiser_name: 'Nom de l\'annonceur',
      card_type: 'e-card',
      technology: 'html',
      vintage: '2024',
      topic: 'E-CARD • HTML',
      likes: 124,
      views: 1250,
      score_avg: 4.5,
      thumbnail_url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      advertiser_name: 'Nom de l\'annonceur',
      card_type: 'e-card',
      technology: 'html',
      vintage: '2024',
      topic: 'E-CARD • HTML',
      likes: 124,
      views: 1250,
      score_avg: 4.5,
      thumbnail_url: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      advertiser_name: 'Nom de l\'annonceur',
      card_type: 'e-card',
      technology: 'html',
      vintage: '2024',
      topic: 'E-CARD • HTML',
      likes: 124,
      views: 1250,
      score_avg: 4.5,
      thumbnail_url: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-gold mb-8">Test Grid - 3 Colonnes</h1>
        <ECardGrid ecards={mockECards} />
      </div>
    </div>
  );
}
