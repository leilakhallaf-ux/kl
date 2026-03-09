import { Star, Mail, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslations();

  return (
    <footer className="bg-gradient-to-t from-[#2a2a2a] to-[#4a4a4a] border-t border-gold/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 text-xs md:text-sm text-white">
              <a href="/soumettre" className="hover:text-gold transition-colors duration-300 whitespace-nowrap">
                {t('footer.submit_ecard', 'SOUMETTRE E-CARD')}
              </a>
              <span className="text-white/40">|</span>
              <a href="/a-propos" className="hover:text-gold transition-colors duration-300 whitespace-nowrap">
                {t('footer.about', 'À PROPOS')}
              </a>
              <span className="text-white/40">|</span>
              <a href="/contact" className="hover:text-gold transition-colors duration-300 whitespace-nowrap">
                {t('footer.contact', 'CONTACT')}
              </a>
              <span className="text-white/40">|</span>
              <a href="/admin" className="hover:text-gold transition-colors duration-300 whitespace-nowrap text-white/50">
                ADMIN
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <a href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-gold rounded-full group-hover:bg-gold transition-colors duration-500">
                <Star className="w-6 h-6 text-gold group-hover:text-rich-black" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-widest text-gold leading-none">E-CARDS</span>
                <span className="font-sans text-xs tracking-[0.3em] text-white/70 leading-none mt-1">CORPORATE</span>
              </div>
            </a>
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-[#1f1f1f]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-[#1f1f1f]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#1f1f1f]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#1f1f1f]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#1f1f1f]" />
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex items-center justify-center md:justify-end gap-2 md:gap-4 text-xs md:text-sm text-white">
              <a href="/mentions-legales" className="hover:text-gold transition-colors duration-300 whitespace-nowrap">
                {t('footer.legal_notice', 'MENTIONS LÉGALES')}
              </a>
              <span className="text-white/40">|</span>
              <a href="/cgu" className="hover:text-gold transition-colors duration-300 whitespace-nowrap">
                {t('footer.terms', 'CGU')}
              </a>
              <span className="text-white/40">|</span>
              <a href="/rgpd" className="hover:text-gold transition-colors duration-300 whitespace-nowrap">
                {t('footer.privacy', 'CONFIDENTIALITÉ')}
              </a>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-white/10 pt-6">
          <h3 className="font-serif text-base md:text-xl font-semibold text-white mb-2">
            {t('home.founder.title', 'Créé par')} <a href="https://wishesfactor-e.com" target="_blank" rel="noopener noreferrer" className="gold-text-gradient italic font-extrabold tracking-wide hover:opacity-80 transition-opacity duration-300">WishesFactor-e</a> by Manufactur-e
          </h3>
          <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-2">
            {t('home.founder.bio', 'Notre solution WishesFactor-e oeuvre, depuis 2008, dans l\'eco-système des e-cards corporate..')}
          </p>
          <p className="text-xs md:text-sm text-white/70 leading-relaxed">
            {t('home.founder.mission', 'Cette archive valorise l\'histoire et l\'évolution des e-cards depuis 2008')}
          </p>
        </div>
      </div>
    </footer>
  );
}
