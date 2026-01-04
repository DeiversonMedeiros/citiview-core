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
import { Plus, Navigation } from "lucide-react";

const mockDeslocamentos = [
  { id: 1, data: "2024-02-05", veiculo: "ABC-1234", origem: "Sede", destino: "Cliente A", distancia: 15, tempo: "35min", status: "Concluído" },
  { id: 2, data: "2024-02-05", veiculo: "DEF-5678", origem: "Cliente B", destino: "Cliente C", distancia: 8, tempo: "20min", status: "Em andamento" },
  { id: 3, data: "2024-02-05", veiculo: "JKL-3456", origem: "Sede", destino: "Fornecedor", distancia: 22, tempo: "45min", status: "Agendado" },
];

const LogisticaDeslocamentos = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Deslocamentos</h1>
            <p className="text-muted-foreground">Acompanhe os deslocamentos em tempo real</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Deslocamento
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-info">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">KM Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">245 km</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">32 min</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Distância</TableHead>
                  <TableHead>Tempo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDeslocamentos.map((desl) => (
                  <TableRow key={desl.id}>
                    <TableCell>{new Date(desl.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="font-medium">{desl.veiculo}</TableCell>
                    <TableCell>{desl.origem}</TableCell>
                    <TableCell>{desl.destino}</TableCell>
                    <TableCell>{desl.distancia} km</TableCell>
                    <TableCell>{desl.tempo}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          desl.status === "Concluído" ? "default" : 
                          desl.status === "Em andamento" ? "secondary" : "outline"
                        }
                      >
                        {desl.status}
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

export default LogisticaDeslocamentos;