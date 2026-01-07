import { supabase } from "@/integrations/supabase/client";

export interface Usuario {
  id: string;
  cliente_id: string;
  empresa_id: string | null;
  email: string;
  nome: string;
  username: string | null;
  ativo: boolean;
  ultimo_acesso: string | null;
  created_at: string;
  updated_at: string;
  roles?: { role: string; cliente_id: string | null }[];
}

export interface CreateUsuarioData {
  email: string;
  password: string;
  nome: string;
  username: string;
  cliente_id: string;
  empresa_id?: string;
  role?: 'super_admin' | 'admin' | 'manager' | 'user';
}

export interface UpdatePasswordData {
  user_id: string;
  new_password: string;
}

export interface UpdateUsuarioData {
  nome?: string;
  username?: string;
  empresa_id?: string;
  ativo?: boolean;
}

// Helper para chamar RPCs do schema core
async function callCoreRpc<T>(functionName: string, params: Record<string, unknown>): Promise<{ data: T | null; error: Error | null }> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    
    const response = await fetch(
      `https://xwtxabravuelbrfxrxen.supabase.co/rest/v1/rpc/${functionName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3dHhhYnJhdnVlbGJyZnhyeGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MDI3MTEsImV4cCI6MjA4MzA3ODcxMX0.I3GGxsyhWc8uZQGltdxYHy-w9GTL9Qulkw6pToctkPs',
          'Authorization': `Bearer ${token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3dHhhYnJhdnVlbGJyZnhyeGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MDI3MTEsImV4cCI6MjA4MzA3ODcxMX0.I3GGxsyhWc8uZQGltdxYHy-w9GTL9Qulkw6pToctkPs'}`,
        },
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`RPC ${functionName} error:`, errorText);
      return { data: null, error: new Error(errorText) };
    }

    const data = await response.json();
    return { data: data as T, error: null };
  } catch (error) {
    console.error(`RPC ${functionName} error:`, error);
    return { data: null, error: error as Error };
  }
}

// Criar usuário via edge function
export async function createUsuario(data: CreateUsuarioData): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const response = await supabase.functions.invoke('create-user', {
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.error) {
      console.error('Error creating user:', response.error);
      return { success: false, error: response.error.message || 'Erro ao criar usuário' };
    }

    if (response.data?.error) {
      return { success: false, error: response.data.error };
    }

    return { success: true, user: response.data.user };
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao criar usuário';
    return { success: false, error: errorMessage };
  }
}

// Atualizar senha via edge function
export async function updatePassword(data: UpdatePasswordData): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const response = await supabase.functions.invoke('update-password', {
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.error) {
      console.error('Error updating password:', response.error);
      return { success: false, error: response.error.message || 'Erro ao atualizar senha' };
    }

    if (response.data?.error) {
      return { success: false, error: response.data.error };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Error updating password:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar senha';
    return { success: false, error: errorMessage };
  }
}

// Obter usuário por ID via RPC
export async function getUsuarioById(userId: string): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  try {
    const { data, error } = await callCoreRpc<Usuario>('get_usuario_by_id', { _user_id: userId });

    if (error) {
      console.error('Error fetching user:', error);
      return { success: false, error: error.message };
    }

    return { success: true, user: data || undefined };
  } catch (error: unknown) {
    console.error('Error fetching user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar usuário';
    return { success: false, error: errorMessage };
  }
}

// Listar usuários por cliente via RPC
export async function getUsuariosByCliente(
  clienteId: string,
  limit = 50,
  offset = 0
): Promise<{ success: boolean; users?: Usuario[]; total?: number; error?: string }> {
  try {
    const { data, error } = await callCoreRpc<Array<{ id: string; data: Usuario; total_count: number }>>(
      'get_usuarios_by_cliente',
      {
        _cliente_id: clienteId,
        _limit: limit,
        _offset: offset
      }
    );

    if (error) {
      console.error('Error fetching users:', error);
      return { success: false, error: error.message };
    }

    const users = data?.map(row => row.data) || [];
    const total = data?.[0]?.total_count || 0;

    return { success: true, users, total };
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar usuários';
    return { success: false, error: errorMessage };
  }
}

// Atualizar usuário via RPC
export async function updateUsuario(
  userId: string,
  data: UpdateUsuarioData
): Promise<{ success: boolean; user?: Usuario; error?: string }> {
  try {
    const { data: result, error } = await callCoreRpc<Usuario>('update_usuario', {
      _user_id: userId,
      _data: data
    });

    if (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }

    return { success: true, user: result || undefined };
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar usuário';
    return { success: false, error: errorMessage };
  }
}

// Atualizar último acesso via RPC
export async function updateUltimoAcesso(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await callCoreRpc<void>('update_ultimo_acesso', { _user_id: userId });

    if (error) {
      console.error('Error updating last access:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Error updating last access:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar último acesso';
    return { success: false, error: errorMessage };
  }
}
