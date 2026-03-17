
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StructureData, TeamMember } from '../types';
import { X } from 'lucide-react';

// Antonio Batista - MVP Nexo Institucional - 17/03/2026
const Structure: React.FC = () => {
  const [data, setData] = useState<StructureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetch('./data/structure.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => console.error("Error loading team data", err));
  }, []);

  if (loading) return <div className="py-20 text-center text-gray-500 uppercase tracking-widest">Carregando Organograma...</div>;
  if (!data) return null;

  // Antonio Batista - MVP Nexo Institucional - 17/03/2026
  const renderGroup = (title: string, members: TeamMember[]) => (
    <div key={title} className="mb-20 last:mb-0">
      <div className="flex items-center justify-center space-x-4 mb-12">
        <div className="h-px w-12 bg-white/20"></div>
        <h3 className="text-2xl font-bold uppercase tracking-widest">{title}</h3>
        <div className="h-px w-12 bg-white/20"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id + member.nome} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur group-hover:bg-white/40 transition-all"></div>
                {/* Antonio Batista - MVP Nexo Institucional - 17/03/2026 */}
                <img src={member.foto_url} alt={member.nome} className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#0a0a0a]" />
              </div>
              <h4 className="text-xl font-bold uppercase">{member.nome}</h4>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{member.cargo}</span>
              <div className="mt-2 bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{member.titulo}</div>
              
              {member.bio && (
                <button 
                  onClick={() => setSelectedMember(member)}
                  className="mt-4 text-[10px] font-bold uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  Ver Bio
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="py-8">
            <p className="text-gray-600 uppercase tracking-[0.5em] text-xs font-bold animate-pulse">Em breve!</p>
          </div>
        )}
      </div>

      {/* Antonio Batista - MVP Nexo Institucional - 17/03/2026 */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden rounded-2xl shadow-2xl"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto">
                <div className="w-full md:w-1/3 bg-white/5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                  <img src={selectedMember.foto_url} alt={selectedMember.nome} className="w-32 h-32 rounded-full object-cover border-4 border-white/10 mb-4" />
                  <h4 className="text-xl font-bold uppercase text-center">{selectedMember.nome}</h4>
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider text-center">{selectedMember.cargo}</span>
                  <div className="mt-2 bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-center">{selectedMember.titulo}</div>
                </div>
                <div className="w-full md:w-2/3 p-8 md:p-12">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">Biografia</h3>
                  <div className="prose prose-invert prose-sm">
                    <p className="text-gray-300 leading-relaxed text-lg italic font-serif">
                      "{selectedMember.bio}"
                    </p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest">Antonio Batista - NEXO BJJ - 17/03/2026</span>
                    <button 
                      onClick={() => setSelectedMember(null)}
                      className="w-full sm:w-auto text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-gray-200 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="estrutura" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Estrutura Organizacional</h2>
          <p className="text-gray-400">Liderança, governança técnica e rede de mestres NEXO.</p>
        </div>
        {/* Antonio Batista - MVP Nexo Institucional - 17/03/2026 */}
        {(Object.entries(data) as [string, TeamMember[]][]).map(([title, members], index) => (
          <React.Fragment key={title}>
            {renderGroup(title, members)}
            {index < Object.keys(data).length - 1 && <div className="my-16 h-px w-1/4 mx-auto bg-white/5"></div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Structure;
