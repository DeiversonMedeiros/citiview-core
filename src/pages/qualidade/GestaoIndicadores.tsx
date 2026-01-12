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
import { Plus, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";

const indicadoresMock = [
  { id: 1, nome: "Satisfação do Cliente", meta: 90, atual: 92, unidade: "%", tendencia: "up", status: "Atingido" },
  { id: 2, nome: "Não Conformidades", meta: 5, atual: 3, unidade: "qtd", tendencia: "down", status: "Atingido" },
  { id: 3, nome: "Tempo Médio de Atendimento", meta: 24, atual: 28, unidade: "hrs", tendencia: "up", status: "Não Atingido" },
  { id: 4, nome: "Taxa de Retrabalho", meta: 2, atual: 1.5, unidade: "%", tendencia: "down", status: "Atingido" },
  { id: 5, nome: "Produtividade", meta: 95, atual: 88, unidade: "%", tendencia: "up", status: "Não Atingido" },
];

export default function GestaoIndicadores() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Indicadores</h1>
            <p className="text-muted-foreground">Acompanhamento de indicadores de desempenho da qualidade</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Indicador
          </Button>
        </div>

        {/* Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Indicadores</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Em monitoramento</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Metas Atingidas</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-xs text-muted-foreground">75% do total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Atenção</CardTitle>
              <TrendingDown className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <p className="text-xs text-muted-foreground">Próximos da meta</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Críticos</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2</div>
              <p className="text-xs text-muted-foreground">Abaixo da meta</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Indicadores */}
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indicador</TableHead>
                  <TableHead>Meta</TableHead>
                  <TableHead>Atual</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Tendência</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicadoresMock.map((ind) => {
                  const progresso = (ind.atual / ind.meta) * 100;
                  const isPositive = ind.nome.includes("Satisfação") || ind.nome.includes("Produtividade");
                  
                  return (
                    <TableRow key={ind.id}>
                      <TableCell className="font-medium">{ind.nome}</TableCell>
                      <TableCell>{ind.meta} {ind.unidade}</TableCell>
                      <TableCell>{ind.atual} {ind.unidade}</TableCell>
                      <TableCell className="w-32">
                        <Progress value={Math.min(progresso, 100)} className="h-2" />
                      </TableCell>
                      <TableCell>
                        {ind.tendencia === "up" ? (
                          <TrendingUp className={`h-4 w-4 ${isPositive ? "text-green-500" : "text-red-500"}`} />
                        ) : (
                          <TrendingDown className={`h-4 w-4 ${!isPositive ? "text-green-500" : "text-red-500"}`} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={ind.status === "Atingido" ? "default" : "destructive"}
                          className={ind.status === "Atingido" ? "bg-green-500" : ""}
                        >
                          {ind.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
