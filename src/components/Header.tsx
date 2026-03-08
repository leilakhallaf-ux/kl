import { useEffect, useState } from 'react';
import { Menu, X, Star } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

interface HeaderProps {
  currentPath?: string;
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const Header = ({ currentPath = '/' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, currentLanguage, setLanguage } = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        setIsScrolled(mainElement.scrollTop > 50);
      }
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navLinks = [
    { type: 'separator', label: t('nav.section.browse', 'PARCOURIR') },
    { type: 'link', name: t('nav.inspire', "S'INSPIRER"), path: "/s-inspirer" },
    { type: 'link', name: t('nav.explore', "EXPLORER"), path: "/explorer" },
    { type: 'link', name: t('nav.bestof', "BEST-OF"), path: "/best-of" },
    { type: 'separator', label: t('nav.section.contribute', 'CONTRIBUER') },
    { type: 'link', name: t('nav.submit', "SOUMETTRE"), path: "/soumettre" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-[#2a2a2a]/90 backdrop-blur-md border-b border-gold/20" : "bg-[#2a2a2a]"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 flex items-center justify-center border border-gold rounded-full group-hover:bg-gold transition-colors duration-500">
            <Star className="w-6 h-6 text-gold group-hover:text-rich-black" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-widest text-gold leading-none">E-CARDS</span>
            <span className="font-sans text-xs tracking-[0.3em] text-white/70 leading-none mt-1">CORPORATE</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item, index) =>
            item.type === 'separator' ? (
              <span key={`separator-${index}`} className="text-xs tracking-[0.3em] text-white/40 font-light px-2">
                {item.label}
              </span>
            ) : (
              <a
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm tracking-[0.2em] transition-colors",
                  item.path === "/soumettre"
                    ? "text-gold font-medium hover:text-white"
                    : currentPath === item.path ? "text-gold" : "text-white/70 hover:text-gold"
                )}
              >
                {item.name}
              </a>
            )
          )}
          <span className="text-white/30">|</span>
          <button
            onClick={() => setLanguage(currentLanguage === 'en' ? 'fr' : 'en')}
            className="text-sm tracking-[0.2em] text-white/70 hover:text-gold transition-colors"
          >
            {currentLanguage === 'en' ? 'FR' : 'EN'}
          </button>
        </nav>

        <button className="md:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-rich-black border-b border-gold/20 p-6 flex flex-col gap-3 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((item, index) =>
            item.type === 'separator' ? (
              <div key={`separator-${index}`} className="text-xs tracking-[0.3em] text-white/40 font-light pt-2 pb-1">
                {item.label}
              </div>
            ) : (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-base tracking-widest pl-2",
                  item.path === "/soumettre" ? "text-gold font-medium hover:text-white" : "text-white/70 hover:text-gold"
                )}
              >
                {item.name}
              </a>
            )
          )}
          <div className="h-px bg-white/10 my-2" />
          <button
            onClick={() => {
              setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
              setIsMenuOpen(false);
            }}
            className="text-base tracking-widest text-white/70 hover:text-gold text-left"
          >
            {currentLanguage === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
