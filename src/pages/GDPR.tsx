import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslations } from '../hooks/useTranslations';

export default function GDPR() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t('gdpr.title')}
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            {t('gdpr.hero.title')}
          </h2>

          <div className="text-white/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              {t('gdpr.intro')}
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('gdpr.dataCollected.title')}
              </h2>
              <p className="mb-4">
                {t('gdpr.dataCollected.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('gdpr.dataCollected.navigation')}</li>
                <li>{t('gdpr.dataCollected.contact')}</li>
                <li>{t('gdpr.dataCollected.cookies')}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('gdpr.dataUsage.title')}
              </h2>
              <p className="mb-4">
                {t('gdpr.dataUsage.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('gdpr.dataUsage.operation')}</li>
                <li>{t('gdpr.dataUsage.moderate')}</li>
                <li>{t('gdpr.dataUsage.respond')}</li>
                <li>{t('gdpr.dataUsage.analyze')}</li>
                <li>{t('gdpr.dataUsage.legal')}</li>
              </ul>
              <p className="mt-4">
                {t('gdpr.dataUsage.noSale')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('gdpr.rights.title')}
              </h2>
              <p className="mb-4">
                {t('gdpr.rights.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">{t('gdpr.rights.access.title')}</strong> {t('gdpr.rights.access.text')}</li>
                <li><strong className="text-white">{t('gdpr.rights.rectification.title')}</strong> {t('gdpr.rights.rectification.text')}</li>
                <li><strong className="text-white">{t('gdpr.rights.erasure.title')}</strong> {t('gdpr.rights.erasure.text')}</li>
                <li><strong className="text-white">{t('gdpr.rights.limitation.title')}</strong> {t('gdpr.rights.limitation.text')}</li>
                <li><strong className="text-white">{t('gdpr.rights.opposition.title')}</strong> {t('gdpr.rights.opposition.text')}</li>
                <li><strong className="text-white">{t('gdpr.rights.portability.title')}</strong> {t('gdpr.rights.portability.text')}</li>
              </ul>
              <p className="mt-4">
                {t('gdpr.rights.contact')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('gdpr.security.title')}
              </h2>
              <p className="mb-4">
                {t('gdpr.security.measures')}
              </p>
              <p>
                {t('gdpr.security.retention')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('gdpr.cookies.title')}
              </h2>
              <p>
                {t('gdpr.cookies.text')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
