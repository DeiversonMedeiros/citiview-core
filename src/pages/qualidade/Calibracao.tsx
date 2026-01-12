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
import { Plus, Search, Gauge, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const instrumentosMock = [
  { id: 1, tag: "INS-001", descricao: "Paquímetro Digital 150mm", tipo: "Dimensional", ultimaCalibracao: "10/07/2025", proximaCalibracao: "10/01/2026", status: "Vencendo" },
  { id: 2, tag: "INS-002", descricao: "Micrômetro Externo 0-25mm", tipo: "Dimensional", ultimaCalibracao: "15/08/2025", proximaCalibracao: "15/02/2026", status: "Calibrado" },
  { id: 3, tag: "INS-003", descricao: "Balança Analítica 0.001g", tipo: "Massa", ultimaCalibracao: "01/06/2025", proximaCalibracao: "01/12/2025", status: "Vencido" },
  { id: 4, tag: "INS-004", descricao: "Termômetro Digital", tipo: "Temperatura", ultimaCalibracao: "20/09/2025", proximaCalibracao: "20/03/2026", status: "Calibrado" },
  { id: 5, tag: "INS-005", descricao: "Manômetro 0-10 bar", tipo: "Pressão", ultimaCalibracao: "05/10/2025", proximaCalibracao: "05/04/2026", status: "Calibrado" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Calibrado": return "bg-green-500";
    case "Vencendo": return "bg-yellow-500";
    case "Vencido": return "bg-red-500";
    case "Em Calibração": return "bg-blue-500";
    default: return "bg-gray-500";
  }
};

export default function Calibracao() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calibração</h1>
            <p className="text-muted-foreground">Controle de instrumentos de medição e calibração</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Instrumento
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Instrumentos</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">Ativos no sistema</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calibrados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">72</div>
              <p className="text-xs text-muted-foreground">83% do total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vencendo</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">10</div>
              <p className="text-xs text-muted-foreground">Próximos 30 dias</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">5</div>
              <p className="text-xs text-muted-foreground">Calibração urgente</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Instrumentos de Medição</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar instrumento..." className="pl-9 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TAG</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Última Calibração</TableHead>
                  <TableHead>Próxima Calibração</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instrumentosMock.map((instrumento) => (
                  <TableRow key={instrumento.id}>
                    <TableCell className="font-medium">{instrumento.tag}</TableCell>
                    <TableCell>{instrumento.descricao}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{instrumento.tipo}</Badge>
                    </TableCell>
                    <TableCell>{instrumento.ultimaCalibracao}</TableCell>
                    <TableCell>{instrumento.proximaCalibracao}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(instrumento.status)}>{instrumento.status}</Badge>
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
