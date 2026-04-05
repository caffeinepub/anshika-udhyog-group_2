import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Download, FileText } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_LEGAL = [
  {
    id: "1",
    title: "Registration Certificate",
    description:
      "Society Registration Certificate under Societies Registration Act",
    issuedBy: "Registrar of Societies",
    issuedDate: "2020-01-15",
    validUpto: "Lifetime",
    fileUrl: "#",
    isActive: true,
  },
  {
    id: "2",
    title: "12A Certificate",
    description: "Income Tax Exemption Certificate under Section 12A",
    issuedBy: "Income Tax Department",
    issuedDate: "2020-06-20",
    validUpto: "2026-06-19",
    fileUrl: "#",
    isActive: true,
  },
  {
    id: "3",
    title: "80G Certificate",
    description: "Tax Exemption for Donors under Section 80G",
    issuedBy: "Income Tax Department",
    issuedDate: "2020-06-20",
    validUpto: "2026-06-19",
    fileUrl: "#",
    isActive: true,
  },
  {
    id: "4",
    title: "PAN Card",
    description: "Permanent Account Number for NGO",
    issuedBy: "Income Tax Department",
    issuedDate: "2020-01-20",
    validUpto: "Lifetime",
    fileUrl: "#",
    isActive: true,
  },
];

export default function LegalDocuments() {
  const { contentMap } = useAppContext();
  const docs = (contentMap.legal_docs || DEFAULT_LEGAL) as typeof DEFAULT_LEGAL;
  const active = docs.filter((d) => d.isActive);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-blue-100 text-blue-800 mb-3">Transparency</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Legal Documents
        </h1>
        <p className="text-muted-foreground mt-2">
          Official registration and legal documents of Anshika Udhyog Group
        </p>
      </div>
      <div className="space-y-4">
        {active.map((doc, idx) => (
          <Card key={idx} className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {doc.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                    <span>Issued by: {doc.issuedBy}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} /> {doc.issuedDate}
                    </span>
                    {doc.validUpto && <span>Valid: {doc.validUpto}</span>}
                  </div>
                </div>
                <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-700 gap-1"
                  >
                    <Download size={14} /> View
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
        {active.length === 0 && (
          <p
            className="text-center text-muted-foreground py-20"
            data-ocid="legal.empty_state"
          >
            No documents available.
          </p>
        )}
      </div>
    </main>
  );
}
