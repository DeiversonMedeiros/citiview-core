import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Eye, Edit, Copy, Send } from "lucide-react";

const mockPropostas = [
  { 
    id: "PROP-2026-001", 
    titulo: "Serviços de Manutenção Predial",
    cliente: "Prefeitura Municipal de São Paulo", 
    valor: "R$ 2.500.000,00", 
    status: "Em Elaboração",
    dataEnvio: "-",
    validade: "30 dias",
    responsavel: "João Silva"
  },
  { 
    id: "PROP-2026-002", 
    titulo: "Gestão de Resíduos Sólidos",
    cliente: "Governo do Estado RJ", 
    valor: "R$ 1.800.000,00", 
    status: "Enviada",
    dataEnvio: "10/01/2026",
    validade: "45 dias",
    responsavel: "Maria Santos"
  },
  { 
    id: "PROP-2026-003", 
    titulo: "Operação e Manutenção de ETE",
    cliente: "SABESP", 
    valor: "R$ 3.200.000,00", 
    status: "Em Análise",
    dataEnvio: "05/01/2026",
    validade: "60 dias",
    responsavel: "Carlos Oliveira"
  },
  { 
    id: "PROP-2025-089", 
    titulo: "Limpeza Urbana",
    cliente: "Prefeitura de Campinas", 
    valor: "R$ 890.000,00", 
    status: "Aprovada",
    dataEnvio: "15/12/2025",
    validade: "30 dias",
    responsavel: "Ana Costa"
  },
  { 
    id: "PROP-2025-088", 
    titulo: "Manutenção de Vias",
    cliente: "DER-SP", 
    valor: "R$ 1.500.000,00", 
    status: "Rejeitada",
    dataEnvio: "10/12/2025",
    validade: "30 dias",
    responsavel: "Pedro Lima"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Em Elaboração": return "bg-gray-100 text-gray-700";
    case "Enviada": return "bg-blue-100 text-blue-700";
    case "Em Análise": return "bg-yellow-100 text-yellow-700";
    case "Aprovada": return "bg-green-100 text-green-700";
    case "Rejeitada": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Propostas() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Propostas Comerciais</h1>
            <p className="text-muted-foreground mt-1">
              Elaboração e acompanhamento de propostas para empresas
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Proposta
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por código, cliente ou título..." className="pl-10" />
              </div>
              <Button variant="outline">Filtrar por Status</Button>
              <Button variant="outline">Filtrar por Período</Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Em Elaboração</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Enviadas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Em Análise</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Aprovadas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Rejeitadas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Propostas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Lista de Propostas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Envio</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPropostas.map((proposta) => (
                  <TableRow key={proposta.id}>
                    <TableCell className="font-medium">{proposta.id}</TableCell>
                    <TableCell>{proposta.titulo}</TableCell>
                    <TableCell>{proposta.cliente}</TableCell>
                    <TableCell>{proposta.valor}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(proposta.status)}>
                        {proposta.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{proposta.dataEnvio}</TableCell>
                    <TableCell>{proposta.responsavel}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Duplicar">
                          <Copy className="h-4 w-4" />
                        </Button>
                        {proposta.status === "Em Elaboração" && (
                          <Button variant="ghost" size="icon" title="Enviar">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
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
