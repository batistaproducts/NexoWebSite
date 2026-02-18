
import React, { useState, useEffect, useMemo } from 'react';
import { Academy } from '../types';

const Academies: React.FC = () => {
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState('');
  const [filterCity, setFilterCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/academies.json');
        const data = await response.json();
        setAcademies(data);
      } catch (error) {
        console.error("Error loading academies data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const states = useMemo(() => Array.from(new Set(academies.map(a => a.estado))), [academies]);
  const cities = useMemo(() => 
    Array.from(new Set(academies.filter(a => !filterState || a.estado === filterState).map(a => a.cidade))), 
    [academies, filterState]
  );

  const filteredAcademies = useMemo(() => {
    return academies.filter(a => {
      const matchState = !filterState || a.estado === filterState;
      const matchCity = !filterCity || a.cidade === filterCity;
      return matchState && matchCity;
    });
  }, [academies, filterState, filterCity]);

  if (loading) return null;

  return (
    <section id="academias" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Nossas Unidades</h2>
            <p className="text-gray-400">Encontre a NEXO mais próxima de você.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 transition-all"
              value={filterState}
              onChange={(e) => { setFilterState(e.target.value); setFilterCity(''); }}
            >
              <option value="">Todos os Estados</option>
              {states.sort().map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 transition-all"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <option value="">Todas as Cidades</option>
              {cities.sort().map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAcademies.map((academy) => (
            <div key={academy.id} className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={academy.foto_url} 
                  alt={academy.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-2 py-1 rounded">
                  {academy.estado}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold uppercase mb-2">{academy.nome}</h3>
                <p className="text-gray-400 text-sm mb-4 h-12 line-clamp-2">{academy.endereco}</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Mestre Responsável</span>
                    <span className="font-semibold text-sm">{academy.mestre_responsavel}</span>
                  </div>
                  <button className="text-white/40 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAcademies.length === 0 && (
          <div className="text-center py-20 text-gray-500 uppercase tracking-widest bg-white/5 rounded-2xl">
            Nenhuma unidade encontrada para esta região.
          </div>
        )}
      </div>
    </section>
  );
};

export default Academies;
