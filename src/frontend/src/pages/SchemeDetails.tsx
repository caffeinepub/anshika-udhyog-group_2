import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const DEFAULT_SCHEMES = [
  {
    title: "Pradhan Mantri Mudra Yojana",
    icon: "🏦",
    category: "Finance",
    desc: "Under PMMY, loans up to ₹10 lakh are provided to non-corporate, non-farm small/micro enterprises. The loans are classified as Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh) and Tarun (₹5,00,001 to ₹10 lakh).",
    eligibility: "Women entrepreneurs, small business owners",
    benefit: "Collateral-free loan upto ₹10 Lakh",
  },
  {
    title: "Startup India",
    icon: "🚀",
    category: "Startup",
    desc: "Startup India is a flagship initiative of the Government of India, intended to build a strong ecosystem for nurturing innovation and Startups in India.",
    eligibility: "New businesses, innovators",
    benefit: "Tax exemptions, funding support",
  },
  {
    title: "Stand-Up India",
    icon: "⭐",
    category: "Women",
    desc: "Stand-Up India scheme facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one Scheduled Caste or Scheduled Tribe borrower and at least one woman borrower per bank branch.",
    eligibility: "SC/ST and women entrepreneurs",
    benefit: "Loan ₹10 Lakh to ₹1 Crore",
  },
  {
    title: "PM SVANidhi",
    icon: "💜",
    category: "Vendor",
    desc: "PM Street Vendor's AtmaNirbhar Nidhi - a micro-credit facility for street vendors to avail collateral free working capital loan of ₹10,000 to restart their businesses.",
    eligibility: "Street vendors",
    benefit: "Collateral-free loan ₹10,000",
  },
  {
    title: "NRLM",
    icon: "🌿",
    category: "Rural",
    desc: "National Rural Livelihoods Mission aims to create efficient and effective institutional platforms of the rural poor, enabling them to increase household income through sustainable livelihood enhancements.",
    eligibility: "Rural poor women",
    benefit: "SHG formation, capacity building",
  },
  {
    title: "PMEGP",
    icon: "📊",
    category: "Employment",
    desc: "Prime Minister's Employment Generation Programme - a credit-linked subsidy programme for generation of employment opportunities through establishment of micro-enterprises.",
    eligibility: "18+ years, 8th pass",
    benefit: "35% subsidy on project cost",
  },
];

export default function SchemeDetails() {
  const { contentMap } = useAppContext();
  const schemes = (contentMap.schemes ||
    DEFAULT_SCHEMES) as typeof DEFAULT_SCHEMES;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-green-100 text-green-800 mb-3">
          Government Schemes
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Scheme Details
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore government-backed schemes available for women entrepreneurs
          and rural communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme, idx) => (
          <Card
            key={
              (scheme as any).id ||
              (scheme as any).title ||
              (scheme as any).name ||
              String(idx)
            }
            className="hover:shadow-card-hover transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{scheme.icon}</span>
                <div>
                  <CardTitle className="text-lg text-green-900">
                    {scheme.title}
                  </CardTitle>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {scheme.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">{scheme.desc}</p>
              <div className="space-y-2">
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-green-700 shrink-0">
                    Eligibility:
                  </span>
                  <span className="text-gray-600">{scheme.eligibility}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-green-700 shrink-0">
                    Benefit:
                  </span>
                  <span className="text-gray-600">{scheme.benefit}</span>
                </div>
              </div>
              <Link to="/loan" className="mt-4 block">
                <Button size="sm" className="bg-green-700 hover:bg-green-800">
                  Apply Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
