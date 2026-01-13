import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog, Wrench, AlertTriangle, CheckCircle, Clock, TrendingUp, Activity } from "lucide-react";

const mockStats = [
  { title: "Total de Equipamentos", value: "156", icon: Cog, trend: "+5 este mês" },
  { title: "Em Operação", value: "142", icon: CheckCircle, trend: "91% disponibilidade" },
  { title: "Em Manutenção", value: "8", icon: Wrench, trend: "3 corretivas, 5 preventivas" },
  { title: "Chamados Abertos", value: "12", icon: AlertTriangle, trend: "4 urgentes" },
];

const mockEquipamentosParados = [
  { codigo: "EQ-2024-045", nome: "Escavadeira Hidráulica CAT 320", motivo: "Manutenção Corretiva", previsao: "15/01/2026", horasParado: 48 },
  { codigo: "EQ-2024-089", nome: "Retroescavadeira JCB 3CX", motivo: "Manutenção Preventiva", previsao: "14/01/2026", horasParado: 24 },
  { codigo: "EQ-2023-112", nome: "Compactador Rolo Liso", motivo: "Aguardando Peças", previsao: "18/01/2026", horasParado: 72 },
];

const mockChamadosRecentes = [
  { id: "CH-2026-001", equipamento: "Guindaste Telescópico", tipo: "Corretiva", prioridade: "Alta", status: "Em Andamento", abertura: "12/01/2026" },
  { id: "CH-2026-002", equipamento: "Gerador 150kVA", tipo: "Preventiva", prioridade: "Normal", status: "Agendado", abertura: "11/01/2026" },
  { id: "CH-2026-003", equipamento: "Compressor de Ar", tipo: "Corretiva", prioridade: "Urgente", status: "Em Andamento", abertura: "11/01/2026" },
  { id: "CH-2026-004", equipamento: "Bomba Hidráulica", tipo: "Inspeção", prioridade: "Baixa", status: "Pendente", abertura: "10/01/2026" },
];

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "Urgente": return "bg-red-100 text-red-700";
    case "Alta": return "bg-orange-100 text-orange-700";
    case "Normal": return "bg-blue-100 text-blue-700";
    case "Baixa": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function MaquinasDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard de Máquinas e Equipamentos</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do parque de equipamentos e manutenções
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
          {/* Equipamentos Parados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Equipamentos Parados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEquipamentosParados.map((equip) => (
                  <div key={equip.codigo} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{equip.codigo}</p>
                      <p className="text-sm text-muted-foreground">{equip.nome}</p>
                      <p className="text-xs text-yellow-600">{equip.motivo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {equip.horasParado}h parado
                      </p>
                      <p className="text-xs text-muted-foreground">Previsão: {equip.previsao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chamados Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Chamados Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChamadosRecentes.map((chamado) => (
                  <div key={chamado.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{chamado.id}</p>
                      <p className="text-sm text-muted-foreground">{chamado.equipamento}</p>
                      <p className="text-xs">{chamado.tipo}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPrioridadeColor(chamado.prioridade)}`}>
                        {chamado.prioridade}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{chamado.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Indicadores de Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Indicadores de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">91%</p>
                <p className="text-sm text-green-600">Disponibilidade</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">4.2h</p>
                <p className="text-sm text-blue-600">MTTR Médio</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-700">320h</p>
                <p className="text-sm text-purple-600">MTBF Médio</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-700">85%</p>
                <p className="text-sm text-orange-600">Preventivas em Dia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
