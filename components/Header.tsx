
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'about', anchor?: string) => void;
  currentPage: 'home' | 'about';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('./data/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Config fetch error", err));
  }, []);

  const handleBeAMaster = () => {
    if (config?.googleFormUrl) {
      window.open(config.googleFormUrl, '_blank');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm group-hover:bg-gray-200 transition-colors">
            <span className="text-black font-extrabold text-xl">N</span>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">NEXO BJJ</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider text-gray-400">
          <button 
            onClick={() => onNavigate('about')}
            className={`${currentPage === 'about' ? 'text-white' : 'hover:text-white'} transition-colors uppercase`}
          >
            A Equipe
          </button>
          <button 
            onClick={() => onNavigate('home', 'estrutura')}
            className="hover:text-white transition-colors uppercase"
          >
            Estrutura
          </button>
          <button 
            onClick={() => onNavigate('home', 'academias')}
            className="hover:text-white transition-colors uppercase"
          >
            Academias
          </button>
        </nav>

        <div>
          <button 
            onClick={handleBeAMaster}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-tight hover:bg-gray-200 transition-all transform active:scale-95 shadow-lg shadow-white/5"
          >
            Seja um Mestre
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
