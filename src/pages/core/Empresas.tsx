import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Loader2 } from "lucide-react";
import { useEmpresas } from "@/hooks/useEmpresas";

const CoreEmpresas = () => {
  const { loading, empresas, fetchEmpresas } = useEmpresas();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      fetchEmpresas();
      setIsInitialized(true);
    }
  }, [fetchEmpresas, isInitialized]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Empresas</h1>
            <p className="text-muted-foreground">Gerencie as empresas do grupo</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Empresa
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : empresas.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma empresa cadastrada</h3>
              <p className="text-muted-foreground text-center mb-4">
                Comece cadastrando a primeira empresa do grupo.
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Cadastrar Empresa
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {empresas.map((empresa) => (
              <Card key={empresa.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar text-sidebar-foreground">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{empresa.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">{empresa.cnpj || "CNPJ não informado"}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">{empresa.cidade || "Cidade não informada"}</span>
                      {empresa.matriz && (
                        <Badge variant="outline" className="w-fit">Matriz</Badge>
                      )}
                    </div>
                    <Badge variant={empresa.ativa ? "default" : "secondary"}>
                      {empresa.ativa ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CoreEmpresas;
