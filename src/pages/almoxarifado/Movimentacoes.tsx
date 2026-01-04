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
import { Plus, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const mockMovimentacoes = [
  { id: 1, data: "2024-02-05", tipo: "Entrada", material: "Lâmpada LED 12W", quantidade: 100, os: null, usuario: "João Silva" },
  { id: 2, data: "2024-02-05", tipo: "Saída", material: "Tubo PVC 100mm", quantidade: 15, os: "OS-2024-001", usuario: "Pedro Costa" },
  { id: 3, data: "2024-02-04", tipo: "Saída", material: "Fio 2.5mm", quantidade: 50, os: "OS-2024-002", usuario: "Maria Santos" },
  { id: 4, data: "2024-02-04", tipo: "Entrada", material: "Disjuntor 20A", quantidade: 25, os: null, usuario: "João Silva" },
];

const AlmoxarifadoMovimentacoes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Movimentações</h1>
            <p className="text-muted-foreground">Histórico de movimentações de estoque</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <ArrowDownCircle className="h-4 w-4 text-citiview-success" />
              Entrada
            </Button>
            <Button variant="outline" className="gap-2">
              <ArrowUpCircle className="h-4 w-4 text-destructive" />
              Saída
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>OS</TableHead>
                  <TableHead>Usuário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMovimentacoes.map((mov) => (
                  <TableRow key={mov.id}>
                    <TableCell>{new Date(mov.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {mov.tipo === "Entrada" ? (
                          <ArrowDownCircle className="h-4 w-4 text-citiview-success" />
                        ) : (
                          <ArrowUpCircle className="h-4 w-4 text-destructive" />
                        )}
                        <Badge variant={mov.tipo === "Entrada" ? "default" : "secondary"}>
                          {mov.tipo}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{mov.material}</TableCell>
                    <TableCell>{mov.quantidade}</TableCell>
                    <TableCell>{mov.os || "-"}</TableCell>
                    <TableCell>{mov.usuario}</TableCell>
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

export default AlmoxarifadoMovimentacoes;