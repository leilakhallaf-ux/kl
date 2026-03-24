import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslations } from '../hooks/useTranslations';

export default function TermsOfUse() {
  const { t } = useTranslations();

  return (
    <div className="site-wrapper min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-[#3D2B1F]/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-[#3D2B1F]/10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D2B1F] mb-2">
            {t('terms.title')}
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            {t('terms.hero.title')}
          </h2>

          <div className="text-[#3D2B1F]/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              {t('terms.intro')}
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('terms.purpose.title')}
              </h2>
              <p>
                {t('terms.purpose.text')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('terms.access.title')}
              </h2>
              <p className="mb-4">
                {t('terms.access.free')}
              </p>
              <p>
                {t('terms.access.availability')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('terms.content.title')}
              </h2>
              <p>
                {t('terms.content.text')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('terms.submission.title')}
              </h2>
              <p>
                {t('terms.submission.text')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('terms.liability.title')}
              </h2>
              <p>
                {t('terms.liability.text')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
