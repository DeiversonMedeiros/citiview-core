import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateUserRequest {
  email: string;
  password: string;
  nome: string;
  username: string;
  cliente_id: string;
  empresa_id?: string;
  role?: 'super_admin' | 'admin' | 'manager' | 'user';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('create-user: Starting function execution');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('create-user: Missing environment variables');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    console.log('create-user: Supabase admin client created');

    // Verificar autenticação do usuário solicitante
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Token de autenticação não fornecido' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user: requestingUser }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !requestingUser) {
      console.error('create-user: Authentication error:', authError);
      return new Response(
        JSON.stringify({ error: 'Não autorizado' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('create-user: Requesting user authenticated:', requestingUser.id);

    // Verificar se o usuário solicitante é admin
    const { data: isAdmin, error: adminCheckError } = await supabaseAdmin
      .rpc('is_admin', { _user_id: requestingUser.id });
    
    console.log('create-user: Admin check result:', { isAdmin, adminCheckError });

    if (adminCheckError) {
      console.error('create-user: Admin check error:', adminCheckError);
      return new Response(
        JSON.stringify({ error: 'Erro ao verificar permissões' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Apenas administradores podem criar usuários' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parsear body da requisição
    let requestBody: CreateUserRequest;
    try {
      requestBody = await req.json();
      console.log('create-user: Request body parsed:', { 
        email: requestBody.email, 
        nome: requestBody.nome,
        username: requestBody.username,
        cliente_id: requestBody.cliente_id 
      });
    } catch (parseError) {
      console.error('create-user: Error parsing request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'JSON inválido no corpo da requisição' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { email, password, nome, username, cliente_id, empresa_id, role = 'user' } = requestBody;

    // Validar campos obrigatórios
    if (!email || !password || !nome || !username || !cliente_id) {
      console.error('create-user: Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios: email, password, nome, username, cliente_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validar username
    const sanitizedUsername = username.trim();
    if (sanitizedUsername.length < 3) {
      return new Response(
        JSON.stringify({ error: 'Nome de usuário deve ter pelo menos 3 caracteres' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validar senha
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Senha deve ter pelo menos 6 caracteres' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validar UUIDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(cliente_id)) {
      return new Response(
        JSON.stringify({ error: 'cliente_id inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (empresa_id && !uuidRegex.test(empresa_id)) {
      return new Response(
        JSON.stringify({ error: 'empresa_id inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verificar se username já existe
    const { data: existingUsername, error: usernameLookupError } = await supabaseAdmin
      .rpc('get_usuario_by_id', { _user_id: '00000000-0000-0000-0000-000000000000' });
    
    // Consulta direta para verificar username (usando RPC seria mais seguro, mas vamos usar diretamente)
    const { data: usernameCheck, error: usernameCheckError } = await supabaseAdmin
      .from('usuarios')
      .select('id')
      .eq('username', sanitizedUsername)
      .maybeSingle();

    if (usernameCheckError && usernameCheckError.code !== 'PGRST116') {
      console.error('create-user: Error checking username:', usernameCheckError);
    }

    if (usernameCheck) {
      return new Response(
        JSON.stringify({ error: 'Nome de usuário já está em uso' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Criar usuário no Supabase Auth
    console.log('create-user: Creating user in Supabase Auth');
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome }
    });
    
    if (createError) {
      console.error('create-user: Error creating auth user:', createError);
      return new Response(
        JSON.stringify({ error: createError.message || 'Erro ao criar usuário' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const userId = newUser.user.id;
    console.log('create-user: Auth user created:', userId);

    // Criar registro na tabela core.usuarios usando a função RPC
    console.log('create-user: Creating user in core.usuarios');
    const { data: userResult, error: userError } = await supabaseAdmin
      .rpc('create_usuario', {
        _user_id: userId,
        _cliente_id: cliente_id,
        _empresa_id: empresa_id || null,
        _email: email,
        _nome: nome,
        _username: sanitizedUsername,
        _role: role
      });
    
    if (userError) {
      console.error('create-user: Error creating user record:', userError);
      
      // Rollback: deletar usuário do Auth
      try {
        await supabaseAdmin.auth.admin.deleteUser(userId);
        console.log('create-user: Rolled back auth user creation');
      } catch (deleteError) {
        console.error('create-user: Error rolling back auth user:', deleteError);
      }
      
      return new Response(
        JSON.stringify({ error: userError.message || 'Erro ao criar registro do usuário' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('create-user: User created successfully');

    return new Response(
      JSON.stringify({
        success: true,
        user: userResult
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('create-user: Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
