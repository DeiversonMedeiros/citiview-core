import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, CreditCard, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const stats = [
  { title: "Total de Clientes", value: "47", icon: Users, change: "+12%", color: "bg-blue-500" },
  { title: "Empresas Ativas", value: "156", icon: Building2, change: "+8%", color: "bg-green-500" },
  { title: "MRR", value: "R$ 89.450", icon: CreditCard, change: "+15%", color: "bg-purple-500" },
  { title: "Crescimento", value: "23%", icon: TrendingUp, change: "+5%", color: "bg-citiview-orange" },
];

const recentClients = [
  { name: "Prefeitura de São Paulo", plan: "Enterprise", companies: 12, status: "Ativo" },
  { name: "Consórcio ABC", plan: "Business", companies: 5, status: "Ativo" },
  { name: "Município de Campinas", plan: "Business", companies: 3, status: "Ativo" },
  { name: "Infraestrutura SP", plan: "Starter", companies: 1, status: "Trial" },
];

const alerts = [
  { type: "warning", message: "Cliente 'Consórcio XYZ' próximo do limite de empresas" },
  { type: "info", message: "3 novos cadastros aguardando aprovação" },
  { type: "success", message: "Faturamento de Dezembro processado com sucesso" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-500">Visão geral do sistema CitiView ERP</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-1">{stat.change} vs mês anterior</p>
                    </div>
                    <div className={`h-12 w-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Clients */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Clientes Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-citiview-navy flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.companies} empresas • {client.plan}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === "Ativo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alertas do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                    {alert.type === "info" && <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />}
                    {alert.type === "success" && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
