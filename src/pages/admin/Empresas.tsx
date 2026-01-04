import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Building2, Users, MoreHorizontal, Eye, Lock, Unlock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const empresas = [
  { 
    id: 1, 
    razaoSocial: "Secretaria de Obras - SP", 
    cnpj: "46.634.222/0002-81",
    cliente: "Prefeitura de São Paulo",
    usuarios: 45,
    status: "Ativa",
    criadaEm: "2024-01-15"
  },
  { 
    id: 2, 
    razaoSocial: "Secretaria de Transportes - SP", 
    cnpj: "46.634.222/0003-62",
    cliente: "Prefeitura de São Paulo",
    usuarios: 32,
    status: "Ativa",
    criadaEm: "2024-01-20"
  },
  { 
    id: 3, 
    razaoSocial: "ABC Manutenção Urbana", 
    cnpj: "12.345.678/0002-71",
    cliente: "Consórcio ABC",
    usuarios: 18,
    status: "Ativa",
    criadaEm: "2024-02-20"
  },
  { 
    id: 4, 
    razaoSocial: "Campinas Infraestrutura", 
    cnpj: "51.885.242/0002-21",
    cliente: "Município de Campinas",
    usuarios: 12,
    status: "Ativa",
    criadaEm: "2024-03-10"
  },
  { 
    id: 5, 
    razaoSocial: "Norte Serviços", 
    cnpj: "99.888.777/0002-47",
    cliente: "Consórcio Norte",
    usuarios: 8,
    status: "Inativa",
    criadaEm: "2024-05-15"
  },
];

export default function AdminEmpresas() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
          <p className="text-gray-500">Visão global de todas as empresas do sistema</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Empresas Ativas</p>
                  <p className="text-xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-500 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Empresas Inativas</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total de Usuários</p>
                  <p className="text-xl font-bold">1.234</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Média por Empresa</p>
                  <p className="text-xl font-bold">7.9</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Todas as Empresas</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar empresa..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Razão Social</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Usuários</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criada em</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empresas.map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="font-medium">{empresa.razaoSocial}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{empresa.cnpj}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{empresa.cliente}</Badge>
                    </TableCell>
                    <TableCell>{empresa.usuarios}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          empresa.status === "Ativa" 
                            ? "border-green-500 text-green-700 bg-green-50" 
                            : "border-red-500 text-red-700 bg-red-50"
                        }
                      >
                        {empresa.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{empresa.criadaEm}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          {empresa.status === "Inativa" ? (
                            <DropdownMenuItem className="text-green-600">
                              <Unlock className="h-4 w-4 mr-2" />
                              Ativar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">
                              <Lock className="h-4 w-4 mr-2" />
                              Desativar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
