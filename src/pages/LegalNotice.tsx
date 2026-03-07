import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            MENTIONS LÉGALES
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            Informations légales et éditoriales
          </h2>

          <div className="text-white/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
              en l'économie numérique, il est précisé aux utilisateurs du site l'identité des différents
              intervenants dans le cadre de sa réalisation et de son suivi.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Éditeur du Site
              </h2>
              <p className="mb-3">
                Le site est édité par [Nom de l'organisation ou de la personne responsable],
                enregistré sous le numéro [SIRET/SIREN].
              </p>
              <p className="mb-2"><strong className="text-white">Siège social :</strong> [Adresse complète]</p>
              <p className="mb-2"><strong className="text-white">Email :</strong> contact@ecards-archive.com</p>
              <p className="mb-2"><strong className="text-white">Téléphone :</strong> [Numéro de téléphone]</p>
              <p><strong className="text-white">Directeur de la publication :</strong> [Nom du responsable]</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Hébergement
              </h2>
              <p className="mb-2">
                Le site est hébergé par Supabase Inc.
              </p>
              <p className="mb-2"><strong className="text-white">Adresse :</strong> 970 Toa Payoh North, #07-04, Singapore 318992</p>
              <p><strong className="text-white">Site web :</strong> https://supabase.com</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Propriété Intellectuelle
              </h2>
              <p>
                L'ensemble du contenu présent sur ce site, incluant mais ne se limitant pas aux textes,
                images, graphismes, logo, icônes, sons, logiciels, est la propriété exclusive de leurs auteurs
                respectifs ou fait l'objet d'une autorisation d'utilisation. Toute reproduction, représentation,
                modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen
                ou le procédé utilisé, est interdite, sauf autorisation écrite préalable. Les e-cards présentées
                restent la propriété de leurs créateurs et annonceurs respectifs et sont présentées à des fins
                d'archivage culturel et éducatif.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Limitation de Responsabilité
              </h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est mis à jour
                régulièrement. Toutefois, l'éditeur ne peut garantir l'exactitude, la précision ou l'exhaustivité
                des informations mises à disposition sur ce site. En conséquence, l'éditeur décline toute responsabilité
                pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
