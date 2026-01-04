import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockColaboradores = [
  { id: 1, name: "José Ferreira", cargo: "Técnico de Manutenção", equipe: "Equipe A", status: "Ativo" },
  { id: 2, name: "Fernanda Lima", cargo: "Supervisora", equipe: "Equipe B", status: "Ativo" },
  { id: 3, name: "Roberto Alves", cargo: "Eletricista", equipe: "Equipe A", status: "Ativo" },
  { id: 4, name: "Juliana Costa", cargo: "Técnica de Segurança", equipe: "Equipe C", status: "Férias" },
  { id: 5, name: "Marcos Santos", cargo: "Encanador", equipe: "Equipe B", status: "Ativo" },
];

const RHColaboradores = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Colaboradores</h1>
            <p className="text-muted-foreground">Gerencie os colaboradores da empresa</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Colaborador
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Colaboradores</CardTitle>
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
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockColaboradores.map((colab) => (
                  <TableRow key={colab.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {colab.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{colab.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{colab.cargo}</TableCell>
                    <TableCell>{colab.equipe}</TableCell>
                    <TableCell>
                      <Badge variant={colab.status === "Ativo" ? "default" : "secondary"}>
                        {colab.status}
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

export default RHColaboradores;