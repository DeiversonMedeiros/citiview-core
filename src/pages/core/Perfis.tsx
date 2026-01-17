import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Shield, Edit, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePerfisAcesso } from "@/hooks/usePerfisAcesso";
import { PerfilFormDialog } from "@/components/core/PerfilFormDialog";
import { DeleteConfirmDialog } from "@/components/core/DeleteConfirmDialog";
import { PerfilAcesso } from "@/services/coreService";

const CorePerfis = () => {
  const { loading, perfis, fetchPerfis, createPerfil, updatePerfil, deletePerfil } = usePerfisAcesso();
  const [isInitialized, setIsInitialized] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState<PerfilAcesso | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      fetchPerfis();
      setIsInitialized(true);
    }
  }, [fetchPerfis, isInitialized]);

  const handleCreate = () => {
    setSelectedPerfil(null);
    setFormOpen(true);
  };

  const handleEdit = (perfil: PerfilAcesso) => {
    setSelectedPerfil(perfil);
    setFormOpen(true);
  };

  const handleDelete = (perfil: PerfilAcesso) => {
    setSelectedPerfil(perfil);
    setDeleteOpen(true);
  };

  const handleSave = async (data: Partial<PerfilAcesso>) => {
    if (selectedPerfil) {
      await updatePerfil(selectedPerfil.id, data);
    } else {
      await createPerfil(data);
    }
    fetchPerfis();
  };

  const handleConfirmDelete = async () => {
    if (selectedPerfil) {
      await deletePerfil(selectedPerfil.id);
      fetchPerfis();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Perfis de Acesso</h1>
            <p className="text-muted-foreground">Gerencie os perfis e permissões</p>
          </div>
          <Button className="gap-2" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            Novo Perfil
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : perfis.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum perfil cadastrado</h3>
              <p className="text-muted-foreground text-center mb-4">
                Crie perfis de acesso para gerenciar as permissões dos usuários.
              </p>
              <Button className="gap-2" onClick={handleCreate}>
                <Plus className="h-4 w-4" />
                Criar Perfil
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {perfis.map((perfil) => (
              <Card key={perfil.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{perfil.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {perfil.descricao || "Sem descrição"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {Array.isArray(perfil.permissoes) ? perfil.permissoes.length : 0} permissões
                        </Badge>
                        <Badge variant={perfil.ativo ? "default" : "secondary"}>
                          {perfil.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(perfil)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(perfil)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <PerfilFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        perfil={selectedPerfil}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Excluir Perfil de Acesso"
        description={`Tem certeza que deseja excluir o perfil "${selectedPerfil?.nome}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
      />
    </MainLayout>
  );
};

export default CorePerfis;
