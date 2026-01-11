import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, CheckCircle, XCircle, Eye } from "lucide-react";

const mockReembolsos = [
  { id: 1, funcionario: "João Silva", tipo: "Transporte", valor: "R$ 150,00", data: "08/01/2026", descricao: "Uber para reunião externa" },
  { id: 2, funcionario: "Maria Santos", tipo: "Alimentação", valor: "R$ 85,00", data: "07/01/2026", descricao: "Almoço com cliente" },
  { id: 3, funcionario: "Pedro Costa", tipo: "Material", valor: "R$ 230,00", data: "06/01/2026", descricao: "Material de escritório" },
];

const AprovacaoReembolso = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Aprovação de Reembolso</h1>
          <p className="text-muted-foreground">Aprove as solicitações de reembolso da sua equipe</p>
        </div>

        <div className="grid gap-4">
          {mockReembolsos.map((reembolso) => (
            <Card key={reembolso.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <Receipt className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{reembolso.funcionario}</CardTitle>
                    <CardDescription>
                      {reembolso.tipo} - {reembolso.descricao}
                    </CardDescription>
                  </div>
                </div>
                <span className="text-xl font-bold">{reembolso.valor}</span>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Solicitado em: {reembolso.data}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Anexo
                  </Button>
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

export default AprovacaoReembolso;
