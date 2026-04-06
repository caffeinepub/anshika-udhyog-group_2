import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_CENTERS = [
  {
    id: "1",
    name: "Anshika Udhyog Center - Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    address: "Gomti Nagar, Lucknow - 226010",
    phone: "+91 83496 00835",
    facilities: ["Agarbatti Making", "Candle Making", "Tailoring"],
    isActive: true,
    photo: "/assets/generated/hero-women-empowerment.dim_1200x500.jpg",
  },
  {
    id: "2",
    name: "Anshika Udhyog Center - Bhopal",
    state: "Madhya Pradesh",
    district: "Bhopal",
    address: "Arera Colony, Bhopal - 462016",
    phone: "+91 83496 00835",
    facilities: ["Soap Making", "Pickle Making", "Computer Basics"],
    isActive: true,
    photo: "/assets/generated/hero-training.dim_1200x500.jpg",
  },
  {
    id: "3",
    name: "Anshika Udhyog Center - Patna",
    state: "Bihar",
    district: "Patna",
    address: "Bailey Road, Patna - 800014",
    phone: "+91 83496 00835",
    facilities: ["Papad Making", "Beauty & Wellness", "Tailoring"],
    isActive: true,
    photo: "/assets/generated/hero-products.dim_1200x500.jpg",
  },
];

export default function OurCenters() {
  const { contentMap } = useAppContext();
  const centers = (contentMap.centers ||
    DEFAULT_CENTERS) as typeof DEFAULT_CENTERS;
  const active = centers.filter((c) => c.isActive);

  // Read page CMS data
  const pageData = (contentMap.page_centers || {}) as {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: string;
    pageContent?: string;
  };

  const heroTitle = pageData.heroTitle || "Our Centers";
  const heroSubtitle =
    pageData.heroSubtitle || "Find an Anshika Udhyog Group center near you";

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div
        className="text-center mb-10"
        style={
          pageData.heroImage
            ? {
                backgroundImage: `url(${pageData.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "40px 20px",
                borderRadius: "12px",
              }
            : {}
        }
      >
        <Badge className="bg-green-100 text-green-800 mb-3">Locations</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          {heroTitle}
        </h1>
        <p className="text-muted-foreground mt-2">{heroSubtitle}</p>
        {pageData.pageContent && (
          <p className="mt-3 text-gray-700 max-w-3xl mx-auto">
            {pageData.pageContent}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {active.map((center, idx) => (
          <Card
            key={center.id || String(idx)}
            className="overflow-hidden hover:shadow-card-hover transition-shadow"
          >
            {center.photo && (
              <img
                src={center.photo}
                alt={center.name}
                className="w-full h-40 object-cover"
              />
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-900">
                {center.name}
              </CardTitle>
              <Badge variant="outline" className="w-fit">
                {center.state}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={14} className="text-green-600 mt-0.5" />
                <span>{center.address}</span>
              </div>
              {center.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-green-600" />
                  <span>{center.phone}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {(center.facilities || []).map((f, i) => (
                  <Badge
                    key={f || String(i)}
                    className="bg-green-100 text-green-800 text-xs"
                  >
                    {f}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
