import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_NEWS = [
  {
    id: "1",
    title: "Anshika Udhyog Group Launches New Training Centers in 5 States",
    date: "2026-03-15",
    category: "Expansion",
    summary:
      "We are excited to announce the opening of new skill development centers in Rajasthan, Gujarat, Maharashtra, Karnataka, and Telangana.",
    imageUrl: "/assets/generated/hero-training.dim_1200x500.jpg",
    isPublished: true,
  },
  {
    id: "2",
    title: "5000 Women Trained in FY 2025-26",
    date: "2026-02-28",
    category: "Achievement",
    summary:
      "Anshika Udhyog Group successfully trained over 5000 women entrepreneurs across 15 states in the financial year 2025-26.",
    imageUrl: "/assets/generated/hero-women-empowerment.dim_1200x500.jpg",
    isPublished: true,
  },
  {
    id: "3",
    title: "New Franchise Partner Program Launched",
    date: "2026-01-10",
    category: "Franchise",
    summary:
      "We are now accepting applications for our expanded franchise partner program across India. Apply today for exclusive territory rights.",
    imageUrl: "/assets/generated/hero-products.dim_1200x500.jpg",
    isPublished: true,
  },
];

export default function News() {
  const { contentMap } = useAppContext();
  const news = (contentMap.news || DEFAULT_NEWS) as typeof DEFAULT_NEWS;
  const published = news.filter((n) => n.isPublished);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Badge className="bg-blue-100 text-blue-800 mb-3">Latest Updates</Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          News & Updates
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {published.map((article, idx) => (
          <Card
            key={(article as any).id || (article as any).title || String(idx)}
            className="overflow-hidden hover:shadow-card-hover transition-shadow"
          >
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Calendar size={12} />
                <span>
                  {new Date(article.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {article.category}
                </Badge>
              </div>
              <CardTitle className="text-base leading-snug">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{article.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {published.length === 0 && (
        <p
          className="text-center text-muted-foreground py-20"
          data-ocid="news.empty_state"
        >
          No news available at the moment.
        </p>
      )}
    </main>
  );
}
