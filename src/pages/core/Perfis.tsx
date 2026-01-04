import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Shield, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockProfiles = [
  { id: 1, name: "Administrador", description: "Acesso total ao sistema", users: 2, permissions: 45 },
  { id: 2, name: "Gerente", description: "Gerencia operações e equipes", users: 5, permissions: 32 },
  { id: 3, name: "Operador", description: "Executa ordens de serviço", users: 15, permissions: 18 },
  { id: 4, name: "Técnico", description: "Acesso às operações técnicas", users: 25, permissions: 12 },
  { id: 5, name: "Financeiro", description: "Acesso ao módulo financeiro", users: 3, permissions: 20 },
];

const CorePerfis = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Perfis de Acesso</h1>
            <p className="text-muted-foreground">Gerencie os perfis e permissões</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Perfil
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProfiles.map((profile) => (
            <Card key={profile.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{profile.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{profile.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{profile.users} usuários</Badge>
                      <Badge variant="outline">{profile.permissions} permissões</Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CorePerfis;