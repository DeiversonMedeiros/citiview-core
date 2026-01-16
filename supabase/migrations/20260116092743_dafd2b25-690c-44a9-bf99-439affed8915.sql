-- ========================================
-- ESQUEMA CORE - Estrutura Base do Sistema
-- ========================================

-- Deletar tabela user_roles conforme solicitado
DROP TABLE IF EXISTS core.user_roles CASCADE;

-- ========================================
-- TABELA: cliente (tenants do sistema SaaS)
-- ========================================
CREATE TABLE IF NOT EXISTS core.cliente (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    email TEXT,
    telefone TEXT,
    endereco TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    ativo BOOLEAN DEFAULT true,
    data_contrato DATE,
    plano TEXT DEFAULT 'basico',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ========================================
-- TABELA: empresa (empresas de cada cliente)
-- ========================================
CREATE TABLE IF NOT EXISTS core.empresa (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID NOT NULL REFERENCES core.cliente(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    razao_social TEXT,
    cnpj TEXT,
    inscricao_estadual TEXT,
    inscricao_municipal TEXT,
    email TEXT,
    telefone TEXT,
    endereco TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    matriz BOOLEAN DEFAULT false,
    ativa BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ========================================
-- TABELA: perfil_acesso (perfis de permissão)
-- ========================================
CREATE TABLE IF NOT EXISTS core.perfil_acesso (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID NOT NULL REFERENCES core.cliente(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    descricao TEXT,
    permissoes JSONB DEFAULT '[]'::jsonb,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(cliente_id, nome)
);

-- ========================================
-- Atualizar tabela usuario existente
-- ========================================
-- Adicionar colunas que faltam à tabela usuarios
ALTER TABLE core.usuarios 
ADD COLUMN IF NOT EXISTS telefone TEXT,
ADD COLUMN IF NOT EXISTS cargo TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- ========================================
-- TABELA: usuario_empresa (vínculo usuário-empresa com perfil)
-- ========================================
CREATE TABLE IF NOT EXISTS core.usuario_empresa (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID NOT NULL REFERENCES core.cliente(id) ON DELETE CASCADE,
    empresa_id UUID NOT NULL REFERENCES core.empresa(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES core.usuarios(id) ON DELETE CASCADE,
    perfil_acesso_id UUID REFERENCES core.perfil_acesso(id) ON DELETE SET NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(empresa_id, usuario_id)
);

-- ========================================
-- ÍNDICES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_empresa_cliente_id ON core.empresa(cliente_id);
CREATE INDEX IF NOT EXISTS idx_perfil_acesso_cliente_id ON core.perfil_acesso(cliente_id);
CREATE INDEX IF NOT EXISTS idx_usuario_empresa_cliente_id ON core.usuario_empresa(cliente_id);
CREATE INDEX IF NOT EXISTS idx_usuario_empresa_empresa_id ON core.usuario_empresa(empresa_id);
CREATE INDEX IF NOT EXISTS idx_usuario_empresa_usuario_id ON core.usuario_empresa(usuario_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_cliente_id ON core.usuarios(cliente_id);

-- ========================================
-- FUNÇÃO: Atualizar updated_at automaticamente
-- ========================================
CREATE OR REPLACE FUNCTION core.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- TRIGGERS para updated_at
-- ========================================
DROP TRIGGER IF EXISTS update_cliente_updated_at ON core.cliente;
CREATE TRIGGER update_cliente_updated_at
    BEFORE UPDATE ON core.cliente
    FOR EACH ROW
    EXECUTE FUNCTION core.update_updated_at_column();

DROP TRIGGER IF EXISTS update_empresa_updated_at ON core.empresa;
CREATE TRIGGER update_empresa_updated_at
    BEFORE UPDATE ON core.empresa
    FOR EACH ROW
    EXECUTE FUNCTION core.update_updated_at_column();

DROP TRIGGER IF EXISTS update_perfil_acesso_updated_at ON core.perfil_acesso;
CREATE TRIGGER update_perfil_acesso_updated_at
    BEFORE UPDATE ON core.perfil_acesso
    FOR EACH ROW
    EXECUTE FUNCTION core.update_updated_at_column();

DROP TRIGGER IF EXISTS update_usuarios_updated_at ON core.usuarios;
CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON core.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION core.update_updated_at_column();

DROP TRIGGER IF EXISTS update_usuario_empresa_updated_at ON core.usuario_empresa;
CREATE TRIGGER update_usuario_empresa_updated_at
    BEFORE UPDATE ON core.usuario_empresa
    FOR EACH ROW
    EXECUTE FUNCTION core.update_updated_at_column();

-- ========================================
-- RPC: get_entity_data (leitura genérica)
-- ========================================
CREATE OR REPLACE FUNCTION public.get_entity_data(
    schema_name TEXT,
    table_name TEXT,
    company_id_param TEXT DEFAULT NULL,
    filters JSONB DEFAULT NULL,
    order_by TEXT DEFAULT 'created_at',
    order_direction TEXT DEFAULT 'DESC',
    limit_param INTEGER DEFAULT 100,
    offset_param INTEGER DEFAULT 0
)
RETURNS TABLE (id TEXT, data JSONB, total_count BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    query_text text;
    count_query text;
    where_clause text := '';
    order_clause text;
    total_rows bigint;
    filter_key text;
    filter_value text;
    base_field text;
    condition text;
    has_company_id_column boolean := false;
    has_cliente_id_column boolean := false;
    column_exists boolean := false;
    order_by_column_exists boolean := false;
BEGIN
    -- Verificar se a tabela tem coluna empresa_id (company_id)
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns c
        WHERE c.table_schema = schema_name
        AND c.table_name = get_entity_data.table_name
        AND c.column_name = 'empresa_id'
    ) INTO has_company_id_column;
    
    -- Verificar se a tabela tem coluna cliente_id
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns c
        WHERE c.table_schema = schema_name
        AND c.table_name = get_entity_data.table_name
        AND c.column_name = 'cliente_id'
    ) INTO has_cliente_id_column;

    -- Verificar se a coluna order_by existe
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns c
        WHERE c.table_schema = schema_name
        AND c.table_name = get_entity_data.table_name
        AND c.column_name = order_by
    ) INTO order_by_column_exists;
    
    IF NOT order_by_column_exists THEN
        SELECT EXISTS (
            SELECT 1 FROM information_schema.columns c
            WHERE c.table_schema = schema_name
            AND c.table_name = get_entity_data.table_name
            AND c.column_name = 'created_at'
        ) INTO order_by_column_exists;
        IF order_by_column_exists THEN
            order_by := 'created_at';
        ELSE
            order_by := 'id';
        END IF;
    END IF;

    where_clause := 'WHERE 1=1';
    
    -- Filtrar por empresa_id se fornecido
    IF company_id_param IS NOT NULL AND has_company_id_column THEN
        where_clause := where_clause || ' AND empresa_id = ''' || company_id_param || '''::uuid';
    END IF;

    -- Processar filtros adicionais
    IF filters IS NOT NULL AND jsonb_typeof(filters) = 'object' THEN
        FOR filter_key, filter_value IN SELECT * FROM jsonb_each_text(filters)
        LOOP
            IF filter_value IS NOT NULL AND filter_value != '' AND filter_value != 'all' THEN
                condition := '';
                column_exists := false;
                
                IF filter_key LIKE '%_gte' THEN
                    base_field := replace(filter_key, '_gte', '');
                ELSIF filter_key LIKE '%_lte' THEN
                    base_field := replace(filter_key, '_lte', '');
                ELSE
                    base_field := filter_key;
                END IF;

                SELECT EXISTS (
                    SELECT 1 FROM information_schema.columns c
                    WHERE c.table_schema = schema_name
                    AND c.table_name = get_entity_data.table_name
                    AND c.column_name = base_field
                ) INTO column_exists;

                IF NOT column_exists THEN
                    CONTINUE;
                END IF;

                IF filter_key LIKE '%_id' THEN
                    condition := filter_key || ' = ''' || filter_value || '''::uuid';
                ELSIF filter_key LIKE '%_gte' THEN
                    condition := base_field || ' >= ''' || filter_value || '''::date';
                ELSIF filter_key LIKE '%_lte' THEN
                    condition := base_field || ' <= ''' || filter_value || '''::date';
                ELSIF filter_value IN ('true', 'false') THEN
                    condition := filter_key || ' = ' || filter_value;
                ELSE
                    condition := filter_key || ' = ''' || filter_value || '''';
                END IF;

                IF condition != '' THEN
                    where_clause := where_clause || ' AND ' || condition;
                END IF;
            END IF;
        END LOOP;
    END IF;

    order_clause := 'ORDER BY ' || order_by || ' ' || order_direction;

    count_query := format('SELECT COUNT(*) FROM %I.%I %s', schema_name, table_name, where_clause);
    EXECUTE count_query INTO total_rows;

    query_text := format('
        SELECT 
            t.id::text,
            to_jsonb(t.*) as data,
            %s::bigint as total_count
        FROM %I.%I t 
        %s 
        %s
        LIMIT %s OFFSET %s
    ', total_rows, schema_name, table_name, where_clause, order_clause, limit_param, offset_param);

    RETURN QUERY EXECUTE query_text;
END;
$$;

-- ========================================
-- RPC: create_entity_data (escrita genérica)
-- ========================================
CREATE OR REPLACE FUNCTION public.create_entity_data(
    schema_name TEXT,
    table_name TEXT,
    company_id_param TEXT DEFAULT NULL,
    data_param JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
    v_insert_sql TEXT;
    v_key TEXT;
    v_value JSONB;
    v_value_str TEXT;
    v_has_empresa_id BOOLEAN;
    v_has_cliente_id BOOLEAN;
    v_columns_list TEXT := '';
    v_values_list TEXT := '';
    v_column_type TEXT;
    v_value_type TEXT;
    v_schema_alias TEXT;
    v_table_alias TEXT;
    v_return_columns TEXT;
    v_all_columns TEXT[];
    v_jsonb_parts TEXT[];
    v_col_name TEXT;
    v_col_exists BOOLEAN;
BEGIN
    v_schema_alias := schema_name;
    v_table_alias := table_name;

    -- Verificar se a tabela existe
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables t
        WHERE t.table_schema = v_schema_alias 
        AND t.table_name = v_table_alias
    ) THEN
        RAISE EXCEPTION 'Tabela %.% não existe', v_schema_alias, v_table_alias;
    END IF;

    -- Verificar se a tabela tem coluna empresa_id
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.columns col
        WHERE col.table_schema = v_schema_alias
        AND col.table_name = v_table_alias
        AND col.column_name = 'empresa_id'
    ) INTO v_has_empresa_id;

    -- Verificar se a tabela tem coluna cliente_id
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.columns col
        WHERE col.table_schema = v_schema_alias
        AND col.table_name = v_table_alias
        AND col.column_name = 'cliente_id'
    ) INTO v_has_cliente_id;

    -- Adicionar empresa_id se existir
    IF v_has_empresa_id AND company_id_param IS NOT NULL THEN
        v_columns_list := 'empresa_id';
        v_values_list := quote_literal(company_id_param)::TEXT || '::uuid';
    END IF;

    -- Processar campos do data_param
    FOR v_key, v_value IN SELECT * FROM jsonb_each(data_param) LOOP
        IF v_key = 'empresa_id' AND v_has_empresa_id THEN
            CONTINUE;
        END IF;

        SELECT EXISTS (
            SELECT 1 
            FROM information_schema.columns col
            WHERE col.table_schema = v_schema_alias
            AND col.table_name = v_table_alias
            AND col.column_name = v_key
        ) INTO v_col_exists;

        IF NOT v_col_exists THEN
            CONTINUE;
        END IF;

        IF v_columns_list != '' THEN
            v_columns_list := v_columns_list || ', ';
            v_values_list := v_values_list || ', ';
        END IF;

        v_columns_list := v_columns_list || quote_ident(v_key);

        SELECT col.data_type INTO v_column_type
        FROM information_schema.columns col
        WHERE col.table_schema = v_schema_alias
        AND col.table_name = v_table_alias
        AND col.column_name = v_key;

        IF v_column_type IS NULL THEN
            v_column_type := 'text';
        END IF;

        v_value_type := jsonb_typeof(v_value);

        IF v_value_type = 'null' THEN
            v_values_list := v_values_list || 'NULL';
        ELSIF v_value_type = 'boolean' THEN
            IF v_value::BOOLEAN THEN
                v_values_list := v_values_list || 'TRUE';
            ELSE
                v_values_list := v_values_list || 'FALSE';
            END IF;
        ELSIF v_value_type = 'number' THEN
            v_value_str := v_value::TEXT;
            v_values_list := v_values_list || v_value_str;
        ELSIF v_value_type = 'array' THEN
            v_value_str := v_value::TEXT;
            v_values_list := v_values_list || quote_literal(v_value_str) || '::jsonb';
        ELSIF v_value_type = 'object' THEN
            v_value_str := v_value::TEXT;
            v_values_list := v_values_list || quote_literal(v_value_str) || '::jsonb';
        ELSE
            v_value_str := v_value::TEXT;
            IF v_value_str LIKE '"%' AND v_value_str LIKE '%"' THEN
                v_value_str := substring(v_value_str from 2 for length(v_value_str) - 2);
            END IF;
            
            IF v_column_type = 'uuid' THEN
                v_values_list := v_values_list || quote_literal(v_value_str) || '::uuid';
            ELSIF v_column_type = 'date' THEN
                IF v_value_str IS NULL OR v_value_str = '' THEN
                    v_values_list := v_values_list || 'NULL';
                ELSE
                    v_values_list := v_values_list || quote_literal(v_value_str) || '::date';
                END IF;
            ELSIF v_column_type LIKE 'timestamp%' THEN
                IF v_value_str IS NULL OR v_value_str = '' THEN
                    v_values_list := v_values_list || 'NULL';
                ELSE
                    v_values_list := v_values_list || quote_literal(v_value_str);
                END IF;
            ELSE
                v_values_list := v_values_list || quote_literal(v_value_str);
            END IF;
        END IF;
    END LOOP;

    IF v_columns_list = '' THEN
        RAISE EXCEPTION 'Nenhuma coluna especificada para inserção';
    END IF;

    SELECT array_agg(quote_ident(col.column_name) ORDER BY col.ordinal_position)
    INTO v_all_columns
    FROM information_schema.columns col
    WHERE col.table_schema = v_schema_alias
    AND col.table_name = v_table_alias;

    IF v_all_columns IS NULL THEN
        RAISE EXCEPTION 'Nenhuma coluna encontrada na tabela %.%', v_schema_alias, v_table_alias;
    END IF;

    v_return_columns := array_to_string(v_all_columns, ', ');

    v_jsonb_parts := ARRAY[]::TEXT[];
    FOR v_col_name IN SELECT unnest(v_all_columns) LOOP
        v_col_name := trim(both '"' from v_col_name);
        v_jsonb_parts := v_jsonb_parts || format('%L, inserted_row.%I', v_col_name, v_col_name);
    END LOOP;

    v_insert_sql := format(
        'WITH inserted_row AS (
           INSERT INTO %I.%I (%s) 
           VALUES (%s) 
           RETURNING %s
         )
         SELECT jsonb_build_object(%s) 
         FROM inserted_row',
        v_schema_alias,
        v_table_alias,
        v_columns_list,
        v_values_list,
        v_return_columns,
        array_to_string(v_jsonb_parts, ', ')
    );

    EXECUTE v_insert_sql INTO v_result;
    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'create_entity_data failed. SQL: % Error: %', COALESCE(v_insert_sql, 'N/A'), SQLERRM;
END;
$$;

-- ========================================
-- RPC: update_entity_data (atualização genérica)
-- ========================================
CREATE OR REPLACE FUNCTION public.update_entity_data(
    schema_name TEXT,
    table_name TEXT,
    entity_id TEXT,
    data_param JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
    v_update_sql TEXT;
    v_key TEXT;
    v_value JSONB;
    v_value_str TEXT;
    v_set_clause TEXT := '';
    v_column_type TEXT;
    v_value_type TEXT;
    v_schema_alias TEXT;
    v_table_alias TEXT;
    v_col_exists BOOLEAN;
BEGIN
    v_schema_alias := schema_name;
    v_table_alias := table_name;

    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables t
        WHERE t.table_schema = v_schema_alias 
        AND t.table_name = v_table_alias
    ) THEN
        RAISE EXCEPTION 'Tabela %.% não existe', v_schema_alias, v_table_alias;
    END IF;

    FOR v_key, v_value IN SELECT * FROM jsonb_each(data_param) LOOP
        IF v_key = 'id' THEN
            CONTINUE;
        END IF;

        SELECT EXISTS (
            SELECT 1 
            FROM information_schema.columns col
            WHERE col.table_schema = v_schema_alias
            AND col.table_name = v_table_alias
            AND col.column_name = v_key
        ) INTO v_col_exists;

        IF NOT v_col_exists THEN
            CONTINUE;
        END IF;

        IF v_set_clause != '' THEN
            v_set_clause := v_set_clause || ', ';
        END IF;

        SELECT col.data_type INTO v_column_type
        FROM information_schema.columns col
        WHERE col.table_schema = v_schema_alias
        AND col.table_name = v_table_alias
        AND col.column_name = v_key;

        v_value_type := jsonb_typeof(v_value);

        IF v_value_type = 'null' THEN
            v_set_clause := v_set_clause || quote_ident(v_key) || ' = NULL';
        ELSIF v_value_type = 'boolean' THEN
            v_set_clause := v_set_clause || quote_ident(v_key) || ' = ' || v_value::TEXT;
        ELSIF v_value_type = 'number' THEN
            v_set_clause := v_set_clause || quote_ident(v_key) || ' = ' || v_value::TEXT;
        ELSE
            v_value_str := v_value::TEXT;
            IF v_value_str LIKE '"%' AND v_value_str LIKE '%"' THEN
                v_value_str := substring(v_value_str from 2 for length(v_value_str) - 2);
            END IF;
            
            IF v_column_type = 'uuid' THEN
                v_set_clause := v_set_clause || quote_ident(v_key) || ' = ' || quote_literal(v_value_str) || '::uuid';
            ELSIF v_column_type = 'date' THEN
                IF v_value_str = '' THEN
                    v_set_clause := v_set_clause || quote_ident(v_key) || ' = NULL';
                ELSE
                    v_set_clause := v_set_clause || quote_ident(v_key) || ' = ' || quote_literal(v_value_str) || '::date';
                END IF;
            ELSIF v_column_type = 'jsonb' OR v_column_type = 'json' THEN
                v_set_clause := v_set_clause || quote_ident(v_key) || ' = ' || quote_literal(v_value::TEXT) || '::jsonb';
            ELSE
                v_set_clause := v_set_clause || quote_ident(v_key) || ' = ' || quote_literal(v_value_str);
            END IF;
        END IF;
    END LOOP;

    IF v_set_clause = '' THEN
        RAISE EXCEPTION 'Nenhuma coluna para atualizar';
    END IF;

    v_update_sql := format(
        'UPDATE %I.%I SET %s WHERE id = %L::uuid RETURNING to_jsonb(%I.%I.*)',
        v_schema_alias,
        v_table_alias,
        v_set_clause,
        entity_id,
        v_schema_alias,
        v_table_alias
    );

    EXECUTE v_update_sql INTO v_result;
    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'update_entity_data failed. Error: %', SQLERRM;
END;
$$;

-- ========================================
-- RPC: delete_entity_data (exclusão genérica)
-- ========================================
CREATE OR REPLACE FUNCTION public.delete_entity_data(
    schema_name TEXT,
    table_name TEXT,
    entity_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_delete_sql TEXT;
    v_deleted_count INTEGER;
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables t
        WHERE t.table_schema = schema_name 
        AND t.table_name = delete_entity_data.table_name
    ) THEN
        RAISE EXCEPTION 'Tabela %.% não existe', schema_name, table_name;
    END IF;

    v_delete_sql := format(
        'DELETE FROM %I.%I WHERE id = %L::uuid',
        schema_name,
        table_name,
        entity_id
    );

    EXECUTE v_delete_sql;
    GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
    
    RETURN v_deleted_count > 0;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'delete_entity_data failed. Error: %', SQLERRM;
END;
$$;

-- ========================================
-- RPC: get_entity_by_id (busca por ID)
-- ========================================
CREATE OR REPLACE FUNCTION public.get_entity_by_id(
    schema_name TEXT,
    table_name TEXT,
    entity_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
    v_query TEXT;
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables t
        WHERE t.table_schema = schema_name 
        AND t.table_name = get_entity_by_id.table_name
    ) THEN
        RAISE EXCEPTION 'Tabela %.% não existe', schema_name, table_name;
    END IF;

    v_query := format(
        'SELECT to_jsonb(t.*) FROM %I.%I t WHERE t.id = %L::uuid',
        schema_name,
        table_name,
        entity_id
    );

    EXECUTE v_query INTO v_result;
    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'get_entity_by_id failed. Error: %', SQLERRM;
END;
$$;

-- ========================================
-- Conceder permissões às funções
-- ========================================
GRANT EXECUTE ON FUNCTION public.get_entity_data TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_entity_data TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_entity_data TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_entity_data TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_entity_by_id TO anon, authenticated;

-- Conceder acesso ao esquema core
GRANT USAGE ON SCHEMA core TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA core TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA core TO anon;