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
import { Search, Download, Filter, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const logs = [
  { 
    id: 1, 
    timestamp: "2024-12-28 14:32:15",
    usuario: "admin@citiview.com",
    acao: "LOGIN",
    descricao: "Login realizado com sucesso",
    cliente: "Sistema",
    ip: "187.45.123.89",
    nivel: "info"
  },
  { 
    id: 2, 
    timestamp: "2024-12-28 14:30:05",
    usuario: "joao@prefsp.gov.br",
    acao: "CREATE",
    descricao: "Criou nova Ordem de Serviço #4521",
    cliente: "Prefeitura de São Paulo",
    ip: "200.144.52.33",
    nivel: "info"
  },
  { 
    id: 3, 
    timestamp: "2024-12-28 14:28:45",
    usuario: "maria@consorcioabc.com",
    acao: "UPDATE",
    descricao: "Atualizou dados do veículo ABC-1234",
    cliente: "Consórcio ABC",
    ip: "177.23.45.67",
    nivel: "info"
  },
  { 
    id: 4, 
    timestamp: "2024-12-28 14:25:30",
    usuario: "carlos@prefsp.gov.br",
    acao: "DELETE",
    descricao: "Removeu material obsoleto do almoxarifado",
    cliente: "Prefeitura de São Paulo",
    ip: "200.144.52.34",
    nivel: "warning"
  },
  { 
    id: 5, 
    timestamp: "2024-12-28 14:20:00",
    usuario: "sistema",
    acao: "ERROR",
    descricao: "Falha na sincronização de dados - Consórcio Norte",
    cliente: "Consórcio Norte",
    ip: "-",
    nivel: "error"
  },
  { 
    id: 6, 
    timestamp: "2024-12-28 14:15:22",
    usuario: "admin@citiview.com",
    acao: "BLOCK",
    descricao: "Cliente Consórcio Norte bloqueado por inadimplência",
    cliente: "Sistema",
    ip: "187.45.123.89",
    nivel: "warning"
  },
];

export default function AdminLogs() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Logs Globais</h1>
            <p className="text-gray-500">Auditoria de todas as ações do sistema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>Histórico de Atividades</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar nos logs..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os clientes</SelectItem>
                    <SelectItem value="sistema">Sistema</SelectItem>
                    <SelectItem value="prefsp">Prefeitura de São Paulo</SelectItem>
                    <SelectItem value="abc">Consórcio ABC</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Nível</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm text-gray-500">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="text-sm">{log.usuario}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {log.acao}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{log.descricao}</TableCell>
                    <TableCell className="text-sm text-gray-500">{log.cliente}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-500">{log.ip}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          log.nivel === "info" 
                            ? "border-blue-500 text-blue-700 bg-blue-50" 
                            : log.nivel === "warning"
                            ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                            : "border-red-500 text-red-700 bg-red-50"
                        }
                      >
                        {log.nivel}
                      </Badge>
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
