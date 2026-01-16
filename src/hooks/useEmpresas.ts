import { useState, useCallback } from "react";
import { empresaService, Empresa } from "@/services/coreService";
import { useToast } from "@/hooks/use-toast";

export function useEmpresas() {
  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const fetchEmpresas = useCallback(async (
    filters?: Record<string, string>,
    limit = 100,
    offset = 0
  ) => {
    setLoading(true);
    try {
      const result = await empresaService.listar(filters, limit, offset);
      setEmpresas(result.data);
      setTotal(result.total);
      return result;
    } catch (error) {
      toast({
        title: "Erro ao carregar empresas",
        description: "Não foi possível carregar a lista de empresas.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createEmpresa = useCallback(async (data: Partial<Empresa>) => {
    try {
      const result = await empresaService.criar(data);
      toast({
        title: "Empresa criada",
        description: "A empresa foi criada com sucesso.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Erro ao criar empresa",
        description: "Não foi possível criar a empresa.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updateEmpresa = useCallback(async (id: string, data: Partial<Empresa>) => {
    try {
      const result = await empresaService.atualizar(id, data);
      toast({
        title: "Empresa atualizada",
        description: "A empresa foi atualizada com sucesso.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Erro ao atualizar empresa",
        description: "Não foi possível atualizar a empresa.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deleteEmpresa = useCallback(async (id: string) => {
    try {
      await empresaService.deletar(id);
      toast({
        title: "Empresa excluída",
        description: "A empresa foi excluída com sucesso.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Erro ao excluir empresa",
        description: "Não foi possível excluir a empresa.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  return {
    loading,
    empresas,
    total,
    fetchEmpresas,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
  };
}
