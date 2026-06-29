export interface Curso {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  capa: string;
  data_inicio: Date;
  duracao: number;
  inscricoes: number;
  inscrito: boolean; 
  inscricao_cancelada: boolean;
}