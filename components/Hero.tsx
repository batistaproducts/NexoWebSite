
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onNavigate: (page: 'home' | 'about', anchor?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('./data/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Config fetch error", err));
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
          Redefinindo o <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
            Jiu-Jitsu Brasileiro
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
          Unindo conexão, autonomia financeira e impacto social para construir a maior rede de mestres do mundo.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate('about')}
            className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Conheça a Metodologia
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('academias');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full md:w-auto border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Encontre uma Unidade
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
