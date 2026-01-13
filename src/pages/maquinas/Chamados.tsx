import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Phone, Eye, Edit, CheckCircle, Clock, User, MessageSquare } from "lucide-react";

const mockChamados = [
  { 
    id: "CH-2026-001", 
    equipamento: "Escavadeira Hidráulica CAT 320",
    codigoEquip: "EQ-2024-001",
    solicitante: "José Operador",
    descricao: "Vazamento de óleo hidráulico na lança principal",
    tipo: "Corretiva",
    prioridade: "Alta",
    abertura: "12/01/2026 08:30",
    status: "Em Andamento",
    tecnicoAtribuido: "Carlos Mecânico",
    tempoResposta: "2h"
  },
  { 
    id: "CH-2026-002", 
    equipamento: "Gerador Cummins 150kVA",
    codigoEquip: "EQ-2023-078",
    solicitante: "Maria Supervisora",
    descricao: "Preventiva programada - Troca de filtros",
    tipo: "Preventiva",
    prioridade: "Normal",
    abertura: "11/01/2026 14:00",
    status: "Agendado",
    tecnicoAtribuido: "João Técnico",
    tempoResposta: "-"
  },
  { 
    id: "CH-2026-003", 
    equipamento: "Compressor de Ar Atlas",
    codigoEquip: "EQ-2023-089",
    solicitante: "Pedro Encarregado",
    descricao: "Equipamento não está ligando, verificar sistema elétrico",
    tipo: "Corretiva",
    prioridade: "Urgente",
    abertura: "11/01/2026 16:45",
    status: "Em Andamento",
    tecnicoAtribuido: "Pedro Eletricista",
    tempoResposta: "30min"
  },
  { 
    id: "CH-2026-004", 
    equipamento: "Bomba Hidráulica Weg",
    codigoEquip: "EQ-2024-056",
    solicitante: "Ana Operadora",
    descricao: "Ruído anormal durante operação",
    tipo: "Inspeção",
    prioridade: "Baixa",
    abertura: "10/01/2026 10:20",
    status: "Pendente",
    tecnicoAtribuido: "-",
    tempoResposta: "-"
  },
  { 
    id: "CH-2025-998", 
    equipamento: "Retroescavadeira JCB 3CX",
    codigoEquip: "EQ-2024-002",
    solicitante: "Carlos Operador",
    descricao: "Troca de pneu traseiro direito",
    tipo: "Corretiva",
    prioridade: "Normal",
    abertura: "09/01/2026 11:00",
    status: "Concluído",
    tecnicoAtribuido: "Marcos Mecânico",
    tempoResposta: "1h"
  },
];

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "Urgente": return "bg-red-100 text-red-700";
    case "Alta": return "bg-orange-100 text-orange-700";
    case "Normal": return "bg-blue-100 text-blue-700";
    case "Baixa": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Em Andamento": return "bg-blue-100 text-blue-700";
    case "Agendado": return "bg-purple-100 text-purple-700";
    case "Pendente": return "bg-yellow-100 text-yellow-700";
    case "Concluído": return "bg-green-100 text-green-700";
    case "Cancelado": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "Corretiva": return "bg-orange-100 text-orange-700";
    case "Preventiva": return "bg-blue-100 text-blue-700";
    case "Inspeção": return "bg-teal-100 text-teal-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Chamados() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chamados de Manutenção</h1>
            <p className="text-muted-foreground mt-1">
              Central de abertura e acompanhamento de chamados
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Chamado
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bg-yellow-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">4</p>
                <p className="text-xs text-yellow-600">Pendentes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">8</p>
                <p className="text-xs text-blue-600">Em Andamento</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">3</p>
                <p className="text-xs text-purple-600">Agendados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">156</p>
                <p className="text-xs text-green-600">Concluídos (Mês)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-700">2</p>
                <p className="text-xs text-red-600">Urgentes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por código, equipamento ou descrição..." className="pl-10" />
              </div>
              <Button variant="outline">Prioridade</Button>
              <Button variant="outline">Status</Button>
              <Button variant="outline">Tipo</Button>
              <Button variant="outline">Período</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Chamados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Lista de Chamados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Abertura</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockChamados.map((chamado) => (
                  <TableRow key={chamado.id}>
                    <TableCell className="font-medium">{chamado.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{chamado.equipamento}</p>
                        <p className="text-xs text-muted-foreground">{chamado.codigoEquip}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        {chamado.solicitante}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{chamado.descricao}</TableCell>
                    <TableCell>
                      <Badge className={getTipoColor(chamado.tipo)}>
                        {chamado.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPrioridadeColor(chamado.prioridade)}>
                        {chamado.prioridade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{chamado.abertura}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {chamado.tecnicoAtribuido !== "-" ? (
                        <span className="text-sm">{chamado.tecnicoAtribuido}</span>
                      ) : (
                        <span className="text-sm text-yellow-600">Não atribuído</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(chamado.status)}>
                        {chamado.status}
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
                        <Button variant="ghost" size="icon" title="Comentários">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        {chamado.status !== "Concluído" && (
                          <Button variant="ghost" size="icon" title="Concluir" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
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
