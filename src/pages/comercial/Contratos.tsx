import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ScrollText, Eye, Edit, History, Clock, AlertTriangle, FilePlus } from "lucide-react";

const mockContratos = [
  { 
    id: "CT-2025-001", 
    numero: "2025/001",
    cliente: "Prefeitura Municipal de São Paulo", 
    objeto: "Serviços de manutenção predial em equipamentos públicos",
    valor: "R$ 2.500.000,00",
    vigencia: "12 meses",
    inicio: "01/01/2025",
    vencimento: "31/12/2025",
    status: "Vigente",
    versao: "v3",
    diasParaVencer: 352
  },
  { 
    id: "CT-2024-089", 
    numero: "2024/089",
    cliente: "Governo do Estado RJ", 
    objeto: "Gestão integrada de resíduos sólidos",
    valor: "R$ 5.800.000,00",
    vigencia: "24 meses",
    inicio: "15/06/2024",
    vencimento: "14/06/2026",
    status: "Vigente",
    versao: "v2",
    diasParaVencer: 152
  },
  { 
    id: "CT-2024-067", 
    numero: "2024/067",
    cliente: "SABESP", 
    objeto: "Operação e manutenção de ETE",
    valor: "R$ 8.500.000,00",
    vigencia: "36 meses",
    inicio: "01/03/2024",
    vencimento: "28/02/2027",
    status: "Vigente",
    versao: "v1",
    diasParaVencer: 412
  },
  { 
    id: "CT-2024-045", 
    numero: "2024/045",
    cliente: "Prefeitura de Campinas", 
    objeto: "Serviços de limpeza urbana",
    valor: "R$ 3.200.000,00",
    vigencia: "12 meses",
    inicio: "01/04/2024",
    vencimento: "31/03/2025",
    status: "A Vencer",
    versao: "v4",
    diasParaVencer: 78
  },
  { 
    id: "CT-2023-112", 
    numero: "2023/112",
    cliente: "DER-SP", 
    objeto: "Manutenção de rodovias estaduais",
    valor: "R$ 1.800.000,00",
    vigencia: "12 meses",
    inicio: "01/06/2023",
    vencimento: "31/05/2024",
    status: "Encerrado",
    versao: "v2",
    diasParaVencer: 0
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Vigente": return "bg-green-100 text-green-700";
    case "A Vencer": return "bg-yellow-100 text-yellow-700";
    case "Encerrado": return "bg-gray-100 text-gray-700";
    case "Suspenso": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Contratos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cadastro de Contratos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie contratos com controle de versões e acompanhamento de vencimento
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Contrato
          </Button>
        </div>

        {/* Alertas de Vencimento */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Contratos Próximos do Vencimento</p>
                <p className="text-sm text-yellow-700">
                  3 contratos vencem nos próximos 90 dias. Considere iniciar o processo de renovação ou aditivo.
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
                <Input placeholder="Buscar por número, cliente ou objeto..." className="pl-10" />
              </div>
              <Button variant="outline">Status</Button>
              <Button variant="outline">Vencimento</Button>
              <Button variant="outline">Cliente</Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">32</p>
                <p className="text-xs text-green-600">Vigentes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">5</p>
                <p className="text-xs text-yellow-600">A Vencer (90 dias)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">R$ 45M</p>
                <p className="text-xs text-blue-600">Valor Total Contratado</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-700">18</p>
                <p className="text-xs text-gray-600">Encerrados (2024)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Contratos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Lista de Contratos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vigência</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContratos.map((contrato) => (
                  <TableRow key={contrato.id}>
                    <TableCell className="font-medium">{contrato.numero}</TableCell>
                    <TableCell>{contrato.cliente}</TableCell>
                    <TableCell className="max-w-xs truncate">{contrato.objeto}</TableCell>
                    <TableCell>{contrato.valor}</TableCell>
                    <TableCell>{contrato.vigencia}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {contrato.vencimento}
                        {contrato.diasParaVencer > 0 && contrato.diasParaVencer <= 90 && (
                          <span className="text-xs text-yellow-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {contrato.diasParaVencer}d
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50">
                        {contrato.versao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contrato.status)}>
                        {contrato.status}
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
                        <Button variant="ghost" size="icon" title="Histórico de Versões">
                          <History className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Criar Aditivo">
                          <FilePlus className="h-4 w-4" />
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
