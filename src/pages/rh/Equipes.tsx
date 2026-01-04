import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, MoreHorizontal } from "lucide-react";

const mockEquipes = [
  { id: 1, name: "Equipe A - Manutenção Predial", members: 8, supervisor: "Carlos Mendes", status: "Ativa" },
  { id: 2, name: "Equipe B - Manutenção Elétrica", members: 6, supervisor: "Fernanda Lima", status: "Ativa" },
  { id: 3, name: "Equipe C - Manutenção Hidráulica", members: 5, supervisor: "Roberto Silva", status: "Ativa" },
  { id: 4, name: "Equipe D - Jardinagem", members: 4, supervisor: "Ana Paula", status: "Ativa" },
];

const RHEquipes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Equipes</h1>
            <p className="text-muted-foreground">Gerencie as equipes de trabalho</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Equipe
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mockEquipes.map((equipe) => (
            <Card key={equipe.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{equipe.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Supervisor: {equipe.supervisor}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{equipe.members} membros</Badge>
                  </div>
                  <Badge variant="default">{equipe.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RHEquipes;