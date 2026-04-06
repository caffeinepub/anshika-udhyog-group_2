import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

const DEFAULT_INITIATIVES = [
  {
    icon: "🧺",
    title: "Agarbatti Making",
    desc: "Learn traditional incense making",
    image: "",
  },
  {
    icon: "🕯️",
    title: "Candle Making",
    desc: "Decorative & aromatic candles",
    image: "",
  },
  {
    icon: "🧴",
    title: "Soap Making",
    desc: "Herbal & organic soaps",
    image: "",
  },
  {
    icon: "🥣",
    title: "Pickle Making",
    desc: "Traditional Indian pickles",
    image: "",
  },
  {
    icon: "✂️",
    title: "Tailoring",
    desc: "Garment stitching & design",
    image: "",
  },
  {
    icon: "💻",
    title: "Computer Basics",
    desc: "Digital literacy program",
    image: "",
  },
];

const DEFAULT_SCHEMES = [
  {
    title: "PM Mudra Yojana",
    desc: "Loan upto ₹10 Lakh for small businesses",
    icon: "🏦",
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Startup India",
    desc: "Government support for new entrepreneurs",
    icon: "🚀",
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "PM SVANidhi",
    desc: "Working capital loan for street vendors",
    icon: "💜",
    color: "bg-pink-50 border-pink-200",
  },
  {
    title: "NRLM",
    desc: "National Rural Livelihood Mission",
    icon: "🌿",
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Stand Up India",
    desc: "For SC/ST and women entrepreneurs",
    icon: "⭐",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    title: "PMEGP",
    desc: "Prime Minister Employment Generation Programme",
    icon: "📊",
    color: "bg-orange-50 border-orange-200",
  },
];

interface HomeCard {
  icon: string;
  title: string;
  desc: string;
  image: string;
}

