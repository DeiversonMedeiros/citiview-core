import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Gavel, ScrollText, FilePlus, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const mockStats = [
  { title: "Propostas Ativas", value: "24", icon: FileText, trend: "+3 este mês" },
  { title: "Licitações em Andamento", value: "8", icon: Gavel, trend: "2 próximas do prazo" },
  { title: "Contratos Vigentes", value: "45", icon: ScrollText, trend: "3 vencem em 30 dias" },
  { title: "Aditivos Pendentes", value: "6", icon: FilePlus, trend: "2 aguardando aprovação" },
];

const mockPropostas = [
  { id: "PROP-2026-001", cliente: "Prefeitura Municipal de São Paulo", valor: "R$ 2.500.000,00", status: "Em Análise", prazo: "20/01/2026" },
  { id: "PROP-2026-002", cliente: "Governo do Estado RJ", valor: "R$ 1.800.000,00", status: "Aprovada", prazo: "15/01/2026" },
  { id: "PROP-2026-003", cliente: "SABESP", valor: "R$ 3.200.000,00", status: "Pendente", prazo: "25/01/2026" },
];

const mockContratosVencendo = [
  { numero: "CT-2024-089", cliente: "Prefeitura de Campinas", vencimento: "15/02/2026", valor: "R$ 450.000,00" },
  { numero: "CT-2024-067", cliente: "CDHU", vencimento: "28/02/2026", valor: "R$ 890.000,00" },
  { numero: "CT-2023-145", cliente: "DER-SP", vencimento: "10/03/2026", valor: "R$ 1.200.000,00" },
];

export default function ComercialDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Comercial</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral de propostas, licitações e contratos
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Propostas Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Propostas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPropostas.map((proposta) => (
                  <div key={proposta.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{proposta.id}</p>
                      <p className="text-sm text-muted-foreground">{proposta.cliente}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{proposta.valor}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        proposta.status === "Aprovada" ? "bg-green-100 text-green-700" :
                        proposta.status === "Em Análise" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {proposta.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contratos Próximos do Vencimento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Contratos Próximos do Vencimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockContratosVencendo.map((contrato) => (
                  <div key={contrato.numero} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{contrato.numero}</p>
                      <p className="text-sm text-muted-foreground">{contrato.cliente}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{contrato.valor}</p>
                      <p className="text-xs text-yellow-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {contrato.vencimento}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Visual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Pipeline Comercial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Prospecção</p>
              </div>
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Proposta Enviada</p>
              </div>
              <div className="text-center p-4 bg-yellow-100 rounded-lg">
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Em Negociação</p>
              </div>
              <div className="text-center p-4 bg-orange-100 rounded-lg">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Aprovação Final</p>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Contratado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
