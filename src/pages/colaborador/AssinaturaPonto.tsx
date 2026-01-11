import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSignature } from "lucide-react";

const mockPeriodos = [
  { id: 1, periodo: "Dezembro/2025", status: "Pendente", diasTrabalhados: 22 },
  { id: 2, periodo: "Novembro/2025", status: "Assinado", diasTrabalhados: 20 },
  { id: 3, periodo: "Outubro/2025", status: "Assinado", diasTrabalhados: 23 },
];

const AssinaturaPonto = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Assinatura de Ponto</h1>
          <p className="text-muted-foreground">Assine seu espelho de ponto mensal</p>
        </div>

        <div className="grid gap-4">
          {mockPeriodos.map((periodo) => (
            <Card key={periodo.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <FileSignature className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{periodo.periodo}</CardTitle>
                    <CardDescription>{periodo.diasTrabalhados} dias trabalhados</CardDescription>
                  </div>
                </div>
                <Badge variant={periodo.status === "Assinado" ? "default" : "secondary"}>
                  {periodo.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="outline" size="sm">Visualizar</Button>
                {periodo.status === "Pendente" && (
                  <Button size="sm">Assinar</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AssinaturaPonto;