interface Scheme {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

type TabType = "hero" | "stats" | "cards" | "schemes";

export default function AdminHomePage() {
  const { contentMap, saveContent } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  const [heroText, setHeroText] = useState(
    (contentMap.hero_text ||
      "Empowering Women Through Self-Employment") as string,
  );
  const [heroImage, setHeroImage] = useState(
    (contentMap.hero_image || "") as string,
  );
  const [statsData, setStatsData] = useState(
    (contentMap.stats || {
      members: "5000+",
      centers: "50+",
      programs: "20+",
      states: "15+",
    }) as Record<string, string>,
  );
  const [homeCards, setHomeCards] = useState<HomeCard[]>(
    ((contentMap.home_cards as HomeCard[]) || DEFAULT_INITIATIVES).map((c) => ({
      icon: c.icon || "📌",
      title: c.title || "",
      desc: c.desc || "",
      image: (c as HomeCard).image || "",
    })),
  );
  const [schemes, setSchemes] = useState<Scheme[]>(
    (contentMap.schemes as Scheme[]) || DEFAULT_SCHEMES,
  );

  const heroImageRef = useRef<HTMLInputElement>(null);
  const cardImageRefs = useRef<(HTMLInputElement | null)[]>([]);

  const galleryImages = (contentMap.gallery || []) as Array<{
    id: string;
    url: string;
    type: string;
    title: string;
  }>;
  const photoGallery = galleryImages.filter((g) => g.type !== "video");

  function handleHeroImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setHeroImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleCardImageUpload(
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setHomeCards((prev) =>
        prev.map((c, i) =>
          i === idx ? { ...c, image: ev.target?.result as string } : c,
        ),
      );
    reader.readAsDataURL(file);
  }

  async function saveHero() {
    await Promise.all([
      saveContent("hero_text", heroText),
      saveContent("hero_image", heroImage),
    ]);
    toast.success("Hero section saved!");
  }

  async function saveStats() {
    await saveContent("stats", statsData);
    toast.success("Stats saved!");
  }

  async function saveCards() {
    await saveContent("home_cards", homeCards);
    toast.success("Core Initiatives saved!");
  }

  async function saveSchemes() {
    await saveContent("schemes", schemes);
    toast.success("Schemes saved!");
  }

  const TABS: { key: TabType; label: string }[] = [
    { key: "hero", label: "Hero Section" },
    { key: "stats", label: "Stats Strip" },
    { key: "cards", label: "Core Initiatives" },
    { key: "schemes", label: "Govt Schemes" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-bold text-xl text-gray-900">Home Page Settings</h1>
        <p className="text-sm text-gray-500">
          Edit all sections of the homepage
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <Button
            key={t.key}
            size="sm"
            variant={activeTab === t.key ? "default" : "outline"}
            className={activeTab === t.key ? "bg-green-700" : ""}
            onClick={() => setActiveTab(t.key)}
            data-ocid={`homepage.${t.key}.tab`}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === "hero" && (
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="lbl_1">
                Hero Text (Main Tagline)
              </label>
              <input
                id="lbl_1"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                value={heroText}
                onChange={(e) => setHeroText(e.target.value)}
                data-ocid="homepage.hero.input"
              />
            </div>

            {/* Hero Image */}
            <div>
              <p className="text-sm font-medium">Hero Background Image</p>
              <div className="mt-2 space-y-3">
                {heroImage && (
                  <div className="relative inline-block">
                    <img
                      src={heroImage}
                      alt="Hero"
                      className="h-36 rounded-lg object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => setHeroImage("")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      <X size={10} />
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => heroImageRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 border border-dashed border-green-400 rounded-lg text-sm text-green-700 hover:bg-green-50"
                  data-ocid="homepage.hero.upload_button"
                >
                  <Upload size={14} /> Upload Hero Image
                </button>
                <input
                  ref={heroImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleHeroImageUpload}
                />

                {/* Gallery picker */}
                {photoGallery.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      Or pick from gallery:
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
                      {photoGallery.map((img) => (
                        <button
                          type="button"
                          key={img.id}
                          onClick={() => setHeroImage(img.url)}
                          className={`rounded overflow-hidden border-2 transition-all ${
                            heroImage === img.url
                              ? "border-green-600"
                              : "border-transparent hover:border-green-300"
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-16 h-12 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              className="bg-green-700"
              onClick={saveHero}
              data-ocid="homepage.hero.save_button"
            >
              Save Hero Section
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <Card>
          <CardHeader>
            <CardTitle>Stats Strip</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {["members", "centers", "programs", "states"].map((key) => (
                <div key={key}>
                  <label
                    className="text-xs font-medium capitalize"
                    htmlFor="lbl_2"
                  >
                    {key}
                  </label>
                  <input
                    id="lbl_2"
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                    value={statsData[key] || ""}
                    onChange={(e) =>
                      setStatsData((p) => ({ ...p, [key]: e.target.value }))
                    }
                    data-ocid={`homepage.stats.${key}.input`}
                  />
                </div>
              ))}
            </div>
            <Button
              className="bg-green-700"
              onClick={saveStats}
              data-ocid="homepage.stats.save_button"
            >
              Save Stats
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Core Initiatives Tab */}
      {activeTab === "cards" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Core Initiatives / Program Cards</CardTitle>
            <Button
              size="sm"
              className="bg-green-700"
              onClick={() =>
                setHomeCards((p) => [
                  ...p,
                  {
                    icon: "📌",
                    title: "New Program",
                    desc: "Description",
                    image: "",
                  },
                ])
              }
              data-ocid="homepage.cards.add_button"
            >
              <Plus size={14} className="mr-1" /> Add Card
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {homeCards.map((card, idx) => (
              <div
                key={card.title || String(idx)}
                className="border rounded-lg p-4 space-y-3 bg-gray-50"
                data-ocid={`homepage.cards.item.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Card {idx + 1}</Badge>
                  <button
                    type="button"
                    onClick={() =>
                      setHomeCards((p) => p.filter((_, i) => i !== idx))
                    }
                    className="text-red-500 hover:text-red-700"
                    data-ocid={`homepage.cards.delete_button.${idx + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium" htmlFor="lbl_3">
                      Icon (emoji)
                    </label>
                    <input
                      id="lbl_3"
                      className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                      value={card.icon}
                      onChange={(e) =>
                        setHomeCards((p) =>
                          p.map((c, i) =>
                            i === idx ? { ...c, icon: e.target.value } : c,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium" htmlFor="lbl_4">
                      Title
                    </label>
                    <input
                      id="lbl_4"
                      className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                      value={card.title}
                      onChange={(e) =>
                        setHomeCards((p) =>
                          p.map((c, i) =>
                            i === idx ? { ...c, title: e.target.value } : c,
                          ),
                        )
                      }
                      data-ocid={`homepage.card.title.input.${idx + 1}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium" htmlFor="lbl_5">
                      Description
                    </label>
                    <input
                      id="lbl_5"
                      className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                      value={card.desc}
                      onChange={(e) =>
                        setHomeCards((p) =>
                          p.map((c, i) =>
                            i === idx ? { ...c, desc: e.target.value } : c,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium">Card Image (optional)</p>
                  <div className="flex items-center gap-2 mt-1">
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-16 h-12 object-cover rounded border"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => cardImageRefs.current[idx]?.click()}
                      className="flex items-center gap-1 px-2 py-1 border border-dashed border-green-400 rounded text-xs text-green-700 hover:bg-green-50"
                      data-ocid={`homepage.card.upload_button.${idx + 1}`}
                    >
                      <Upload size={12} /> {card.image ? "Change" : "Upload"}
                    </button>
                    {card.image && (
                      <button
                        type="button"
                        onClick={() =>
                          setHomeCards((p) =>
                            p.map((c, i) =>
                              i === idx ? { ...c, image: "" } : c,
                            ),
                          )
                        }
                        className="text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    )}
                    <input
                      ref={(el) => {
                        cardImageRefs.current[idx] = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleCardImageUpload(idx, e)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              className="bg-green-700 w-full"
              onClick={saveCards}
              data-ocid="homepage.cards.save_button"
            >
              Save All Initiative Cards
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Government Schemes Tab */}
      {activeTab === "schemes" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Government Schemes</CardTitle>
            <Button
              size="sm"
              className="bg-green-700"
              onClick={() =>
                setSchemes((p) => [
                  ...p,
                  {
                    title: "New Scheme",
                    desc: "Description",
                    icon: "📋",
                    color: "bg-gray-50 border-gray-200",
                  },
                ])
              }
              data-ocid="homepage.schemes.add_button"
            >
              <Plus size={14} className="mr-1" /> Add Scheme
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {schemes.map((scheme, idx) => (
              <div
                key={scheme.title || String(idx)}
                className="border rounded-lg p-4 space-y-3 bg-gray-50"
                data-ocid={`homepage.schemes.item.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Scheme {idx + 1}</Badge>
                  <button
                    type="button"
                    onClick={() =>
                      setSchemes((p) => p.filter((_, i) => i !== idx))
                    }
                    className="text-red-500 hover:text-red-700"
                    data-ocid={`homepage.schemes.delete_button.${idx + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-medium" htmlFor="lbl_6">
                      Icon
                    </label>
                    <input
                      id="lbl_6"
                      className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                      value={scheme.icon}
                      onChange={(e) =>
                        setSchemes((p) =>
                          p.map((s, i) =>
                            i === idx ? { ...s, icon: e.target.value } : s,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium" htmlFor="lbl_7">
                      Title
                    </label>
                    <input
                      id="lbl_7"
                      className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                      value={scheme.title}
                      onChange={(e) =>
                        setSchemes((p) =>
                          p.map((s, i) =>
                            i === idx ? { ...s, title: e.target.value } : s,
                          ),
                        )
                      }
                      data-ocid={`homepage.scheme.title.input.${idx + 1}`}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium" htmlFor="lbl_8">
                      Description
                    </label>
                    <input
                      id="lbl_8"
                      className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                      value={scheme.desc}
                      onChange={(e) =>
                        setSchemes((p) =>
                          p.map((s, i) =>
                            i === idx ? { ...s, desc: e.target.value } : s,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium" htmlFor="lbl_9">
                    CSS Color Class
                  </label>
                  <input
                    id="lbl_9"
                    className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm font-mono text-xs"
                    value={scheme.color}
                    onChange={(e) =>
                      setSchemes((p) =>
                        p.map((s, i) =>
                          i === idx ? { ...s, color: e.target.value } : s,
                        ),
                      )
                    }
                    placeholder="e.g. bg-blue-50 border-blue-200"
                  />
                </div>
              </div>
            ))}
            <Button
              className="bg-green-700 w-full"
              onClick={saveSchemes}
              data-ocid="homepage.schemes.save_button"
            >
              Save All Schemes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import type React from "react";
