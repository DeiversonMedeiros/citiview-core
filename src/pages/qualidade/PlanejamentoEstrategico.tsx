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
import { Plus, Target, TrendingUp, Flag, Compass } from "lucide-react";

const objetivosMock = [
  { id: 1, codigo: "OBJ-01", objetivo: "Aumentar satisfação do cliente", meta: "95%", atual: "92%", progresso: 97, perspectiva: "Cliente", status: "No Prazo" },
  { id: 2, codigo: "OBJ-02", objetivo: "Reduzir custos operacionais", meta: "15%", atual: "12%", progresso: 80, perspectiva: "Financeira", status: "No Prazo" },
  { id: 3, codigo: "OBJ-03", objetivo: "Melhorar produtividade", meta: "20%", atual: "18%", progresso: 90, perspectiva: "Processos", status: "No Prazo" },
  { id: 4, codigo: "OBJ-04", objetivo: "Capacitar colaboradores", meta: "100h", atual: "75h", progresso: 75, perspectiva: "Aprendizado", status: "Em Andamento" },
  { id: 5, codigo: "OBJ-05", objetivo: "Certificação ISO 14001", meta: "Dez/26", atual: "Em curso", progresso: 40, perspectiva: "Processos", status: "Em Andamento" },
];

const getPerspectivaColor = (perspectiva: string) => {
  switch (perspectiva) {
    case "Cliente": return "bg-blue-100 text-blue-800";
    case "Financeira": return "bg-green-100 text-green-800";
    case "Processos": return "bg-purple-100 text-purple-800";
    case "Aprendizado": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "No Prazo": return "bg-green-500";
    case "Em Andamento": return "bg-blue-500";
    case "Atrasado": return "bg-red-500";
    case "Concluído": return "bg-gray-500";
    default: return "bg-gray-500";
  }
};

export default function PlanejamentoEstrategico() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Planejamento Estratégico</h1>
            <p className="text-muted-foreground">Objetivos, metas e indicadores estratégicos</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Objetivo
          </Button>
        </div>

        {/* BSC Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perspectiva Cliente</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <Progress value={92} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Meta: 95%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perspectiva Financeira</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">88%</div>
              <Progress value={88} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Meta: 100%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perspectiva Processos</CardTitle>
              <Compass className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <Progress value={78} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Meta: 90%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perspectiva Aprendizado</CardTitle>
              <Flag className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">75%</div>
              <Progress value={75} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Meta: 100%</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Objetivos */}
        <Card>
          <CardHeader>
            <CardTitle>Objetivos Estratégicos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Objetivo</TableHead>
                  <TableHead>Meta</TableHead>
                  <TableHead>Atual</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Perspectiva</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {objetivosMock.map((obj) => (
                  <TableRow key={obj.id}>
                    <TableCell className="font-medium">{obj.codigo}</TableCell>
                    <TableCell>{obj.objetivo}</TableCell>
                    <TableCell>{obj.meta}</TableCell>
                    <TableCell>{obj.atual}</TableCell>
                    <TableCell className="w-32">
                      <div className="flex items-center gap-2">
                        <Progress value={obj.progresso} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">{obj.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPerspectivaColor(obj.perspectiva)}>{obj.perspectiva}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(obj.status)}>{obj.status}</Badge>
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
