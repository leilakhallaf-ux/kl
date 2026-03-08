import { Star, Mail, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslations();

  return (
    <footer className="bg-[#2a2a2a] border-t border-gold/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
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
                <Youtube className="w-4 h-4 text-[#2a2a2a]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-[#2a2a2a]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#2a2a2a]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#2a2a2a]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#2a2a2a]" />
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
      </div>
    </footer>
  );
}
