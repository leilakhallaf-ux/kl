import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslations } from '../hooks/useTranslations';

export default function LegalNotice() {
  const { t } = useTranslations();

  return (
    <div className="site-wrapper min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-[#3D2B1F]/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-[#3D2B1F]/10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D2B1F] mb-2">
            {t('legal.title')}
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            {t('legal.hero.title')}
          </h2>

          <div className="text-[#3D2B1F]/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              {t('legal.intro')}
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('legal.editor.title')}
              </h2>
              <p className="mb-3">
                {t('legal.editor.text')}
              </p>
              <p className="mb-2"><strong className="text-[#3D2B1F]">{t('legal.editor.address')}</strong> [Adresse complète]</p>
              <p className="mb-2"><strong className="text-[#3D2B1F]">{t('legal.editor.email')}</strong> contact@ecards-archive.com</p>
              <p className="mb-2"><strong className="text-[#3D2B1F]">{t('legal.editor.phone')}</strong> [Numéro de téléphone]</p>
              <p><strong className="text-[#3D2B1F]">{t('legal.editor.director')}</strong> [Nom du responsable]</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('legal.hosting.title')}
              </h2>
              <p className="mb-2">
                {t('legal.hosting.text')}
              </p>
              <p className="mb-2"><strong className="text-[#3D2B1F]">{t('legal.hosting.address')}</strong> 970 Toa Payoh North, #07-04, Singapore 318992</p>
              <p><strong className="text-[#3D2B1F]">{t('legal.hosting.website')}</strong> https://supabase.com</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('legal.intellectual.title')}
              </h2>
              <p>
                {t('legal.intellectual.text')}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gold mb-4 mt-8">
                {t('legal.liability.title')}
              </h2>
              <p>
                {t('legal.liability.text')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
