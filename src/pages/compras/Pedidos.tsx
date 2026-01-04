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
import { Plus } from "lucide-react";

const mockPedidos = [
  { id: "PED-001", fornecedor: "Elétrica Total", valor: 4500.00, data: "2024-02-01", status: "Entregue" },
  { id: "PED-002", fornecedor: "Hidráulica Express", valor: 2800.00, data: "2024-02-03", status: "Em trânsito" },
  { id: "PED-003", fornecedor: "Ferramentas Brasil", valor: 1200.00, data: "2024-02-04", status: "Aguardando" },
];

const ComprasPedidos = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pedidos de Compra</h1>
            <p className="text-muted-foreground">Acompanhe os pedidos de compra</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPedidos.map((ped) => (
                  <TableRow key={ped.id}>
                    <TableCell className="font-medium">{ped.id}</TableCell>
                    <TableCell>{ped.fornecedor}</TableCell>
                    <TableCell>R$ {ped.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>{new Date(ped.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge variant={ped.status === "Entregue" ? "default" : "secondary"}>
                        {ped.status}
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

export default ComprasPedidos;