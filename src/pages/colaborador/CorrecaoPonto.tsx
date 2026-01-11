import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus } from "lucide-react";

const mockCorrecoes = [
  { id: 1, data: "10/01/2026", tipo: "Esquecimento", status: "Pendente", motivo: "Esqueci de registrar entrada" },
  { id: 2, data: "08/01/2026", tipo: "Erro", status: "Aprovado", motivo: "Horário registrado incorreto" },
];

const CorrecaoPonto = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Correção de Ponto</h1>
            <p className="text-muted-foreground">Solicite correções no seu registro de ponto</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Solicitação
          </Button>
        </div>

        <div className="grid gap-4">
          {mockCorrecoes.map((correcao) => (
            <Card key={correcao.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">{correcao.data}</CardTitle>
                  <CardDescription>{correcao.tipo}</CardDescription>
                </div>
                <Badge variant={correcao.status === "Aprovado" ? "default" : "secondary"}>
                  {correcao.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{correcao.motivo}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CorrecaoPonto;
