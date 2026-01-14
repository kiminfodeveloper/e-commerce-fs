export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataCriacao: string;
}

export interface Pedido {
  id: number;
  cliente: Cliente;
  dataPedido: string;
  valorTotal: number;
  status: 'PENDENTE' | 'PROCESSANDO' | 'ENVIADO' | 'ENTREGUE' | 'CANCELADO';
}

export interface DashboardStats {
  totalVendas: number;
  totalPedidos: number;
  totalClientes: number;
  totalProdutos: number;
  novosClientes: number;
}

export interface ChartData {
  name: string;
  vendas: number;
}
