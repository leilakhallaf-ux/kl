import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Explorer from './pages/Explorer';
import ECardDetail from './pages/ECardDetail';
import Millesime from './pages/Millesime';
import BestOf from './pages/BestOf';
import Admin from './pages/Admin';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        const href = anchor.getAttribute('href');
        if (href && !href.startsWith('http') && !anchor.target) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          handleLocationChange();
          window.scrollTo(0, 0);
        }
      }
    });

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const renderPage = () => {
    if (currentPath === '/') {
      return <Home />;
    }

    if (currentPath === '/s-inspirer') {
      return <Catalogue />;
    }

    if (currentPath === '/explorer') {
      return <Explorer />;
    }

    if (currentPath === '/best-of') {
      return <BestOf />;
    }

    if (currentPath === '/admin') {
      return <Admin />;
    }

    if (currentPath.startsWith('/ecard/')) {
      const id = currentPath.split('/ecard/')[1];
      return <ECardDetail id={id} />;
    }

    if (currentPath.startsWith('/millesime/')) {
      const year = parseInt(currentPath.split('/millesime/')[1]);
      return <Millesime year={year} />;
    }

    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-white mb-4">Page non trouvée</h1>
          <a href="/" className="text-brand-gold hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  };

  return renderPage();
}

export default App;
