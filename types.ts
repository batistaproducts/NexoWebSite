
export interface TeamMember {
  id: string;
  nome: string;
  foto_url: string; // Base64 string
  cargo: string;
  titulo: string;
}

export interface StructureData {
  [groupName: string]: TeamMember[];
}

export interface Academy {
  id: string;
  nome: string;
  foto_url: string; // Base64 string
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
