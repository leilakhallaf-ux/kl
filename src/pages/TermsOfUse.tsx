import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            CONDITIONS GÉNÉRALES D'UTILISATION
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-8">
            Règles d'utilisation du site
          </h2>

          <div className="text-white/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site.
              En accédant au site, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions,
              veuillez ne pas utiliser ce site.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
                Objet du Site
              </h2>
              <p>
                Le site a pour objet de fournir une plateforme d'archivage et de consultation d'e-cards publicitaires.
                Les utilisateurs peuvent explorer la collection, rechercher des e-cards par différents critères
                (année, annonceur, agence, créateur) et soumettre de nouvelles e-cards pour enrichir la base de données.
                Le site vise à préserver le patrimoine de la publicité numérique interactive et à offrir une ressource
                documentaire aux professionnels et passionnés.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
                Accès au Site
              </h2>
              <p className="mb-4">
                L'accès au site est gratuit et libre à tout utilisateur disposant d'un accès Internet.
                Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique,
                logiciels, connexion Internet, etc.) sont à sa charge.
              </p>
              <p>
                L'éditeur met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès
                de qualité au site, mais n'est tenu à aucune obligation d'y parvenir. L'éditeur ne peut garantir
                que le site sera exempt d'anomalies, d'erreurs ou de bugs, ni que ces derniers pourront être corrigés.
                L'éditeur se réserve la possibilité d'interrompre, de suspendre momentanément ou de modifier sans
                préavis l'accès à tout ou partie du site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
                Utilisation du Contenu
              </h2>
              <p>
                Les e-cards présentées sur le site sont protégées par des droits d'auteur et restent la propriété
                de leurs créateurs respectifs. L'utilisation du contenu du site est autorisée à des fins personnelles,
                éducatives et de recherche uniquement. Toute utilisation commerciale, reproduction, distribution ou
                modification du contenu sans autorisation préalable écrite est strictement interdite. Les utilisateurs
                s'engagent à respecter les droits de propriété intellectuelle des créateurs et annonceurs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
                Soumission de Contenu
              </h2>
              <p>
                Les utilisateurs peuvent soumettre des e-cards pour enrichir la collection. En soumettant du contenu,
                l'utilisateur garantit qu'il dispose des droits nécessaires ou de l'autorisation des ayants droit pour
                le partager sur la plateforme. L'utilisateur accorde à l'éditeur une licence non exclusive, gratuite
                et mondiale pour afficher, archiver et diffuser le contenu soumis dans le cadre des activités du site.
                L'éditeur se réserve le droit de modérer, refuser ou supprimer tout contenu qui ne respecterait pas
                les présentes CGU ou les lois en vigueur.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
                Responsabilité
              </h2>
              <p>
                L'utilisateur est seul responsable de l'utilisation qu'il fait du site et du contenu qu'il consulte.
                L'éditeur ne saurait être tenu responsable de tout dommage direct ou indirect qui pourrait résulter
                de l'accès au site ou de l'utilisation de son contenu. L'éditeur décline toute responsabilité concernant
                les liens hypertextes pointant vers des sites tiers qui pourraient être présents sur le site.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
