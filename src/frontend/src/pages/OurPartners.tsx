import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_PARTNERS = [
  {
    id: "1",
    name: "National Bank for Agriculture",
    category: "Banking",
    desc: "Partner bank for SHG and rural enterprise loans",
    logo: "",
    website: "#",
    isActive: true,
  },
  {
    id: "2",
    name: "Ministry of MSME",
    category: "Government",
    desc: "Government ministry supporting our training programs",
    logo: "",
    website: "#",
    isActive: true,
  },
  {
    id: "3",
    name: "State Skill Development Mission",
    category: "Training",
    desc: "State government partner for skill certification",
    logo: "",
    website: "#",
    isActive: true,
  },
  {
    id: "4",
    name: "Khadi & Village Industries",
    category: "Industry",
    desc: "Marketing partner for rural products",
    logo: "",
    website: "#",
    isActive: true,
  },
];

export default function OurPartners() {
  const { contentMap } = useAppContext();
  const partners = (contentMap.partners ||
    DEFAULT_PARTNERS) as typeof DEFAULT_PARTNERS;
  const active = partners.filter((p) => p.isActive);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-blue-100 text-blue-800 mb-3">Collaboration</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Our Partners
        </h1>
        <p className="text-muted-foreground mt-2">
          Strategic partners supporting our mission
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {active.map((partner, idx) => (
          <Card key={idx} className="hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-400">
                    {partner.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900">{partner.name}</h3>
              <Badge className="bg-blue-100 text-blue-800 mt-1">
                {partner.category}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">{partner.desc}</p>
              {partner.website && partner.website !== "#" && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-green-700 text-sm mt-2 hover:underline"
                >
                  <ExternalLink size={12} /> Visit Website
                </a>
              )}
            </CardContent>
          </Card>
        ))}
        {active.length === 0 && (
          <p
            className="text-center text-muted-foreground py-20 col-span-3"
            data-ocid="partners.empty_state"
          >
            Partners information coming soon.
          </p>
        )}
      </div>
    </main>
  );
}
