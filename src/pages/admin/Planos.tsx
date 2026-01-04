import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Check, X } from "lucide-react";

const planos = [
  {
    id: 1,
    nome: "Starter",
    preco: "R$ 990",
    periodo: "/mês",
    limiteEmpresas: 3,
    clientesAtivos: 8,
    recursos: [
      { nome: "Core (Usuários/Perfis)", incluido: true },
      { nome: "RH Básico", incluido: true },
      { nome: "Financeiro Básico", incluido: true },
      { nome: "Operações", incluido: false },
      { nome: "Frota", incluido: false },
      { nome: "Logística", incluido: false },
      { nome: "Suporte prioritário", incluido: false },
    ],
    destaque: false,
  },
  {
    id: 2,
    nome: "Business",
    preco: "R$ 2.490",
    periodo: "/mês",
    limiteEmpresas: 10,
    clientesAtivos: 25,
    recursos: [
      { nome: "Core (Usuários/Perfis)", incluido: true },
      { nome: "RH Completo", incluido: true },
      { nome: "Financeiro Completo", incluido: true },
      { nome: "Operações", incluido: true },
      { nome: "Frota", incluido: true },
      { nome: "Logística", incluido: false },
      { nome: "Suporte prioritário", incluido: true },
    ],
    destaque: true,
  },
  {
    id: 3,
    nome: "Enterprise",
    preco: "R$ 5.990",
    periodo: "/mês",
    limiteEmpresas: 50,
    clientesAtivos: 14,
    recursos: [
      { nome: "Core (Usuários/Perfis)", incluido: true },
      { nome: "RH Completo", incluido: true },
      { nome: "Financeiro Completo", incluido: true },
      { nome: "Operações", incluido: true },
      { nome: "Frota", incluido: true },
      { nome: "Logística", incluido: true },
      { nome: "Suporte prioritário 24/7", incluido: true },
    ],
    destaque: false,
  },
];

export default function AdminPlanos() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Planos e Preços</h1>
            <p className="text-gray-500">Configure os planos disponíveis no sistema</p>
          </div>
          <Button className="bg-citiview-orange hover:bg-citiview-orange/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Plano
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planos.map((plano) => (
            <Card 
              key={plano.id} 
              className={plano.destaque ? "border-2 border-citiview-orange relative" : ""}
            >
              {plano.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-citiview-orange">Mais Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plano.nome}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plano.preco}</span>
                  <span className="text-gray-500">{plano.periodo}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Até {plano.limiteEmpresas} empresas
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plano.recursos.map((recurso, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {recurso.incluido ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-gray-300" />
                      )}
                      <span className={recurso.incluido ? "text-gray-700" : "text-gray-400"}>
                        {recurso.nome}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Clientes ativos:</span>
                    <span className="font-medium">{plano.clientesAtivos}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Plano
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preço por empresa adicional */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Preço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Empresa adicional (Starter)</p>
                <p className="text-2xl font-bold text-gray-900">R$ 290/mês</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Empresa adicional (Business)</p>
                <p className="text-2xl font-bold text-gray-900">R$ 190/mês</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Empresa adicional (Enterprise)</p>
                <p className="text-2xl font-bold text-gray-900">R$ 90/mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
