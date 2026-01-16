import { useState, useCallback } from "react";
import { usuarioService, Usuario } from "@/services/coreService";
import { useToast } from "@/hooks/use-toast";

export function useCoreUsuarios() {
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const fetchUsuarios = useCallback(async (
    filters?: Record<string, string>,
    limit = 100,
    offset = 0
  ) => {
    setLoading(true);
    try {
      const result = await usuarioService.listar(filters, limit, offset);
      setUsuarios(result.data);
      setTotal(result.total);
      return result;
    } catch (error) {
      toast({
        title: "Erro ao carregar usuários",
        description: "Não foi possível carregar a lista de usuários.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createUsuario = useCallback(async (data: Partial<Usuario>) => {
    try {
      const result = await usuarioService.criar(data);
      toast({
        title: "Usuário criado",
        description: "O usuário foi criado com sucesso.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Erro ao criar usuário",
        description: "Não foi possível criar o usuário.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updateUsuario = useCallback(async (id: string, data: Partial<Usuario>) => {
    try {
      const result = await usuarioService.atualizar(id, data);
      toast({
        title: "Usuário atualizado",
        description: "O usuário foi atualizado com sucesso.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Erro ao atualizar usuário",
        description: "Não foi possível atualizar o usuário.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deleteUsuario = useCallback(async (id: string) => {
    try {
      await usuarioService.deletar(id);
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Erro ao excluir usuário",
        description: "Não foi possível excluir o usuário.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  return {
    loading,
    usuarios,
    total,
    fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  };
}
