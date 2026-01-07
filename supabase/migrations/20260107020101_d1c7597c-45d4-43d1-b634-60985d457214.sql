-- Criar esquema core
CREATE SCHEMA IF NOT EXISTS core;

-- Criar tabela de usuários no esquema core
CREATE TABLE core.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    cliente_id UUID NOT NULL,
    empresa_id UUID,
    email TEXT NOT NULL,
    nome TEXT NOT NULL,
    username TEXT UNIQUE,
    ativo BOOLEAN DEFAULT true,
    ultimo_acesso TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_usuarios_cliente_id ON core.usuarios(cliente_id);
CREATE INDEX idx_usuarios_empresa_id ON core.usuarios(empresa_id);
CREATE INDEX idx_usuarios_email ON core.usuarios(email);
CREATE INDEX idx_usuarios_username ON core.usuarios(username);
CREATE INDEX idx_usuarios_ativo ON core.usuarios(ativo);

-- Habilitar RLS
ALTER TABLE core.usuarios ENABLE ROW LEVEL SECURITY;

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION core.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON core.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION core.update_updated_at_column();

-- Criar enum para roles
CREATE TYPE core.app_role AS ENUM ('super_admin', 'admin', 'manager', 'user');

-- Tabela de roles dos usuários (separada para segurança)
CREATE TABLE core.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role core.app_role NOT NULL DEFAULT 'user',
    cliente_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role, cliente_id)
);

CREATE INDEX idx_user_roles_user_id ON core.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON core.user_roles(role);
CREATE INDEX idx_user_roles_cliente_id ON core.user_roles(cliente_id);

ALTER TABLE core.user_roles ENABLE ROW LEVEL SECURITY;

-- Função SECURITY DEFINER para verificar role (evita recursão RLS)
CREATE OR REPLACE FUNCTION core.has_role(_user_id UUID, _role core.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = core
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM core.user_roles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Função para verificar se é super_admin
CREATE OR REPLACE FUNCTION core.is_super_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = core
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM core.user_roles
        WHERE user_id = _user_id
        AND role = 'super_admin'
    )
$$;

-- Função para verificar se é admin (inclui super_admin)
CREATE OR REPLACE FUNCTION core.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = core
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM core.user_roles
        WHERE user_id = _user_id
        AND role IN ('super_admin', 'admin')
    )
$$;

-- Função para obter dados de usuário
CREATE OR REPLACE FUNCTION core.get_usuario_by_id(_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = core
AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'id', u.id,
        'cliente_id', u.cliente_id,
        'empresa_id', u.empresa_id,
        'email', u.email,
        'nome', u.nome,
        'username', u.username,
        'ativo', u.ativo,
        'ultimo_acesso', u.ultimo_acesso,
        'created_at', u.created_at,
        'updated_at', u.updated_at,
        'roles', (
            SELECT jsonb_agg(jsonb_build_object('role', r.role, 'cliente_id', r.cliente_id))
            FROM core.user_roles r
            WHERE r.user_id = u.id
        )
    ) INTO v_result
    FROM core.usuarios u
    WHERE u.id = _user_id;
    
    RETURN v_result;
END;
$$;

-- Função para listar usuários de um cliente
CREATE OR REPLACE FUNCTION core.get_usuarios_by_cliente(
    _cliente_id UUID,
    _limit INT DEFAULT 50,
    _offset INT DEFAULT 0
)
RETURNS TABLE(id TEXT, data JSONB, total_count BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = core
AS $$
DECLARE
    v_total BIGINT;
BEGIN
    -- Contar total
    SELECT COUNT(*) INTO v_total
    FROM core.usuarios
    WHERE cliente_id = _cliente_id;
    
    -- Retornar dados
    RETURN QUERY
    SELECT 
        u.id::TEXT,
        jsonb_build_object(
            'id', u.id,
            'cliente_id', u.cliente_id,
            'empresa_id', u.empresa_id,
            'email', u.email,
            'nome', u.nome,
            'username', u.username,
            'ativo', u.ativo,
            'ultimo_acesso', u.ultimo_acesso,
            'created_at', u.created_at,
            'updated_at', u.updated_at
        ) AS data,
        v_total AS total_count
    FROM core.usuarios u
    WHERE u.cliente_id = _cliente_id
    ORDER BY u.created_at DESC
    LIMIT _limit OFFSET _offset;
END;
$$;

-- Função para criar usuário (chamada pela edge function)
CREATE OR REPLACE FUNCTION core.create_usuario(
    _user_id UUID,
    _cliente_id UUID,
    _empresa_id UUID,
    _email TEXT,
    _nome TEXT,
    _username TEXT,
    _role core.app_role DEFAULT 'user'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = core
AS $$
DECLARE
    v_result JSONB;
BEGIN
    -- Inserir usuário
    INSERT INTO core.usuarios (id, cliente_id, empresa_id, email, nome, username)
    VALUES (_user_id, _cliente_id, _empresa_id, _email, _nome, _username);
    
    -- Inserir role
    INSERT INTO core.user_roles (user_id, role, cliente_id)
    VALUES (_user_id, _role, _cliente_id);
    
    -- Retornar dados do usuário criado
    SELECT core.get_usuario_by_id(_user_id) INTO v_result;
    
    RETURN v_result;
END;
$$;

-- Função para atualizar usuário
CREATE OR REPLACE FUNCTION core.update_usuario(
    _user_id UUID,
    _data JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = core
AS $$
DECLARE
    v_result JSONB;
BEGIN
    UPDATE core.usuarios
    SET
        nome = COALESCE(_data->>'nome', nome),
        username = COALESCE(_data->>'username', username),
        empresa_id = COALESCE((_data->>'empresa_id')::UUID, empresa_id),
        ativo = COALESCE((_data->>'ativo')::BOOLEAN, ativo)
    WHERE id = _user_id;
    
    SELECT core.get_usuario_by_id(_user_id) INTO v_result;
    
    RETURN v_result;
END;
$$;

-- Função para atualizar último acesso
CREATE OR REPLACE FUNCTION core.update_ultimo_acesso(_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = core
AS $$
BEGIN
    UPDATE core.usuarios
    SET ultimo_acesso = now()
    WHERE id = _user_id;
END;
$$;

-- Políticas RLS para core.usuarios
CREATE POLICY "Super admins podem ver todos os usuários"
ON core.usuarios FOR SELECT
TO authenticated
USING (core.is_super_admin(auth.uid()));

CREATE POLICY "Admins podem ver usuários do mesmo cliente"
ON core.usuarios FOR SELECT
TO authenticated
USING (
    cliente_id IN (
        SELECT u.cliente_id FROM core.usuarios u WHERE u.id = auth.uid()
    )
);

CREATE POLICY "Usuários podem ver próprio perfil"
ON core.usuarios FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Políticas RLS para core.user_roles
CREATE POLICY "Super admins podem ver todas as roles"
ON core.user_roles FOR SELECT
TO authenticated
USING (core.is_super_admin(auth.uid()));

CREATE POLICY "Usuários podem ver próprias roles"
ON core.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());