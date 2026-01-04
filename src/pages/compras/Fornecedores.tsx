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
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockFornecedores = [
  { id: 1, razaoSocial: "Elétrica Total Ltda", cnpj: "12.345.678/0001-01", cidade: "São Paulo", status: "Ativo", categoria: "Material Elétrico" },
  { id: 2, razaoSocial: "Hidráulica Express", cnpj: "23.456.789/0001-02", cidade: "São Paulo", status: "Ativo", categoria: "Material Hidráulico" },
  { id: 3, razaoSocial: "Ferramentas Brasil", cnpj: "34.567.890/0001-03", cidade: "Guarulhos", status: "Ativo", categoria: "Ferramentas" },
  { id: 4, razaoSocial: "Materiais Construção SA", cnpj: "45.678.901/0001-04", cidade: "Campinas", status: "Inativo", categoria: "Construção" },
];

const ComprasFornecedores = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fornecedores</h1>
            <p className="text-muted-foreground">Gerencie o cadastro de fornecedores</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Fornecedor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Fornecedores</CardTitle>
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
                  <TableHead>Razão Social</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFornecedores.map((fornecedor) => (
                  <TableRow key={fornecedor.id}>
                    <TableCell className="font-medium">{fornecedor.razaoSocial}</TableCell>
                    <TableCell>{fornecedor.cnpj}</TableCell>
                    <TableCell>{fornecedor.cidade}</TableCell>
                    <TableCell>{fornecedor.categoria}</TableCell>
                    <TableCell>
                      <Badge variant={fornecedor.status === "Ativo" ? "default" : "secondary"}>
                        {fornecedor.status}
                      </Badge>
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

export default ComprasFornecedores;