import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSignature, CheckCircle, XCircle, Eye } from "lucide-react";

const mockAssinaturas = [
  { id: 1, funcionario: "João Silva", periodo: "Dezembro/2025", diasTrabalhados: 22, horasExtras: "12:30", data: "05/01/2026" },
  { id: 2, funcionario: "Maria Santos", periodo: "Dezembro/2025", diasTrabalhados: 20, horasExtras: "08:00", data: "06/01/2026" },
  { id: 3, funcionario: "Pedro Costa", periodo: "Dezembro/2025", diasTrabalhados: 23, horasExtras: "15:45", data: "07/01/2026" },
];

const AprovacaoAssinaturaPonto = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Aprovação de Assinatura de Ponto</h1>
          <p className="text-muted-foreground">Aprove as assinaturas de espelho de ponto da sua equipe</p>
        </div>

        <div className="grid gap-4">
          {mockAssinaturas.map((assinatura) => (
            <Card key={assinatura.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <FileSignature className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{assinatura.funcionario}</CardTitle>
                    <CardDescription>
                      {assinatura.periodo} - {assinatura.diasTrabalhados} dias trabalhados
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">
                  HE: {assinatura.horasExtras}
                </Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Assinado em: {assinatura.data}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Espelho
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

export default AprovacaoAssinaturaPonto;
