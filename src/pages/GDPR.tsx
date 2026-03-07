import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GDPR() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            Protection de vos données personnelles (RGPD)
          </h2>

          <div className="text-white/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés,
              nous nous engageons à protéger la confidentialité et la sécurité de vos données personnelles.
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Données Collectées
              </h2>
              <p className="mb-4">
                Dans le cadre de l'utilisation de notre site, nous sommes susceptibles de collecter les données suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Données de navigation : adresse IP, type de navigateur, pages consultées, durée de visite</li>
                <li>Données de contact : si vous nous contactez ou soumettez du contenu (nom, email)</li>
                <li>Cookies et traceurs : pour améliorer votre expérience de navigation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Utilisation des Données
              </h2>
              <p className="mb-4">
                Les données collectées sont utilisées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Assurer le fonctionnement et l'amélioration du site</li>
                <li>Traiter et modérer les soumissions d'e-cards</li>
                <li>Répondre à vos demandes et communications</li>
                <li>Analyser l'utilisation du site pour améliorer nos services</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
              <p className="mt-4">
                Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales
                sans votre consentement explicite.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Vos Droits
              </h2>
              <p className="mb-4">
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong className="text-white">Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                <li><strong className="text-white">Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong className="text-white">Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong className="text-white">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong className="text-white">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à l'adresse : privacy@ecards-archive.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Sécurité et Conservation
              </h2>
              <p className="mb-4">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
                Nos serveurs sont sécurisés et les données sont chiffrées lors de leur transmission.
              </p>
              <p>
                Vos données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités
                pour lesquelles elles ont été collectées, ou conformément aux obligations légales de conservation.
                Une fois cette période expirée, vos données sont supprimées ou anonymisées de manière sécurisée.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                Cookies
              </h2>
              <p>
                Le site utilise des cookies techniques nécessaires à son fonctionnement. Ces cookies ne collectent
                pas de données personnelles identifiables et sont essentiels pour assurer la navigation et les
                fonctionnalités du site. Vous pouvez configurer votre navigateur pour refuser les cookies,
                mais cela pourrait affecter votre expérience de navigation.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
