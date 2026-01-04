import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, RefreshCw } from "lucide-react";

const mockPreventivas = [
  { id: "MP-001", plano: "Manutenção Elevadores", frequencia: "Mensal", proxima: "2024-02-15", status: "Agendada" },
  { id: "MP-002", plano: "Inspeção Elétrica", frequencia: "Trimestral", proxima: "2024-03-01", status: "Agendada" },
  { id: "MP-003", plano: "Limpeza de Caixa d'Água", frequencia: "Semestral", proxima: "2024-06-01", status: "Agendada" },
  { id: "MP-004", plano: "Revisão Ar Condicionado", frequencia: "Mensal", proxima: "2024-02-10", status: "Vencendo" },
];

const OperacoesManutencaoPreventiva = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manutenção Preventiva</h1>
            <p className="text-muted-foreground">Planos e roteiros de manutenção</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Plano
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mockPreventivas.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.plano}</CardTitle>
                  <Badge variant={item.status === "Vencendo" ? "destructive" : "default"}>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>{item.frequencia}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Próxima: {new Date(item.proxima).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Executar Agora</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default OperacoesManutencaoPreventiva;