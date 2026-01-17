import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Loader2, Edit, Trash2 } from "lucide-react";
import { useEmpresas } from "@/hooks/useEmpresas";
import { EmpresaFormDialog } from "@/components/core/EmpresaFormDialog";
import { DeleteConfirmDialog } from "@/components/core/DeleteConfirmDialog";
import { Empresa } from "@/services/coreService";

const CoreEmpresas = () => {
  const { loading, empresas, fetchEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } = useEmpresas();
  const [isInitialized, setIsInitialized] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      fetchEmpresas();
      setIsInitialized(true);
    }
  }, [fetchEmpresas, isInitialized]);

  const handleCreate = () => {
    setSelectedEmpresa(null);
    setFormOpen(true);
  };

  const handleEdit = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setFormOpen(true);
  };

  const handleDelete = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setDeleteOpen(true);
  };

  const handleSave = async (data: Partial<Empresa>) => {
    if (selectedEmpresa) {
      await updateEmpresa(selectedEmpresa.id, data);
    } else {
      await createEmpresa(data);
    }
    fetchEmpresas();
  };

  const handleConfirmDelete = async () => {
    if (selectedEmpresa) {
      await deleteEmpresa(selectedEmpresa.id);
      fetchEmpresas();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Empresas</h1>
            <p className="text-muted-foreground">Gerencie as empresas do grupo</p>
          </div>
          <Button className="gap-2" onClick={handleCreate}>
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
              <Button className="gap-2" onClick={handleCreate}>
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
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar text-sidebar-foreground">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{empresa.nome}</CardTitle>
                        <p className="text-sm text-muted-foreground">{empresa.cnpj || "CNPJ não informado"}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(empresa)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(empresa)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

      <EmpresaFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        empresa={selectedEmpresa}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Excluir Empresa"
        description={`Tem certeza que deseja excluir a empresa "${selectedEmpresa?.nome}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
      />
    </MainLayout>
  );
};

export default CoreEmpresas;
