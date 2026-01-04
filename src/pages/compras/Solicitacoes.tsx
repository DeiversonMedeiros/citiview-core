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

const mockSolicitacoes = [
  { id: "SOL-001", descricao: "Lâmpadas LED", solicitante: "João Silva", data: "2024-02-01", status: "Aprovada" },
  { id: "SOL-002", descricao: "Ferramentas Manuais", solicitante: "Maria Costa", data: "2024-02-02", status: "Pendente" },
  { id: "SOL-003", descricao: "EPIs", solicitante: "Pedro Santos", data: "2024-02-03", status: "Em análise" },
  { id: "SOL-004", descricao: "Material Hidráulico", solicitante: "Ana Lima", data: "2024-02-04", status: "Reprovada" },
];

const ComprasSolicitacoes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Solicitações de Compra</h1>
            <p className="text-muted-foreground">Gerencie as solicitações de compra</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Solicitação
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSolicitacoes.map((sol) => (
                  <TableRow key={sol.id}>
                    <TableCell className="font-medium">{sol.id}</TableCell>
                    <TableCell>{sol.descricao}</TableCell>
                    <TableCell>{sol.solicitante}</TableCell>
                    <TableCell>{new Date(sol.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          sol.status === "Aprovada" ? "default" : 
                          sol.status === "Reprovada" ? "destructive" : "secondary"
                        }
                      >
                        {sol.status}
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

export default ComprasSolicitacoes;