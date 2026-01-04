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
import { Plus, Wrench } from "lucide-react";

const mockManutencoes = [
  { id: 1, data: "2024-02-05", veiculo: "GHI-9012", tipo: "Corretiva", descricao: "Troca de embreagem", valor: 2500.00, status: "Em andamento" },
  { id: 2, data: "2024-02-01", veiculo: "ABC-1234", tipo: "Preventiva", descricao: "Troca de óleo", valor: 350.00, status: "Concluída" },
  { id: 3, data: "2024-01-28", veiculo: "DEF-5678", tipo: "Preventiva", descricao: "Alinhamento e balanceamento", valor: 180.00, status: "Concluída" },
];

const FrotaManutencoes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manutenções de Veículos</h1>
            <p className="text-muted-foreground">Histórico de manutenções da frota</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Manutenção
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockManutencoes.map((man) => (
                  <TableRow key={man.id}>
                    <TableCell>{new Date(man.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="font-medium">{man.veiculo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{man.tipo}</Badge>
                    </TableCell>
                    <TableCell>{man.descricao}</TableCell>
                    <TableCell>R$ {man.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>
                      <Badge variant={man.status === "Concluída" ? "default" : "secondary"}>
                        {man.status}
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

export default FrotaManutencoes;