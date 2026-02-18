
import React, { useState, useEffect } from 'react';
import { StructureData, TeamMember } from '../types';

// Antonio Batista - Projeto: MVP Nexo Institucional - "Mapeamento dinâmico de cargos e hierarquia a partir de JSON com injeção de imagens Base64"
const Structure: React.FC = () => {
  const [data, setData] = useState<StructureData | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Antonio Batista - Projeto: MVP Nexo Institucional - "Função auxiliar para renderizar seções hierárquicas (Fundadores, Conselho, Mestres, Atletas)"
  const renderGroup = (title: string, members: TeamMember[]) => (
    <div key={title} className="mb-20 last:mb-0">
      <div className="flex items-center justify-center space-x-4 mb-12">
        <div className="h-px w-12 bg-white/20"></div>
        <h3 className="text-2xl font-bold uppercase tracking-widest">{title}</h3>
        <div className="h-px w-12 bg-white/20"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {members.map((member) => (
          <div key={member.id + member.nome} className="flex flex-col items-center text-center group">
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-white/20 rounded-full blur group-hover:bg-white/40 transition-all"></div>
              {/* Antonio Batista - Projeto: MVP Nexo Institucional - "Injeção direta de string Base64 no atributo src para otimização de custos de servidor" */}
              <img src={member.foto_url} alt={member.nome} className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#0a0a0a]" />
            </div>
            <h4 className="text-xl font-bold uppercase">{member.nome}</h4>
            <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{member.cargo}</span>
            <div className="mt-2 bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{member.titulo}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="estrutura" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Estrutura Organizacional</h2>
          <p className="text-gray-400">Liderança, governança técnica e rede de mestres NEXO.</p>
        </div>
        {/* Antonio Batista - Projeto: MVP Nexo Institucional - "Fix: Garantindo tipagem correta de TeamMember[] via casting no Object.entries do mapeamento organizacional" */}
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
