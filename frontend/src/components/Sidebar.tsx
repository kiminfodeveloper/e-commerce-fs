"use client";

import { LayoutDashboard, ShoppingBag, Users, Settings, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Produtos", href: "/produtos" },
  { icon: ShoppingBag, label: "Pedidos", href: "/pedidos" },
  { icon: Users, label: "Clientes", href: "/clientes" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#262626] bg-[#0a0a0a] p-6 z-50">
      <div className="flex items-center gap-3 mb-10 text-blue-500">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <ShoppingBag size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">EcoDash</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-500/10 text-blue-500" 
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100 rounded-lg transition-colors">
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
}
