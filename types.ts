
// Antonio Batista - Projeto: MVP Nexo Institucional - "Interfaces globais para estruturação de dados dinâmicos vindos de arquivos JSON"

export interface TeamMember {
  id: string;
  nome: string;
  foto_url: string; // Espera string Base64 completa
  cargo: string;
  titulo: string;
}

// Antonio Batista - Projeto: MVP Nexo Institucional - "Estrutura dinâmica para o organograma, permitindo múltiplos grupos como Fundadores e Mestres"
export interface StructureData {
  [groupName: string]: TeamMember[];
}

export interface Academy {
  id: string;
  nome: string;
  foto_url: string;
  endereco: string;
  cidade: string;
  estado: string;
  mestre_responsavel: string;
}

export interface Pillar {
  title: string;
  description: string;
  icon: string;
}
