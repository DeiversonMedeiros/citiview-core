import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Mail, 
  Bell, 
  Shield, 
  Database,
  Globe,
  Save
} from "lucide-react";

export default function AdminConfiguracoes() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-500">Configurações globais do sistema</p>
        </div>

        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList>
            <TabsTrigger value="geral" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-mail
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geral">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Informações do Sistema
                  </CardTitle>
                  <CardDescription>
                    Configurações básicas do ERP
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome do Sistema</Label>
                    <Input defaultValue="CitiView ERP" />
                  </div>
                  <div className="space-y-2">
                    <Label>URL do Sistema</Label>
                    <Input defaultValue="https://app.citiview.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail de Suporte</Label>
                    <Input defaultValue="suporte@citiview.com.br" />
                  </div>
                  <Button className="bg-citiview-orange hover:bg-citiview-orange/90">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Banco de Dados
                  </CardTitle>
                  <CardDescription>
                    Informações da conexão
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Provider:</span>
                      <span className="text-sm font-medium">Supabase</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Região:</span>
                      <span className="text-sm font-medium">South America (São Paulo)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className="text-sm font-medium text-green-600">Conectado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Último backup:</span>
                      <span className="text-sm font-medium">Há 2 horas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de E-mail</CardTitle>
                <CardDescription>
                  Configure o servidor SMTP para envio de e-mails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Servidor SMTP</Label>
                    <Input placeholder="smtp.exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Porta</Label>
                    <Input placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label>Usuário</Label>
                    <Input placeholder="usuario@exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Senha</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ssl" />
                  <Label htmlFor="ssl">Usar SSL/TLS</Label>
                </div>
                <Button className="bg-citiview-orange hover:bg-citiview-orange/90">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle>Notificações do Sistema</CardTitle>
                <CardDescription>
                  Configure quando enviar alertas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novo cliente cadastrado</p>
                    <p className="text-sm text-gray-500">Receber notificação quando um novo cliente for criado</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Fatura atrasada</p>
                    <p className="text-sm text-gray-500">Alertar quando uma fatura estiver em atraso</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Limite de empresas</p>
                    <p className="text-sm text-gray-500">Alertar quando cliente atingir 80% do limite</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Erros do sistema</p>
                    <p className="text-sm text-gray-500">Notificar sobre erros críticos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="bg-citiview-orange hover:bg-citiview-orange/90">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>
                  Políticas de segurança do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação em dois fatores</p>
                    <p className="text-sm text-gray-500">Exigir 2FA para administradores</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bloqueio após tentativas</p>
                    <p className="text-sm text-gray-500">Bloquear após 5 tentativas de login</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sessão expira em</p>
                    <p className="text-sm text-gray-500">Tempo de inatividade antes de deslogar</p>
                  </div>
                  <Input className="w-32" defaultValue="30" />
                  <span className="text-sm text-gray-500">minutos</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Política de senhas</p>
                    <p className="text-sm text-gray-500">Mínimo de 8 caracteres com números e símbolos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="bg-citiview-orange hover:bg-citiview-orange/90">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
