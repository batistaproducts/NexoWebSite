
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Structure from './components/Structure';
import Academies from './components/Academies';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';

function App() {
  const [view, setView] = useState<'home' | 'about'>('home');

  const navigate = (page: 'home' | 'about', anchor?: string) => {
    setView(page);
    
    if (anchor) {
      // Small delay to ensure the page has rendered if switching from about to home
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, page === view ? 0 : 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
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
      
      <Footer />
    </div>
  );
}

export default App;
