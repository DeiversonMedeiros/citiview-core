import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FilePlus, Eye, Edit, Check, X } from "lucide-react";

const mockAditivos = [
  { 
    id: "AD-2026-001", 
    numero: "1º Aditivo",
    contrato: "CT-2025-001",
    cliente: "Prefeitura Municipal de São Paulo", 
    tipo: "Prazo",
    descricao: "Prorrogação de vigência por 12 meses",
    valorOriginal: "R$ 2.500.000,00",
    valorAditivo: "-",
    novoVencimento: "31/12/2026",
    status: "Pendente",
    dataSolicitacao: "05/01/2026"
  },
  { 
    id: "AD-2025-089", 
    numero: "2º Aditivo",
    contrato: "CT-2024-089",
    cliente: "Governo do Estado RJ", 
    tipo: "Valor e Prazo",
    descricao: "Reequilíbrio econômico-financeiro + prorrogação",
    valorOriginal: "R$ 5.800.000,00",
    valorAditivo: "+ R$ 580.000,00",
    novoVencimento: "14/06/2027",
    status: "Aprovado",
    dataSolicitacao: "20/12/2025"
  },
  { 
    id: "AD-2025-088", 
    numero: "1º Aditivo",
    contrato: "CT-2024-067",
    cliente: "SABESP", 
    tipo: "Valor",
    descricao: "Acréscimo de 15% no escopo do contrato",
    valorOriginal: "R$ 8.500.000,00",
    valorAditivo: "+ R$ 1.275.000,00",
    novoVencimento: "-",
    status: "Em Análise",
    dataSolicitacao: "10/12/2025"
  },
  { 
    id: "AD-2025-067", 
    numero: "3º Aditivo",
    contrato: "CT-2024-045",
    cliente: "Prefeitura de Campinas", 
    tipo: "Prazo",
    descricao: "Prorrogação de vigência por 6 meses",
    valorOriginal: "R$ 3.200.000,00",
    valorAditivo: "-",
    novoVencimento: "30/09/2025",
    status: "Aprovado",
    dataSolicitacao: "01/12/2025"
  },
  { 
    id: "AD-2025-045", 
    numero: "1º Aditivo",
    contrato: "CT-2024-034",
    cliente: "CDHU", 
    tipo: "Supressão",
    descricao: "Redução de 10% no escopo",
    valorOriginal: "R$ 1.200.000,00",
    valorAditivo: "- R$ 120.000,00",
    novoVencimento: "-",
    status: "Rejeitado",
    dataSolicitacao: "15/11/2025"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovado": return "bg-green-100 text-green-700";
    case "Pendente": return "bg-yellow-100 text-yellow-700";
    case "Em Análise": return "bg-blue-100 text-blue-700";
    case "Rejeitado": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "Prazo": return "bg-purple-100 text-purple-700";
    case "Valor": return "bg-emerald-100 text-emerald-700";
    case "Valor e Prazo": return "bg-orange-100 text-orange-700";
    case "Supressão": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Aditivos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Aditivos de Contratos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie aditivos de prazo, valor e outras alterações contratuais
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Aditivo
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por contrato, cliente ou descrição..." className="pl-10" />
              </div>
              <Button variant="outline">Tipo</Button>
              <Button variant="outline">Status</Button>
              <Button variant="outline">Período</Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bg-yellow-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">3</p>
                <p className="text-xs text-yellow-600">Pendentes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">2</p>
                <p className="text-xs text-blue-600">Em Análise</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">28</p>
                <p className="text-xs text-green-600">Aprovados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-700">5</p>
                <p className="text-xs text-red-600">Rejeitados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-700">+ R$ 4.2M</p>
                <p className="text-xs text-emerald-600">Valor Aditivado</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Aditivos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FilePlus className="h-5 w-5" />
              Lista de Aditivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aditivo</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor Aditivo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAditivos.map((aditivo) => (
                  <TableRow key={aditivo.id}>
                    <TableCell className="font-medium">{aditivo.numero}</TableCell>
                    <TableCell>{aditivo.contrato}</TableCell>
                    <TableCell>{aditivo.cliente}</TableCell>
                    <TableCell>
                      <Badge className={getTipoColor(aditivo.tipo)}>
                        {aditivo.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{aditivo.descricao}</TableCell>
                    <TableCell className={aditivo.valorAditivo.startsWith("+") ? "text-green-600" : aditivo.valorAditivo.startsWith("-") ? "text-red-600" : ""}>
                      {aditivo.valorAditivo}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(aditivo.status)}>
                        {aditivo.status}
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
                        {aditivo.status === "Pendente" && (
                          <>
                            <Button variant="ghost" size="icon" title="Aprovar" className="text-green-600">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Rejeitar" className="text-red-600">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
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
