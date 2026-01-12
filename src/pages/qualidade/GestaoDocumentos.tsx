import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Download, Eye, FolderOpen } from "lucide-react";

const documentosMock = [
  { id: 1, codigo: "DOC-001", titulo: "Manual da Qualidade", versao: "3.0", tipo: "Manual", status: "Vigente", ultimaRevisao: "10/01/2026" },
  { id: 2, codigo: "PRC-001", titulo: "Procedimento de Auditorias", versao: "2.1", tipo: "Procedimento", status: "Vigente", ultimaRevisao: "05/01/2026" },
  { id: 3, codigo: "IT-015", titulo: "Instrução de Trabalho - Calibração", versao: "1.5", tipo: "Instrução", status: "Em Revisão", ultimaRevisao: "08/01/2026" },
  { id: 4, codigo: "FOR-042", titulo: "Formulário de Não Conformidade", versao: "4.0", tipo: "Formulário", status: "Vigente", ultimaRevisao: "01/01/2026" },
  { id: 5, codigo: "POL-003", titulo: "Política de Qualidade", versao: "2.0", tipo: "Política", status: "Vigente", ultimaRevisao: "15/12/2025" },
];

export default function GestaoDocumentos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Documentos</h1>
            <p className="text-muted-foreground">Controle de documentos do sistema de gestão da qualidade</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Documento
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+8 este mês</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vigentes</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">142</div>
              <p className="text-xs text-muted-foreground">91% do total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Revisão</CardTitle>
              <FileText className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">10</div>
              <p className="text-xs text-muted-foreground">6% do total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Obsoletos</CardTitle>
              <FileText className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">4</div>
              <p className="text-xs text-muted-foreground">3% do total</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Tabela */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Documentos Controlados</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar documento..." className="pl-9 w-64" />
                </div>
                <Button variant="outline">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Categorias
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Revisão</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentosMock.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.codigo}</TableCell>
                    <TableCell>{doc.titulo}</TableCell>
                    <TableCell>{doc.versao}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.tipo}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={doc.status === "Vigente" ? "default" : "secondary"}
                        className={doc.status === "Vigente" ? "bg-green-500" : "bg-yellow-500"}
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{doc.ultimaRevisao}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
