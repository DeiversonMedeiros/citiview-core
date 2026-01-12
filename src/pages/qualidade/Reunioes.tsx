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
import { Plus, Calendar, Users, FileText, Clock } from "lucide-react";

const reunioesMock = [
  { id: 1, titulo: "Análise Crítica da Direção", tipo: "RAC", data: "15/01/2026", horario: "09:00", participantes: 8, status: "Agendada" },
  { id: 2, titulo: "Reunião de Indicadores", tipo: "Indicadores", data: "20/01/2026", horario: "14:00", participantes: 5, status: "Agendada" },
  { id: 3, titulo: "Comitê da Qualidade", tipo: "Comitê", data: "10/01/2026", horario: "10:00", participantes: 6, status: "Realizada" },
  { id: 4, titulo: "Revisão de Riscos", tipo: "Riscos", data: "05/01/2026", horario: "15:00", participantes: 4, status: "Realizada" },
  { id: 5, titulo: "Abertura de Auditoria", tipo: "Auditoria", data: "22/01/2026", horario: "08:30", participantes: 10, status: "Agendada" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Agendada": return "bg-blue-500";
    case "Realizada": return "bg-green-500";
    case "Cancelada": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "RAC": return "bg-purple-100 text-purple-800";
    case "Indicadores": return "bg-blue-100 text-blue-800";
    case "Comitê": return "bg-green-100 text-green-800";
    case "Riscos": return "bg-orange-100 text-orange-800";
    case "Auditoria": return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function Reunioes() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reuniões</h1>
            <p className="text-muted-foreground">Gestão de reuniões do sistema de qualidade</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nova Reunião
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">5</div>
              <p className="text-xs text-muted-foreground">Próximos 30 dias</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Realizadas (Ano)</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">42</div>
              <p className="text-xs text-muted-foreground">Com ata registrada</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Total de presenças</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ações Geradas</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">28</div>
              <p className="text-xs text-muted-foreground">Em acompanhamento</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <CardTitle>Calendário de Reuniões</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Participantes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reunioesMock.map((reuniao) => (
                  <TableRow key={reuniao.id}>
                    <TableCell className="font-medium">{reuniao.titulo}</TableCell>
                    <TableCell>
                      <Badge className={getTipoColor(reuniao.tipo)}>{reuniao.tipo}</Badge>
                    </TableCell>
                    <TableCell>{reuniao.data}</TableCell>
                    <TableCell>{reuniao.horario}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {reuniao.participantes}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(reuniao.status)}>{reuniao.status}</Badge>
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
