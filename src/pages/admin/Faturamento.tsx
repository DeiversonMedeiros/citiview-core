import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Download, 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  AlertTriangle,
  FileText,
  Eye
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const faturas = [
  { 
    id: "FAT-2024-001", 
    cliente: "Prefeitura de São Paulo",
    periodo: "Dezembro/2024",
    valor: "R$ 14.780,00",
    vencimento: "2025-01-10",
    status: "Pendente"
  },
  { 
    id: "FAT-2024-002", 
    cliente: "Consórcio ABC",
    periodo: "Dezembro/2024",
    valor: "R$ 5.450,00",
    vencimento: "2025-01-10",
    status: "Pendente"
  },
  { 
    id: "FAT-2024-003", 
    cliente: "Município de Campinas",
    periodo: "Dezembro/2024",
    valor: "R$ 4.500,00",
    vencimento: "2025-01-10",
    status: "Paga"
  },
  { 
    id: "FAT-2023-156", 
    cliente: "Consórcio Norte",
    periodo: "Novembro/2024",
    valor: "R$ 4.500,00",
    vencimento: "2024-12-10",
    status: "Atrasada"
  },
  { 
    id: "FAT-2023-155", 
    cliente: "Prefeitura de São Paulo",
    periodo: "Novembro/2024",
    valor: "R$ 12.500,00",
    vencimento: "2024-12-10",
    status: "Paga"
  },
];

const mrrHistory = [
  { mes: "Jul", valor: 65000 },
  { mes: "Ago", valor: 68500 },
  { mes: "Set", valor: 72000 },
  { mes: "Out", valor: 78000 },
  { mes: "Nov", valor: 84500 },
  { mes: "Dez", valor: 89450 },
];

export default function AdminFaturamento() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Faturamento</h1>
            <p className="text-gray-500">Gestão financeira do SaaS</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="2024-12">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-12">Dezembro 2024</SelectItem>
                <SelectItem value="2024-11">Novembro 2024</SelectItem>
                <SelectItem value="2024-10">Outubro 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">MRR Atual</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 89.450</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +5.8% vs mês anterior
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">ARR Projetado</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 1.073.400</p>
                  <p className="text-xs text-gray-500">Baseado no MRR atual</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Faturas Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">R$ 20.230</p>
                  <p className="text-xs text-gray-500">2 faturas</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Faturas Atrasadas</p>
                  <p className="text-2xl font-bold text-red-600">R$ 4.500</p>
                  <p className="text-xs text-red-500">1 cliente inadimplente</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-red-500 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MRR Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4 h-48">
              {mrrHistory.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-citiview-orange rounded-t-lg transition-all hover:bg-citiview-orange/80"
                    style={{ 
                      height: `${(item.valor / 100000) * 100}%`,
                      minHeight: '20px'
                    }}
                  />
                  <span className="text-xs text-gray-500">{item.mes}</span>
                  <span className="text-xs font-medium">
                    {(item.valor / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Faturas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fatura</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faturas.map((fatura) => (
                  <TableRow key={fatura.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-mono text-sm">{fatura.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{fatura.cliente}</TableCell>
                    <TableCell className="text-gray-500">{fatura.periodo}</TableCell>
                    <TableCell className="font-medium">{fatura.valor}</TableCell>
                    <TableCell className="text-gray-500">{fatura.vencimento}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          fatura.status === "Paga" 
                            ? "border-green-500 text-green-700 bg-green-50" 
                            : fatura.status === "Pendente"
                            ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                            : "border-red-500 text-red-700 bg-red-50"
                        }
                      >
                        {fatura.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
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
    </AdminLayout>
  );
}
