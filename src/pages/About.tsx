import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            À PROPOS
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            Votre source de référence pour les e-cards publicitaires
          </h2>

          <div className="text-white/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              Bienvenue sur le site dédié à la préservation et à la célébration des e-cards publicitaires,
              ces petites merveilles numériques qui ont marqué les débuts d'Internet et continuent d'évoluer aujourd'hui.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Notre Mission
              </h2>
              <p>
                Nous avons créé cette plateforme pour archiver, cataloguer et mettre en valeur les e-cards publicitaires
                qui ont façonné la communication digitale. Des premiers designs animés en Flash aux créations modernes
                en HTML5, chaque e-card raconte une histoire unique de créativité et d'innovation marketing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Notre Collection
              </h2>
              <p>
                Notre base de données comprend des milliers d'e-cards provenant de marques internationales,
                d'agences créatives renommées et de designers indépendants. Chaque carte est soigneusement
                documentée avec ses métadonnées : année de création, annonceur, agence, créateurs, et contexte
                de diffusion. Nous nous efforçons de préserver ce patrimoine numérique éphémère pour les
                générations futures et les professionnels de la communication.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Rejoignez-Nous
              </h2>
              <p>
                Que vous soyez designer, marketeur, historien du web ou simple amateur de créations numériques,
                nous vous invitons à explorer notre collection et à contribuer en soumettant vos propres découvertes.
                Ensemble, préservons la mémoire de ces petites œuvres d'art interactives qui ont égayé nos boîtes mail
                et marqué l'histoire de la publicité digitale.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
