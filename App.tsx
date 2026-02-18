
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Structure from './components/Structure';
import Academies from './components/Academies';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';

// Antonio Batista - Projeto: MVP Nexo Institucional - "Componente Raiz: Gerencia estado de visualização e sistema de âncoras cross-page"
function App() {
  const [view, setView] = useState<'home' | 'about'>('home');

  // Antonio Batista - Projeto: MVP Nexo Institucional - "Função de navegação unificada: Trata mudança de rota e scroll suave para âncoras"
  const navigate = (page: 'home' | 'about', anchor?: string) => {
    setView(page);
    
    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, page === view ? 0 : 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* Antonio Batista - Projeto: MVP Nexo Institucional - "Cabeçalho com navegação principal" */}
      <Header onNavigate={navigate} currentPage={view} />
      
      <main>
        {view === 'home' ? (
          <>
            <Hero onNavigate={navigate} />
            <div className="relative">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <Pillars />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <Structure />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <Academies />
          </>
        ) : (
          <AboutPage />
        )}
      </main>
      
      {/* Antonio Batista - Projeto: MVP Nexo Institucional - "Rodapé com links funcionais sincronizados com o App" */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
