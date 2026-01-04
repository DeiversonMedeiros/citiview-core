import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const FinanceiroFluxoCaixa = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Fluxo de Caixa</h1>
          <p className="text-muted-foreground">Acompanhe o fluxo financeiro</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Atual</CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 284.500,00</p>
              <p className="text-xs text-muted-foreground">Atualizado em tempo real</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Entradas (Mês)</CardTitle>
              <TrendingUp className="h-5 w-5 text-citiview-success" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-citiview-success">R$ 137.000,00</p>
              <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saídas (Mês)</CardTitle>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">R$ 89.340,00</p>
              <p className="text-xs text-muted-foreground">-5% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projeção de Fluxo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">Gráfico de fluxo de caixa será exibido aqui</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FinanceiroFluxoCaixa;