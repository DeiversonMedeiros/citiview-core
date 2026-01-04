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
import { Plus, Fuel } from "lucide-react";

const mockAbastecimentos = [
  { id: 1, data: "2024-02-05", veiculo: "ABC-1234", condutor: "João Silva", litros: 45.5, valor: 275.00, kmAtual: 45500 },
  { id: 2, data: "2024-02-04", veiculo: "DEF-5678", condutor: "Pedro Costa", litros: 52.0, valor: 314.00, kmAtual: 68200 },
  { id: 3, data: "2024-02-03", veiculo: "JKL-3456", condutor: "Roberto Alves", litros: 48.0, valor: 290.00, kmAtual: 35100 },
];

const FrotaAbastecimentos = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Abastecimentos</h1>
            <p className="text-muted-foreground">Registro de abastecimentos da frota</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Abastecimento
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 8.540,00</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Litros Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1.420 L</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Média R$/Litro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 6,01</p>
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
                  <TableHead>Condutor</TableHead>
                  <TableHead>Litros</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>KM Atual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAbastecimentos.map((ab) => (
                  <TableRow key={ab.id}>
                    <TableCell>{new Date(ab.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="font-medium">{ab.veiculo}</TableCell>
                    <TableCell>{ab.condutor}</TableCell>
                    <TableCell>{ab.litros} L</TableCell>
                    <TableCell>R$ {ab.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>{ab.kmAtual.toLocaleString('pt-BR')} km</TableCell>
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

export default FrotaAbastecimentos;