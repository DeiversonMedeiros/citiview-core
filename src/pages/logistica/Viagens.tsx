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
import { Plus, Plane } from "lucide-react";

const mockViagens = [
  { id: 1, data: "2024-02-10", destino: "Filial RJ", motivo: "Visita técnica", veiculo: "ABC-1234", responsavel: "João Silva", status: "Agendada" },
  { id: 2, data: "2024-02-08", destino: "Cliente SP", motivo: "Reunião comercial", veiculo: "DEF-5678", responsavel: "Maria Costa", status: "Agendada" },
  { id: 3, data: "2024-02-01", destino: "Fornecedor Campinas", motivo: "Negociação", veiculo: "JKL-3456", responsavel: "Pedro Santos", status: "Concluída" },
];

const LogisticaViagens = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Viagens</h1>
            <p className="text-muted-foreground">Planejamento de viagens corporativas</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Viagem
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockViagens.map((viagem) => (
                  <TableRow key={viagem.id}>
                    <TableCell>{new Date(viagem.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="font-medium">{viagem.destino}</TableCell>
                    <TableCell>{viagem.motivo}</TableCell>
                    <TableCell>{viagem.veiculo}</TableCell>
                    <TableCell>{viagem.responsavel}</TableCell>
                    <TableCell>
                      <Badge variant={viagem.status === "Concluída" ? "default" : "secondary"}>
                        {viagem.status}
                      </Badge>
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

export default LogisticaViagens;