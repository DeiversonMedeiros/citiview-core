import { useState, useCallback } from "react";
import { perfilAcessoService, PerfilAcesso } from "@/services/coreService";
import { useToast } from "@/hooks/use-toast";

export function usePerfisAcesso() {
  const [loading, setLoading] = useState(false);
  const [perfis, setPerfis] = useState<PerfilAcesso[]>([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const fetchPerfis = useCallback(async (
    filters?: Record<string, string>,
    limit = 100,
    offset = 0
  ) => {
    setLoading(true);
    try {
      const result = await perfilAcessoService.listar(filters, limit, offset);
      setPerfis(result.data);
      setTotal(result.total);
      return result;
    } catch (error) {
      toast({
        title: "Erro ao carregar perfis",
        description: "Não foi possível carregar a lista de perfis de acesso.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createPerfil = useCallback(async (data: Partial<PerfilAcesso>) => {
    try {
      const result = await perfilAcessoService.criar(data);
      toast({
        title: "Perfil criado",
        description: "O perfil de acesso foi criado com sucesso.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Erro ao criar perfil",
        description: "Não foi possível criar o perfil de acesso.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updatePerfil = useCallback(async (id: string, data: Partial<PerfilAcesso>) => {
    try {
      const result = await perfilAcessoService.atualizar(id, data);
      toast({
        title: "Perfil atualizado",
        description: "O perfil de acesso foi atualizado com sucesso.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar o perfil de acesso.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deletePerfil = useCallback(async (id: string) => {
    try {
      await perfilAcessoService.deletar(id);
      toast({
        title: "Perfil excluído",
        description: "O perfil de acesso foi excluído com sucesso.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Erro ao excluir perfil",
        description: "Não foi possível excluir o perfil de acesso.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  return {
    loading,
    perfis,
    total,
    fetchPerfis,
    createPerfil,
    updatePerfil,
    deletePerfil,
  };
}
