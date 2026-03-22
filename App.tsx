
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Structure from './components/Structure';
import Academies from './components/Academies';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import StructurePage from './pages/StructurePage';
import AcademiesPage from './pages/AcademiesPage';

// Antonio Batista - MVP Nexo Institucional - 17/03/2026
function App() {
  const [view, setView] = useState<'home' | 'about' | 'structure' | 'academies'>('home');

  // Antonio Batista - MVP Nexo Institucional - 17/03/2026
  const navigate = (page: 'home' | 'about' | 'structure' | 'academies', anchor?: string) => {
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
      {/* Antonio Batista - MVP Nexo Institucional - 17/03/2026 */}
      <Header onNavigate={navigate} currentPage={view} />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <div className="relative">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <Pillars />
          </>
        )}
        {view === 'about' && <AboutPage />}
        {view === 'structure' && <StructurePage />}
        {view === 'academies' && <AcademiesPage />}
      </main>
      
      {/* Antonio Batista - MVP Nexo Institucional - 17/03/2026 */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
