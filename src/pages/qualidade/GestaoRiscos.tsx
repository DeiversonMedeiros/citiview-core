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
import { Plus, AlertTriangle, Shield, ShieldAlert, ShieldCheck } from "lucide-react";

const riscosMock = [
  { id: 1, codigo: "RSK-001", descricao: "Falha no sistema de backup", probabilidade: "Alta", impacto: "Alto", nivel: "Crítico", mitigacao: "Em andamento" },
  { id: 2, codigo: "RSK-002", descricao: "Perda de fornecedor crítico", probabilidade: "Média", impacto: "Alto", nivel: "Alto", mitigacao: "Implementado" },
  { id: 3, codigo: "RSK-003", descricao: "Atraso na entrega de materiais", probabilidade: "Alta", impacto: "Médio", nivel: "Médio", mitigacao: "Em andamento" },
  { id: 4, codigo: "RSK-004", descricao: "Rotatividade de pessoal chave", probabilidade: "Média", impacto: "Médio", nivel: "Médio", mitigacao: "Planejado" },
  { id: 5, codigo: "RSK-005", descricao: "Mudança regulatória", probabilidade: "Baixa", impacto: "Alto", nivel: "Médio", mitigacao: "Monitorando" },
];

const getNivelColor = (nivel: string) => {
  switch (nivel) {
    case "Crítico": return "bg-red-500";
    case "Alto": return "bg-orange-500";
    case "Médio": return "bg-yellow-500";
    case "Baixo": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

export default function GestaoRiscos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Riscos</h1>
            <p className="text-muted-foreground">Identificação, análise e tratamento de riscos organizacionais</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Risco
          </Button>
        </div>

        {/* Matriz de Riscos */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Riscos Críticos</CardTitle>
              <ShieldAlert className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">Ação imediata necessária</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Riscos Altos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">5</div>
              <p className="text-xs text-muted-foreground">Monitoramento contínuo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Riscos Médios</CardTitle>
              <Shield className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <p className="text-xs text-muted-foreground">Acompanhamento periódico</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Riscos Baixos</CardTitle>
              <ShieldCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-muted-foreground">Sob controle</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Riscos */}
        <Card>
          <CardHeader>
            <CardTitle>Registro de Riscos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Probabilidade</TableHead>
                  <TableHead>Impacto</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Mitigação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riscosMock.map((risco) => (
                  <TableRow key={risco.id}>
                    <TableCell className="font-medium">{risco.codigo}</TableCell>
                    <TableCell>{risco.descricao}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{risco.probabilidade}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{risco.impacto}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getNivelColor(risco.nivel)}>{risco.nivel}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{risco.mitigacao}</Badge>
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
