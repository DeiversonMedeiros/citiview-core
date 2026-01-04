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
import { Plus, Search, Filter, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockVeiculos = [
  { id: 1, placa: "ABC-1234", modelo: "Fiat Fiorino", tipo: "Utilitário", km: 45000, status: "Disponível", condutor: "João Silva" },
  { id: 2, placa: "DEF-5678", modelo: "VW Saveiro", tipo: "Pickup", km: 68000, status: "Em uso", condutor: "Pedro Costa" },
  { id: 3, placa: "GHI-9012", modelo: "Renault Master", tipo: "Van", km: 120000, status: "Manutenção", condutor: "-" },
  { id: 4, placa: "JKL-3456", modelo: "Ford Ranger", tipo: "Pickup", km: 35000, status: "Disponível", condutor: "-" },
];

const FrotaVeiculos = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Veículos</h1>
            <p className="text-muted-foreground">Gerencie a frota de veículos</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Veículo
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Frota</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-success">6</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-info">4</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Manutenção</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-warning">2</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Veículos</CardTitle>
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
                  <TableHead>Placa</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>KM</TableHead>
                  <TableHead>Condutor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVeiculos.map((veiculo) => (
                  <TableRow key={veiculo.id}>
                    <TableCell className="font-medium">{veiculo.placa}</TableCell>
                    <TableCell>{veiculo.modelo}</TableCell>
                    <TableCell>{veiculo.tipo}</TableCell>
                    <TableCell>{veiculo.km.toLocaleString('pt-BR')} km</TableCell>
                    <TableCell>{veiculo.condutor}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          veiculo.status === "Disponível" ? "default" : 
                          veiculo.status === "Em uso" ? "secondary" : "outline"
                        }
                      >
                        {veiculo.status}
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

export default FrotaVeiculos;