import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Cog, Eye, Edit, Wrench, FileText, QrCode } from "lucide-react";

const mockEquipamentos = [
  { 
    id: "EQ-2024-001", 
    nome: "Escavadeira Hidráulica",
    marca: "Caterpillar",
    modelo: "CAT 320",
    patrimonio: "PAT-45678",
    numeroSerie: "CAT320GC-2024-001",
    aquisicao: "15/03/2024",
    valorAquisicao: "R$ 850.000,00",
    status: "Em Operação",
    localizacao: "Obra SP-001",
    horasOperacao: 1250
  },
  { 
    id: "EQ-2024-002", 
    nome: "Retroescavadeira",
    marca: "JCB",
    modelo: "3CX",
    patrimonio: "PAT-45679",
    numeroSerie: "JCB3CX-2024-002",
    aquisicao: "20/04/2024",
    valorAquisicao: "R$ 420.000,00",
    status: "Em Manutenção",
    localizacao: "Base Central",
    horasOperacao: 890
  },
  { 
    id: "EQ-2023-045", 
    nome: "Guindaste Telescópico",
    marca: "Liebherr",
    modelo: "LTM 1040",
    patrimonio: "PAT-34567",
    numeroSerie: "LTM1040-2023-045",
    aquisicao: "10/06/2023",
    valorAquisicao: "R$ 1.200.000,00",
    status: "Em Operação",
    localizacao: "Obra RJ-003",
    horasOperacao: 2100
  },
  { 
    id: "EQ-2023-078", 
    nome: "Gerador Diesel",
    marca: "Cummins",
    modelo: "C150 D5",
    patrimonio: "PAT-34890",
    numeroSerie: "C150D5-2023-078",
    aquisicao: "05/08/2023",
    valorAquisicao: "R$ 95.000,00",
    status: "Disponível",
    localizacao: "Base Central",
    horasOperacao: 1450
  },
  { 
    id: "EQ-2022-112", 
    nome: "Compactador Rolo Liso",
    marca: "Dynapac",
    modelo: "CA250",
    patrimonio: "PAT-23456",
    numeroSerie: "CA250-2022-112",
    aquisicao: "12/02/2022",
    valorAquisicao: "R$ 380.000,00",
    status: "Inativo",
    localizacao: "Base Central",
    horasOperacao: 4200
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Em Operação": return "bg-green-100 text-green-700";
    case "Disponível": return "bg-blue-100 text-blue-700";
    case "Em Manutenção": return "bg-yellow-100 text-yellow-700";
    case "Inativo": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Equipamentos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cadastro de Equipamentos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie o parque de máquinas e equipamentos
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Equipamento
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por código, nome, patrimônio ou número de série..." className="pl-10" />
              </div>
              <Button variant="outline">Status</Button>
              <Button variant="outline">Categoria</Button>
              <Button variant="outline">Localização</Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">98</p>
                <p className="text-xs text-green-600">Em Operação</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">32</p>
                <p className="text-xs text-blue-600">Disponíveis</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">12</p>
                <p className="text-xs text-yellow-600">Em Manutenção</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-700">14</p>
                <p className="text-xs text-gray-600">Inativos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">156</p>
                <p className="text-xs text-purple-600">Total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Equipamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cog className="h-5 w-5" />
              Lista de Equipamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Marca/Modelo</TableHead>
                  <TableHead>Patrimônio</TableHead>
                  <TableHead>Horas Operação</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEquipamentos.map((equipamento) => (
                  <TableRow key={equipamento.id}>
                    <TableCell className="font-medium">{equipamento.id}</TableCell>
                    <TableCell>{equipamento.nome}</TableCell>
                    <TableCell>{equipamento.marca} {equipamento.modelo}</TableCell>
                    <TableCell>{equipamento.patrimonio}</TableCell>
                    <TableCell>{equipamento.horasOperacao.toLocaleString()}h</TableCell>
                    <TableCell>{equipamento.localizacao}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(equipamento.status)}>
                        {equipamento.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Manutenções">
                          <Wrench className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Documentos">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="QR Code">
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
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
}
