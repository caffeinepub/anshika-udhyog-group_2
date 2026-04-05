import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

export default function AdminHomePage() {
  const { contentMap, saveContent } = useAppContext();
  const [heroText, setHeroText] = useState(
    (contentMap.hero_text ||
      "Empowering Women Through Self-Employment") as string,
  );
  const [statsData, setStatsData] = useState(
    (contentMap.stats || {
      members: "5000+",
      centers: "50+",
      programs: "20+",
      states: "15+",
    }) as Record<string, string>,
  );

  async function saveHero() {
    await saveContent("hero_text", heroText);
    toast.success("Hero text saved!");
  }

  async function saveStats() {
    await saveContent("stats", statsData);
    toast.success("Stats saved!");
  }

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-xl">Home Page Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium">Hero Text</label>
            <input
              className="w-full mt-1 border rounded px-3 py-2 text-sm"
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
              data-ocid="homepage.hero.input"
            />
          </div>
          <Button
            className="bg-green-700"
            onClick={saveHero}
            data-ocid="homepage.hero.save_button"
          >
            Save
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stats Strip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {["members", "centers", "programs", "states"].map((key) => (
              <div key={key}>
                <label className="text-xs font-medium capitalize">{key}</label>
                <input
                  className="w-full mt-0.5 border rounded px-2 py-1.5 text-sm"
                  value={statsData[key] || ""}
                  onChange={(e) =>
                    setStatsData((p) => ({ ...p, [key]: e.target.value }))
                  }
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

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          <div className="col-span-2 text-muted-foreground text-xs">
            Manage content via dedicated sections:
          </div>
          {[
            ["Image Slider", "/admin/slider"],
            ["Gallery", "/admin/gallery"],
            ["YouTube Videos", "/admin/youtube"],
            ["Core Initiatives", "/admin/schemes"],
          ].map(([label, path]) => (
            <a
              key={path}
              href={path}
              className="text-green-700 hover:underline"
            >
              {label} &rarr;
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
