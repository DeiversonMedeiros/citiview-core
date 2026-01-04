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

const mockAtivos = [
  { id: "AT-001", nome: "Elevador 01", tipo: "Elevador", localizacao: "Bloco A", status: "Operacional", ultimaManutencao: "2024-01-15" },
  { id: "AT-002", nome: "Ar Condicionado Central", tipo: "HVAC", localizacao: "Cobertura", status: "Operacional", ultimaManutencao: "2024-01-20" },
  { id: "AT-003", nome: "Gerador de Emergência", tipo: "Elétrico", localizacao: "Subsolo", status: "Em manutenção", ultimaManutencao: "2024-02-01" },
  { id: "AT-004", nome: "Bomba Hidráulica", tipo: "Hidráulico", localizacao: "Casa de Máquinas", status: "Operacional", ultimaManutencao: "2024-01-10" },
];

const OperacoesAtivos = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ativos</h1>
            <p className="text-muted-foreground">Cadastro de equipamentos e ativos</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Ativo
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Ativos</CardTitle>
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
                  <TableHead>Tipo</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Manutenção</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAtivos.map((ativo) => (
                  <TableRow key={ativo.id}>
                    <TableCell className="font-medium">{ativo.id}</TableCell>
                    <TableCell>{ativo.nome}</TableCell>
                    <TableCell>{ativo.tipo}</TableCell>
                    <TableCell>{ativo.localizacao}</TableCell>
                    <TableCell>
                      <Badge variant={ativo.status === "Operacional" ? "default" : "secondary"}>
                        {ativo.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(ativo.ultimaManutencao).toLocaleDateString('pt-BR')}</TableCell>
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

export default OperacoesAtivos;