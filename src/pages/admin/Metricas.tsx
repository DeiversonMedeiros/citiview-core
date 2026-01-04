import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const usageByMonth = [
  { month: "Jul", usuarios: 850, acessos: 12500 },
  { month: "Ago", usuarios: 920, acessos: 14200 },
  { month: "Set", usuarios: 980, acessos: 15800 },
  { month: "Out", usuarios: 1050, acessos: 17500 },
  { month: "Nov", usuarios: 1150, acessos: 19200 },
  { month: "Dez", usuarios: 1234, acessos: 21000 },
];

const moduleUsage = [
  { name: "Operações", value: 35, color: "#FF8C00" },
  { name: "Frota", value: 25, color: "#1B263B" },
  { name: "Financeiro", value: 20, color: "#3B82F6" },
  { name: "RH", value: 12, color: "#22C55E" },
  { name: "Outros", value: 8, color: "#8B5CF6" },
];

const osPerDay = [
  { day: "Seg", os: 145 },
  { day: "Ter", os: 168 },
  { day: "Qua", os: 156 },
  { day: "Qui", os: 178 },
  { day: "Sex", os: 189 },
  { day: "Sáb", os: 45 },
  { day: "Dom", os: 23 },
];

const topClientes = [
  { nome: "Prefeitura de São Paulo", os: 2450, usuarios: 120 },
  { nome: "Consórcio ABC", os: 890, usuarios: 45 },
  { nome: "Município de Campinas", os: 670, usuarios: 38 },
  { nome: "Infraestrutura SP", os: 120, usuarios: 12 },
];

export default function AdminMetricas() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Métricas de Uso</h1>
          <p className="text-gray-500">Análise de utilização do sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Acessos Hoje</p>
              <p className="text-2xl font-bold text-gray-900">3.456</p>
              <p className="text-xs text-green-600">+12% vs ontem</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">OS Abertas Hoje</p>
              <p className="text-2xl font-bold text-gray-900">189</p>
              <p className="text-xs text-green-600">+8% vs média</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Tempo Médio Sessão</p>
              <p className="text-2xl font-bold text-gray-900">24 min</p>
              <p className="text-xs text-gray-500">Estável</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Uptime</p>
              <p className="text-2xl font-bold text-green-600">99.9%</p>
              <p className="text-xs text-gray-500">Últimos 30 dias</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crescimento de Usuários */}
          <Card>
            <CardHeader>
              <CardTitle>Crescimento de Usuários e Acessos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="usuarios" 
                      stroke="#1B263B" 
                      strokeWidth={2}
                      name="Usuários"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="acessos" 
                      stroke="#FF8C00" 
                      strokeWidth={2}
                      name="Acessos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Uso por Módulo */}
          <Card>
            <CardHeader>
              <CardTitle>Uso por Módulo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moduleUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {moduleUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* OS por Dia */}
          <Card>
            <CardHeader>
              <CardTitle>Ordens de Serviço por Dia da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={osPerDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="os" fill="#FF8C00" radius={[4, 4, 0, 0]} name="Ordens de Serviço" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Clientes */}
          <Card>
            <CardHeader>
              <CardTitle>Top Clientes por Atividade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClientes.map((cliente, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-citiview-navy text-white flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cliente.nome}</p>
                        <p className="text-sm text-gray-500">{cliente.usuarios} usuários</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-citiview-orange">{cliente.os}</p>
                      <p className="text-xs text-gray-500">OS/mês</p>
                    </div>
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
