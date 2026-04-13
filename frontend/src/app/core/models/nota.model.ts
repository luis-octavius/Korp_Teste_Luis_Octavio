export interface Nota {
  id: string;
  num_seq: number;
  status: 'ABERTA' | 'FECHADA';
}

export interface ItemNota {
  id: string;
  produto_id: string;
  produto_nome: string;
  quantidade: number;
}

export interface NotaDetalhe extends Nota {
  created_at: string;
  printed_at?: string;
  items: ItemNota[];
}

export interface ItemNotaRequest {
  produto_id: string;
  quantidade: number;
}

export interface AdicionarItensRequest {
  items: ItemNotaRequest[];
}

export interface ImprimirNotaResponse {
  id: string;
  num_seq: number;
  status: 'FECHADA';
  printed_at: string;
}
