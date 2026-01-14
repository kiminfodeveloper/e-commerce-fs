"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight 
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { DashboardStats, ChartData } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Simulate API Fetch or use fetch() if backend is running
    // fetch("http://localhost:8080/api/dashboard/stats")...
    
    // Mocking for immediate feedback
    setStats({
      totalVendas: 45890.00,
      totalPedidos: 124,
      totalClientes: 4,
      totalProdutos: 48,
      novosClientes: 12
    });

    setChartData([
      { name: "Jan", vendas: 4000 },
      { name: "Fev", vendas: 3000 },
      { name: "Mar", vendas: 2000 },
      { name: "Abr", vendas: 2780 },
      { name: "Mai", vendas: 1890 },
      { name: "Jun", vendas: 2390 },
      { name: "Jul", vendas: 3490 },
    ]);
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-neutral-400">Bem-vindo de volta ao seu painel de controle.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total de Vendas" 
          value={formatCurrency(stats.totalVendas)} 
          icon={DollarSign}
          trend="+12.5%"
          color="text-blue-500"
        />
        <StatCard 
          title="Novos Clientes" 
          value={stats.novosClientes.toString()} 
          icon={Users}
          trend="+5.2%"
          color="text-emerald-500"
        />
        <StatCard 
          title="Pedidos Totais" 
          value={stats.totalPedidos.toString()} 
          icon={ShoppingBag}
          trend="+18%"
          color="text-violet-500"
        />
        <StatCard 
          title="Produtos" 
          value={stats.totalProdutos.toString()} 
          icon={TrendingUp}
          trend="+2"
          color="text-amber-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 card-premium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Visão Geral de Vendas</h3>
            <span className="text-xs text-neutral-400 bg-neutral-900 px-2 py-1 rounded">Mensal</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#737373" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#737373" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `R$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid #262626',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 card-premium">
          <h3 className="font-semibold text-lg mb-6">Atividade Recente</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-blue-500 font-bold">
                  {i === 1 ? 'MS' : i === 2 ? 'JP' : i === 3 ? 'AB' : 'RC'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo pedido realizado</p>
                  <p className="text-xs text-neutral-500">Há {i * 2} horas</p>
                </div>
                <div className="text-sm font-semibold">
                  {formatCurrency(Math.random() * 500)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <div className="card-premium group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg bg-neutral-900 group-hover:scale-110 transition-transform", color)}>
          <Icon size={20} />
        </div>
        <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
          {trend}
          <ArrowUpRight size={14} />
        </div>
      </div>
      <div>
        <p className="text-sm text-neutral-400 mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
