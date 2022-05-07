export interface Venda {
  _id?: any;
  contato?: string;
  status?: string;
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

export interface VendaCliente {
  _id?: any;
  contato?: string;
  nota?: string;
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
