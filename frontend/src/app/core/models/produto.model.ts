export interface Produto {
  id: string;
  nome: string;
  saldo: number;
}

export interface CriarProdutoRequest {
  nome: string;
  saldo: number;
}
