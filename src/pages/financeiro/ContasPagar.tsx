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
import { Plus, Search, Filter, ArrowDownCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockContas = [
  { id: 1, descricao: "Aluguel Sede", fornecedor: "Imobiliária XYZ", valor: 12500.00, vencimento: "2024-02-10", status: "Pendente" },
  { id: 2, descricao: "Energia Elétrica", fornecedor: "CEMIG", valor: 3420.50, vencimento: "2024-02-15", status: "Pendente" },
  { id: 3, descricao: "Material de Escritório", fornecedor: "Papelaria ABC", valor: 890.00, vencimento: "2024-02-08", status: "Paga" },
  { id: 4, descricao: "Combustível Frota", fornecedor: "Posto Shell", valor: 8500.00, vencimento: "2024-02-20", status: "Pendente" },
  { id: 5, descricao: "Internet", fornecedor: "Vivo", valor: 450.00, vencimento: "2024-02-12", status: "Paga" },
];

const FinanceiroContasPagar = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contas a Pagar</h1>
            <p className="text-muted-foreground">Gerencie as contas a pagar</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Conta
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">R$ 24.870,50</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vencendo Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-warning">R$ 3.420,50</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pago Este Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-success">R$ 15.340,00</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Contas</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="w-64 pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContas.map((conta) => (
                  <TableRow key={conta.id}>
                    <TableCell className="font-medium">{conta.descricao}</TableCell>
                    <TableCell>{conta.fornecedor}</TableCell>
                    <TableCell>R$ {conta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>{new Date(conta.vencimento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge variant={conta.status === "Paga" ? "default" : "secondary"}>
                        {conta.status}
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

export default FinanceiroContasPagar;