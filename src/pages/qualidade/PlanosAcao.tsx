import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, ListTodo, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const planosMock = [
  { id: 1, codigo: "PA-2026-001", titulo: "Melhoria do processo de inspeção", origem: "NC-2025-095", responsavel: "João Silva", prazo: "28/02/2026", progresso: 45, status: "Em Andamento" },
  { id: 2, codigo: "PA-2026-002", titulo: "Atualização do sistema documental", origem: "Auditoria Interna", responsavel: "Maria Santos", prazo: "15/03/2026", progresso: 20, status: "Em Andamento" },
  { id: 3, codigo: "PA-2025-018", titulo: "Capacitação da equipe de produção", origem: "Análise de Indicadores", responsavel: "Carlos Lima", prazo: "10/01/2026", progresso: 100, status: "Concluído" },
  { id: 4, codigo: "PA-2025-017", titulo: "Implementação de controles visuais", origem: "Reunião de Análise Crítica", responsavel: "Ana Oliveira", prazo: "08/01/2026", progresso: 80, status: "Atrasado" },
  { id: 5, codigo: "PA-2026-003", titulo: "Revisão de fornecedores críticos", origem: "Gestão de Riscos", responsavel: "Pedro Costa", prazo: "30/04/2026", progresso: 10, status: "Iniciado" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Iniciado": return "bg-blue-500";
    case "Em Andamento": return "bg-yellow-500";
    case "Concluído": return "bg-green-500";
    case "Atrasado": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

export default function PlanosAcao() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Planos de Ação</h1>
            <p className="text-muted-foreground">Gerenciamento de ações corretivas e preventivas</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Planos</CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Ativos no período</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">18</div>
              <p className="text-xs text-muted-foreground">56% do total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">11</div>
              <p className="text-xs text-muted-foreground">Este mês: 5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">Ação necessária</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <CardTitle>Planos de Ação Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planosMock.map((plano) => (
                  <TableRow key={plano.id}>
                    <TableCell className="font-medium">{plano.codigo}</TableCell>
                    <TableCell>{plano.titulo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{plano.origem}</Badge>
                    </TableCell>
                    <TableCell>{plano.responsavel}</TableCell>
                    <TableCell>{plano.prazo}</TableCell>
                    <TableCell className="w-32">
                      <div className="flex items-center gap-2">
                        <Progress value={plano.progresso} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">{plano.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(plano.status)}>{plano.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
