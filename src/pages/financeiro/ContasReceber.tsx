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
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockRecebiveis = [
  { id: 1, descricao: "Contrato Prefeitura SP", cliente: "Prefeitura de SP", valor: 85000.00, vencimento: "2024-02-15", status: "Pendente" },
  { id: 2, descricao: "Medição Janeiro", cliente: "Condomínio Central", valor: 12500.00, vencimento: "2024-02-10", status: "Recebido" },
  { id: 3, descricao: "Serviços Extras", cliente: "Shopping Norte", valor: 4500.00, vencimento: "2024-02-20", status: "Pendente" },
  { id: 4, descricao: "Contrato Anual", cliente: "Hospital ABC", valor: 35000.00, vencimento: "2024-02-28", status: "Pendente" },
];

const FinanceiroContasReceber = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contas a Receber</h1>
            <p className="text-muted-foreground">Gerencie os recebíveis</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Recebível
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total a Receber</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-info">R$ 137.000,00</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vencido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">R$ 0,00</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recebido Este Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-success">R$ 12.500,00</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Recebíveis</CardTitle>
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
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecebiveis.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.descricao}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>{new Date(item.vencimento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "Recebido" ? "default" : "secondary"}>
                        {item.status}
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

export default FinanceiroContasReceber;