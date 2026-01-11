import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileHeart, Plus, Upload } from "lucide-react";

const mockAtestados = [
  { id: 1, data: "05/01/2026", dias: 2, cid: "J11", status: "Aprovado" },
  { id: 2, data: "15/11/2025", dias: 1, cid: "K30", status: "Aprovado" },
  { id: 3, data: "20/08/2025", dias: 3, cid: "M54", status: "Aprovado" },
];

const Atestados = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Atestados</h1>
            <p className="text-muted-foreground">Envie seus atestados médicos</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Enviar Atestado
          </Button>
        </div>

        <div className="grid gap-4">
          {mockAtestados.map((atestado) => (
            <Card key={atestado.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <FileHeart className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{atestado.data}</CardTitle>
                    <CardDescription>CID: {atestado.cid}</CardDescription>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="text-lg font-medium">{atestado.dias} dia(s)</span>
                  <Badge variant="default">{atestado.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">Visualizar</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Atestados;
