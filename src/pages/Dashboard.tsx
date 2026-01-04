import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Building2,
  Wrench,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    title: "Ordens de Serviço",
    value: "124",
    change: "+12%",
    trend: "up",
    icon: Wrench,
  },
  {
    title: "Colaboradores Ativos",
    value: "89",
    change: "+3",
    trend: "up",
    icon: Users,
  },
  {
    title: "Receita Mensal",
    value: "R$ 284.500",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Empresas Ativas",
    value: "3",
    change: "0",
    trend: "neutral",
    icon: Building2,
  },
];

const recentOrders = [
  { id: "OS-2024-001", type: "Corretiva", status: "Em andamento", priority: "Alta" },
  { id: "OS-2024-002", type: "Preventiva", status: "Concluída", priority: "Média" },
  { id: "OS-2024-003", type: "Corretiva", status: "Pendente", priority: "Baixa" },
  { id: "OS-2024-004", type: "Preventiva", status: "Em andamento", priority: "Alta" },
  { id: "OS-2024-005", type: "Corretiva", status: "Concluída", priority: "Média" },
];

const alerts = [
  { message: "5 OS próximas do prazo de SLA", type: "warning" },
  { message: "Estoque mínimo: Lâmpadas LED", type: "warning" },
  { message: "3 veículos com manutenção pendente", type: "error" },
  { message: "Aprovação pendente: 2 pedidos de compra", type: "info" },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema CitiView ERP
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-citiview-success" />
                  ) : stat.trend === "down" ? (
                    <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
                  ) : null}
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-citiview-success"
                        : stat.trend === "down"
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Ordens de Serviço Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          order.status === "Concluída"
                            ? "bg-citiview-success/10 text-citiview-success"
                            : order.status === "Em andamento"
                            ? "bg-citiview-info/10 text-citiview-info"
                            : "bg-citiview-warning/10 text-citiview-warning"
                        }`}
                      >
                        {order.status === "Concluída" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Wrench className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          order.priority === "Alta"
                            ? "bg-destructive/10 text-destructive"
                            : order.priority === "Média"
                            ? "bg-citiview-warning/10 text-citiview-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {order.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas e Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 rounded-lg p-3 ${
                      alert.type === "error"
                        ? "bg-destructive/10"
                        : alert.type === "warning"
                        ? "bg-citiview-warning/10"
                        : "bg-citiview-info/10"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        alert.type === "error"
                          ? "text-destructive"
                          : alert.type === "warning"
                          ? "text-citiview-warning"
                          : "text-citiview-info"
                      }`}
                    />
                    <p className="text-sm font-medium">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;