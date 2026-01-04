import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock } from "lucide-react";

const mockAprovacoes = [
  { id: "APR-001", tipo: "Solicitação de Compra", descricao: "EPIs para equipe", valor: 3500.00, solicitante: "Pedro Santos", data: "2024-02-03" },
  { id: "APR-002", tipo: "Pedido de Compra", descricao: "Material Elétrico", valor: 8200.00, solicitante: "Maria Costa", data: "2024-02-04" },
];

const ComprasAprovacoes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Aprovações Pendentes</h1>
          <p className="text-muted-foreground">Aprove ou reprove solicitações e pedidos</p>
        </div>

        <div className="space-y-4">
          {mockAprovacoes.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-citiview-warning/10">
                    <Clock className="h-6 w-6 text-citiview-warning" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.descricao}</p>
                      <Badge variant="secondary">{item.tipo}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.solicitante} • {new Date(item.data).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <X className="h-4 w-4" />
                    Reprovar
                  </Button>
                  <Button className="gap-2">
                    <Check className="h-4 w-4" />
                    Aprovar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockAprovacoes.length === 0 && (
          <Card>
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Nenhuma aprovação pendente</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default ComprasAprovacoes;