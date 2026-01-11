import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Umbrella, CheckCircle, XCircle } from "lucide-react";

const mockSolicitacoes = [
  { id: 1, funcionario: "João Silva", periodo: "15/02/2026 a 01/03/2026", dias: 15, saldo: 30, data: "05/01/2026" },
  { id: 2, funcionario: "Maria Santos", periodo: "01/03/2026 a 15/03/2026", dias: 15, saldo: 25, data: "08/01/2026" },
  { id: 3, funcionario: "Pedro Costa", periodo: "20/04/2026 a 10/05/2026", dias: 20, saldo: 30, data: "10/01/2026" },
];

const AprovacaoFerias = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Aprovação de Férias</h1>
          <p className="text-muted-foreground">Aprove as solicitações de férias da sua equipe</p>
        </div>

        <div className="grid gap-4">
          {mockSolicitacoes.map((solicitacao) => (
            <Card key={solicitacao.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <Umbrella className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{solicitacao.funcionario}</CardTitle>
                    <CardDescription>
                      Período: {solicitacao.periodo} ({solicitacao.dias} dias)
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">
                  Saldo: {solicitacao.saldo} dias
                </Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Solicitado em: {solicitacao.data}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reprovar
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AprovacaoFerias;
