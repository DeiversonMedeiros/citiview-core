import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const mockContraCheques = [
  { id: 1, mes: "Janeiro/2026", liquido: "R$ 4.850,00", bruto: "R$ 6.500,00" },
  { id: 2, mes: "Dezembro/2025", liquido: "R$ 4.850,00", bruto: "R$ 6.500,00" },
  { id: 3, mes: "Novembro/2025", liquido: "R$ 4.750,00", bruto: "R$ 6.500,00" },
  { id: 4, mes: "Outubro/2025", liquido: "R$ 4.850,00", bruto: "R$ 6.500,00" },
];

const ContraCheque = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contra Cheque</h1>
          <p className="text-muted-foreground">Visualize seus holerites</p>
        </div>

        <div className="grid gap-4">
          {mockContraCheques.map((cc) => (
            <Card key={cc.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{cc.mes}</CardTitle>
                    <CardDescription>Bruto: {cc.bruto}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{cc.liquido}</p>
                  <p className="text-xs text-muted-foreground">Líquido</p>
                </div>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="outline" size="sm">Visualizar</Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ContraCheque;
