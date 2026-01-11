import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";

const BancoHoras = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Banco de Horas</h1>
          <p className="text-muted-foreground">Acompanhe seu saldo de horas</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12:30</div>
              <p className="text-xs text-muted-foreground">horas positivas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Horas Extras (Mês)</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">08:45</div>
              <p className="text-xs text-muted-foreground">Janeiro/2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Horas Devidas (Mês)</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">02:15</div>
              <p className="text-xs text-muted-foreground">Janeiro/2026</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Movimentações</CardTitle>
            <CardDescription>Últimas movimentações no banco de horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { data: "10/01/2026", tipo: "Crédito", valor: "+02:00", motivo: "Hora extra" },
                { data: "09/01/2026", tipo: "Débito", valor: "-01:00", motivo: "Saída antecipada" },
                { data: "08/01/2026", tipo: "Crédito", valor: "+01:30", motivo: "Hora extra" },
              ].map((mov, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{mov.data}</p>
                    <p className="text-sm text-muted-foreground">{mov.motivo}</p>
                  </div>
                  <span className={`font-bold ${mov.tipo === "Crédito" ? "text-green-600" : "text-red-600"}`}>
                    {mov.valor}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BancoHoras;
