import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Gavel, Eye, Edit, Clock, AlertTriangle, Calendar } from "lucide-react";

const mockLicitacoes = [
  { 
    id: "LIC-2026-001", 
    numero: "PE 001/2026",
    orgao: "Prefeitura Municipal de São Paulo", 
    objeto: "Contratação de serviços de manutenção predial",
    modalidade: "Pregão Eletrônico",
    valorEstimado: "R$ 5.000.000,00",
    dataAbertura: "25/01/2026",
    status: "Aberta",
    diasRestantes: 12
  },
  { 
    id: "LIC-2026-002", 
    numero: "CC 002/2026",
    orgao: "Governo do Estado RJ", 
    objeto: "Gestão integrada de resíduos sólidos",
    modalidade: "Concorrência",
    valorEstimado: "R$ 12.000.000,00",
    dataAbertura: "15/02/2026",
    status: "Preparando",
    diasRestantes: 33
  },
  { 
    id: "LIC-2025-089", 
    numero: "PE 089/2025",
    orgao: "SABESP", 
    objeto: "Operação e manutenção de ETE",
    modalidade: "Pregão Eletrônico",
    valorEstimado: "R$ 8.500.000,00",
    dataAbertura: "10/01/2026",
    status: "Aguardando Resultado",
    diasRestantes: 0
  },
  { 
    id: "LIC-2025-078", 
    numero: "PE 078/2025",
    orgao: "Prefeitura de Campinas", 
    objeto: "Serviços de limpeza urbana",
    modalidade: "Pregão Eletrônico",
    valorEstimado: "R$ 3.200.000,00",
    dataAbertura: "20/12/2025",
    status: "Vencida",
    diasRestantes: 0
  },
  { 
    id: "LIC-2025-067", 
    numero: "TP 015/2025",
    orgao: "DER-SP", 
    objeto: "Manutenção de rodovias estaduais",
    modalidade: "Tomada de Preços",
    valorEstimado: "R$ 2.800.000,00",
    dataAbertura: "15/12/2025",
    status: "Perdida",
    diasRestantes: 0
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aberta": return "bg-green-100 text-green-700";
    case "Preparando": return "bg-blue-100 text-blue-700";
    case "Aguardando Resultado": return "bg-yellow-100 text-yellow-700";
    case "Vencida": return "bg-emerald-100 text-emerald-700";
    case "Perdida": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Licitacoes() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Acompanhamento de Licitações</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie e acompanhe os processos licitatórios
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Licitação
          </Button>
        </div>

        {/* Alertas de Prazo */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Atenção aos Prazos</p>
                <p className="text-sm text-yellow-700">
                  Você tem 2 licitações com abertura nos próximos 15 dias. Verifique a documentação.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por número, órgão ou objeto..." className="pl-10" />
              </div>
              <Button variant="outline">Modalidade</Button>
              <Button variant="outline">Status</Button>
              <Button variant="outline">Período</Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">3</p>
                <p className="text-xs text-green-600">Abertas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">5</p>
                <p className="text-xs text-blue-600">Preparando</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">2</p>
                <p className="text-xs text-yellow-600">Aguardando Resultado</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-700">15</p>
                <p className="text-xs text-emerald-600">Vencidas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-700">8</p>
                <p className="text-xs text-red-600">Perdidas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Licitações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              Lista de Licitações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Órgão</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Modalidade</TableHead>
                  <TableHead>Valor Estimado</TableHead>
                  <TableHead>Abertura</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLicitacoes.map((licitacao) => (
                  <TableRow key={licitacao.id}>
                    <TableCell className="font-medium">{licitacao.numero}</TableCell>
                    <TableCell>{licitacao.orgao}</TableCell>
                    <TableCell className="max-w-xs truncate">{licitacao.objeto}</TableCell>
                    <TableCell>{licitacao.modalidade}</TableCell>
                    <TableCell>{licitacao.valorEstimado}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {licitacao.dataAbertura}
                        {licitacao.diasRestantes > 0 && licitacao.diasRestantes <= 15 && (
                          <span className="text-xs text-yellow-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {licitacao.diasRestantes}d
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(licitacao.status)}>
                        {licitacao.status}
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
