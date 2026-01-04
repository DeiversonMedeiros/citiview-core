import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Calendar } from "lucide-react";

const mockEscalas = [
  { id: 1, name: "Escala Diurna", horario: "08:00 - 17:00", dias: "Seg-Sex", colaboradores: 35 },
  { id: 2, name: "Escala Noturna", horario: "22:00 - 06:00", dias: "Seg-Sex", colaboradores: 12 },
  { id: 3, name: "Escala 12x36", horario: "07:00 - 19:00", dias: "Alternado", colaboradores: 20 },
  { id: 4, name: "Escala Fim de Semana", horario: "08:00 - 17:00", dias: "Sab-Dom", colaboradores: 8 },
];

const RHEscalas = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Escalas de Trabalho</h1>
            <p className="text-muted-foreground">Gerencie as escalas e horários</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Escala
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mockEscalas.map((escala) => (
            <Card key={escala.id}>
              <CardHeader>
                <CardTitle>{escala.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{escala.horario}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{escala.dias}</span>
                  </div>
                </div>
                <Badge variant="secondary">{escala.colaboradores} colaboradores</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RHEscalas;