import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Wrench, Eye, Edit, CheckCircle, Clock, Calendar } from "lucide-react";

const mockManutencoesCorretivas = [
  { 
    id: "MC-2026-001", 
    equipamento: "Escavadeira Hidráulica CAT 320",
    codigoEquip: "EQ-2024-001",
    problema: "Vazamento no sistema hidráulico",
    prioridade: "Alta",
    abertura: "10/01/2026",
    previsao: "15/01/2026",
    status: "Em Andamento",
    tecnico: "Carlos Mecânico",
    custoEstimado: "R$ 8.500,00"
  },
  { 
    id: "MC-2026-002", 
    equipamento: "Compressor de Ar Atlas",
    codigoEquip: "EQ-2023-089",
    problema: "Motor não liga - verificar partida",
    prioridade: "Urgente",
    abertura: "11/01/2026",
    previsao: "12/01/2026",
    status: "Em Andamento",
    tecnico: "Pedro Eletricista",
    custoEstimado: "R$ 2.200,00"
  },
  { 
    id: "MC-2025-456", 
    equipamento: "Gerador Cummins 150kVA",
    codigoEquip: "EQ-2023-078",
    problema: "Superaquecimento do motor",
    prioridade: "Alta",
    abertura: "28/12/2025",
    previsao: "05/01/2026",
    status: "Concluída",
    tecnico: "João Técnico",
    custoEstimado: "R$ 4.800,00"
  },
];

const mockManutencoesPreventivas = [
  { 
    id: "MP-2026-001", 
    equipamento: "Retroescavadeira JCB 3CX",
    codigoEquip: "EQ-2024-002",
    tipo: "Revisão 500h",
    ultimaExecucao: "15/10/2025",
    proximaExecucao: "15/01/2026",
    horasAtuais: 890,
    horasProxima: 1000,
    status: "Agendada",
    checklist: "12 itens"
  },
  { 
    id: "MP-2026-002", 
    equipamento: "Guindaste Liebherr LTM 1040",
    codigoEquip: "EQ-2023-045",
    tipo: "Inspeção Mensal",
    ultimaExecucao: "15/12/2025",
    proximaExecucao: "15/01/2026",
    horasAtuais: 2100,
    horasProxima: 2200,
    status: "Pendente",
    checklist: "8 itens"
  },
  { 
    id: "MP-2026-003", 
    equipamento: "Escavadeira Hidráulica CAT 320",
    codigoEquip: "EQ-2024-001",
    tipo: "Troca de Óleo",
    ultimaExecucao: "01/11/2025",
    proximaExecucao: "01/02/2026",
    horasAtuais: 1250,
    horasProxima: 1500,
    status: "No Prazo",
    checklist: "5 itens"
  },
  { 
    id: "MP-2025-089", 
    equipamento: "Compactador Dynapac CA250",
    codigoEquip: "EQ-2022-112",
    tipo: "Revisão Geral",
    ultimaExecucao: "01/06/2025",
    proximaExecucao: "01/12/2025",
    horasAtuais: 4200,
    horasProxima: 4000,
    status: "Atrasada",
    checklist: "20 itens"
  },
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

const getStatusPreventivaColor = (status: string) => {
  switch (status) {
    case "Agendada": return "bg-blue-100 text-blue-700";
    case "Pendente": return "bg-yellow-100 text-yellow-700";
    case "No Prazo": return "bg-green-100 text-green-700";
    case "Atrasada": return "bg-red-100 text-red-700";
    case "Concluída": return "bg-emerald-100 text-emerald-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getStatusCorretivaColor = (status: string) => {
  switch (status) {
    case "Em Andamento": return "bg-blue-100 text-blue-700";
    case "Aguardando Peças": return "bg-yellow-100 text-yellow-700";
    case "Concluída": return "bg-green-100 text-green-700";
    case "Cancelada": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Manutencoes() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manutenções</h1>
            <p className="text-muted-foreground mt-1">
              Gestão de manutenções corretivas e preventivas
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Manutenção
          </Button>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">5</p>
                <p className="text-xs text-blue-600">Corretivas em Andamento</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">12</p>
                <p className="text-xs text-green-600">Preventivas no Prazo</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-700">3</p>
                <p className="text-xs text-red-600">Preventivas Atrasadas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">R$ 45K</p>
                <p className="text-xs text-purple-600">Custo Mês Atual</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="corretivas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="corretivas">Manutenções Corretivas</TabsTrigger>
            <TabsTrigger value="preventivas">Manutenções Preventivas</TabsTrigger>
          </TabsList>

          <TabsContent value="corretivas" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar por equipamento ou problema..." className="pl-10" />
                  </div>
                  <Button variant="outline">Prioridade</Button>
                  <Button variant="outline">Status</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-orange-500" />
                  Manutenções Corretivas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Problema</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Abertura</TableHead>
                      <TableHead>Previsão</TableHead>
                      <TableHead>Técnico</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockManutencoesCorretivas.map((manutencao) => (
                      <TableRow key={manutencao.id}>
                        <TableCell className="font-medium">{manutencao.id}</TableCell>
                        <TableCell>
                          <div>
                            <p>{manutencao.equipamento}</p>
                            <p className="text-xs text-muted-foreground">{manutencao.codigoEquip}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{manutencao.problema}</TableCell>
                        <TableCell>
                          <Badge className={getPrioridadeColor(manutencao.prioridade)}>
                            {manutencao.prioridade}
                          </Badge>
                        </TableCell>
                        <TableCell>{manutencao.abertura}</TableCell>
                        <TableCell>{manutencao.previsao}</TableCell>
                        <TableCell>{manutencao.tecnico}</TableCell>
                        <TableCell>
                          <Badge className={getStatusCorretivaColor(manutencao.status)}>
                            {manutencao.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Editar">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {manutencao.status !== "Concluída" && (
                              <Button variant="ghost" size="icon" title="Concluir" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preventivas" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar por equipamento ou tipo..." className="pl-10" />
                  </div>
                  <Button variant="outline">Status</Button>
                  <Button variant="outline">Tipo</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Manutenções Preventivas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Última Execução</TableHead>
                      <TableHead>Próxima Execução</TableHead>
                      <TableHead>Horas</TableHead>
                      <TableHead>Checklist</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockManutencoesPreventivas.map((manutencao) => (
                      <TableRow key={manutencao.id}>
                        <TableCell className="font-medium">{manutencao.id}</TableCell>
                        <TableCell>
                          <div>
                            <p>{manutencao.equipamento}</p>
                            <p className="text-xs text-muted-foreground">{manutencao.codigoEquip}</p>
                          </div>
                        </TableCell>
                        <TableCell>{manutencao.tipo}</TableCell>
                        <TableCell>{manutencao.ultimaExecucao}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {manutencao.proximaExecucao}
                          </div>
                        </TableCell>
                        <TableCell>
                          {manutencao.horasAtuais.toLocaleString()}h / {manutencao.horasProxima.toLocaleString()}h
                        </TableCell>
                        <TableCell>{manutencao.checklist}</TableCell>
                        <TableCell>
                          <Badge className={getStatusPreventivaColor(manutencao.status)}>
                            {manutencao.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Editar">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Executar" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
