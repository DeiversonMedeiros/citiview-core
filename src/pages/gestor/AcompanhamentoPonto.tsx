import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const mockFuncionarios = [
  { id: 1, nome: "João Silva", entrada: "08:00", saida: "-", status: "Trabalhando", horasHoje: "04:30" },
  { id: 2, nome: "Maria Santos", entrada: "07:45", saida: "12:00", status: "Intervalo", horasHoje: "04:15" },
  { id: 3, nome: "Pedro Costa", entrada: "-", saida: "-", status: "Ausente", horasHoje: "00:00" },
  { id: 4, nome: "Ana Oliveira", entrada: "08:15", saida: "-", status: "Trabalhando", horasHoje: "04:15" },
  { id: 5, nome: "Carlos Souza", entrada: "08:00", saida: "17:00", status: "Encerrado", horasHoje: "08:00" },
];

const AcompanhamentoPonto = () => {
  const trabalhando = mockFuncionarios.filter(f => f.status === "Trabalhando").length;
  const ausentes = mockFuncionarios.filter(f => f.status === "Ausente").length;
  const encerrados = mockFuncionarios.filter(f => f.status === "Encerrado").length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Acompanhamento de Ponto</h1>
          <p className="text-muted-foreground">Monitore o ponto da sua equipe em tempo real</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Equipe</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFuncionarios.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Trabalhando</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{trabalhando}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{ausentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Encerrados</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{encerrados}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Funcionários</CardTitle>
            <CardDescription>Status de ponto de hoje - {new Date().toLocaleDateString('pt-BR')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Saída</TableHead>
                  <TableHead>Horas Hoje</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFuncionarios.map((func) => (
                  <TableRow key={func.id}>
                    <TableCell className="font-medium">{func.nome}</TableCell>
                    <TableCell>{func.entrada}</TableCell>
                    <TableCell>{func.saida}</TableCell>
                    <TableCell>{func.horasHoje}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          func.status === "Trabalhando" ? "default" : 
                          func.status === "Ausente" ? "destructive" : "secondary"
                        }
                      >
                        {func.status}
                      </Badge>
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
};

export default AcompanhamentoPonto;
