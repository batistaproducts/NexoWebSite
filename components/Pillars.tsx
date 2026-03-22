
import React from 'react';
import { Pillar } from '../types';

// Antonio Batista - MVP Nexo Institucional - 22/03/2026
const PILLARS: Pillar[] = [
  {
    title: "Conexão",
    description: "Apoio mútuo e desenvolvimento constante da rede. Nenhum mestre caminha sozinho na NEXO.",
    icon: "🤝"
  },
  {
    title: "Autonomia",
    description: "A [NEXO] foca no suporte e não no controle dos mestres. Nosso foco é a evolução constate! Não interferimos em valores de mensalidades ou equipamentos.",
    icon: "🔓"
  },
  {
    title: "Social",
    description: "Compromisso real: 20% de todas as nossas taxas são destinadas a ações de impacto social.",
    icon: "🌍"
  },
  {
    title: "Metodologia",
    description: "Eficiência técnica e progressão pedagógica rigorosa validada pelo nosso Conselho Superior.",
    icon: "🥋"
  }
];

const Pillars: React.FC = () => {
  return (
    <section id="equipe" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">A Equipe & Cultura</h2>
            <p className="text-gray-400 text-lg">Os 4 pilares que sustentam a maior revolução pedagógica e financeira do BJJ.</p>
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-white/40">
            [ NEXO BJJ PROTOCOLO ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl group hover:border-white/30 transition-all">
              <div className="text-4xl mb-6">{p.icon}</div>
              <h3 className="text-xl font-bold uppercase mb-4 group-hover:text-white transition-colors">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
