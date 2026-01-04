import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Warehouse } from "lucide-react";

const mockEstoques = [
  { id: 1, nome: "Almoxarifado Central", endereco: "Sede São Paulo", itens: 180, valorTotal: 125000 },
  { id: 2, nome: "Almoxarifado Filial RJ", endereco: "Rio de Janeiro", itens: 95, valorTotal: 68000 },
  { id: 3, nome: "Estoque Veículos", endereco: "Pátio Central", itens: 45, valorTotal: 22000 },
];

const AlmoxarifadoEstoques = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Estoques</h1>
          <p className="text-muted-foreground">Gerencie os locais de estoque</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {mockEstoques.map((estoque) => (
            <Card key={estoque.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Warehouse className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{estoque.nome}</CardTitle>
                    <p className="text-sm text-muted-foreground">{estoque.endereco}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Itens:</span>
                  <Badge variant="secondary">{estoque.itens} itens</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Total:</span>
                  <span className="font-medium">R$ {estoque.valorTotal.toLocaleString('pt-BR')}</span>
                </div>
                <Button variant="outline" className="w-full">Ver Detalhes</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AlmoxarifadoEstoques;