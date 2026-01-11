import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, FileText, ShoppingCart, ArrowLeftRight, DollarSign } from "lucide-react";

const mockAprovacoes = {
  titulosPagar: [
    { id: 1, descricao: "Pagamento Fornecedor ABC", valor: "R$ 5.500,00", vencimento: "15/01/2026", solicitante: "João Silva" },
    { id: 2, descricao: "Conta de Energia", valor: "R$ 1.200,00", vencimento: "20/01/2026", solicitante: "Maria Santos" },
  ],
  requisicoes: [
    { id: 1, descricao: "Material de Escritório", valor: "R$ 850,00", data: "10/01/2026", solicitante: "Pedro Costa" },
  ],
  cotacoes: [
    { id: 1, descricao: "Cotação Equipamentos TI", valor: "R$ 15.000,00", data: "08/01/2026", fornecedores: 3 },
  ],
  transferencias: [
    { id: 1, descricao: "Transferência de Peças", origem: "Almox. Central", destino: "Filial 01", data: "09/01/2026" },
  ],
};

const CentralAprovacoes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Central de Aprovações</h1>
          <p className="text-muted-foreground">Aprove ou rejeite solicitações pendentes</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Títulos a Pagar</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAprovacoes.titulosPagar.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Requisições</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAprovacoes.requisicoes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cotações</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAprovacoes.cotacoes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Transferências</CardTitle>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAprovacoes.transferencias.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="titulos" className="w-full">
          <TabsList>
            <TabsTrigger value="titulos">Títulos a Pagar</TabsTrigger>
            <TabsTrigger value="requisicoes">Requisições</TabsTrigger>
            <TabsTrigger value="cotacoes">Cotações</TabsTrigger>
            <TabsTrigger value="transferencias">Transferências</TabsTrigger>
          </TabsList>
          
          <TabsContent value="titulos" className="space-y-4">
            {mockAprovacoes.titulosPagar.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.descricao}</CardTitle>
                    <CardDescription>Solicitante: {item.solicitante} | Vencimento: {item.vencimento}</CardDescription>
                  </div>
                  <span className="text-xl font-bold">{item.valor}</span>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reprovar
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="requisicoes" className="space-y-4">
            {mockAprovacoes.requisicoes.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.descricao}</CardTitle>
                    <CardDescription>Solicitante: {item.solicitante} | Data: {item.data}</CardDescription>
                  </div>
                  <span className="text-xl font-bold">{item.valor}</span>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reprovar
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="cotacoes" className="space-y-4">
            {mockAprovacoes.cotacoes.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.descricao}</CardTitle>
                    <CardDescription>{item.fornecedores} fornecedores cotados | Data: {item.data}</CardDescription>
                  </div>
                  <span className="text-xl font-bold">{item.valor}</span>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="transferencias" className="space-y-4">
            {mockAprovacoes.transferencias.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.descricao}</CardTitle>
                    <CardDescription>De: {item.origem} → Para: {item.destino} | Data: {item.data}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reprovar
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CentralAprovacoes;
