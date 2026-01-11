import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Receipt, Plus } from "lucide-react";

const mockReembolsos = [
  { id: 1, data: "08/01/2026", tipo: "Transporte", valor: "R$ 150,00", status: "Pendente" },
  { id: 2, data: "05/01/2026", tipo: "Alimentação", valor: "R$ 85,00", status: "Aprovado" },
  { id: 3, data: "20/12/2025", tipo: "Material", valor: "R$ 230,00", status: "Pago" },
];

const Reembolso = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reembolso</h1>
            <p className="text-muted-foreground">Solicite reembolsos de despesas</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Solicitação
          </Button>
        </div>

        <div className="grid gap-4">
          {mockReembolsos.map((reembolso) => (
            <Card key={reembolso.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <Receipt className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{reembolso.tipo}</CardTitle>
                    <CardDescription>{reembolso.data}</CardDescription>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="text-xl font-bold">{reembolso.valor}</span>
                  <Badge 
                    variant={
                      reembolso.status === "Pago" ? "default" : 
                      reembolso.status === "Aprovado" ? "secondary" : "outline"
                    }
                  >
                    {reembolso.status}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Reembolso;
