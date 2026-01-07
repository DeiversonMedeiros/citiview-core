import { useState, useCallback } from 'react';
import {
  Usuario,
  CreateUsuarioData,
  UpdateUsuarioData,
  UpdatePasswordData,
  createUsuario,
  updatePassword,
  getUsuarioById,
  getUsuariosByCliente,
  updateUsuario,
} from '@/services/usuariosService';
import { useToast } from '@/hooks/use-toast';

export function useUsuarios() {
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const fetchUsuariosByCliente = useCallback(async (clienteId: string, limit = 50, offset = 0) => {
    setLoading(true);
    try {
      const result = await getUsuariosByCliente(clienteId, limit, offset);
      if (result.success) {
        setUsuarios(result.users || []);
        setTotal(result.total || 0);
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao buscar usuários',
          variant: 'destructive',
        });
      }
      return result;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchUsuarioById = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const result = await getUsuarioById(userId);
      if (!result.success) {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao buscar usuário',
          variant: 'destructive',
        });
      }
      return result;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleCreateUsuario = useCallback(async (data: CreateUsuarioData) => {
    setLoading(true);
    try {
      const result = await createUsuario(data);
      if (result.success) {
        toast({
          title: 'Sucesso',
          description: 'Usuário criado com sucesso',
        });
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao criar usuário',
          variant: 'destructive',
        });
      }
      return result;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleUpdateUsuario = useCallback(async (userId: string, data: UpdateUsuarioData) => {
    setLoading(true);
    try {
      const result = await updateUsuario(userId, data);
      if (result.success) {
        toast({
          title: 'Sucesso',
          description: 'Usuário atualizado com sucesso',
        });
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao atualizar usuário',
          variant: 'destructive',
        });
      }
      return result;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleUpdatePassword = useCallback(async (data: UpdatePasswordData) => {
    setLoading(true);
    try {
      const result = await updatePassword(data);
      if (result.success) {
        toast({
          title: 'Sucesso',
          description: 'Senha atualizada com sucesso',
        });
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao atualizar senha',
          variant: 'destructive',
        });
      }
      return result;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    loading,
    usuarios,
    total,
    fetchUsuariosByCliente,
    fetchUsuarioById,
    createUsuario: handleCreateUsuario,
    updateUsuario: handleUpdateUsuario,
    updatePassword: handleUpdatePassword,
  };
}
