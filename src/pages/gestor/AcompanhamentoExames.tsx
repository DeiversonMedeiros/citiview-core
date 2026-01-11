import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Stethoscope, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const mockExames = [
  { id: 1, funcionario: "João Silva", exame: "Periódico Anual", ultimaRealizacao: "15/01/2025", proximoExame: "15/01/2026", status: "Vencido" },
  { id: 2, funcionario: "Maria Santos", exame: "Periódico Anual", ultimaRealizacao: "20/03/2025", proximoExame: "20/03/2026", status: "Em dia" },
  { id: 3, funcionario: "Pedro Costa", exame: "Audiometria", ultimaRealizacao: "10/06/2025", proximoExame: "10/12/2025", status: "Vencido" },
  { id: 4, funcionario: "Ana Oliveira", exame: "Periódico Anual", ultimaRealizacao: "05/11/2025", proximoExame: "05/11/2026", status: "Em dia" },
  { id: 5, funcionario: "Carlos Souza", exame: "Exame de Vista", ultimaRealizacao: "01/12/2025", proximoExame: "01/12/2026", status: "Em dia" },
];

const AcompanhamentoExames = () => {
  const vencidos = mockExames.filter(e => e.status === "Vencido").length;
  const emDia = mockExames.filter(e => e.status === "Em dia").length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Acompanhamento de Exames</h1>
          <p className="text-muted-foreground">Monitore os exames periódicos da sua equipe</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Exames</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockExames.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Em Dia</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{emDia}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{vencidos}</div>
            </CardContent>
          </Card>
        </div>

        {vencidos > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="flex flex-row items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-800">Atenção</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">
                {vencidos} funcionário(s) com exames vencidos. Entre em contato com o RH para agendar.
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Exames da Equipe</CardTitle>
            <CardDescription>Status dos exames periódicos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Exame</TableHead>
                  <TableHead>Última Realização</TableHead>
                  <TableHead>Próximo Exame</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockExames.map((exame) => (
                  <TableRow key={exame.id}>
                    <TableCell className="font-medium">{exame.funcionario}</TableCell>
                    <TableCell>{exame.exame}</TableCell>
                    <TableCell>{exame.ultimaRealizacao}</TableCell>
                    <TableCell>{exame.proximoExame}</TableCell>
                    <TableCell>
                      <Badge variant={exame.status === "Em dia" ? "default" : "destructive"}>
                        {exame.status}
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

export default AcompanhamentoExames;
