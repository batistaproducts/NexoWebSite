
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'about' | 'structure' | 'academies', anchor?: string) => void;
  currentPage: 'home' | 'about' | 'structure' | 'academies';
}

// Antonio Batista - MVP Nexo Institucional - 17/03/2026
const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [config, setConfig] = useState<any>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('data/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Config fetch error", err));
  }, []);

  const handleBeAMaster = () => {
    if (config?.googleFormUrl) {
      window.open(config.googleFormUrl, '_blank');
    }
  };

  const navLinks = (
    <>
      <button onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }} className={`${currentPage === 'about' ? 'text-white' : 'hover:text-white'} transition-colors uppercase`}>A Equipe</button>
      <button onClick={() => { onNavigate('structure'); setIsMobileMenuOpen(false); }} className={`${currentPage === 'structure' ? 'text-white' : 'hover:text-white'} transition-colors uppercase`}>Estrutura</button>
      <button onClick={() => { onNavigate('academies'); setIsMobileMenuOpen(false); }} className={`${currentPage === 'academies' ? 'text-white' : 'hover:text-white'} transition-colors uppercase`}>Academias</button>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm group-hover:bg-gray-200 transition-colors">
            <span className="text-black font-black text-sm tracking-tighter leading-none select-none">
              [NX]
            </span>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">NEXO BJJ</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider text-gray-400">
          {navLinks}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={handleBeAMaster}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-tight hover:bg-gray-200 transition-all shadow-lg shadow-white/5"
          >
            Seja um Mestre
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col space-y-4 text-center">
          {navLinks}
          <button 
            onClick={handleBeAMaster}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-tight hover:bg-gray-200 transition-all shadow-lg shadow-white/5"
          >
            Seja um Mestre
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
