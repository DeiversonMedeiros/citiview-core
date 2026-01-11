import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminClientes from "./pages/admin/Clientes";
import AdminPlanos from "./pages/admin/Planos";
import AdminEmpresas from "./pages/admin/Empresas";
import AdminLogs from "./pages/admin/Logs";
import AdminMetricas from "./pages/admin/Metricas";
import AdminFaturamento from "./pages/admin/Faturamento";
import AdminConfiguracoes from "./pages/admin/Configuracoes";

// Core
import CoreUsuarios from "./pages/core/Usuarios";
import CorePerfis from "./pages/core/Perfis";
import CoreEmpresas from "./pages/core/Empresas";
import CoreParametros from "./pages/core/Parametros";

// RH
import RHColaboradores from "./pages/rh/Colaboradores";
import RHCargos from "./pages/rh/Cargos";
import RHEquipes from "./pages/rh/Equipes";
import RHEscalas from "./pages/rh/Escalas";

// Financeiro
import FinanceiroContasPagar from "./pages/financeiro/ContasPagar";
import FinanceiroContasReceber from "./pages/financeiro/ContasReceber";
import FinanceiroFluxoCaixa from "./pages/financeiro/FluxoCaixa";
import FinanceiroCentrosCusto from "./pages/financeiro/CentrosCusto";

// Compras
import ComprasFornecedores from "./pages/compras/Fornecedores";
import ComprasSolicitacoes from "./pages/compras/Solicitacoes";
import ComprasPedidos from "./pages/compras/Pedidos";
import ComprasAprovacoes from "./pages/compras/Aprovacoes";

// Almoxarifado
import AlmoxarifadoMateriais from "./pages/almoxarifado/Materiais";
import AlmoxarifadoEstoques from "./pages/almoxarifado/Estoques";
import AlmoxarifadoMovimentacoes from "./pages/almoxarifado/Movimentacoes";

// Operações
import OperacoesOrdensServico from "./pages/operacoes/OrdensServico";
import OperacoesManutencaoCorretiva from "./pages/operacoes/ManutencaoCorretiva";
import OperacoesManutencaoPreventiva from "./pages/operacoes/ManutencaoPreventiva";
import OperacoesAtivos from "./pages/operacoes/Ativos";

// Frota
import FrotaVeiculos from "./pages/frota/Veiculos";
import FrotaCondutores from "./pages/frota/Condutores";
import FrotaAbastecimentos from "./pages/frota/Abastecimentos";
import FrotaManutencoes from "./pages/frota/Manutencoes";

// Logística
import LogisticaRotas from "./pages/logistica/Rotas";
import LogisticaDeslocamentos from "./pages/logistica/Deslocamentos";
import LogisticaViagens from "./pages/logistica/Viagens";

// Portal Colaborador
import ColaboradorRegistroPonto from "./pages/colaborador/RegistroPonto";
import ColaboradorCorrecaoPonto from "./pages/colaborador/CorrecaoPonto";
import ColaboradorAssinaturaPonto from "./pages/colaborador/AssinaturaPonto";
import ColaboradorBancoHoras from "./pages/colaborador/BancoHoras";
import ColaboradorFerias from "./pages/colaborador/Ferias";
import ColaboradorContraCheque from "./pages/colaborador/ContraCheque";
import ColaboradorReembolso from "./pages/colaborador/Reembolso";
import ColaboradorAtestados from "./pages/colaborador/Atestados";
import ColaboradorExamesPeriodicos from "./pages/colaborador/ExamesPeriodicos";
import ColaboradorComprovanteIR from "./pages/colaborador/ComprovanteIR";

