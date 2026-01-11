import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Calendar, AlertCircle } from "lucide-react";

const mockExames = [
  { id: 1, tipo: "Periódico Anual", dataRealizacao: "15/01/2025", proximoExame: "15/01/2026", status: "Vencido" },
  { id: 2, tipo: "Audiometria", dataRealizacao: "15/01/2025", proximoExame: "15/07/2026", status: "Em dia" },
  { id: 3, tipo: "Exame de Vista", dataRealizacao: "15/01/2025", proximoExame: "15/01/2027", status: "Em dia" },
];

const ExamesPeriodicos = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Exames Periódicos</h1>
          <p className="text-muted-foreground">Acompanhe seus exames ocupacionais</p>
        </div>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-800">Atenção</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700">Você possui 1 exame vencido. Entre em contato com o RH para agendar.</p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {mockExames.map((exame) => (
            <Card key={exame.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{exame.tipo}</CardTitle>
                    <CardDescription>Realizado em: {exame.dataRealizacao}</CardDescription>
                  </div>
                </div>
                <Badge variant={exame.status === "Em dia" ? "default" : "destructive"}>
                  {exame.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Próximo exame: {exame.proximoExame}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamesPeriodicos;
