import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Shield,
  Building2,
  CreditCard,
  Users,
  BarChart3,
  ScrollText,
  Receipt,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { icon: BarChart3, label: "Dashboard", path: "/admin" },
  { icon: Building2, label: "Clientes (Tenants)", path: "/admin/clientes" },
  { icon: CreditCard, label: "Planos e Preços", path: "/admin/planos" },
  { icon: Users, label: "Empresas", path: "/admin/empresas" },
  { icon: ScrollText, label: "Logs Globais", path: "/admin/logs" },
  { icon: BarChart3, label: "Métricas de Uso", path: "/admin/metricas" },
  { icon: Receipt, label: "Faturamento", path: "/admin/faturamento" },
  { icon: Settings, label: "Configurações", path: "/admin/configuracoes" },
];

export function AdminSidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-amber-600 to-orange-600 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-xl font-bold">CitiView</h1>
            <span className="text-xs text-white/70">Administração</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto admin-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus.includes(item.label);
          const active = isActive(item.path);

          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-white/10 text-white/90"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </div>
                  {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children?.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          cn(
                            "block px-3 py-2 rounded-lg text-sm transition-colors",
                            isActive
                              ? "bg-white/20 text-white font-medium"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          )
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.path!}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-white/20 text-white"
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/20">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Voltar ao ERP
        </NavLink>
      </div>
    </aside>
  );
}