// Portal Gestor
import GestorCentralAprovacoes from "./pages/gestor/CentralAprovacoes";
import GestorAcompanhamentoPonto from "./pages/gestor/AcompanhamentoPonto";
import GestorAprovacaoFerias from "./pages/gestor/AprovacaoFerias";
import GestorAprovacaoReembolso from "./pages/gestor/AprovacaoReembolso";
import GestorAprovacaoAssinaturaPonto from "./pages/gestor/AprovacaoAssinaturaPonto";
import GestorAcompanhamentoExames from "./pages/gestor/AcompanhamentoExames";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/clientes" element={<AdminClientes />} />
          <Route path="/admin/planos" element={<AdminPlanos />} />
          <Route path="/admin/empresas" element={<AdminEmpresas />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/metricas" element={<AdminMetricas />} />
          <Route path="/admin/faturamento" element={<AdminFaturamento />} />
          <Route path="/admin/configuracoes" element={<AdminConfiguracoes />} />
          
          {/* Core */}
          <Route path="/core/usuarios" element={<CoreUsuarios />} />
          <Route path="/core/perfis" element={<CorePerfis />} />
          <Route path="/core/empresas" element={<CoreEmpresas />} />
          <Route path="/core/parametros" element={<CoreParametros />} />
          
          {/* RH */}
          <Route path="/rh/colaboradores" element={<RHColaboradores />} />
          <Route path="/rh/cargos" element={<RHCargos />} />
          <Route path="/rh/equipes" element={<RHEquipes />} />
          <Route path="/rh/escalas" element={<RHEscalas />} />
          
          {/* Financeiro */}
          <Route path="/financeiro/contas-pagar" element={<FinanceiroContasPagar />} />
          <Route path="/financeiro/contas-receber" element={<FinanceiroContasReceber />} />
          <Route path="/financeiro/fluxo-caixa" element={<FinanceiroFluxoCaixa />} />
          <Route path="/financeiro/centros-custo" element={<FinanceiroCentrosCusto />} />
          
          {/* Compras */}
          <Route path="/compras/fornecedores" element={<ComprasFornecedores />} />
          <Route path="/compras/solicitacoes" element={<ComprasSolicitacoes />} />
          <Route path="/compras/pedidos" element={<ComprasPedidos />} />
          <Route path="/compras/aprovacoes" element={<ComprasAprovacoes />} />
          
          {/* Almoxarifado */}
          <Route path="/almoxarifado/materiais" element={<AlmoxarifadoMateriais />} />
          <Route path="/almoxarifado/estoques" element={<AlmoxarifadoEstoques />} />
          <Route path="/almoxarifado/movimentacoes" element={<AlmoxarifadoMovimentacoes />} />
          
          {/* Operações */}
          <Route path="/operacoes/ordens-servico" element={<OperacoesOrdensServico />} />
          <Route path="/operacoes/manutencao-corretiva" element={<OperacoesManutencaoCorretiva />} />
          <Route path="/operacoes/manutencao-preventiva" element={<OperacoesManutencaoPreventiva />} />
          <Route path="/operacoes/ativos" element={<OperacoesAtivos />} />
          
          {/* Frota */}
          <Route path="/frota/veiculos" element={<FrotaVeiculos />} />
          <Route path="/frota/condutores" element={<FrotaCondutores />} />
          <Route path="/frota/abastecimentos" element={<FrotaAbastecimentos />} />
          <Route path="/frota/manutencoes" element={<FrotaManutencoes />} />
          
          {/* Logística */}
          <Route path="/logistica/rotas" element={<LogisticaRotas />} />
          <Route path="/logistica/deslocamentos" element={<LogisticaDeslocamentos />} />
          <Route path="/logistica/viagens" element={<LogisticaViagens />} />
          
          {/* Portal Colaborador */}
          <Route path="/colaborador/registro-ponto" element={<ColaboradorRegistroPonto />} />
          <Route path="/colaborador/correcao-ponto" element={<ColaboradorCorrecaoPonto />} />
          <Route path="/colaborador/assinatura-ponto" element={<ColaboradorAssinaturaPonto />} />
          <Route path="/colaborador/banco-horas" element={<ColaboradorBancoHoras />} />
          <Route path="/colaborador/ferias" element={<ColaboradorFerias />} />
          <Route path="/colaborador/contra-cheque" element={<ColaboradorContraCheque />} />
          <Route path="/colaborador/reembolso" element={<ColaboradorReembolso />} />
          <Route path="/colaborador/atestados" element={<ColaboradorAtestados />} />
          <Route path="/colaborador/exames-periodicos" element={<ColaboradorExamesPeriodicos />} />
          <Route path="/colaborador/comprovante-ir" element={<ColaboradorComprovanteIR />} />
          
          {/* Portal Gestor */}
          <Route path="/gestor/central-aprovacoes" element={<GestorCentralAprovacoes />} />
          <Route path="/gestor/acompanhamento-ponto" element={<GestorAcompanhamentoPonto />} />
          <Route path="/gestor/aprovacao-ferias" element={<GestorAprovacaoFerias />} />
          <Route path="/gestor/aprovacao-reembolso" element={<GestorAprovacaoReembolso />} />
          <Route path="/gestor/aprovacao-assinatura-ponto" element={<GestorAprovacaoAssinaturaPonto />} />
          <Route path="/gestor/acompanhamento-exames" element={<GestorAcompanhamentoExames />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;