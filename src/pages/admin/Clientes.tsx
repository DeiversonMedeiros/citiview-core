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
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Building2,
  Lock,
  Unlock,
  Eye,
  Edit
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clientes = [
  { 
    id: 1, 
    nome: "Prefeitura de São Paulo", 
    cnpj: "46.634.222/0001-00",
    plano: "Enterprise", 
    empresas: 12, 
    limiteEmpresas: 20,
    status: "Ativo",
    criadoEm: "2024-01-15",
    mrr: "R$ 12.500"
  },
  { 
    id: 2, 
    nome: "Consórcio ABC", 
    cnpj: "12.345.678/0001-90",
    plano: "Business", 
    empresas: 5, 
    limiteEmpresas: 10,
    status: "Ativo",
    criadoEm: "2024-02-20",
    mrr: "R$ 4.500"
  },
  { 
    id: 3, 
    nome: "Município de Campinas", 
    cnpj: "51.885.242/0001-40",
    plano: "Business", 
    empresas: 3, 
    limiteEmpresas: 10,
    status: "Ativo",
    criadoEm: "2024-03-10",
    mrr: "R$ 4.500"
  },
  { 
    id: 4, 
    nome: "Infraestrutura SP", 
    cnpj: "33.222.111/0001-55",
    plano: "Starter", 
    empresas: 1, 
    limiteEmpresas: 3,
    status: "Trial",
    criadoEm: "2024-12-01",
    mrr: "R$ 0"
  },
  { 
    id: 5, 
    nome: "Consórcio Norte", 
    cnpj: "99.888.777/0001-66",
    plano: "Business", 
    empresas: 7, 
    limiteEmpresas: 10,
    status: "Bloqueado",
    criadoEm: "2024-05-15",
    mrr: "R$ 4.500"
  },
];

export default function AdminClientes() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes (Tenants)</h1>
            <p className="text-gray-500">Gerencie os clientes do sistema</p>
          </div>
          <Button className="bg-citiview-orange hover:bg-citiview-orange/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Clientes</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar cliente..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Empresas</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-citiview-navy flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">{cliente.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{cliente.cnpj}</TableCell>
                    <TableCell>
                      <Badge variant={cliente.plano === "Enterprise" ? "default" : "secondary"}>
                        {cliente.plano}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={cliente.empresas >= cliente.limiteEmpresas * 0.8 ? "text-yellow-600 font-medium" : ""}>
                        {cliente.empresas}/{cliente.limiteEmpresas}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{cliente.mrr}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          cliente.status === "Ativo" 
                            ? "border-green-500 text-green-700 bg-green-50" 
                            : cliente.status === "Trial"
                            ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                            : "border-red-500 text-red-700 bg-red-50"
                        }
                      >
                        {cliente.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{cliente.criadoEm}</TableCell>
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
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          {cliente.status === "Bloqueado" ? (
                            <DropdownMenuItem className="text-green-600">
                              <Unlock className="h-4 w-4 mr-2" />
                              Desbloquear
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">
                              <Lock className="h-4 w-4 mr-2" />
                              Bloquear
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
