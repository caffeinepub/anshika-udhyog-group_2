import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Clock, Users } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_TRAINING = [
  {
    id: "1",
    title: "Agarbatti Making",
    duration: "30 Days",
    eligibility: "Class 5 pass, Women only",
    certification: "Yes",
    description:
      "Learn to manufacture high-quality incense sticks using traditional and modern techniques. Course covers raw material sourcing, manufacturing process, quality control, and marketing.",
    imageUrl: "/assets/generated/hero-training.dim_1200x500.jpg",
    isActive: true,
    outcomes: [
      "Make 5+ varieties",
      "Quality testing",
      "Packaging",
      "Market selling",
    ],
  },
  {
    id: "2",
    title: "Candle Making",
    duration: "21 Days",
    eligibility: "Class 5 pass",
    certification: "Yes",
    description:
      "Master the art of candle making from basic pillar candles to designer decorative candles. Includes aromatic, gel, and beeswax candles.",
    imageUrl: "/assets/generated/hero-products.dim_1200x500.jpg",
    isActive: true,
    outcomes: [
      "10+ candle types",
      "Fragrance mixing",
      "Mold techniques",
      "Online selling",
    ],
  },
  {
    id: "3",
    title: "Soap Making",
    duration: "21 Days",
    eligibility: "Class 5 pass",
    certification: "Yes",
    description:
      "Learn herbal, organic, and medicated soap making. Course includes cold process, hot process, and melt-pour methods.",
    imageUrl: "/assets/generated/hero-women-empowerment.dim_1200x500.jpg",
    isActive: true,
    outcomes: [
      "Herbal soaps",
      "Liquid soaps",
      "Packaging design",
      "Branding basics",
    ],
  },
  {
    id: "4",
    title: "Pickle Making",
    duration: "15 Days",
    eligibility: "Class 3 pass",
    certification: "Yes",
    description:
      "Traditional Indian pickle making including mango, lemon, mixed vegetable and special spiced pickles for home and commercial use.",
    imageUrl: "/assets/generated/hero-training.dim_1200x500.jpg",
    isActive: true,
    outcomes: [
      "15+ pickle varieties",
      "Preservation techniques",
      "Hygienic packaging",
      "Shelf life extension",
    ],
  },
  {
    id: "5",
    title: "Tailoring & Stitching",
    duration: "60 Days",
    eligibility: "Class 8 pass",
    certification: "Yes",
    description:
      "Comprehensive garment stitching course covering ladies suits, blouses, children's clothes, and basic alterations with machine operation.",
    imageUrl: "/assets/generated/hero-products.dim_1200x500.jpg",
    isActive: true,
    outcomes: [
      "Machine operation",
      "Pattern making",
      "Blouse stitching",
      "Commercial tailoring",
    ],
  },
  {
    id: "6",
    title: "Computer Basics",
    duration: "30 Days",
    eligibility: "Class 8 pass",
    certification: "Yes",
    description:
      "Digital literacy program covering MS Office, internet usage, email, online government services, and basic computer maintenance.",
    imageUrl: "/assets/generated/hero-training.dim_1200x500.jpg",
    isActive: true,
    outcomes: [
      "MS Word/Excel",
      "Internet browsing",
      "Email management",
      "Online banking",
    ],
  },
];

export default function Training() {
  const { contentMap } = useAppContext();
  const training = (contentMap.training ||
    DEFAULT_TRAINING) as typeof DEFAULT_TRAINING;
  const active = training.filter((t) => t.isActive);

  // Read page CMS data
  const pageData = (contentMap.page_training || {}) as {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: string;
    pageContent?: string;
    isActive?: boolean;
  };

  const heroTitle = pageData.heroTitle || "Training Programs";
  const heroSubtitle =
    pageData.heroSubtitle ||
    "Government-certified skill training programs for women empowerment";

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
                marginBottom: "40px",
              }
            : {}
        }
      >
        <Badge className="bg-green-100 text-green-800 mb-3">
          Skill Development
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          {heroTitle}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {heroSubtitle}
        </p>
        {pageData.pageContent && (
          <p className="mt-3 text-gray-700 max-w-3xl mx-auto">
            {pageData.pageContent}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {active.map((program, idx) => (
          <Card
            key={program.id || String(idx)}
            className="overflow-hidden hover:shadow-card-hover transition-shadow"
          >
            {program.imageUrl && (
              <img
                src={program.imageUrl}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-green-900">{program.title}</CardTitle>
              {program.certification === "Yes" && (
                <Badge className="bg-yellow-100 text-yellow-800 w-fit">
                  Certified
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{program.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {program.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> {program.eligibility}
                </span>
                {program.certification === "Yes" && (
                  <span className="flex items-center gap-1">
                    <Award size={12} /> Certificate
                  </span>
                )}
              </div>
              {program.outcomes && (
                <div className="flex flex-wrap gap-1">
                  {program.outcomes.map((o, i) => (
                    <Badge
                      key={o || String(i)}
                      variant="outline"
                      className="text-xs"
                    >
                      {o}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
