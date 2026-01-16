import { supabase } from "@/integrations/supabase/client";

export interface Cliente {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  ativo: boolean;
  data_contrato?: string;
  plano?: string;
  created_at: string;
  updated_at: string;
}

export interface Empresa {
  id: string;
  cliente_id: string;
  nome: string;
  razao_social?: string;
  cnpj?: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  matriz: boolean;
  ativa: boolean;
  created_at: string;
  updated_at: string;
}

export interface PerfilAcesso {
  id: string;
  cliente_id: string;
  nome: string;
  descricao?: string;
  permissoes: string[];
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Usuario {
  id: string;
  cliente_id: string;
  empresa_id?: string;
  email: string;
  nome: string;
  username?: string;
  telefone?: string;
  cargo?: string;
  avatar_url?: string;
  ativo: boolean;
  ultimo_acesso?: string;
  created_at: string;
  updated_at: string;
}

export interface UsuarioEmpresa {
  id: string;
  cliente_id: string;
  empresa_id: string;
  usuario_id: string;
  perfil_acesso_id?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

interface EntityDataResult {
  id: string;
  data: Record<string, unknown>;
  total_count: number;
}

// ========================================
// Funções genéricas para acessar o esquema core
// ========================================

async function getEntityData<T>(
  tableName: string,
  filters?: Record<string, string>,
  orderBy: string = 'created_at',
  orderDirection: string = 'DESC',
  limit: number = 100,
  offset: number = 0
): Promise<{ data: T[]; total: number }> {
  const { data, error } = await supabase.rpc('get_entity_data', {
    schema_name: 'core',
    table_name: tableName,
    company_id_param: null,
    filters: filters || null,
    order_by: orderBy,
    order_direction: orderDirection,
    limit_param: limit,
    offset_param: offset,
  });

  if (error) {
    console.error(`Erro ao buscar ${tableName}:`, error);
    throw error;
  }

  const results = data as EntityDataResult[];
  const total = results.length > 0 ? results[0].total_count : 0;
  const items = results.map((row) => row.data as T);

  return { data: items, total };
}

async function getEntityById<T>(
  tableName: string,
  entityId: string
): Promise<T | null> {
  const { data, error } = await supabase.rpc('get_entity_by_id', {
    schema_name: 'core',
    table_name: tableName,
    entity_id: entityId,
  });

  if (error) {
    console.error(`Erro ao buscar ${tableName} por ID:`, error);
    throw error;
  }

  return data as T | null;
}

async function createEntity<T>(
  tableName: string,
  entityData: Record<string, unknown>
): Promise<T> {
  const { data, error } = await supabase.rpc('create_entity_data', {
    schema_name: 'core',
    table_name: tableName,
    company_id_param: null,
    data_param: entityData as unknown as Record<string, never>,
  });

  if (error) {
    console.error(`Erro ao criar ${tableName}:`, error);
    throw error;
  }

  return data as T;
}

async function updateEntity<T>(
  tableName: string,
  entityId: string,
  entityData: Record<string, unknown>
): Promise<T> {
  const { data, error } = await supabase.rpc('update_entity_data', {
    schema_name: 'core',
    table_name: tableName,
    entity_id: entityId,
    data_param: entityData as unknown as Record<string, never>,
  });

  if (error) {
    console.error(`Erro ao atualizar ${tableName}:`, error);
    throw error;
  }

  return data as T;
}

async function deleteEntity(
  tableName: string,
  entityId: string
): Promise<boolean> {
  const { data, error } = await supabase.rpc('delete_entity_data', {
    schema_name: 'core',
    table_name: tableName,
    entity_id: entityId,
  });

  if (error) {
    console.error(`Erro ao deletar ${tableName}:`, error);
    throw error;
  }

  return data as boolean;
}

// ========================================
// Serviços específicos para cada entidade
// ========================================

// Clientes
export const clienteService = {
  listar: (filters?: Record<string, string>, limit = 100, offset = 0) =>
    getEntityData<Cliente>('cliente', filters, 'nome', 'ASC', limit, offset),
  buscarPorId: (id: string) => getEntityById<Cliente>('cliente', id),
  criar: (data: Partial<Cliente>) => createEntity<Cliente>('cliente', data),
  atualizar: (id: string, data: Partial<Cliente>) =>
    updateEntity<Cliente>('cliente', id, data),
  deletar: (id: string) => deleteEntity('cliente', id),
};

// Empresas
export const empresaService = {
  listar: (filters?: Record<string, string>, limit = 100, offset = 0) =>
    getEntityData<Empresa>('empresa', filters, 'nome', 'ASC', limit, offset),
  buscarPorId: (id: string) => getEntityById<Empresa>('empresa', id),
  criar: (data: Partial<Empresa>) => createEntity<Empresa>('empresa', data),
  atualizar: (id: string, data: Partial<Empresa>) =>
    updateEntity<Empresa>('empresa', id, data),
  deletar: (id: string) => deleteEntity('empresa', id),
};

// Perfis de Acesso
export const perfilAcessoService = {
  listar: (filters?: Record<string, string>, limit = 100, offset = 0) =>
    getEntityData<PerfilAcesso>('perfil_acesso', filters, 'nome', 'ASC', limit, offset),
  buscarPorId: (id: string) => getEntityById<PerfilAcesso>('perfil_acesso', id),
  criar: (data: Partial<PerfilAcesso>) =>
    createEntity<PerfilAcesso>('perfil_acesso', data),
  atualizar: (id: string, data: Partial<PerfilAcesso>) =>
    updateEntity<PerfilAcesso>('perfil_acesso', id, data),
  deletar: (id: string) => deleteEntity('perfil_acesso', id),
};

// Usuários
export const usuarioService = {
  listar: (filters?: Record<string, string>, limit = 100, offset = 0) =>
    getEntityData<Usuario>('usuarios', filters, 'nome', 'ASC', limit, offset),
  buscarPorId: (id: string) => getEntityById<Usuario>('usuarios', id),
  criar: (data: Partial<Usuario>) => createEntity<Usuario>('usuarios', data),
  atualizar: (id: string, data: Partial<Usuario>) =>
    updateEntity<Usuario>('usuarios', id, data),
  deletar: (id: string) => deleteEntity('usuarios', id),
};

// Usuário-Empresa (vínculos)
export const usuarioEmpresaService = {
  listar: (filters?: Record<string, string>, limit = 100, offset = 0) =>
    getEntityData<UsuarioEmpresa>('usuario_empresa', filters, 'created_at', 'DESC', limit, offset),
  buscarPorId: (id: string) => getEntityById<UsuarioEmpresa>('usuario_empresa', id),
  criar: (data: Partial<UsuarioEmpresa>) =>
    createEntity<UsuarioEmpresa>('usuario_empresa', data),
  atualizar: (id: string, data: Partial<UsuarioEmpresa>) =>
    updateEntity<UsuarioEmpresa>('usuario_empresa', id, data),
  deletar: (id: string) => deleteEntity('usuario_empresa', id),
};
