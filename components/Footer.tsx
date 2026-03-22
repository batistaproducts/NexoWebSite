
import React, { useState, useEffect } from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'about' | 'structure' | 'academies', anchor?: string) => void;
}

// Antonio Batista - MVP Nexo Institucional - 17/03/2026
const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('./data/config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Config fetch error", err));
  }, []);

  // Antonio Batista - MVP Nexo Institucional - 17/03/2026
  const PLACEHOLDER_CNPJ = "00.000.000/0001-00";

  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div 
              className="flex items-center space-x-2 mb-6 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                <span className="text-black font-extrabold text-lg">N</span>
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase">NEXO BJJ</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              A NEXO BJJ não é apenas uma equipe de jiu-jitsu. É um movimento de autonomia e conexão marcial.
            </p>
            <div className="flex space-x-4">
              <a href={config?.socialLinks?.instagram || "#"} target="_blank" className="text-gray-400 hover:text-white transition-colors text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={config?.socialLinks?.facebook || "#"} target="_blank" className="text-gray-400 hover:text-white transition-colors text-xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href={config?.socialLinks?.youtube || "#"} target="_blank" className="text-gray-400 hover:text-white transition-colors text-xl">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors uppercase text-left">Início</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors uppercase text-left">Cultura & Pilares</button></li>
              <li><button onClick={() => onNavigate('structure')} className="hover:text-white transition-colors uppercase text-left">Organograma</button></li>
              <li><button onClick={() => onNavigate('academies')} className="hover:text-white transition-colors uppercase text-left">Onde Treinar</button></li>
            </ul>
          </div>

          {/* Antonio Batista - MVP Nexo Institucional - 17/03/2026 */}
          <div className="hidden">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Institucional</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors uppercase text-left">Sobre a NEXO</button></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase block">Portal do Mestre</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase block">Logística</a></li>
              <li><a href="#" className="hover:text-white transition-colors uppercase block">Suporte</a></li>
            </ul>
          </div>

          <div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">🌱</div>
                <span className="text-xs font-bold uppercase tracking-wider text-white">Selo Social NEXO</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">
                Certificamos que 20% das taxas de rede são integralmente destinadas a projetos sociais validados.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          <span>© 2024 NEXO BJJ PROTOCOLO - Todos os direitos reservados.</span>
          
          {/* Antonio Batista - MVP Nexo Institucional - 17/03/2026 */}
          {config?.cnpj && config.cnpj !== PLACEHOLDER_CNPJ && (
            <span>CNPJ: {config.cnpj}</span>
          )}

          <div className="flex items-center space-x-2">
            <span>Desenvolvido com Conexão</span>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
