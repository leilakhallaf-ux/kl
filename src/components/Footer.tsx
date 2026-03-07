import { Star, Mail, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a4d] border-t border-gold/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center gap-6 text-sm text-white">
              <a href="/a-propos" className="hover:text-gold transition-colors duration-300">
                À propos de nous
              </a>
              <span className="text-white/40">|</span>
              <a href="/soumettre" className="hover:text-gold transition-colors duration-300">
                Soumettre une e-card
              </a>
              <span className="text-white/40">|</span>
              <a href="/contact" className="hover:text-gold transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gold">
                <Star className="w-5 h-5 text-gold fill-gold" />
              </div>
              <div className="font-serif font-semibold text-gold" style={{ letterSpacing: '0.12em' }}>
                <div className="leading-tight">E-CARDS</div>
                <div className="leading-tight">CORPORATE</div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-[#0a0a4d]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-[#0a0a4d]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#0a0a4d]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#0a0a4d]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold hover:bg-gold/80 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#0a0a4d]" />
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex items-center gap-6 text-sm text-white">
              <a href="/mentions-legales" className="hover:text-gold transition-colors duration-300">
                Mentions légales
              </a>
              <span className="text-white/40">|</span>
              <a href="/cgu" className="hover:text-gold transition-colors duration-300">
                CGU
              </a>
              <span className="text-white/40">|</span>
              <a href="/rgpd" className="hover:text-gold transition-colors duration-300">
                RGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
