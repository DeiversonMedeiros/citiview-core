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
import { Plus, Search, Filter, Package } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockMateriais = [
  { id: 1, codigo: "MAT-001", nome: "Lâmpada LED 12W", unidade: "UN", estoque: 150, minimo: 50, status: "OK" },
  { id: 2, codigo: "MAT-002", nome: "Tubo PVC 100mm", unidade: "MT", estoque: 45, minimo: 30, status: "OK" },
  { id: 3, codigo: "MAT-003", nome: "Fio 2.5mm", unidade: "MT", estoque: 20, minimo: 100, status: "Baixo" },
  { id: 4, codigo: "MAT-004", nome: "Disjuntor 20A", unidade: "UN", estoque: 35, minimo: 20, status: "OK" },
  { id: 5, codigo: "MAT-005", nome: "Conexão T 50mm", unidade: "UN", estoque: 8, minimo: 25, status: "Crítico" },
];

const AlmoxarifadoMateriais = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Materiais</h1>
            <p className="text-muted-foreground">Cadastro de materiais do almoxarifado</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Material
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Itens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">258</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estoque Baixo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-warning">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estoque Crítico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">3</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Materiais</CardTitle>
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
                  <TableHead>Código</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Mínimo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMateriais.map((mat) => (
                  <TableRow key={mat.id}>
                    <TableCell className="font-medium">{mat.codigo}</TableCell>
                    <TableCell>{mat.nome}</TableCell>
                    <TableCell>{mat.unidade}</TableCell>
                    <TableCell>{mat.estoque}</TableCell>
                    <TableCell>{mat.minimo}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          mat.status === "OK" ? "default" : 
                          mat.status === "Baixo" ? "secondary" : "destructive"
                        }
                      >
                        {mat.status}
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

export default AlmoxarifadoMateriais;