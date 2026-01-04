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

const mockCargos = [
  { id: 1, name: "Gerente de Operações", department: "Operações", level: "Gerência", headcount: 2 },
  { id: 2, name: "Supervisor de Campo", department: "Operações", level: "Supervisão", headcount: 5 },
  { id: 3, name: "Técnico de Manutenção", department: "Operações", level: "Operacional", headcount: 25 },
  { id: 4, name: "Analista Financeiro", department: "Financeiro", level: "Analista", headcount: 3 },
  { id: 5, name: "Eletricista", department: "Operações", level: "Operacional", headcount: 12 },
];

const RHCargos = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cargos</h1>
            <p className="text-muted-foreground">Gerencie a estrutura de cargos</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cargo
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Colaboradores</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCargos.map((cargo) => (
                  <TableRow key={cargo.id}>
                    <TableCell className="font-medium">{cargo.name}</TableCell>
                    <TableCell>{cargo.department}</TableCell>
                    <TableCell>{cargo.level}</TableCell>
                    <TableCell>{cargo.headcount}</TableCell>
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

export default RHCargos;