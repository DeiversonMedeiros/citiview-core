import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Navigation } from "lucide-react";

const mockRotas = [
  { id: 1, nome: "Rota Centro SP", pontos: 12, distancia: 45, tempo: "2h30min", status: "Ativa" },
  { id: 2, nome: "Rota Zona Sul", pontos: 8, distancia: 32, tempo: "1h45min", status: "Ativa" },
  { id: 3, nome: "Rota Zona Norte", pontos: 15, distancia: 58, tempo: "3h15min", status: "Ativa" },
  { id: 4, nome: "Rota Guarulhos", pontos: 6, distancia: 28, tempo: "1h20min", status: "Inativa" },
];

const LogisticaRotas = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Rotas</h1>
            <p className="text-muted-foreground">Gerencie as rotas de atendimento</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Rota
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mockRotas.map((rota) => (
            <Card key={rota.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Navigation className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{rota.nome}</CardTitle>
                  </div>
                  <Badge variant={rota.status === "Ativa" ? "default" : "secondary"}>
                    {rota.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{rota.pontos} pontos</span>
                  </div>
                  <span>{rota.distancia} km</span>
                  <span>{rota.tempo}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default LogisticaRotas;