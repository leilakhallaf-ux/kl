import { Crown } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: "S'inspirer", path: '/s-inspirer' },
    { label: 'Explorer', path: '/explorer' },
    { label: 'Best-of', path: '/best-of' },
    { label: 'Awards', path: '/awards', comingSoon: true },
    { label: 'Blog', path: '/blog', comingSoon: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-rich-black/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gold bg-transparent group-hover:bg-gold/10 transition-all duration-300">
              <Crown className="w-5 h-5 text-gold" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-serif font-semibold text-gold tracking-wider">
                E-CARDS CORPORATE
              </h1>
              <p className="text-xs text-white/60 font-light">
                Le Pinterest de la carte de vœux électronique
              </p>
            </div>
          </a>

          <button
            className="md:hidden text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`relative font-light text-sm transition-colors duration-300 ${
                  currentPath === item.path
                    ? 'text-gold'
                    : 'text-white/70 hover:text-gold'
                }`}
              >
                {item.label}
                {item.comingSoon && (
                  <span className="absolute -top-2 -right-10 text-[10px] text-gold/70 italic font-serif">
                    soon
                  </span>
                )}
              </a>
            ))}
            <a
              href="/admin"
              className="ml-4 px-4 py-2 border border-gold/50 text-gold rounded-none hover:bg-gold/10 transition-all duration-300 text-sm font-light"
            >
              Admin
            </a>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`font-light transition-colors duration-300 ${
                  currentPath === item.path
                    ? 'text-gold'
                    : 'text-white/70 hover:text-gold'
                }`}
              >
                {item.label}
                {item.comingSoon && (
                  <span className="ml-2 text-[10px] text-gold/70 italic font-serif">
                    soon
                  </span>
                )}
              </a>
            ))}
            <a
              href="/admin"
              className="mt-2 px-4 py-2 border border-gold/50 text-gold rounded-none hover:bg-gold/10 transition-all duration-300 text-sm text-center font-light"
            >
              Admin
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
