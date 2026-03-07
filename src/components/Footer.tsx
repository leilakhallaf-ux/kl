import { Star, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2a2a2a] border-t border-gold/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gold">
                <Star className="w-4 h-4 text-gold fill-gold" />
              </div>
              <div className="font-serif font-semibold text-gold text-sm" style={{ letterSpacing: '0.12em' }}>
                <div className="leading-tight">E-CARDS</div>
                <div className="leading-tight">CORPORATE</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              La plateforme inspirationnelle qui donne une seconde vie aux e-cards.
              Archives d'e-cards corporate depuis 2007.
            </p>
          </div>

          <div>
            <h4 className="text-gold font-serif mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-white/60 hover:text-gold transition-colors duration-300">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/s-inspirer" className="text-white/60 hover:text-gold transition-colors duration-300">
                  S'inspirer
                </a>
              </li>
              <li>
                <a href="/explorer" className="text-white/60 hover:text-gold transition-colors duration-300">
                  Explorer
                </a>
              </li>
              <li>
                <a href="/best-of" className="text-white/60 hover:text-gold transition-colors duration-300">
                  Best-of
                </a>
              </li>
              <li>
                <a href="/admin" className="text-white/60 hover:text-gold transition-colors duration-300">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-serif mb-4">Contact</h4>
            <div className="space-y-3">
              <p className="text-sm text-white/60">
                Fondé par <span className="text-gold italic">Leïla Khallaf</span>
              </p>
              <p className="text-sm text-white/60">
                18 ans d'expérience dans la création et diffusion d'e-cards corporate
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="mailto:contact@ecards-corporate.com"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-center text-sm text-white/40">
          <p>
            © {currentYear} E-Cards Corporate. Tous droits réservés. |{' '}
            <span className="text-gold/70">Manufactur-e / WishesFactor-e</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
