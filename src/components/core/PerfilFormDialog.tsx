import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { PerfilAcesso } from "@/services/coreService";

interface PerfilFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  perfil?: PerfilAcesso | null;
  onSave: (data: Partial<PerfilAcesso>) => Promise<void>;
}

const AVAILABLE_PERMISSIONS = [
  { id: "dashboard.view", label: "Dashboard - Visualizar" },
  { id: "empresas.view", label: "Empresas - Visualizar" },
  { id: "empresas.create", label: "Empresas - Criar" },
  { id: "empresas.edit", label: "Empresas - Editar" },
  { id: "empresas.delete", label: "Empresas - Excluir" },
  { id: "usuarios.view", label: "Usuários - Visualizar" },
  { id: "usuarios.create", label: "Usuários - Criar" },
  { id: "usuarios.edit", label: "Usuários - Editar" },
  { id: "usuarios.delete", label: "Usuários - Excluir" },
  { id: "perfis.view", label: "Perfis - Visualizar" },
  { id: "perfis.create", label: "Perfis - Criar" },
  { id: "perfis.edit", label: "Perfis - Editar" },
  { id: "perfis.delete", label: "Perfis - Excluir" },
  { id: "rh.view", label: "RH - Visualizar" },
  { id: "rh.manage", label: "RH - Gerenciar" },
  { id: "financeiro.view", label: "Financeiro - Visualizar" },
  { id: "financeiro.manage", label: "Financeiro - Gerenciar" },
  { id: "compras.view", label: "Compras - Visualizar" },
  { id: "compras.manage", label: "Compras - Gerenciar" },
  { id: "almoxarifado.view", label: "Almoxarifado - Visualizar" },
  { id: "almoxarifado.manage", label: "Almoxarifado - Gerenciar" },
];

export function PerfilFormDialog({
  open,
  onOpenChange,
  perfil,
  onSave,
}: PerfilFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    permissoes: [] as string[],
    ativo: true,
  });

  useEffect(() => {
    if (perfil) {
      setFormData({
        nome: perfil.nome || "",
        descricao: perfil.descricao || "",
        permissoes: Array.isArray(perfil.permissoes) ? perfil.permissoes : [],
        ativo: perfil.ativo ?? true,
      });
    } else {
      setFormData({
        nome: "",
        descricao: "",
        permissoes: [],
        ativo: true,
      });
    }
  }, [perfil, open]);

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissoes: prev.permissoes.includes(permissionId)
        ? prev.permissoes.filter((p) => p !== permissionId)
        : [...prev.permissoes, permissionId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {perfil ? "Editar Perfil de Acesso" : "Novo Perfil de Acesso"}
            </DialogTitle>
            <DialogDescription>
              {perfil
                ? "Altere os dados do perfil de acesso abaixo."
                : "Preencha os dados para criar um novo perfil de acesso."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="ativo"
                  checked={formData.ativo}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, ativo: checked })
                  }
                />
                <Label htmlFor="ativo">Ativo</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <Label>Permissões</Label>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border rounded-md p-3">
                {AVAILABLE_PERMISSIONS.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={permission.id}
                      checked={formData.permissoes.includes(permission.id)}
                      onCheckedChange={() =>
                        handlePermissionToggle(permission.id)
                      }
                    />
                    <Label
                      htmlFor={permission.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || !formData.nome}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {perfil ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
