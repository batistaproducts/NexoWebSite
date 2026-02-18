
import React from 'react';
import Pillars from '../components/Pillars';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter mb-8 leading-none">
            Nossa <span className="text-gray-500">Cultura</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            A NEXO nasceu do desejo de transformar a realidade dos professores e mestres de Jiu-Jitsu Brasileiro. 
            Acreditamos que a técnica refinada deve caminhar lado a lado com a sustentabilidade financeira e o 
            propósito social. Não somos apenas uma equipe; somos um protocolo de evolução.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400">
            <div>
              <h2 className="text-white font-bold uppercase tracking-widest mb-4">A Visão</h2>
              <p>Ser o maior ecossistema de apoio ao mestre de BJJ, garantindo que o conhecimento técnico seja preservado enquanto a rede prospera economicamente.</p>
            </div>
            <div>
              <h2 className="text-white font-bold uppercase tracking-widest mb-4">O Compromisso</h2>
              <p>Transparência total em nossas taxas e destino de recursos. O selo social de 20% não é uma meta, é o nosso ponto de partida.</p>
            </div>
          </div>
        </div>
      </section>

      <Pillars />

      <section className="container mx-auto px-6 mt-20">
        <div className="glass-card p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold uppercase mb-6">Pronto para o Próximo Passo?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">Junte-se a uma rede que valoriza seu trabalho e oferece autonomia real para sua academia prosperar.</p>
          <button 
            onClick={() => window.open("https://forms.gle/NEXOBJJMasterRegistrationExample", "_blank")}
            className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Fazer Parte do Conselho
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
