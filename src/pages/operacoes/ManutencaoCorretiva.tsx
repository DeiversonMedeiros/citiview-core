import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

const mockCorretivas = [
  { id: "MC-001", chamado: "Ar condicionado não funciona", local: "Sala 201", prioridade: "Alta", tempo: "2h", status: "Em atendimento" },
  { id: "MC-002", chamado: "Vazamento no banheiro", local: "2º Andar", prioridade: "Crítica", tempo: "30min", status: "Aguardando peça" },
  { id: "MC-003", chamado: "Lâmpada queimada", local: "Recepção", prioridade: "Baixa", tempo: "4h", status: "Concluído" },
];

const OperacoesManutencaoCorretiva = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manutenção Corretiva</h1>
            <p className="text-muted-foreground">Chamados e correções urgentes</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Chamado
          </Button>
        </div>

        <div className="space-y-4">
          {mockCorretivas.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    item.status === "Concluído" ? "bg-citiview-success/10" :
                    item.prioridade === "Crítica" ? "bg-destructive/10" : "bg-citiview-warning/10"
                  }`}>
                    {item.status === "Concluído" ? (
                      <CheckCircle2 className="h-6 w-6 text-citiview-success" />
                    ) : item.prioridade === "Crítica" ? (
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    ) : (
                      <Clock className="h-6 w-6 text-citiview-warning" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.chamado}</p>
                      <Badge variant={
                        item.prioridade === "Crítica" ? "destructive" :
                        item.prioridade === "Alta" ? "secondary" : "outline"
                      }>
                        {item.prioridade}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.local} • SLA: {item.tempo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={item.status === "Concluído" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                  <Button variant="outline">Ver Detalhes</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default OperacoesManutencaoCorretiva;