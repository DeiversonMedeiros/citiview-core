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
import { Plus, MoreHorizontal } from "lucide-react";

const mockCentros = [
  { id: 1, codigo: "CC001", nome: "Administrativo", orcamento: 50000, realizado: 42000 },
  { id: 2, codigo: "CC002", nome: "Operações", orcamento: 150000, realizado: 138000 },
  { id: 3, codigo: "CC003", nome: "Frota", orcamento: 80000, realizado: 75000 },
  { id: 4, codigo: "CC004", nome: "Almoxarifado", orcamento: 30000, realizado: 28500 },
  { id: 5, codigo: "CC005", nome: "RH", orcamento: 40000, realizado: 39000 },
];

const FinanceiroCentrosCusto = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Centros de Custo</h1>
            <p className="text-muted-foreground">Gerencie os centros de custo</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Centro
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Orçamento</TableHead>
                  <TableHead>Realizado</TableHead>
                  <TableHead>% Utilizado</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCentros.map((centro) => (
                  <TableRow key={centro.id}>
                    <TableCell className="font-medium">{centro.codigo}</TableCell>
                    <TableCell>{centro.nome}</TableCell>
                    <TableCell>R$ {centro.orcamento.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>R$ {centro.realizado.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-secondary">
                          <div 
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${(centro.realizado / centro.orcamento) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">{Math.round((centro.realizado / centro.orcamento) * 100)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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

export default FinanceiroCentrosCusto;