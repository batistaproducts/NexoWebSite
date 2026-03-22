
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StructureData, TeamMember } from '../types';
import { X } from 'lucide-react';

// Antonio Batista - Organograma - 22/03/2026
const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden rounded-full ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'
          }`}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

const MemberSkeleton: React.FC = () => (
  <div className="flex flex-col items-center text-center animate-pulse">
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 mb-6"></div>
    <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
    <div className="h-4 w-24 bg-white/10 rounded mb-4"></div>
    <div className="h-8 w-20 bg-white/10 rounded"></div>
  </div>
);

const Structure: React.FC = () => {
  const [data, setData] = useState<StructureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Antonio Batista - Organograma - 22/03/2026
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/data/structure.json');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error loading team data", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderGroup = React.useCallback((title: string, members: TeamMember[]) => (
    <div key={title} className="mb-20 last:mb-0">
      <div className="flex items-center justify-center space-x-4 mb-12">
        <div className="h-px w-12 bg-white/20"></div>
        <h3 className="text-2xl font-bold uppercase tracking-widest">{title}</h3>
        <div className="h-px w-12 bg-white/20"></div>
      </div>
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="flex flex-wrap justify-center gap-12"
      >
        {members.length > 0 ? (
          members.map((member) => (
            <motion.div 
              key={member.id + member.nome} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur group-hover:bg-white/40 transition-all"></div>
                {/* Antonio Batista - Organograma - 22/03/2026 */}
                <LazyImage 
                  src={member.foto_url} 
                  alt={member.nome} 
                  className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#0a0a0a]" 
                />
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
            </motion.div>
          ))
        ) : (
          <div className="py-8">
            <p className="text-gray-600 uppercase tracking-[0.5em] text-xs font-bold animate-pulse">Em breve!</p>
          </div>
        )}
      </motion.div>

      {/* Antonio Batista - Organograma - 22/03/2026 */}
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
                  <LazyImage 
                    src={selectedMember.foto_url} 
                    alt={selectedMember.nome} 
                    className="w-32 h-32 border-4 border-white/10 mb-4" 
                  />
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
                  <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-end items-center gap-4">
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
  ), [selectedMember]);


  if (loading) {
    return (
      <section id="estrutura" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="h-12 w-64 bg-white/10 rounded mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-white/10 rounded mx-auto"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <MemberSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="estrutura" className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-md mx-auto p-8 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-xl font-bold uppercase mb-4">Erro ao carregar organograma</h2>
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

  if (!data || Object.keys(data).length === 0) {
    return (
      <section id="estrutura" className="py-24">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 uppercase tracking-[0.5em] text-xs font-bold">Nenhum dado encontrado no organograma.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="estrutura" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Estrutura Organizacional</h2>
          <p className="text-gray-400">Liderança, governança técnica e rede de mestres NEXO.</p>
        </div>
        {/* Antonio Batista - Organograma - 22/03/2026 */}
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
