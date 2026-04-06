import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const DEFAULT_GALLERY = [
  {
    id: "1",
    type: "photo",
    url: "/assets/generated/hero-women-empowerment.dim_1200x500.jpg",
    caption: "Women Empowerment Training Session",
    category: "Training",
    isActive: true,
  },
  {
    id: "2",
    type: "photo",
    url: "/assets/generated/hero-training.dim_1200x500.jpg",
    caption: "Skill Development Program",
    category: "Training",
    isActive: true,
  },
  {
    id: "3",
    type: "photo",
    url: "/assets/generated/hero-products.dim_1200x500.jpg",
    caption: "Handmade Products Display",
    category: "Products",
    isActive: true,
  },
];

export default function Gallery() {
  const { contentMap } = useAppContext();
  const gallery = (contentMap.gallery ||
    DEFAULT_GALLERY) as typeof DEFAULT_GALLERY;
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const categories = ["all", "Training", "Products", "Events", "Centers"];
  const filtered = gallery.filter(
    (item) => item.isActive && (filter === "all" || item.category === filter),
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Badge className="bg-purple-100 text-purple-800 mb-3">
          Visual Journey
        </Badge>
        <h1 className="font-display font-bold text-3xl text-green-900">
          Gallery
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={filter === cat ? "default" : "outline"}
            className={filter === cat ? "bg-green-700" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, idx) => (
          <button
            type="button"
            key={
              (item as any).id ||
              (item as any).title ||
              (item as any).label ||
              (item as any).name ||
              String(idx)
            }
            className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square text-left w-full border-0 p-0"
            onClick={() => setLightbox(item.url)}
          >
            {item.type === "video" ? (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <Play size={32} className="text-white" />
              </div>
            ) : (
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform bg-black/50">
              <p className="text-white text-xs">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          className="text-center text-muted-foreground py-20"
          data-ocid="gallery.empty_state"
        >
          No items in this category.
        </p>
      )}

      {/* Lightbox */}
      {lightbox && (
        <button
          type="button"
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 border-0"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
          />
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>
        </button>
      )}
    </main>
  );
}
