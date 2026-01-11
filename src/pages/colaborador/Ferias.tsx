import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Umbrella, Calendar, Plus } from "lucide-react";

const Ferias = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Férias</h1>
            <p className="text-muted-foreground">Gerencie suas férias</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Solicitar Férias
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Saldo de Férias</CardTitle>
              <Umbrella className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30 dias</div>
              <p className="text-xs text-muted-foreground">Período aquisitivo: 01/03/2025 a 28/02/2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Próximas Férias</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15/02/2026</div>
              <p className="text-xs text-muted-foreground">15 dias programados</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Férias</CardTitle>
            <CardDescription>Solicitações e períodos de férias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { periodo: "15/02/2026 a 01/03/2026", dias: 15, status: "Aprovado" },
                { periodo: "01/07/2025 a 15/07/2025", dias: 15, status: "Gozado" },
                { periodo: "15/01/2025 a 29/01/2025", dias: 15, status: "Gozado" },
              ].map((ferias, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{ferias.periodo}</p>
                    <p className="text-sm text-muted-foreground">{ferias.dias} dias</p>
                  </div>
                  <Badge variant={ferias.status === "Aprovado" ? "default" : "secondary"}>
                    {ferias.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Ferias;
