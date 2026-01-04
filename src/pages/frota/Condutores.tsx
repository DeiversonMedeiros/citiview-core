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
import { Plus, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockCondutores = [
  { id: 1, nome: "João Silva", cnh: "12345678901", categoria: "B", validade: "2025-06-15", status: "Ativo", veiculo: "ABC-1234" },
  { id: 2, nome: "Pedro Costa", cnh: "23456789012", categoria: "D", validade: "2024-12-20", status: "Ativo", veiculo: "DEF-5678" },
  { id: 3, nome: "Carlos Mendes", cnh: "34567890123", categoria: "C", validade: "2024-03-10", status: "CNH Vencendo", veiculo: "-" },
  { id: 4, nome: "Roberto Alves", cnh: "45678901234", categoria: "B", validade: "2026-01-05", status: "Ativo", veiculo: "-" },
];

const FrotaCondutores = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Condutores</h1>
            <p className="text-muted-foreground">Gerencie os condutores da frota</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Condutor
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Condutor</TableHead>
                  <TableHead>CNH</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Veículo Atual</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCondutores.map((condutor) => (
                  <TableRow key={condutor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {condutor.nome.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{condutor.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>{condutor.cnh}</TableCell>
                    <TableCell>{condutor.categoria}</TableCell>
                    <TableCell>{new Date(condutor.validade).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{condutor.veiculo}</TableCell>
                    <TableCell>
                      <Badge variant={condutor.status === "Ativo" ? "default" : "destructive"}>
                        {condutor.status}
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

export default FrotaCondutores;