export interface Admin {
  _id?: any;
  contato?: string;
  listaVenda?: [
    {
      products?: string;
      quantidade?: number;
      estoque?: any;
      total?: number;
    }
  ];
  enderecoEntrega?: string;
  saiu_p_entrega?: boolean;
  vendaBoa?: boolean;
  historico?: any;
  caixa?: number;
  payment?: string;
  enviado: boolean;
}
