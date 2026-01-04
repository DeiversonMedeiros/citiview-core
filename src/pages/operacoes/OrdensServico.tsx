import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Wrench, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockOrdens = [
  { id: "OS-2024-001", tipo: "Corretiva", descricao: "Troca de lâmpadas - Bloco A", equipe: "Equipe A", status: "Em andamento", prioridade: "Alta" },
  { id: "OS-2024-002", tipo: "Preventiva", descricao: "Manutenção elevadores", equipe: "Equipe B", status: "Concluída", prioridade: "Média" },
  { id: "OS-2024-003", tipo: "Corretiva", descricao: "Vazamento hidráulico", equipe: "Equipe C", status: "Pendente", prioridade: "Alta" },
  { id: "OS-2024-004", tipo: "Preventiva", descricao: "Inspeção elétrica mensal", equipe: "Equipe A", status: "Agendada", prioridade: "Baixa" },
  { id: "OS-2024-005", tipo: "Corretiva", descricao: "Reparo ar condicionado", equipe: "Equipe B", status: "Em andamento", prioridade: "Média" },
];

const OperacoesOrdensServico = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ordens de Serviço</h1>
            <p className="text-muted-foreground">Gerencie as ordens de serviço</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova OS
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Abertas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">124</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-info">45</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-warning">32</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Atrasadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">8</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de OS</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="w-64 pl-10" />
                </div>
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
                  <TableHead>Código</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrdens.map((os) => (
                  <TableRow key={os.id}>
                    <TableCell className="font-medium">{os.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{os.tipo}</Badge>
                    </TableCell>
                    <TableCell>{os.descricao}</TableCell>
                    <TableCell>{os.equipe}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          os.status === "Concluída" ? "default" : 
                          os.status === "Em andamento" ? "secondary" : "outline"
                        }
                      >
                        {os.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          os.prioridade === "Alta" ? "destructive" : 
                          os.prioridade === "Média" ? "secondary" : "outline"
                        }
                      >
                        {os.prioridade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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
};

export default OperacoesOrdensServico;