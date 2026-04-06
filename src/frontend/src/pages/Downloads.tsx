import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, File, FileText } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_DOCS = [
  {
    id: "1",
    title: "Annual Report 2025-26",
    description:
      "Complete annual report with financial statements and program impact",
    fileUrl: "#",
    fileType: "PDF",
    isActive: true,
  },
  {
    id: "2",
    title: "Training Program Brochure",
    description: "Details of all vocational training programs offered",
    fileUrl: "#",
    fileType: "PDF",
    isActive: true,
  },
  {
    id: "3",
    title: "Franchise Application Form",
    description: "Printable franchise application form",
    fileUrl: "#",
    fileType: "PDF",
    isActive: true,
  },
  {
    id: "4",
    title: "Membership Form",
    description: "New membership registration form",
    fileUrl: "#",
    fileType: "PDF",
    isActive: true,
  },
];

export default function Downloads() {
  const { contentMap } = useAppContext();
  const docs = (contentMap.downloads || DEFAULT_DOCS) as typeof DEFAULT_DOCS;
  const active = docs.filter((d) => d.isActive);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">Resources</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Downloads
        </h1>
        <p className="text-muted-foreground mt-2">
          Download forms, brochures, and other documents
        </p>
      </div>
      <div className="space-y-4">
        {active.map((doc, idx) => (
          <Card
            key={
              (doc as any).id ||
              (doc as any).title ||
              (doc as any).label ||
              (doc as any).name ||
              String(idx)
            }
            className="hover:shadow-card-hover transition-shadow"
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <FileText size={24} className="text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.description}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {doc.fileType}
                </Badge>
              </div>
              <a href={doc.fileUrl} download target="_blank" rel="noreferrer">
                <Button
                  size="sm"
                  className="bg-green-700 hover:bg-green-800 gap-1"
                >
                  <Download size={14} /> Download
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
        {active.length === 0 && (
          <p
            className="text-center text-muted-foreground py-20"
            data-ocid="downloads.empty_state"
          >
            No downloads available.
          </p>
        )}
      </div>
    </main>
  );
}
