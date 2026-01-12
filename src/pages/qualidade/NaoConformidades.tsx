import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

const ncMock = [
  { id: 1, numero: "NC-2026-001", descricao: "Produto fora de especificação", tipo: "Produto", origem: "Auditoria Interna", dataAbertura: "08/01/2026", status: "Em Análise", responsavel: "João Silva" },
  { id: 2, numero: "NC-2026-002", descricao: "Procedimento não seguido", tipo: "Processo", origem: "Inspeção", dataAbertura: "06/01/2026", status: "Ação Corretiva", responsavel: "Maria Santos" },
  { id: 3, numero: "NC-2026-003", descricao: "Calibração vencida", tipo: "Equipamento", origem: "Verificação", dataAbertura: "05/01/2026", status: "Verificação", responsavel: "Carlos Lima" },
  { id: 4, numero: "NC-2025-098", descricao: "Documento desatualizado", tipo: "Documento", origem: "Auditoria Externa", dataAbertura: "20/12/2025", status: "Fechada", responsavel: "Ana Oliveira" },
  { id: 5, numero: "NC-2025-097", descricao: "Falha no treinamento", tipo: "Pessoal", origem: "Reclamação", dataAbertura: "18/12/2025", status: "Fechada", responsavel: "Pedro Costa" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Em Análise": return "bg-blue-500";
    case "Ação Corretiva": return "bg-yellow-500";
    case "Verificação": return "bg-purple-500";
    case "Fechada": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

export default function NaoConformidades() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Não Conformidades</h1>
            <p className="text-muted-foreground">Registro e tratamento de não conformidades</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nova NC
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abertas</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-muted-foreground">+3 esta semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Tratamento</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <p className="text-xs text-muted-foreground">Aguardando ações</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fechadas (Mês)</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">15</div>
              <p className="text-xs text-muted-foreground">Taxa de resolução: 94%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2</div>
              <p className="text-xs text-muted-foreground">Prazo expirado</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Registro de Não Conformidades</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar NC..." className="pl-9 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Data Abertura</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ncMock.map((nc) => (
                  <TableRow key={nc.id}>
                    <TableCell className="font-medium">{nc.numero}</TableCell>
                    <TableCell>{nc.descricao}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{nc.tipo}</Badge>
                    </TableCell>
                    <TableCell>{nc.origem}</TableCell>
                    <TableCell>{nc.dataAbertura}</TableCell>
                    <TableCell>{nc.responsavel}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(nc.status)}>{nc.status}</Badge>
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
