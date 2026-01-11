import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const mockComprovantes = [
  { id: 1, ano: "2025", status: "Disponível" },
  { id: 2, ano: "2024", status: "Disponível" },
  { id: 3, ano: "2023", status: "Disponível" },
];

const ComprovanteIR = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Comprovante de Imposto de Renda</h1>
          <p className="text-muted-foreground">Baixe seus informes de rendimentos</p>
        </div>

        <div className="grid gap-4">
          {mockComprovantes.map((comprovante) => (
            <Card key={comprovante.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">Informe de Rendimentos {comprovante.ano}</CardTitle>
                    <CardDescription>Ano-calendário {comprovante.ano}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="outline" size="sm">Visualizar</Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ComprovanteIR;
