"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Plus, Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { Produto } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("Todas");

  useEffect(() => {
    // Mock data
    setProdutos([
      { id: 1, nome: "Smartphone Galaxy S23", descricao: "High-end smartphone", preco: 4500, estoque: 50, categoria: "Eletrônicos" },
      { id: 2, nome: "Notebook Dell XPS 13", descricao: "Ultrabook for productivity", preco: 8900, estoque: 20, categoria: "Computadores" },
      { id: 3, nome: "Monitor LG 27\"", descricao: "4K IPS Monitor", preco: 1800, estoque: 30, categoria: "Acessórios" },
      { id: 4, nome: "Teclado Mecânico RGB", descricao: "Gaming keyboard", preco: 450, estoque: 100, categoria: "Periféricos" },
      { id: 5, nome: "Mouse Gamer G502", descricao: "High precision mouse", preco: 350, estoque: 150, categoria: "Periféricos" },
    ]);
  }, []);

  const filteredProdutos = produtos.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoriaFilter === "Todas" || p.categoria === categoriaFilter;
    return matchesSearch && matchesCategory;
  });

  const categorias = ["Todas", ...Array.from(new Set(produtos.map(p => p.categoria)))];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
          <p className="text-neutral-400">Gerencie seu inventário de produtos.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium">
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="w-full bg-[#141414] border border-[#262626] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-lg px-3 py-2">
          <Filter size={18} className="text-neutral-500" />
          <select 
            className="bg-transparent focus:outline-none text-sm"
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat} className="bg-[#0a0a0a]">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card-premium overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#262626] bg-neutral-900/50">
                <th className="px-6 py-4 text-sm font-semibold text-neutral-400">Produto</th>
                <th className="px-6 py-4 text-sm font-semibold text-neutral-400">Categoria</th>
                <th className="px-6 py-4 text-sm font-semibold text-neutral-400">Preço</th>
                <th className="px-6 py-4 text-sm font-semibold text-neutral-400">Estoque</th>
                <th className="px-6 py-4 text-sm font-semibold text-neutral-400">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-neutral-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {filteredProdutos.map((produto) => (
                <tr key={produto.id} className="hover:bg-neutral-900/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{produto.nome}</div>
                    <div className="text-xs text-neutral-500 truncate max-w-[200px]">{produto.descricao}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-neutral-800 px-2 py-1 rounded text-neutral-300">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(produto.preco)}</td>
                  <td className="px-6 py-4 text-neutral-300">{produto.estoque} un</td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      produto.estoque > 10 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                    )}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", produto.estoque > 10 ? "bg-emerald-500" : "bg-amber-500")} />
                      {produto.estoque > 10 ? "Em Estoque" : "Baixo Estoque"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
