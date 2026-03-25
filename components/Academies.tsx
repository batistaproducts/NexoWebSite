
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Academy } from '../types';
import { academiesData } from '../src/data/academies';

// Antonio Batista - Unidades - 22/03/2026
const AcademySkeleton: React.FC = () => (
  <div className="min-w-[85%] sm:min-w-[45%] lg:min-w-[31%] glass-card rounded-2xl overflow-hidden animate-pulse">
    <div className="h-64 bg-white/5"></div>
    <div className="p-6 space-y-4">
      <div className="h-8 w-3/4 bg-white/10 rounded"></div>
      <div className="h-4 w-full bg-white/10 rounded"></div>
      <div className="h-4 w-2/3 bg-white/10 rounded"></div>
      <div className="h-10 w-full bg-white/10 rounded mt-4"></div>
    </div>
  </div>
);

const Academies: React.FC = () => {
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterState, setFilterState] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [selectedAcademy, setSelectedAcademy] = useState<Academy | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Antonio Batista - Unidades - 22/03/2026
  useEffect(() => {
    setAcademies(academiesData);
    setLoading(false);
  }, []);

  const fetchData = async () => {
    // Mantendo para compatibilidade com o botão de erro, embora não seja mais necessário
    setLoading(true);
    setAcademies(academiesData);
    setLoading(false);
  };

  // Antonio Batista - MVP Nexo Institucional - 17/03/2026
  const states = useMemo(() => Array.from(new Set(academies.map(a => a.estado))), [academies]);
  const cities = useMemo(() => 
    Array.from(new Set(academies.filter(a => !filterState || a.estado === filterState).map(a => a.cidade))), 
    [academies, filterState]
  );

  const filteredAcademies = useMemo(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    return academies.filter(a => {
      const matchState = !filterState || a.estado === filterState;
      const matchCity = !filterCity || a.cidade === filterCity;
      return matchState && matchCity;
    });
  }, [academies, filterState, filterCity]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return (
    <section id="academias" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="animate-pulse">
            <div className="h-12 w-64 bg-white/10 rounded mb-4"></div>
            <div className="h-4 w-48 bg-white/10 rounded"></div>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar">
          {[1, 2, 3].map(i => <AcademySkeleton key={i} />)}
        </div>
      </div>
    </section>
  );

  if (error) {
    return (
      <section id="academias" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-md mx-auto p-8 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-xl font-bold uppercase mb-4">Erro ao carregar unidades</h2>
            <p className="text-gray-400 text-sm mb-8">{error}</p>
            <button 
              onClick={fetchData}
              className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-all rounded-lg"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="academias" className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Nossas Unidades</h2>
            <p className="text-gray-400">Encontre a NEXO mais próxima de você.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors" 
              value={filterState} 
              onChange={(e) => { setFilterState(e.target.value); setFilterCity(''); }}
            >
              <option value="" className="bg-[#0a0a0a]">Todos os Estados</option>
              {states.sort().map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
            </select>
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors" 
              value={filterCity} 
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <option value="" className="bg-[#0a0a0a]">Todas as Cidades</option>
              {cities.sort().map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>)}
            </select>
          </div>
        </div>

        <div className="relative group">
          {filteredAcademies.length > 0 && (
            <>
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
                aria-label="Anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
                aria-label="Próximo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredAcademies.length > 0 ? (
              filteredAcademies.map((academy, index) => (
                <motion.div 
                  key={academy.id} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[85%] sm:min-w-[45%] lg:min-w-[31%] snap-center glass-card rounded-2xl overflow-hidden group/card transition-all hover:border-white/20 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-white/5">
                    <img 
                      src={academy.foto_url} 
                      alt={academy.nome} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                      {academy.estado}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold uppercase mb-2 tracking-tighter">{academy.nome}</h3>
                    <p className="text-gray-400 text-sm mb-6 h-12 line-clamp-2">{academy.endereco}</p>
                    
                    <div className="mt-auto">
                       <button 
                        onClick={() => setSelectedAcademy(academy)}
                        className="w-full py-3 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                      >
                        Detalhes
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-gray-500 uppercase tracking-widest text-sm">Nenhuma unidade encontrada para esta região.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Antonio Batista - Unidades - 22/03/2026 */}
      <AnimatePresence>
        {selectedAcademy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAcademy(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedAcademy(null)}
                className="absolute top-6 right-6 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-white/5">
                  <img 
                    src={selectedAcademy.foto_url} 
                    alt={selectedAcademy.nome} 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Unidade Oficial NEXO</div>
                  <h3 className="text-3xl font-bold uppercase tracking-tighter mb-6">{selectedAcademy.nome}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Localização</span>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {selectedAcademy.endereco}<br />
                        {selectedAcademy.cidade} - {selectedAcademy.estado}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Liderança Técnica</span>
                      <p className="text-sm font-semibold text-white">
                        {selectedAcademy.mestre_responsavel}
                      </p>
                    </div>

                    <div className="pt-6">
                      <button 
                        className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
                        onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(selectedAcademy.nome + " " + selectedAcademy.endereco)}`, '_blank')}
                      >
                        Como Chegar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Academies;
