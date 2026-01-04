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
import { Plus, Building2, MoreHorizontal } from "lucide-react";

const mockCompanies = [
  { id: 1, name: "Matriz São Paulo", cnpj: "12.345.678/0001-90", city: "São Paulo", status: "Ativa" },
  { id: 2, name: "Filial Rio de Janeiro", cnpj: "12.345.678/0002-71", city: "Rio de Janeiro", status: "Ativa" },
  { id: 3, name: "Filial Belo Horizonte", cnpj: "12.345.678/0003-52", city: "Belo Horizonte", status: "Ativa" },
];

const CoreEmpresas = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Empresas</h1>
            <p className="text-muted-foreground">Gerencie as empresas do grupo</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Empresa
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {mockCompanies.map((company) => (
            <Card key={company.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar text-sidebar-foreground">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{company.cnpj}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{company.city}</span>
                  <Badge variant="default">{company.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoreEmpresas;