
import React, { useState, useEffect } from 'react';
import { StructureData, TeamMember } from '../types';

const Structure: React.FC = () => {
  const [data, setData] = useState<StructureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/structure.json');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error loading team data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-center text-gray-500 uppercase tracking-widest">Carregando Organograma...</div>;
  if (!data) return null;

  const renderGroup = (title: string, members: TeamMember[]) => {
    if (!members || !Array.isArray(members)) return null;
    
    return (
      <div key={title} className="mb-20 last:mb-0">
        <div className="flex items-center justify-center space-x-4 mb-12">
          <div className="h-px w-12 bg-white/20"></div>
          <h3 className="text-2xl font-bold uppercase tracking-widest">{title}</h3>
          <div className="h-px w-12 bg-white/20"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          {members.map((member) => (
            <div key={`${title}-${member.id}-${member.nome}`} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur group-hover:bg-white/40 transition-all"></div>
                <img 
                  src={member.foto_url} 
                  alt={member.nome} 
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#0a0a0a]"
                />
              </div>
              <h4 className="text-xl font-bold uppercase">{member.nome}</h4>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{member.cargo}</span>
              <div className="mt-2 bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                {member.titulo}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const groupEntries = Object.entries(data);

  return (
    <section id="estrutura" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Estrutura Organizacional</h2>
          <p className="text-gray-400">Liderança, governança técnica e rede de mestres NEXO.</p>
        </div>

        {groupEntries.map(([groupTitle, members], index) => (
          <React.Fragment key={groupTitle}>
            {renderGroup(groupTitle, members)}
            {index < groupEntries.length - 1 && (
              <div className="my-16 h-px w-1/4 mx-auto bg-white/5"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Structure;
