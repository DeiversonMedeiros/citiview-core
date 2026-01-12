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
import { Plus, ClipboardList, Calendar, CheckSquare, Users } from "lucide-react";

const auditoriasMock = [
  { id: 1, codigo: "AUD-2026-001", tipo: "Interna", escopo: "Sistema de Gestão da Qualidade", auditor: "Carlos Lima", dataAgendada: "15/01/2026", status: "Agendada" },
  { id: 2, codigo: "AUD-2026-002", tipo: "Interna", escopo: "Processo de Produção", auditor: "Maria Santos", dataAgendada: "22/01/2026", status: "Agendada" },
  { id: 3, codigo: "AUD-2025-012", tipo: "Interna", escopo: "Gestão de Documentos", auditor: "João Silva", dataAgendada: "10/12/2025", status: "Concluída" },
  { id: 4, codigo: "AUD-2025-011", tipo: "Externa", escopo: "Certificação ISO 9001", auditor: "Bureau Veritas", dataAgendada: "01/12/2025", status: "Concluída" },
  { id: 5, codigo: "AUD-2026-003", tipo: "Fornecedor", escopo: "Qualificação Fornecedor ABC", auditor: "Ana Oliveira", dataAgendada: "28/01/2026", status: "Planejada" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Planejada": return "bg-gray-500";
    case "Agendada": return "bg-blue-500";
    case "Em Andamento": return "bg-yellow-500";
    case "Concluída": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "Interna": return "bg-blue-100 text-blue-800";
    case "Externa": return "bg-purple-100 text-purple-800";
    case "Fornecedor": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function Auditorias() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Auditorias</h1>
            <p className="text-muted-foreground">Planejamento e acompanhamento de auditorias</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nova Auditoria
          </Button>
        </div>

        {/* Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planejadas (Ano)</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Conforme programa anual</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Realizadas</CardTitle>
              <CheckSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-xs text-muted-foreground">75% do planejado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <ClipboardList className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">6</div>
              <p className="text-xs text-muted-foreground">Próximos 3 meses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auditores</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-xs text-muted-foreground">Qualificados</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <CardTitle>Programa de Auditorias</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Escopo</TableHead>
                  <TableHead>Auditor</TableHead>
                  <TableHead>Data Agendada</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditoriasMock.map((auditoria) => (
                  <TableRow key={auditoria.id}>
                    <TableCell className="font-medium">{auditoria.codigo}</TableCell>
                    <TableCell>
                      <Badge className={getTipoColor(auditoria.tipo)}>{auditoria.tipo}</Badge>
                    </TableCell>
                    <TableCell>{auditoria.escopo}</TableCell>
                    <TableCell>{auditoria.auditor}</TableCell>
                    <TableCell>{auditoria.dataAgendada}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(auditoria.status)}>{auditoria.status}</Badge>
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
