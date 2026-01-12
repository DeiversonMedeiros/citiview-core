import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  Wrench,
  Truck,
  MapPin,
  Building2,
  ChevronDown,
  ChevronRight,
  UserCircle,
  ClipboardCheck,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: { title: string; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Portal Colaborador",
    icon: UserCircle,
    children: [
      { title: "Registro de Ponto", path: "/colaborador/registro-ponto" },
      { title: "Correção de Ponto", path: "/colaborador/correcao-ponto" },
      { title: "Assinatura de Ponto", path: "/colaborador/assinatura-ponto" },
      { title: "Banco de Horas", path: "/colaborador/banco-horas" },
      { title: "Férias", path: "/colaborador/ferias" },
      { title: "Contra Cheque", path: "/colaborador/contra-cheque" },
      { title: "Reembolso", path: "/colaborador/reembolso" },
      { title: "Atestados", path: "/colaborador/atestados" },
      { title: "Exames Periódicos", path: "/colaborador/exames-periodicos" },
      { title: "Comprovante IR", path: "/colaborador/comprovante-ir" },
    ],
  },
  {
    title: "Portal Gestor",
    icon: ClipboardCheck,
    children: [
      { title: "Central de Aprovações", path: "/gestor/central-aprovacoes" },
      { title: "Acompanhamento Ponto", path: "/gestor/acompanhamento-ponto" },
      { title: "Aprovação Férias", path: "/gestor/aprovacao-ferias" },
      { title: "Aprovação Reembolso", path: "/gestor/aprovacao-reembolso" },
      { title: "Aprovação Assinatura", path: "/gestor/aprovacao-assinatura-ponto" },
      { title: "Acompanhamento Exames", path: "/gestor/acompanhamento-exames" },
    ],
  },
  {
    title: "Core",
    icon: Settings,
    children: [
      { title: "Usuários", path: "/core/usuarios" },
      { title: "Perfis", path: "/core/perfis" },
      { title: "Empresas", path: "/core/empresas" },
      { title: "Parâmetros", path: "/core/parametros" },
    ],
  },
  {
    title: "RH",
    icon: Users,
    children: [
      { title: "Colaboradores", path: "/rh/colaboradores" },
      { title: "Cargos", path: "/rh/cargos" },
      { title: "Equipes", path: "/rh/equipes" },
      { title: "Escalas", path: "/rh/escalas" },
    ],
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    children: [
      { title: "Contas a Pagar", path: "/financeiro/contas-pagar" },
      { title: "Contas a Receber", path: "/financeiro/contas-receber" },
      { title: "Fluxo de Caixa", path: "/financeiro/fluxo-caixa" },
      { title: "Centros de Custo", path: "/financeiro/centros-custo" },
    ],
  },
  {
    title: "Compras",
    icon: ShoppingCart,
    children: [
      { title: "Fornecedores", path: "/compras/fornecedores" },
      { title: "Solicitações", path: "/compras/solicitacoes" },
      { title: "Pedidos", path: "/compras/pedidos" },
      { title: "Aprovações", path: "/compras/aprovacoes" },
    ],
  },
  {
    title: "Almoxarifado",
    icon: Package,
    children: [
      { title: "Materiais", path: "/almoxarifado/materiais" },
      { title: "Estoques", path: "/almoxarifado/estoques" },
      { title: "Movimentações", path: "/almoxarifado/movimentacoes" },
    ],
  },
  {
    title: "Operações",
    icon: Wrench,
    children: [
      { title: "Ordens de Serviço", path: "/operacoes/ordens-servico" },
      { title: "Manutenção Corretiva", path: "/operacoes/manutencao-corretiva" },
      { title: "Manutenção Preventiva", path: "/operacoes/manutencao-preventiva" },
      { title: "Ativos", path: "/operacoes/ativos" },
    ],
  },
  {
    title: "Frota",
    icon: Truck,
    children: [
      { title: "Veículos", path: "/frota/veiculos" },
      { title: "Condutores", path: "/frota/condutores" },
      { title: "Abastecimentos", path: "/frota/abastecimentos" },
      { title: "Manutenções", path: "/frota/manutencoes" },
    ],
  },
  {
    title: "Logística",
    icon: MapPin,
    children: [
      { title: "Rotas", path: "/logistica/rotas" },
      { title: "Deslocamentos", path: "/logistica/deslocamentos" },
      { title: "Viagens", path: "/logistica/viagens" },
    ],
  },
  {
    title: "Qualidade",
    icon: Award,
    children: [
      { title: "Gestão de Documentos", path: "/qualidade/gestao-documentos" },
      { title: "Gestão de Indicadores", path: "/qualidade/gestao-indicadores" },
      { title: "Gestão de Riscos", path: "/qualidade/gestao-riscos" },
      { title: "Não Conformidades", path: "/qualidade/nao-conformidades" },
      { title: "Auditorias", path: "/qualidade/auditorias" },
      { title: "Planos de Ação", path: "/qualidade/planos-acao" },
      { title: "Reuniões", path: "/qualidade/reunioes" },
      { title: "Calibração", path: "/qualidade/calibracao" },
      { title: "Planej. Estratégico", path: "/qualidade/planejamento-estrategico" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Dashboard"]);

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children?: { path: string }[]) =>
    children?.some((child) => location.pathname === child.path);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Building2 className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">CitiView</h1>
          <p className="text-xs text-sidebar-foreground/60">ERP</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-scrollbar h-[calc(100vh-4rem)] overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isParentActive(item.children)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </div>
                    {expandedMenus.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedMenus.includes(item.title) && item.children && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive(child.path)
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}